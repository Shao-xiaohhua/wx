// pages/calc-gspc/calc-gspc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputArr: [
      { title: '护理标准', ip: '选择护理', data: '', value: '', arrow: true, link: true, linkUrl: '../calc-gspc-list/calc-gspc-list?type=hlbz&index=', error: false, y: '' },
      { title: '伤残等级', ip: '选择等级', data: '', value: '', arrow: true, link: true, linkUrl: '../calc-gspc-list/calc-gspc-list?type=scdj&index=', error: false, y: '' },
      { title: '员工工资', ip: '填写工资', data: '', value: '', arrow: false, link: false, error: false, y: '元' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('key-gsbx')) {
      wx.setStorageSync('key-gsbx', {
        hl: '',
        sc: '',
        num: 0
      })
    }
  },
  chInput (options) {
    let val = options.detail.value
    let arr = wx.getStorageSync('key-gsbx')
    let thisArr = this.data.inputArr
    if (val) {
      if (!isNaN(val)) {
        arr.num = val
        thisArr[2].error = false
        thisArr[2].ip = val
        thisArr[2].value = val
      } else {
        arr.num = 0
        thisArr[2].error = true
        thisArr[2].ip = '填写工资'
        thisArr[2].value = ''
      }
      this.setData({
        inputArr: thisArr
      })
      wx.setStorageSync('key-gsbx', arr)
    } else {
      thisArr[2].ip = '填写工资'
      thisArr[2].value = ''
      arr.num = 0
      wx.setStorageSync('key-gsbx', arr)
      this.setData({
        inputArr: thisArr
      })
    }
    console.log(arr)
  },
  gl(options) {
    let val = options.detail.value
    let arr = wx.getStorageSync('key-gsbx')
    let thisArr = this.data.inputArr
    if (val === '') {
      thisArr[2].ip = '填写工资'
      thisArr[2].value = ''
      arr.num = 0
      wx.setStorageSync('key-gsbx', arr)
      this.setData({
        inputArr: thisArr
      })
    }
  },
  cares () {
    let arr = wx.getStorageSync('key-gsbx')
    let thisArr = this.data.inputArr
    let len = thisArr.length
    console.log(arr)
    if (arr.hl && arr.sc && arr.num) {
      for (let i = 0; i < len; i++) {
        if (thisArr[i].data) {
          thisArr[i].error = false
        }
      }
      wx.navigateTo({
        url: '../calc-gspc-detail/calc-gspc-detail'
      })
    } else {
      for (let i = 0; i < len; i++) {
        if (!thisArr[i].data) {
          thisArr[i].error = true
        }
      }
    }
    this.setData({
      inputArr: thisArr
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
    let arr = wx.getStorageSync('key-gsbx')
    console.log(arr)
    let thisArr = this.data.inputArr
    if (arr.hl) {
      thisArr[0].ip = arr.hl.title
      thisArr[0].data = arr.hl
      thisArr[0].error = false
    } else {
      thisArr[0].ip = '选择护理'
      thisArr[0].data = ''
    }
    if (arr.sc) {
      thisArr[1].ip = arr.sc.title
      thisArr[1].data = arr.sc
      thisArr[1].error = false
    } else {
      thisArr[1].ip = '选择等级'
      thisArr[1].data = ''
    }
    if (arr.num) {
      thisArr[2].ip = arr.num
      thisArr[2].value = arr.num
      thisArr[2].data = arr.num
      thisArr[2].error = false
    } else {
      console.log(arr.num)
      thisArr[2].ip = '填写工资'
      thisArr[2].value = ''
      thisArr[2].data = ''
    }
    this.setData({
      inputArr: thisArr
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