// pages/calc-result/calc-result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resArr: [
      {name: '案件类型', number: 1000, full: ''},
      { name: '法院地区', number: 200, full: '' },
      { name: '案件标价', number: 500, full: '' },
      { name: '案件受理费计', number: 1700, full: 'full' }
    ]
  },
  // 自定义方法
  backOne: function () {
    let arr = wx.getStorageSync('calc-result')
    let newArr = arr
    newArr.y = ''
    newArr.tp = ''
    newArr.dq = ''
    newArr.zy = ''
    wx.setStorageSync('calc-result', newArr)
    wx.setStorageSync('calc-choiceData', {
      pindex: 0,
      cindex: 0,
      title: "",
      value: 1,
      returnIndex: null,
      pageN: ''
    })
    wx.navigateBack()
  },
  backIndex: function () {
    let arr = wx.getStorageSync('calc-result')
    let newArr = arr
    newArr.y = ''
    newArr.tp = ''
    newArr.dq = ''
    newArr.zy = ''
    wx.setStorageSync('calc-result', newArr)
    wx.setStorageSync('calc-choiceData', {
      pindex: 0,
      cindex: 0,
      title: "",
      value: 1,
      returnIndex: null,
      pageN: ''
    })
    wx.reLaunch({
      url: '../index/index'
    })
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
    let arr = wx.getStorageSync('calc-result')
    console.log(arr)
    let dq = arr.dq
    let y = arr.y
    let tp = arr.tp
    let zy = arr.zy
    console.log(tp)
    let arrL = [
      { name: '案件类型', number: tp, full: '' },
      { name: '法院地区', number: dq, full: '' },
      { name: '案件标价', number: zy, full: '' },
      { name: '案件受理费计', number: y, full: 'full' }
    ]
    console.log(arrL)
    this.setData({
      resArr: arrL
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