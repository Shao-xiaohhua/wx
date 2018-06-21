// pages/user/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '',
    shadowSwite: false,
    hiddenLoading: true,
    idNumber: '',
    passWord: ''
  },
  clearWXswite() {
    wx.setStorageSync('isWXloginSwite', false);
  },
  getNum (e) {
    let cont = e.detail.value;
    console.log(cont);
    this.setData({
      idNumber: cont
    });
  },
  getPass (e) {
    let cont = e.detail.value;
    console.log(cont);
    this.setData({
      passWord: cont
    });
  },
  getNext () {
    wx.login({
      success: res => {
        let jsCode = '';
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        if (res.code && wx.getStorageSync('isWXloginSwite')) {
          //发起网络请求
          console.log('微信登录');
          jsCode = res.code;
        } else {
          jsCode = '';
          console.log('登录失败！' + res.errMsg)
        }
        this.setData({
          hiddenLoading: false
        });
        let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.login;
        console.log(url);
        let obj = {
          js_code: jsCode,
          account: this.data.idNumber,
          password: this.data.passWord
        };
        console.log(obj);
        wx.request({
          url: url,
          method: 'POST',
          data: obj,
          success: json => {
            wx.setStorageSync('js_code', '');
            console.log(json);
            if (json.data.userId) {
              wx.setStorageSync('userId', json.data.userId);
            }
            if (wx.getStorageSync('setp-to-register')) {
              wx.setStorageSync('setp-to-register', false);
              wx.setStorageSync('wxLoginSwite', true);
              wx.redirectTo({
                url: '../apply/setp-four'
              });
            } else {
              if (json.data.status) {
                wx.setStorageSync('wxLoginSwite', true);
                wx.reLaunch({
                  url: 'my'
                });
              } else {
                wx.setStorageSync('wxLoginSwite', false);
                this.setData({
                  msg: '账号密码错误！',
                  shadowSwite: true
                });
              }
            }
            this.setData({
              hiddenLoading: true
            });
          }
        });
      }
    });
  },
  clearShadow () {
    this.setData({
      shadowSwite: false
    });
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