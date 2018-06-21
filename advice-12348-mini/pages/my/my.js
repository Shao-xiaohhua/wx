var util = require('../../utils/util.js')
var app = getApp()
// my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    phoneNum: '暂未验证手机号',
    zixunlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },
  onShow:function(){
    this.mylistdata();
    if (!this.data.phoneNum){
      this.loadData();
    };
  },
  zixunBtn:function(){
    wx.reLaunch({
      url: '../index/index'
    });
  },
  loadData(){
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      var mobile = (app.globalData.mobile?util.formatMobile(app.globalData.mobile):"");
      that.setData({
        userInfo: userInfo,
        phoneNum: mobile
      });
    });
    
  },
  mylistdata:function(){
    var that = this;
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/mylist',
      method: 'POST',
      data: JSON.stringify({ userId: app.globalData.userId, sn: app.globalData.sn}),
      success: function (res) {
        console.log('mylist:',res);
        if (res.data.code == 1) {
          that.setData({
            zixunlist: res.data.result
          });
        };
      }
    });
  }
  
})
