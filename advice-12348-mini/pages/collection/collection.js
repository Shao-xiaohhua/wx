var app = getApp()
var moment = require('../../lib/moment/we-moment');

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    loading: true,
    loadingMore: false,
    pageIndex: 1,
    caseList: [
      /*{
        id: 1,
        avatarUrl: 'http://static.homolo.net/prototype/12348/static/images/ex_pic14.jpg',
        name: '宋志强',
        staffType: 'e45642b767b847ac8d53fd758a79327c',
        local: '上海市徐汇区',
        rating: 'good',
        type: '遗嘱继承',
        desc: '李某（男）与赵某（女）与2003年2月开始恋爱，2003年年6月二人开始同居。同居期间，购买价值20万元的住房一套，现在因为一些...',
        updatetime: '刚刚'
      }*/
    ]
  },
  onLoad: function () {
    
  },
  onShow: function () {
    /**this.setData({
      caseList: [],
      loading: true,
      pageIndex:  1
    })
    requestData(this);**/
    requestData(this);


  },
  onReachBottom: function () {
    if (this.data.loadingMore)
      return;
    requestData(this);
  },
  onPullDownRefresh:function(){
    this.setData({
      caseList: [],
      pageIndex: 1
    })
    requestData(this);
  },
  detail: function (event) {
    let id = event.currentTarget.id;
    let title = event.currentTarget.dataset.title;
    let type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: 'show?id=' + id + '&title=' + title + '&type=' + type
    })
  }
});

function requestData(that) {
 
  var page = that.data.pageIndex;
  wx.request({
    url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/zxlist',
    method: 'GET',
    data: { page: page, pageSize: 10},
    success: function (res) {
      if(res.data){
        let caseList = that.data.caseList;
        let items = res.data.items;
        for (let i in items) {
          let avatar = 'http://static.homolo.net/prototype/12348/static/assets/images/default_male.jpg';
          if (items[i].portrait) {
            avatar = items[i].portrait
          }
          let ipName='';
          if (items[i].ipName){
            ipName = items[i].ipName;
          }
          let bizType = items[i].typeDisplay;
          if (items[i].$displays.bizType){
            bizType = items[i].$displays.bizType;
          }
          
          let data = {
            id: items[i].id, avatarUrl: avatar, name: items[i].$displays.answerer, staffType: items[i].staffType, local: ipName, type: bizType, rating: items[i].$displays.evaluateScore, desc: items[i].properties.title, updatetime: moment(items[i].$displays.askTime).locale('zh-cn').fromNow() };
          caseList.push(data)
        }
        that.setData({
          caseList: caseList,
          pageIndex: page + 1
        })
      }
    },
    complete: function () {
      setTimeout(function () {
        that.setData({
          loading: false
        })
      }.bind(this), 1500)
      wx.stopPullDownRefresh()
    }
  })
}