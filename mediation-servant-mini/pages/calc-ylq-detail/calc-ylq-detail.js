// pages/calc-ylq-detail/calc-ylq-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resArr: [
      { name: '实际工作年限', number: 0, full: '' },
      { name: '本单位工作年限', number: 0, full: '' },
      { name: '准许医疗期为', number: 0, full: '' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  backOne () {
    let arr = wx.getStorageSync('key-ylq')
    arr.sj = 0;
    arr.bnw = 0;
    wx.setStorageSync('key-ylq', arr)
    wx.navigateBack()
  },
  backIndex() {
    let arr = wx.getStorageSync('key-ylq')
    arr.sj = 0;
    arr.bnw = 0;
    wx.setStorageSync('key-ylq', arr)
    wx.reLaunch({
      url: '../index/index',
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
    let arr = wx.getStorageSync('key-ylq');
    let _inputArr = this.data.resArr;
    let yiliaoqi = "三个月";
    let sjgznx, bdwgznx = 0;
    sjgznx = parseInt(arr.sj);
    bdwgznx = parseInt(arr.bnw);
    if (sjgznx < 10) {
      if (bdwgznx > 5)
        yiliaoqi = "六个月";
    }
    if (sjgznx >= 10) {
      if (bdwgznx < 5) {
        yiliaoqi = "六个月";
      } else if (bdwgznx < 10) {
        yiliaoqi = "九个月";
      } else if (bdwgznx < 15) {
        yiliaoqi = "十二个月";
      } else if (bdwgznx < 20) {
        yiliaoqi = "十八个月";
      } else if (bdwgznx >= 20) {
        yiliaoqi = "二十四个月";
      }
    }
    console.log(sjgznx)
    console.log(bdwgznx)
    console.log(yiliaoqi)
    _inputArr[0].number = sjgznx + '年'
    _inputArr[1].number = bdwgznx + '年'
    _inputArr[2].number = yiliaoqi
    console.log(_inputArr)
    this.setData({
      resArr: _inputArr
    })
    console.log(arr)
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