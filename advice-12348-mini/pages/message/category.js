// category.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  categoryToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].sn == id) {
        list[i].opeen = !list[i].opeen
      } else {
        list[i].opeen = false
      }
    }
    this.setData({
      list: list
    });
  },
  categoryTap: function (e) {
    var id = e.currentTarget.id,
     win = e.currentTarget.dataset.typewin, 
     tname = e.currentTarget.dataset.typename, 
     tcode = e.currentTarget.dataset.typecode, 
     list = this.data.list;
    
    for (var i = 0, len = list.length; i < len; ++i) {
      for (var k in list[i].types){
        
        if (list[i].types[k].sn==id){
            list[i].types[k].checked=true;
          }else{
            list[i].types[k].checked = false;
          }
      }
    }
    this.setData({
      list: list
    });

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      tName: tname,
      tCode:tcode,
      tWin:win
    })

    wx.navigateBack();

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var w = options.winCode
    var t=options.typeCode
    console.log(options)
    var that=this;
    wx.request({
      url: app.globalData.apiPath +'/service/rest/12348.WeChat/collection/category', 
      data: { typeId:'6727091cc2644845b06513a2d2fef773'},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.result)
        var data = res.data.result
        for (var i in data){
          if(data[i].sn==w){
            data[i]['opeen'] = true;
          }else{
            data[i]['opeen'] = false;
          }
          
          for (var k in data[i].types){
            if (t && data[i].types[k].code==t){
              data[i].types[k]['checked'] = true;
            }else{
              data[i].types[k]['checked'] = false;
            }
          }
        }
        that.setData({
          list: data
        });
      }
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