// pages/advice-sfjd/sfjd-type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArr: [
      { type: '婚姻家庭', checked: false },
      { type: '合同纠纷', checked: false },
      { type: '房屋纠纷', checked: false },
      { type: '劳动纠纷', checked: false },
      { type: '侵权损害', checked: false },
      { type: '司法程序', checked: false },
      { type: '国家赔偿', checked: false },
      { type: '请求生活最低保障', checked: false },
      { type: '请求社会保险待遇', checked: false },
      { type: '其他', checked: false }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  typeBind(e) {
    let index = e.currentTarget.dataset.index;
    let arr = this.data.typeArr;
    for (let i = 0; i < arr.length; i++) {
      arr[i].checked = false;
    }
    arr[index].checked = true;
    this.setData({
      typeArr: arr
    });
    wx.setStorageSync('sfjdType', arr[index].type);
    wx.navigateBack({
      delta: 1
    });
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
    if (wx.getStorageSync('sfjdType')) {
      let val = wx.getStorageSync('sfjdType');
      let len = this.data.typeArr.length;
      let arr = this.data.typeArr;
      for (let i = 0; i < len; i++) {
        arr[i].checked = false;
        if (val === arr[i].type) {
          arr[i].checked = true;
        }
      }
      this.setData({
        typeArr: arr
      });
    }
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