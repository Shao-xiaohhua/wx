// pages/calc-ylq/calc-ylq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputArr: [
      { title: '实际工作年限', ip: '填写数字', data: '', value: '', arrow: false, link: false, linkUrl: '../calc-choice/calc-choice?type=court&index=', error: false, y: '年' },
      { title: '本单位工作年限', ip: '填写数字', data: '', value: '', arrow: false, link: false, error: false, y: '年' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('key-ylq')) {
      let arr = {
        sj: 0,
        bnw: 0
      }
      wx.setStorageSync('key-ylq', arr)
    }
  },
  chInput (e) {
    let item = e
    let index = item.currentTarget.dataset.index
    let val = item.detail.value
    let arr = wx.getStorageSync('key-ylq')
    let _inputArr = this.data.inputArr
    if (isNaN(val)) {
      _inputArr[index].value = ''
      _inputArr[index].error = true
      if (index === 0) {
        arr.sj = 0
      } else {
        arr.bnw = 0
      }
      wx.setStorageSync('key-ylq', arr)
    } else {
      _inputArr[index].value = parseInt(val)
      _inputArr[index].error = false
    }
    this.setData({
      inputArr: _inputArr
    })
  },
  clInput (e) {
    let item = e
    let index = item.currentTarget.dataset.index
    let val = item.detail.value
    let arr = wx.getStorageSync('key-ylq')
    if (index === 0) {
      arr.sj = val
    } else {
      arr.bnw = val
    }
    wx.setStorageSync('key-ylq', arr)
  },
  cares () {
    let arr = wx.getStorageSync('key-ylq');
    if (arr.sj && arr.bnw) {
      wx.navigateTo({
        url: '../calc-ylq-detail/calc-ylq-detail',
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
    if (wx.getStorageSync('key-ylq')) {
      let arr = wx.getStorageSync('key-ylq');
      let _inputArr = this.data.inputArr
      if (arr.sj) {
        _inputArr[0].value = arr.sj
      } else {
        _inputArr[0].value = ''
      }
      if (arr.bnw) {
        _inputArr[1].value = arr.bnw
      } else {
        _inputArr[1].value = ''
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