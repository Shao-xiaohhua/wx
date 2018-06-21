// pages/answer/answer.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ajaxSwite: true,
    listArr: [
      { w: '律师转所是向上海哪个区县司法局提出，是原律师事务所所在地，还是拟执业律师事务所所在地？', d: '律师转所是向上海哪个区县司法局提出，是原律师事务所所在地，还是拟执业律师事务所所在地？'},
      { w: '律师转所是向上海哪个区县司法局提出，是原律师事务所所在地，还是拟执业律师事务所所在地？', d: '律师转所是向上海哪个区县司法局提出，是原律师事务所所在地，还是拟执业律师事务所所在地？' },
      { w: '律师转所是向上海哪个区县司法局提出，是原律师事务所所在地，还是拟执业律师事务所所在地？', d: '律师转所是向上海哪个区县司法局提出，是原律师事务所所在地，还是拟执业律师事务所所在地？' },
      { w: '律师转所是向上海哪个区县司法局提出，是原律师事务所所在地，还是拟执业律师事务所所在地？', d: '律师转所是向上海哪个区县司法局提出，是原律师事务所所在地，还是拟执业律师事务所所在地？' },
      { w: '律师转所是向上海哪个区县司法局提出，是原律师事务所所在地，还是拟执业律师事务所所在地？', d: '律师转所是向上海哪个区县司法局提出，是原律师事务所所在地，还是拟执业律师事务所所在地？' }
    ]
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
  getList () {
    let url = app.appUrl.urlHead + '/' + app.xzUrl.urlBody + '' + app.xzUrl.getQuestionAndAnswerList;
    console.log(url);
    wx.request({
      url: url,
      method: 'POST',
      success: json => {
        console.log(json);
        this.setData({
          listArr: json.data,
          ajaxSwite: false
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
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