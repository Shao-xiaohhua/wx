//index.js
import countUp from '../../utils/countup'
//获取应用实例
var app = getApp()
Page({
  data: {
    counterNum: 0,
    tName: '咨询类别',
    title:'',
    content:'',
    tCode: '',
    tWin: '',
    chatroom:'',
    errorinfo: ''
  },
  onLoad: function (options) {
    console.log(options);
    var windowId = options.windowId ||''
    if (windowId){
      this.setData({
        tWin: windowId
      });
    }
    var windowName = options.windowName ||''
    if (windowName) {
      this.setData({
        tName: windowName
      });
    }
    var chatroom = options.chatroom || ''
    if (chatroom) {
      this.setData({
        chatroom: chatroom
      });
    }
  },
  onShow: function () {
    var that=this;
    if (this.data.chatroom){
      wx.request({
        url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/getQuestion',
        method: 'POST',
        data: {
          chatroom: that.data.chatroom
        },
        success: function (res) {
          if (res.data.code == 1) {
            console.log(res.data);
            that.setData({
              title: res.data.result
            });
          }
        }
      })
    }
  },
  setCounter: function (e) {
    this.setData({
      counterNum: e.detail.value.length
    });
  },
  selectType: function (e) {
    var that = this
    wx.navigateTo({
      url: 'category?typeCode=' + that.data.tCode + "&winCode=" + that.data.tWin,
    })
  },
  cancleTap: function () {
    wx.reLaunch({
      url: '/pages/my/my'
    })
  },
  saveMessage: function(e){
    
    var that = this
    that.setData({
      errorinfo: ''
    });
    if (!that.data.tWin) {
      that.setData({
        errorinfo: '请选择咨询类别'
      });
      return
    }
    var f = e.detail.value
    if (!f.title) {
      that.setData({
        errorinfo: '请填写咨询问题'
      });
      return
    }
    wx.showLoading({
      title: '提交中...',
    })

    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/saveMsg',
      method: 'GET',
      data: { 
        userId: app.globalData.userId, 
        windowId:that.data.tWin,
        title: f.title,
        content: f.content,
        'type': that.data.tCode
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code == 1) {
          wx.showToast({
            icon: "success",
            title: "提交成功",
            duration: 2000
          });
          setTimeout(function () {
            wx.reLaunch({
              url: '../my/my'
            })
          }, 200)
        }
      }
    })
  }
})  
