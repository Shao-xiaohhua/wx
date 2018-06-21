//index.js
import countUp from '../../utils/countup'
//获取应用实例
var app = getApp()
var moment = require('../../lib/moment/we-moment');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {

    zxPrintCount:'0',
    zxStartCount:1,
    zxCount:0,

    zjCount:0,
    connectWS:false,
    errorinfo:'',
    tabs: ["在线咨询", "电话咨询"],
    index: 0,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    timerval: '获取验证码',
    counterNum: 0,
    content:'',
    tName:'咨询类别',
    tCode:'',
    tWin:'',

    updateTime:new Date().getTime(),
    dynamic: [
      
    ]
  },
  onPullDownRefresh: function () {
    this.loadData()
  },
  loadData:function(){
    var that = this;
    
    //写入用户信息
    wx.login({
      success: function (r) {
        var code = r.code
        wx.getUserInfo({
          success: function (res) {
            var name = res.userInfo.nickName
            var avatarUrl = res.userInfo.avatarUrl
            wx.request({
              url: app.globalData.apiPath + '/service/rest/12348.Wx/collection/login',
              data: {
                code: code,
                avatar: avatarUrl,
                name: name
              },
              success: function (res) {
                if (res.data && res.data.code == 1) {
                  var r = res.data.result
                  app.globalData.sn = r.sn
                  app.globalData.userId = r.userId
                  app.globalData.mobile = r.mobile
                  that.getUnZixun()
                }
              },
              complete: function (res) {
                if (res.statusCode != 200) {
                  wx.showLoading({
                    title: '获取信息错误,请重试',
                  })
                  setTimeout(function () {
                    wx.hideLoading()
                  }.bind(this), 5000)
                }
                wx.stopPullDownRefresh()
              }
            })
          }
        })
      }
    })
    
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
    this.loadData(); this.getDynamic(); this.getExpert()
    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      console.log(res.networkType)
    });


  },
  
  getUnZixun:function(){
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.Wx/collection/undone',
      method: 'POST',
      data: JSON.stringify({
        userId: app.globalData.userId
      }),
      success: function (res) {
        if (res.data.code == 1) {
          //console.log(res.data.result);
          if (res.data.result){
            wx.redirectTo({
              url: 'message?chatroom=' + res.data.result
            })
          }
          
        }
      }
    })
  },
  onShow:function(){
    this.loadData();
    this.getUnZixun()
    this.getDynamic();
    this.connectWebSocket()

  },
  onReady: function () {
  },

  connectWebSocket:function(){
    var that=this
    var path = app.globalData.apiPath.replace('https://','wss://')
    wx.closeSocket()
    wx.connectSocket({
      url: path +'/service/websocket/zxchangesocket'
    })

    wx.onSocketOpen(function () {
      console.log('WebSocket 已开启！')
      that.setData({
        connectWS: true
      })
    })

    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
      that.setData({
        connectWS: false
      })
    })

    wx.onSocketMessage(function (res) {
      let item = JSON.parse(res.data);
      if (item.action=='refresh' &&(new Date().getTime()-that.data.updateTime>=20000)){
        that.getDynamic()
      }
     
    })
  },

  PhoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phonenum
    })
  },
  setCounter: function (e) {
    this.setData({
      counterNum: e.detail.value.length
    });

  },
  selectType:function(e){
    var that=this
    wx.navigateTo({
      url: 'category?typeCode=' + that.data.tCode + "&winCode=" + that.data.tWin,
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  formSubmit: function (e) {
    var that=this
    that.setData({
      errorinfo: ''
    });
    if (!that.data.tCode) {
      that.setData({
        errorinfo: '请选择咨询类别'
      });
      return
    }
    var f = e.detail.value
    if (!f.content) {
      that.setData({
        errorinfo: '请填写咨询问题'
      });
      return
    }
    if (f.content.length < 8) {
      that.setData({
        errorinfo: '咨询问题字数不少于8个'
      });
      return
    }
    if (app.globalData.mobile){
      wx.request({
        url: app.globalData.apiPath + '/service/rest/12348.Chat/collection/start',
        method:'POST',
        data: JSON.stringify({
          userId: app.globalData.userId,
          windowId: that.data.tWin,
          bizType: that.data.tCode,
          content: f.content
        }),
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 1) {
            if (res.data.description){
              wx.showToast({
                title: res.data.description,
                icon: 'success',
                duration: 2000,
                mask: true,
                success: function () {
                  that.setData({
                    content: ''
                  });
                }
              })
            }else{
              var r = res.data.result
              if (r.properties.chatroom){
                wx.redirectTo({ 
                  url: 'message?chatroom='+r.properties.chatroom
                })
              }else{
                that.setData({
                  errorinfo: '发起咨询失败，请稍后再咨询.'
                });
              }
            }
          }
        },
        complete: function (res) {
          if (res.statusCode != 200) {
            wx.showToast({
              title: '发起咨询失败,请重试',
              duration:2000
            })
          }
        }


      })
      
    }else{
      wx.navigateTo({
        url: '../validate/validate'
      })
    }
    
  },
  getDynamic:function(){
    let that=this;
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.Wx/collection/zxlist',
      method: 'GET',
      data: { page: 1, pageSize: 5 },
      success: function (res) {
        if (res.data){
          let dynamics = that.data.dynamic;
          let items = res.data.items;
          for (let i in items) {
            let avatar = 'http://static.homolo.net/prototype/12348/static/images/default_male.jpg';
            if (items[i].portrait) {
              avatar = items[i].portrait
            }
            let ipName = '未知地区';
            if (items[i].ipName) {
              ipName = items[i].ipName;
            }
            let bizType = items[i].typeDisplay;
            if (items[i].$displays.bizType) {
              bizType = items[i].$displays.bizType;
            }
            let data = {
              id: items[i].id, avatarUrl: avatar, name: items[i].$displays.answerer, staffType: items[i].staffType, local: ipName, type: bizType, rating: items[i].$displays.evaluateScore, desc: items[i].properties.title, updateTime: moment(items[i].$displays.askTime).locale('zh-cn').fromNow()
            };
            dynamics.push(data)
          }
          that.setData({
            dynamic: dynamics,
            updateTime:new Date().getTime(),
            zxCount:res.data.total
          })
          that.zxCountUp()
        }

      },

      complete: function (res) {
        /**if(res.statusCode!=200){
          wx.showToast({
            title:'获取数据错误',
            duration: 2000
          })
        }*/
      }
    })
  },
  getExpert: function () {
    let that = this;
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.Wx/collection/zjlist',
      method: 'GET',
      data: { page: 1, pageSize: 1 },
      success: function (res) {

        if(res.data){
          that.c2 = new countUp(0, res.data.total, 0, 4, {
            printValue(value) {
              that.setData({
                zjCount: value,
              })
            }
          })
          that.c2.start()
        }

      }
    })
  },
  format: function (time) {
    let hour = parseInt(time / 1000 / 3600)
    let min = parseInt((time / 1000 - hour * 3600) / 60)
    let sec = parseInt(time / 1000)

    if (sec < 60) {
      return '刚刚'
    } else if (60 < sec < 3600) {
      return min + '分钟前'
    } else if (3600 < sec < 86400) {
      return hour + '小时前'
    } else {
      return '很久以前'
    }
  },
  toZxList:function(){
    wx.switchTab({
      url: '/pages/collection/collection'
    })
  },
  toZjList:function(){
    wx.switchTab({
      url: '/pages/expert/expert'
    })
  },

  zxCountUp:function(){
    var that=this;
    if (that.data.zxStartCount != that.data.zxCount){
      this.c = new countUp(that.data.zxStartCount, that.data.zxCount, 0, 2, {
        printValue(value) {
          this.setData({
            zxPrintCount: value,
            zxStartCount: that.data.zxCount
          })
        }
      })
      this.c.start()
    }
    
    
  }

})  
