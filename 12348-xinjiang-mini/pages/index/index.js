//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '../../images/banner1.png',
      '../../images/banner2.png'
    ],
    linkArr: [
      { name: '律师', icon: 'icon-user-lawyer', url: '../advice/advice'},
      { name: '公证', icon: 'icon-org-notary', url: '../advice-gz/advice-gz' },
      { name: '人民调解', icon: 'icon-type-contract', url: '../advice-rmtj/advice-rmtj' },
      { name: '司法鉴定', icon: 'icon-user-expertise', url: '../advice-sfjd/advice-sfjd' },
      { name: '法律援助', icon: 'icon-org-aid', url: '../advice-flyz/advice-flyz' }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
})
