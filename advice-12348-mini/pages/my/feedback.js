// feedback.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    counter: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
  setCounter: function (e) {
    this.setData({ counter: e.detail.value });
  },
  send: function () {
    var that = this;
    if(!that.data.counter){return;}
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/feedback',
      method: 'POST',
      data: JSON.stringify({ userId: app.globalData.userId, t: that.data.counter }),
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({ counter: ''});
          wx.showToast({
            icon: "success",
            title: "提交成功",
            duration: 3000
          });
          setTimeout(function () {
            wx.hideLoading();
            wx.navigateBack();
          }, 3000);

        }
      }
    })
  }
})