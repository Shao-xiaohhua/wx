// pages/appointment/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [
      { name: '浦东司法局', typeId: '', number: '021-6565656', address: '南丹东路', img: '../../images/list.jpg' },
      { name: '徐汇司法局', typeId: '', number: '021-6565656', address: '南丹东路', img: '../../images/list.jpg' },
      { name: '普陀司法局', typeId: '', number: '021-6565656', address: '南丹东路', img: '../../images/list.jpg' },
      { name: '杨浦司法局', typeId: '', number: '021-6565656', address: '南丹东路', img: '../../images/list.jpg' },
      { name: '嘉定司法局', typeId: '', number: '021-6565656', address: '南丹东路', img: '../../images/list.jpg' }
    ]
  },
  getNext (e) {
    let id = e.currentTarget.dataset.id;
    wx.setStorageSync('justiceBureau', id);
    console.log(id)
    wx.navigateTo({
      url: 'appointment',
    });
  },
  getList () {
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.appointment;
    let arr = this.data.listArr;
    wx.request({
      url: url,
      method: 'POST',
      success: json => {
        console.log(json)
        arr = json.data;
        this.setData({
          listArr: arr
        })
      }
    })
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
    wx.setStorageSync('justiceBureau', '');
    wx.setStorageSync('appoinSuccess', {});
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