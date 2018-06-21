// pages/guide/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [
      { title: '律师管理', list: [
        { name: '台湾居民申请在大陆从事律师职业核准台湾居民申请在大陆从事律师职业核准台湾居民申请在大陆从事律师职业核准台湾居民申请在大陆从事律师职业核准', typeId: '' },
        { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
        { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
        { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
        { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
        { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' }
      ], swite: false },
      {
        title: '公证管理', list: [
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' }
        ], swite: false
      },
      {
        title: '司法鉴定', list: [
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' }
        ], swite: false
      },
      {
        title: '基层法律服务', list: [
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' },
          { name: '台湾居民申请在大陆从事律师职业核准', typeId: '' }
        ], swite: false
      }
    ]
  },
  getList () {
    let url = app.appUrl.urlHead + '/' + app.xzUrl.urlBody + '' + app.xzUrl.bszn;
    wx.request({
      url: url,
      method: 'POST',
      success: json => {
        console.log(json);
        this.setData({
          listArr: json.data
        });
      }
    })
  },
  listGet (e) {
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    if (arr[index].swite === true) {
      arr[index].swite = false;
    } else {
      for (let i = 0; i < arr.length; i++) {
        arr[i].swite = false;
      }
      arr[index].swite = true
    }
    console.log(arr)
    this.setData({
      listArr: arr
    })
    console.log(this.data.listArr)
  },
  getNext (e) {
    let id = e.currentTarget.dataset.id;
    wx.setStorageSync('guideUrl', id);
    wx.navigateTo({
      url: 'guide'
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