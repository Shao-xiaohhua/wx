// pages/hot-tel/hot-tel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '12348',
    listArr: [
      {
        number: 1,
        fw1: '汉语服务请按1',
        fw2: '维语服务请按2',
        color: 'green'
      },
      {
        number: 2,
        fw1: '法律援助咨询请按1',
        fw2: '其他法律咨询请按2',
        color: 'blue'
      },
      {
        number: 3,
        fw1: '自治区法律援助咨询请按1',
        fw2: '兵团法律援助咨询请按2',
        color: 'oragin'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  call () {
    wx.makePhoneCall({
      phoneNumber: this.data.mobile
    })
  }
})