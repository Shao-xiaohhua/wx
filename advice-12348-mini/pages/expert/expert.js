// expert.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    loadingMore: false,
    pageIndex: 1,
    staff: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow:function(){
    /**this.setData({
      staff: [],
      pageIndex: 1,
      loading:true
    })
    requestData(this);**/
    requestData(this);
  },
  onReachBottom: function () {
    if (this.data.loadingMore)
      return;
    requestData(this);
  },
  onPullDownRefresh: function () {
    console.log(1111);
    this.setData({
      staff: [],
      pageIndex: 1
    })
    requestData(this);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});
function requestData(that) {
  var page = that.data.pageIndex;
  wx.request({
    url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/zjlist',
    method: 'GET',
    data: { page: page, pageSize: 10 },
    success: function (res) {
      if(res.data){
        let items = res.data.items;
        let staff = that.data.staff;
        for (let i in items) {
          if (items[i].properties.staffId){
            var staffId=items[i].properties.staffId
            var staffIds = wx.getStorageSync('staffIds') || []
            var existIds = staffIds.length>0?staffIds.join(','):'';
            if (existIds.indexOf(staffId) >= 0) {
              continue;
            }
            staffIds.unshift(staffId)
            wx.setStorageSync('staffIds', staffIds)
            
          }
          
          let avatar = 'http://static.homolo.net/prototype/12348/static/images/default_male.jpg';
          if (items[i].portrait){
            avatar = items[i].portrait
          }
          let data = { id: items[i].id, avatarUrl: avatar, name: items[i].properties.name, org: items[i].properties.company, staffType: items[i].staffType, tags: []        };
          staff.push(data)
        }
        setTimeout(function () {
          that.setData({
            staff: staff,
            pageIndex: page + 1
          })
        }.bind(this), 1500)
      
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
};
