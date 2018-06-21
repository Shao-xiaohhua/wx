// message.js
var moment = require('../../lib/moment/we-moment');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    connectWS:false,
    userInfo:null,
    sessionId:'',
    scrollTop: 0,
    toView:'',
    msgCount:0,
    chatRoomId: null,
    chatRoomName: null,
    chatSessionId: null,
    connected: false,
    msgSyncing : false,
    servantIn: false,
    syncCursor: 0,
    content: '',
    servant: null,
    entryTime: 0,
    waiTime: '00:00',
    waitTimer:null,
    msgState: 'live',
    nameObj: 'success',
    evaluateItems: [
      { name: '不满意', value: 'NotSatisfied' },
      { name: '满意', value: 'Satisfied' },
      { name: '非常满意', value: 'MostSatisfied', checked: 'true' }
    ],
    evaluate: 'MostSatisfied',
    messages: [],
    inputFocus:false,
    images:[],
    sendImagePaths:[],
    lastMsgTime:0
  },

  sendMessage: function (e) {
    var that = this;
    var value = e.detail.value
    if (!value) {
      value = this.data.content
    }
    if (!value) { return; }
    this.sendText(value);
  },

  sendText: function (text) {
    var that = this;
    wx.request({
      url: app.globalData.apiPath + '/api/chatroom/sendMsg',
      method: 'POST',
      data: JSON.stringify({
        sessionId: that.data.chatSessionId,
        message: text
      }),
      complete: function () {},
      fail:function () {
        wx.showToast({
          title: '检查网络连接'
        })
      },
      success: function (res) {
        that.setData({
          content: ''
        });
      }
    });
    
  },

  sendMedia: function (type, data) {
    var that = this;
    wx.request({
      url: app.globalData.apiPath + '/api/chatroom/sendMsg',
      method: 'POST',
      data: JSON.stringify({
        sessionId: that.data.chatSessionId,
        message: JSON.stringify({ type: type, data: data})
      }),
      complete: function () {},
      success: function (res) {
        console.log('sendMedia callback', res);
      }
    });
  },

  bindKeyInput: function (e) {
    this.setData({
      content: e.detail.value
    });
  },

  sendImageMessage:function(){
    var that=this
    wx.showLoading({
      title: ' 发送中...',
      mask:true
    })
    var fileURls = [];
    var count = that.data.sendImagePaths.length;
    for (var i in that.data.sendImagePaths) {
      var filePath = that.data.sendImagePaths[i];
      wx.uploadFile({
        url: app.globalData.apiPath + '/service/rest/tk.File/collection/upload',
        filePath: filePath,
        name: 'file',
        success: function (res) {
          if (res.statusCode == 200) {
            var data = JSON.parse(res.data)
            var url = app.globalData.apiPath + '/service/rest/tk.File/' + data.fileId + '/view';
            fileURls.push(url);
            if (fileURls.length == count) {
              wx.hideLoading();
            };
            that.sendMedia('image', url);
          };
        }
      });
    };
    setTimeout(function () {
      wx.hideLoading();
    }.bind(this), 20000)
  },

  forwardTap: function () {
    var that=this;
    this.closeSyncThread();
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/transfrom',
      method: 'POST',
      data: JSON.stringify({
        chatroom: that.data.chatRoomId
      }),
      success: function (res) {
        if (res.data.code == 1) {
          var result = res.data.result;
          wx.reLaunch({
            url: '/pages/message/message?windowId=' + result.id + '&windowName=' + result.name + 
            '&chatroom=' + result.chatroom
          })
        }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var chatRoomId = options.chatRoomId;
    var chatSessionId = options.chatSessionId;
    var chatRoomName = options.chatRoomName;
    var talkerId = options.talkerId;
    var talkerName = options.talkerName;
    if (!chatRoomId) {
      wx.showModal({
        title: '异常提示',
        content: "缺少参数 chatRoomId",
        showCancel: false,
        success : function (res) {
          if (res.confirm) {
            wx.reLaunch({
              url: 'index'
            });
          };
        }
      });
      return;
    };
    // 设置变量
    this.setData({
      chatRoomId: chatRoomId,
      chatRoomName: chatRoomName,
      talkerId: talkerId,
      talkerName: talkerName,
      chatSessionId: chatSessionId
    });

    if (chatRoomName) {
      this.setData({
        servant: { 'company': chatRoomName}
      });
    }

    //this.enterChatroom();
    this.openSyncThread();

    //网络改变
    /**wx.onNetworkStatusChange(function (res) {
      if (res.isConnected && !that.data.connectWS){
        if(that.data.sessionId){
          console.log("connectsocket..");
          that.connectSocket();
        }else{
          that.connectChatRoom();
        }
        
      }
    })**/
  },

  onUnload: function () {
    //this.quitChatroom();
    this.closeSyncThread();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  onShow:function(){
  },

  onReachBottom:function(){
  },
  
  overZixun: function () {
    var that=this;
    wx.showModal({
      title: '提示',
      content: '您确定要结束此次咨询?',
      success: function (res) {
        if (res.confirm) {
          
          //还没有服务者时直接退出，否则需要评价
          wx.request({
            url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/checkEvaluate',
            method: 'POST',
            data: JSON.stringify({
              chatroom: that.data.chatRoomId
            }),
            success: function (res) {
              if (res.data.code == 1) {
                  that.closeSyncThread();
                  if(res.data.result){
                    that.sendMedia('evaluate');
                    wx.redirectTo({
                      url: '/pages/index/rating?chatroom=' + that.data.chatRoomId
                    })
                  }else{
                    wx.reLaunch({
                      url: '/pages/my/my'
                    })
                  }
              }else {
                wx.showToast({
                  title: res.data.description
                });
              }
            },
            complete: function (res) {
              if (res.statusCode != 200) {
                wx.showToast({
                  title: '结束咨询失败，请重试！',
                  mask: true
                });
              }
            }
          });
        } else if (res.cancel) {

        }
      }
    });
  },

  quitAndGoHome:function(){
    var that = this;
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/quit',
      method: 'POST',
      data: JSON.stringify({
        chatroom: that.data.chatRoomId
      }),
      success: function (res) {
        if (res.data.code != 1) {
          wx.showModal({
            title: '提示',
            content: "关闭咨询失败：" + res.data.description,
            showCancel: false,
            success: function (res) {
              wx.reLaunch({
                url: 'index'
              });
            }
          });
        } else {
          wx.reLaunch({
            url: 'index'
          });
        }
      },
      fail: function(res) {
        wx.showModal({
          title: '提示',
          content: "关闭咨询异常：" + res.statusCode,
          showCancel: false,
          success: function (res) {
            wx.reLaunch({
              url: 'index'
            });
          }
        });
      }
    });
  },

  onSyncMessage: function (items) {
    let that = this;
    let messages = that.data.messages;
    for (let i in items) {
      let data = items[i];
      if (data.talker.id === app.globalData.userId) {
        data.role = 'send';
        data.talker.avatarUrl = app.globalData.userInfo.avatarUrl;
      } else if (data.talker.id === 'robot') {
        data.role = 'reply';
        data.talker.avatarUrl = '../../images/roba.png';
      } else {
        data.role = 'reply';
        if (that.data.servant && that.data.servant.avatar) {
          data.talker.avatarUrl = that.data.servant.avatar;
        } else {
          data.talker.avatarUrl = '../../images/s.png';
        };
      };
      if (data.type == 'TEXT') {
        //大于2分钟显示时间
        if ((new Date(data.date).getTime() - that.data.lastMsgTime) > 1 * 60 * 1000) {
          var d = {}; d.type = 'TIME'; d.data = {};
          d.data.content = data.date.split(' ').length > 0 ? data.date.split(' ')[1] : '';
          messages.push(d);
        };
        that.setData({
          lastMsgTime: new Date(data.date).getTime()
        });
      };
      if (that.data.servant && !that.data.servant.name && data.talker.id != app.globalData.userId) {
        that.getServant();
      }
      if (data.type === 'MEDIA') {
        if (data.data.type === 'evaluate') {
          that.sendRating();
          continue;
        } else if (data.data.type === 'transform') {
          that.setData({
            msgState: 'forward'
          });
          continue;
        } else if (data.data.type === 'image') {
          //大于2分钟显示时间
          if ((new Date(data.date).getTime() - that.data.lastMsgTime) > 2 * 60 * 1000) {
            var d = {}; d.type = 'TIME'; d.data = {};
            d.data.content = data.date.split(' ').length > 0 ? data.date.split(' ')[1] : '';
            messages.push(d);
          };
          data.type = 'IMAGE';
          var s = data.data.data;
          data.data = s;
          var urls = that.data.images;
          urls.push(s);
          that.setData({
            images: urls,
            lastMsgTime: new Date(data.date).getTime()
          });
        };
      };
      //if(data)
      var msgCount = that.data.msgCount + 1;
      data['msgId'] = msgCount;
      messages.push(data);
      that.setData({
        msgCount: msgCount,
        toView: 'msg-' + data.msgId,
        messages: messages
      });
    };
  },

  openSyncThread: function () {
    this.setData({
      msgSyncing: true
    });
    this.syncMessages();
  },

  closeSyncThread: function () {
    console.log("Close SyncThread...");
    this.setData({
      msgSyncing: false
    });
  },

  enterChatroom : function () {
      var that = this;
      wx.request({
        url: app.globalData.apiPath + '/api/chatroom/enter',
        method: 'POST',
        data: JSON.stringify({
          roomId: this.data.chatRoomId,
          talkerId: this.data.talkerId,
          talkerName: this.data.talkerName
        }),
        success: function (res) {
          try {
            console.log('enter chatroom.', res);
            var data = res.data;
            if (!data || data.code != 1) {
              console.log("进入聊天室失败", data);
              return;
            }
            that.setData({ chatSessionId: data.result });
            that.openSyncThread();
          } catch (e) {
            console.log(e);
          }
        }
      });
  },

  quitChatroom: function () {
    var that = this;
    wx.request({
      url: app.globalData.apiPath + '/api/chatroom/quit',
      method: 'POST',
      data: JSON.stringify({
        sessionId: this.data.chatSessionId
      }),
      complete : function () {
        that.closeSyncThread();
      },
      success: function (res) {
        try {
        } catch (e) {
          console.log(e);
        }
      }
    });
  },

  syncMessages: function () {
    var that = this;
    if (!that.data.msgSyncing) {
      return;
    }
    wx.request({
      url: app.globalData.apiPath + '/api/chatroom/syncMsg',
      method : 'POST',
      data: JSON.stringify({
        sessionId: this.data.chatSessionId,
        first: !that.data.connected,
        cursor: that.data.syncCursor
      }),
      complete : function () {
        /*
        if (that.data.msgSyncing) {
          setTimeout(function () {
            that.syncMessages();
          }, 1);
        }*/
      },
      fail : function () {
        if (that.data.msgSyncing) {
          setTimeout(function () {
            that.syncMessages();
          }, 3000);
        }
        if (that.data.connected) {
          that.setData({
            connected: false
          });
          that.onDisconnect();
        }
      },
      success : function (res) {
        if (!that.data.connected) {
          that.setData({
            connected: true
          });
          that.onConnect();
        }
        if (!that.data.msgSyncing) {
          return;
        }
        console.log('syncMsg res', res);
        try {
          var data = res.data;
          if (!data) {
            console.log('syncMsg data is null', data);
            return;
          }
          if (data.code != 1) {
            console.log('syncMsg error', data.code, data.description);
            return;
          }
          var size = data.messages.length;
          that.setData({ syncCursor: that.data.syncCursor + size});
          console.log("retrieved messages", data.messages);
          that.onSyncMessage(data.messages);
        } catch (e) {
          console.log(e);
        } finally {
          if (that.data.msgSyncing) {
            setTimeout(function () {
              that.syncMessages();
            }, 1);
          }
        }
      }
    });
  },

  onConnect: function() {
    console.log("onConnect");
  },

  onDisconnect: function () {
    console.log("onDisconnect");
  },


  sendRating:function(){
    var that=this;
    this.closeSyncThread();
    wx.showModal({
      title: '咨询结束',
      content: '对方已经结束本次咨询！',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/index/rating?chatroom=' + that.data.chatRoomId
          });
        };
      }
    })
    
  },

  getServant: function () {
    var that = this;
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/servant',
      method: 'POST',
      data: JSON.stringify({
        chatroom: that.data.chatRoomId
      }),
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            servantIn: true,
            servant: res.data.result
          });
        };
      }
    })
  },
  showImage:function(e){
    var that=this
    wx.previewImage({
      current:e.target.dataset.src,
      urls: that.data.images
    });
  },
  getImage: function () {
    var that=this;
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        that.setData({
          sendImagePaths: tempFilePaths
        });
        that.sendImageMessage();
      },
      fail: function(res) {},
      complete: function(res) {},
    });
  }
})
