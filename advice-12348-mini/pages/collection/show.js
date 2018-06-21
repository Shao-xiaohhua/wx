// pages/collection/show.js
var app = getApp()
var moment = require('../../lib/moment/we-moment');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    proposeUsername: "",
    type: "",
    title: "",
    desc: "",
    proposeTime: "",
    answerer: "",
    answer: "",
    answerTime: "",
    status:'',
    statusName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/' + options.id + '/zxdetail',
      method: 'GET',
      success: function (res) {
        
        that.setData({
          id: res.data.result.id,
          typeId: res.data.result.typeId,
          type: options.type,
          title: options.title,
          proposeUsername: res.data.result.name,
          desc: res.data.result.title,
          proposeTime: moment(res.data.result.time).locale('zh-cn').fromNow(),
          answerer: res.data.result.answerer,
          answer: res.data.result.answer,
          answerTime: moment(res.data.result.answerTime).locale('zh-cn').fromNow(),
          status: res.data.result.status,
          statusName: res.data.result.statusName
        })
      }
    })
  },

  recordTap:function(){
    wx.navigateTo({
      url: '../record/record?id='+this.data.id
    })
  }

})