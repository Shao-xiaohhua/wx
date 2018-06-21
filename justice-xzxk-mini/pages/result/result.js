// pages/result/result.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lsitArr: [
    ],
    searchSwite: true,
    pageNum: 1,
    textVal: '',
    hiddenLoading: false,
    pageSize: 20
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.getLise();
  },
  getNext(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.setStorageSync('queryDetail', id);
    wx.navigateTo({
      url: '../query-web-view/query-web-view',
    });
  },
  getLise() {
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.search;
    let num = this.data.pageNum;
    let val = this.data.textVal;
    let pageSize = this.data.pageSize;
    console.log(url);
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        page: num,
        size: pageSize,
        value: val
      },
      success: json => {
        if (json.data.length) {
          this.setData({
            lsitArr: json.data,
            searchSwite: true,
            hiddenLoading: true
          });
        } else {
          this.setData({
            searchSwite: true,
            hiddenLoading: true
          });
        }
        console.log(this.data.lsitArr)
      }
    });
  },
  getLisePuse() {
    let url = app.queryUrl.urlHead + '' + app.queryUrl.search;
    let num = this.data.pageNum;
    let val = this.data.textVal;
    let pageSize = this.data.pageSize;
    console.log(url);
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        page: num,
        size: pageSize,
        value: val
      },
      success: json => {
        let arr = this.data.lsitArr.concat(json.data);
        this.setData({
          lsitArr: arr,
          searchSwite: true,
          hiddenLoading: true
        });
        console.log(this.data.lsitArr)
      }
    });
  },
  getSearch(e) {
    let val = e.detail.value;
    console.log(e);
    if (this.data.searchSwite) {
      this.setData({
        textVal: val,
        pageNum: 1,
        lsitArr: []
      });
      console.log('没搜索');
      this.setData({
        searchSwite: false,
        hiddenLoading: false
      });
      this.getLise();
    }
  },
  getPush() {
    let num = this.data.pageNum;
    let conts = this.data.lsitArr[0].count;
    let len = this.data.lsitArr.length;
    let pSwite = true;
    if (len <= conts) {
      pSwite = true;
    } else {
      pSwite = false
    }
    if (this.data.searchSwite && pSwite) {
      num += 1;
      this.setData({
        pageNum: num,
        searchSwite: false,
        hiddenLoading: false
      });
      this.getLisePuse();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    console.log('触底');
    this.getPush();
    console.log('第' + this.data.pageNum + '页');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})