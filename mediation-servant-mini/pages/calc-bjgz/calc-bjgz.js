// pages/calc-bjgz/calc-bjgz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputArr: [
      { title: '单位连续工龄', ip: '填写数字', data: '', value: '', arrow: false, link: false, linkUrl: '../calc-choice/calc-choice?type=court&index=', error: false, y: '年' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('key-bjgz')) {
      let arr = {
        bjgz: 0
      }
      wx.setStorageSync('key-bjgz', arr)
    }
  },
  chInput(e) {
    let item = e
    let index = item.currentTarget.dataset.index
    let val = item.detail.value
    let arr = wx.getStorageSync('key-bjgz')
    let _inputArr = this.data.inputArr
    if (isNaN(val)) {
      _inputArr[index].value = ''
      _inputArr[index].error = true
      arr.bjgz = 0
      wx.setStorageSync('key-bjgz', arr)
    } else {
      _inputArr[index].value = parseInt(val)
      _inputArr[index].error = false
    }
    this.setData({
      inputArr: _inputArr
    })
  },
  clInput(e) {
    let item = e
    let index = item.currentTarget.dataset.index
    let val = item.detail.value
    let arr = wx.getStorageSync('key-bjgz')
    arr.bjgz = val
    wx.setStorageSync('key-bjgz', arr)
  },
  cares() {
    let arr = wx.getStorageSync('key-bjgz');
    if (arr.bjgz) {
      wx.navigateTo({
        url: '../calc-bjgz-detail/calc-bjgz-detail',
      })
    } else {
      let _inputArr = this.data.inputArr
      let len = _inputArr.length
      for (let i = 0; i < len; i++) {
        if (!_inputArr[i].value) {
          _inputArr[i].error = true
        }
      }
      this.setData({
        inputArr: _inputArr
      })
    }
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
    if (wx.getStorageSync('key-bjgz')) {
      let arr = wx.getStorageSync('key-bjgz');
      let _inputArr = this.data.inputArr
      if (arr.bjgz) {
        _inputArr[0].value = arr.bjgz
      } else {
        _inputArr[0].value = ''
      }
      this.setData({
        inputArr: _inputArr
      })
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