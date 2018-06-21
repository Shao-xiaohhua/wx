//index.js
import countUp from '../../utils/countup'
//获取应用实例
var app = getApp()
var moment = require('../../lib/moment/we-moment');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    listArr: [],
    zxPrintCount: '0',
    hotlinePrintCount: 0,
    zxStartCount: 1,
    zxCount: 0,

    zjCount: 0,
    connectWS: false,
    errorinfo: '',
    tabs: ["在线咨询", "电话咨询"],
    index: 0,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    timerval: '获取验证码',
    counterNum: 0,
    content: '',
    tName: '咨询类别',
    tCode: '',
    tWin: '',
    updateTime: new Date().getTime(),
    dynamic: [

    ]
  },

  loadData:function(){
    var that = this
    //写入用户信息
    app.getUserInfo(function (userInfo) {
        var name = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl;
        var code = userInfo.loginCode;
        var session = wx.getStorageSync('__session__');
        if (session && session.sn) {//
          app.globalData.sn = session.sn;
          app.globalData.userId = session.userId;
          app.globalData.mobile = session.mobile;
          app.globalData.consultantId = session.consultantId;
          that.connectWebSocket();
          that.getUnZixun();
        }else{
          wx.showLoading({
            title: '12348上海法网',
            mask: true
          });
          wx.request({
            url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/login',
            data: {
              code: code,
              avatar: avatarUrl,
              name: name
            },
            success: function (res) {
              console.log(res);
              wx.hideLoading();
              if (res.data && res.data.code == 1) {
                var r = res.data.result
                app.globalData.sn = r.sn;
                app.globalData.userId = r.userId;
                app.globalData.mobile = r.mobile;
                app.globalData.consultantId = r.consultantId;
                wx.setStorage({
                  key: "__session__",
                  data: r
                });
                that.connectWebSocket();
                that.getUnZixun();
              } else {
                wx.showModal({
                  title: '提示',
                  content: '微信身份绑定失败，请重试或选择热线咨询！',
                  cancelText: '重试',
                  confirmText: '热线咨询',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: 'hotline'
                      })
                    } else {
                      wx.setStorage({
                        key: "__userInfo__",
                        data: ""
                      });
                      wx.setStorage({
                        key: "__session__",
                        data: ""
                      });
                      that.loadData();
                    }
                  }
                });

              }
            },
            complete: function (res) {
              wx.hideLoading();
              if (res.statusCode != 200 || res.statusCode != '200') {
                wx.showModal({
                  title: '提示',
                  content: '微信身份绑定失败，请重试或选择热线咨询！',
                  cancelText: '重试',
                  confirmText: '热线咨询',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: 'hotline'
                      })
                    } else {
                      wx.setStorage({
                        key: "__userInfo__",
                        data: ""
                      });
                      wx.setStorage({
                        key: "__session__",
                        data: ""
                      });
                      that.loadData();
                    }
                  }
                });
              };
            }
          });
        };
      }
    );
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      console.log(res.networkType)
    });
    //获取在线窗口列表
    this.getWindowList();
  },
  
  onShow: function () {
    var that = this;
    this.loadData();
    this.userInfoCkeck();
    if(that.data.listArr.length==0){
      that.getWindowList();
    };
    setTimeout(function(){
      that.getStatInfo();
    },100);
  },

  getWindowList() {
    var that = this;
    var icons = ['icon-adv-lawyer', 'icon-adv-notary', 'icon-adv-checkup', 'icon-adv-exam', 
    'icon-adv-medi', 'icon-adv-help', 'icon-adv-community', 'icon-adv-prison', 'icon-adv-adh'];
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/category',
      success: function (res) {
        var data = res.data.result;
        var winList = [];
        for (var i in data) {
          var index = i % 9;
          winList.push({
            name: data[i].name,
            textonline: data[i].textOnlineId,
            'number': data[i].count,
            icon: icons[index],
            id: data[i].sn
          });
        };
        that.setData({
          listArr: winList
        });
      }
    });
  },
  //刷新
  refreshTap:function(){
    this.getWindowList();
    this.getStatInfo();
  },
  getStatInfo() {
    var that = this;
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/statInfo',
      success: function (res) {
        if (res.data.code == 1) {
          var result = res.data.result;
          var winList = that.data.listArr;
          for (var i in winList) {
            for (var k in winList) {
              if (winList[i].id == result.windowCount[k].id) {
                winList[i].number = result.windowCount[k].count
              }
            };
          };
          that.setData({
            zxCount: result.zxCount,
            hotlinePrintCount: result.hotlineCount,
            listArr:winList
          });
          that.zxCountUp();
        }
      }
    })
  },

  getUnZixun:function(){
    var that = this;
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/exist',
      method: 'POST',
      data: JSON.stringify({
        userId: app.globalData.userId
      }),
      success: function (res) {
        if (res.data.code == 1) {
          var result = res.data.result;
          if (result) {
            that.enterZixun(result);
          };
        };
      }
    })
  },

  userInfoCkeck:function(){
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] == false) {
          wx.showModal({
            title: '授权提示',
            content: '本站提供的服务需要获取您的用户信息，请授权。',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {}
                });
              };
            }
          });
        };
      }
    });
  },

  connectWebSocket:function(){
    var that=this
    if (!app.globalData.userId){
      return;
    }
    var path = app.globalData.apiPath.replace('https://','wss://')
    wx.closeSocket();
    setTimeout(function(){
      wx.connectSocket({
        url: path + '/service/websocket/consultant?consultantId=' + app.globalData.consultantId
      })
    },200);
    

    wx.onSocketOpen(function () {
      console.log('WebSocket 已开启！'+new Date().getTime())
      that.setData({
        connectWS: true
      });
    });

    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！'+new Date().getTime())
      that.setData({
        connectWS: false
      });
    });

    wx.onSocketMessage(function (res) {
      let item = JSON.parse(res.data);
    });
  },

  startZixun: function (e) {
    var that=this;
    var windowId = e.target.dataset.windowid;
    var windowName = e.target.dataset.windowname;
    var textwindowid=e.target.dataset.textonline;
    if (app.globalData.mobile){
      wx.showLoading({
        title: '开始发起咨询',
        mask:true
      });
      wx.request({
        url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/enter',
        method:'POST',
        dataType:'json',
        data: JSON.stringify({
          userId: app.globalData.userId,
          windowId: windowId
        }),
        success: function (res) {
          wx.hideLoading();
          console.log(res);
          if (res.data.code < 0) {
            wx.showModal({
              title: '提示',
              content: res.data.description + " [code: " + res.data.code + "]",
              showCancel: false
            });
            return;
          };
          if (res.data.code == 2) {
            wx.showModal({
              title: '提示',
              content: res.data.description,
              success: function (res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/message/message?windowId=' + textwindowid + '&windowName=' + windowName
                  });
                }
              }
            });
            return;
          }
          if (res.data.code == 1) {
            //可以进入窗口
            that.enterZixun(res.data.result);
          }
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '当前咨询较忙',
            icon:'loading',
            duration: 2000,
            mask: true
          });
        }
      })
    }else{
      wx.navigateTo({
        url: '../validate/validate'
      });
    };
  },

  enterZixun : function (data) {
    if (!data.chatRoomId) {
      wx.showModal({
        title: '异常提示',
        content: "缺少参数 chatRoomId.",
        showCancel: false
      });
      return;
    }
    wx.showLoading({
      title: '开始进入咨询',
      mask: true
    });
    wx.closeSocket();
    wx.redirectTo({
      url: 'message?chatRoomId=' + data.chatRoomId + '&chatRoomName=' + data.chatRoomName + 
      '&talkerId=' + data.talkerId + '&talkerName=' + data.talkerName + '&chatSessionId=' + data.chatSessionId
    });
  },

  zxCountUp:function(){
    var that=this;
    if (that.data.zxStartCount != that.data.zxCount){
      this.c = new countUp(that.data.zxStartCount, that.data.zxCount, 0, 2, {
        printValue(value) {
          this.setData({
            zxPrintCount: value,
            zxStartCount: that.data.zxCount
          });
        }
      });
      this.c.start();
    };
  }


})  
