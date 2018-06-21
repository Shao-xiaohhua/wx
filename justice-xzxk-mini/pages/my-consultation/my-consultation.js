// pages/my-consultation/my-consultation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [
      { name: '法律咨询', type: '', active: false },
      { name: '律师管理', type: '', active: false },
      { name: '公正管理', type: '', active: false },
      { name: '司法鉴定管理', type: '', active: false },
      { name: '其他', type: '', active: false }
    ],
    textNum: 0
  },
  checkList (e) {
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    for (let i = 0; i < arr.length; i++) {
      arr[i].active = false;
    };
    arr[index].active = !arr[index].active;
    this.setData({
      listArr: arr
    });
    console.log(index)
  },
  getXj (e) {
    let type = e.currentTarget.dataset.type;
    let val = e.detail.value;
    if (type === 'input') {
      console.log(1)
    } else {
      let num = val.length;
      this.setData({
        textNum: num
      })
    }
  },
  getNext () {
    wx.reLaunch({
      url: '../index/index',
    });
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
  
  }
})