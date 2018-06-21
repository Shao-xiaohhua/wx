// pages/calc-bjgz-detail/calc-bjgz-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resArr: [
      { name: '本人工资的', number: 0, full: '' }
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
    let arr = wx.getStorageSync('key-bjgz');
    let _inputArr = this.data.resArr
    let bdwlxgl = parseInt(arr.bjgz);
    let num = 0;
    if (bdwlxgl < 2) {
      num = 60
    } else if (bdwlxgl < 4) {
      num = 70
    } else if (bdwlxgl < 6) {
      num = 80
    } else if (bdwlxgl < 8) {
      num = 90
    } else if (bdwlxgl >= 8) {
      num = 100
    }
    _inputArr[0].number = num + '%'
    this.setData({
      resArr: _inputArr
    })
  },
  backOne () {
    let arr = wx.getStorageSync('key-bjgz');
    arr.bjgz = 0;
    wx.setStorageSync('key-bjgz', arr);
    wx.navigateBack();
  },
  backIndex() {
    let arr = wx.getStorageSync('key-bjgz');
    arr.bjgz = 0;
    wx.setStorageSync('key-bjgz', arr);
    wx.reLaunch({
      url: '../index/index',
    })
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