// pages/notice-bulletin-detail/notice-bulletin-detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    time: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoticeDetail(options.id);
  },
  getNoticeDetail:function(id){
      const _this = this;
      let statusText = "";
      wx.request({
          url: app.globalData.$ctx + '/wechatMini/noticeDetail',
          data: {
              id:id
          },
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function (res) {
              console.log(res.data)
              let data = res.data;
              if(data && data.code==1){
                _this.setData({
                    title:data.title,
                    time:data.date,
                    content:data.content
                })
              }
          }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})