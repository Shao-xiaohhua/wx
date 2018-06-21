// pages/my-query/my-query.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: { // 基本信息
      baseFields: [
        { displayName: '统一审批编码', name: '', type: 'number', val: '' },
        { displayName: '申请对象', name: '', type: 'text', val: '' },
        { displayName: '验证码', name: '', type: 'code', val: '', imgUrl: '' }
      ]
    },
    hiddenLoading: true,
    tokenId: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  inputVal (e) {
    let index = e.currentTarget.dataset.index;
    let val = e.detail.value;
    let arr = this.data.listArr;
    arr.baseFields[index].val = val;
    this.setData({
      listArr: arr
    });
  },
  clearInput (e) {
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    arr.baseFields[index].val = '';
    arr.baseFields[index].error = false;
    this.setData({
      listArr: arr
    });
  },
  getNext () {
    this.setData({
      hiddenLoading: false
    });
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.Search;
    let number = this.data.listArr.baseFields[0].val;
    let name = this.data.listArr.baseFields[1].val;
    let code = this.data.listArr.baseFields[2].val;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        unicode: number,
        applicationName: name,
        verifyCode: code,
        tokenId: this.data.tokenId
      },
      success: json => {
        this.setData({
          hiddenLoading: true
        });
        if (json.data.code === 0) {
          console.log('success');
          wx.setStorageSync('myQueryListArr', json.data);
          wx.setStorageSync('myQueryWebview', json.data.htmlDocid);
          wx.navigateTo({
            url: 'query-state',
          });
        } else {
          let arr = this.data.listArr;
          if (json.data.message === '验证码错误!') {
            arr.baseFields[2].val = json.data.message;
            arr.baseFields[2].error = true;
            this.getImageCode();
          } else {
            arr.baseFields[0].error = true;
            arr.baseFields[0].val = json.data.message;
          }
          this.setData({
            listArr: arr
          });
        }
        console.log(json)
      }
    });
  },
  getImageCode () {
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.getCodeImage;
    wx.request({
      url: url,
      method: 'POST',
      success: json => {
        console.log(json);
        let arr = this.data.listArr;
        arr.baseFields[2].imgUrl = json.data.base64;
        this.setData({
          listArr: arr,
          tokenId: json.data.tokenId
        });
        console.log(this.data.tokenId);
      }
    });
    console.log(url);
  },
  onLoad: function (options) {
  
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    wx.setStorageSync('myQueryListArr', {});
    this.getImageCode();
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})