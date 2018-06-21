// pages/calc-gspc-list/calc-gspc-list.js
var database = require('../../utils/calc-gspc-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageN: ''
  },
  onchange (event) {
    let arr = this.data.list;
    console.log(arr[0].childs)
    let len = arr[0].childs.length
    let pindex = event.currentTarget.dataset.pindex;
    let cindex = event.currentTarget.dataset.index;
    console.log(arr);
    for ( let i = 0; i < len; i++) {
      arr[pindex].childs[i].active = false
    }
    arr[pindex].childs[cindex].active = true
    this.setData({
      list: arr
    })

    let arro = wx.getStorageSync('key-gsbx')
    if (this.data.pageN === 'hlbz') {
      arro.hl = arr[pindex].childs[cindex]
      console.log(arr[pindex].childs[cindex])
      wx.setStorageSync('key-gsbx', arro)
    } else {
      arro.sc = arr[pindex].childs[cindex]
      console.log(arr[pindex].childs[cindex])
      wx.setStorageSync('key-gsbx', arro)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let returnIndex = options.index;
    let type = options.type;
    this.setData({
      list: database[type],
      pageN: options.type
    })
  },
  next () {
    wx.navigateBack();
    // let arr = wx.getStorageSync('key-gsbx')
    // console.log(arr)
    // console.log(this.data.pageN)
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