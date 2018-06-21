//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    roomid:'',
    evaluateItems: [
      { name: '非常满意', value: 'MostSatisfied', icon: 'icon-good'},
      { name: '满意', value: 'Satisfied', icon: 'icon-normal' },
      { name: '不满意', value: 'NotSatisfied', icon:'icon-bad'}
    ],
    evaluate: 'MostSatisfied',
    fieldItems: [
      {name:'专业水平高',check:false},
      {name:'服务态度好',check:false},
      {name:'响应速度快',check:false},
      {name:'感谢您的帮助',check:false},
      {name:'非常专业',check:false}
    ],
    fieldValue:'',
    servant:null
  },
  //事件处理函数
  selectVlaue: function (e) {
    var that=this;
    var value=e.currentTarget.dataset['value'];
    if(value){
      this.setData({
        evaluate:value
      })
    }
  },
  selectFieldValue:function(e){
    var that = this;
    var value = e.currentTarget.dataset['value'];
    if (value) {
      var ss = that.data.fieldValue;
      var items = that.data.fieldItems;
      if (ss.indexOf(value) > -1){
        ss = ss.startsWith(value) ? ss.replace(value, ""):ss.replace(";"+value,"");
        for (var i in items){
          if(items[i].name==value){
            items[i].check=false;
          }
        }
      }else{
        ss += (ss?";":"") + value;
        for (var i in items) {
          if (items[i].name == value) {
            items[i].check = true;
          }
        }
      }
      
      that.setData({
        fieldValue: ss,
        fieldItems:items
      })
    }
  },
  onLoad: function (options) {
    var roomid = options.chatroom
    this.setData({
      roomid: roomid
    })
    this.getServant();
  },
  getServant: function () {
    var that = this;
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/servant',
      method: 'POST',
      data: JSON.stringify({
        chatroom: that.data.roomid
      }),
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            servant: res.data.result
          })
        }
      }
    })
  },
  submitEvaluate: function () {
    let that = this;
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/evaluate',
      method: 'POST',
      data: JSON.stringify({
        chatroom: that.data.roomid,
        evaluate: that.data.evaluate,
        content:that.data.fieldValue
      }),
      success: function (res) {
        if (res.data.code == 1) {
          wx.reLaunch({
            url: '../my/my'
          })
          
        }
      },
      complete: function (res) {
        if (res.statusCode != 200) {
          wx.showToast({
            title: '评价失败，请重试！'
          })

        }
      }
    })
  },

})
