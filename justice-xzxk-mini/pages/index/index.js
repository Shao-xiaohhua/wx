//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    linkArr: [
      { name: '我要查询', url: '../my-query/my-query', icon: 'icon-advice', color: 'orang' },
      { name: '我要咨询', url: '../my-consultation/my-consultation', icon: 'icon-advice-one', color: 'grren' },
      { name: '我要投诉', url: '../my-complaint/my-complaint', icon: 'icon-email', color: 'blue' },
      { name: '结果反馈', url: '../result/result', icon: 'icon-icon-test', color: 'blue-l' },
      { name: '办事指南', url: '../guide/list', icon: 'icon-approval', color: 'blue-d' },
      { name: '常见问答', url: '../answer/answer', icon: 'icon-qa', color: 'red' }
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  toClear () {
    wx.setStorageSync('moreListArrTwo', {});
    wx.setStorageSync('moreListArrTwo', {});
    wx.setStorageSync('upFileObj', {});
    wx.setStorageSync('BusinessType', '');
    wx.setStorageSync('MajorCode', '');
    wx.setStorageSync('ItemCode', '');
    wx.setStorageSync('Apply', '');
    wx.setStorageSync('busStr', {});
    wx.setStorageSync('busArr', {});
    wx.setStorageSync('busFileArr', {});
    wx.setStorageSync('stuffs', {});
    wx.setStorageSync('saveListArrSeven', {});
    wx.setStorageSync('sevenSaveNavbar', {});
    wx.setStorageSync('moreListArrTwo', {});
    wx.setStorageSync('moreListArrThree', {});
    wx.setStorageSync('sxmc', '');
    wx.setStorageSync('setpArr', {});
    wx.setStorageSync('bz1', {});
    wx.setStorageSync('bz2', {});
    wx.setStorageSync('bz3', {});
    wx.setStorageSync('StorNav', false);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
