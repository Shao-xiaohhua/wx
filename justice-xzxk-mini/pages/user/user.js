// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData: {
      userInfo: null
    },
    shadowSwite: false,
    hiddenLoading: true
  },
  gotoReg () { // 去注册
    wx.navigateTo({
      url: 'register',
    });
    this.setData({
      shadowSwite: false
    });
  },
  gotoLonin () { // 去登录
    wx.navigateTo({
      url: 'login',
    });
    this.setData({
      shadowSwite: false
    });
  },
  cloesJGswite () { // 关闭提示信息
    this.setData({
      shadowSwite: false
    });
  },
  getWXlogin (code) {
    console.log(code);
    this.setData({
      hiddenLoading: false
    });
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.login;
    console.log(url);
    let obj = {
      js_code: code,
      account: '',
      password: ''
    };
    console.log(obj);
    wx.request({
      url: url,
      method: 'POST',
      data: obj,
      success: json => {
        this.setData({
          hiddenLoading: true
        });
        console.log(json);
        if (json.data.userId) {
          wx.setStorageSync('userId', json.data.userId);
        }
        if (!json.data.status) {
          this.setData({
            shadowSwite: true
          });
          wx.setStorageSync('js_code', code);
          console.log('登录失败');
        } else {
          wx.setStorageSync('wxLoginSwite', true);
          wx.switchTab({
            url: 'my'
          });
        }
      }
    });
  },
  clearWXswite () {
    wx.setStorageSync('isWXloginSwite', false);
  },
  login () {
    console.log('调用登录');
    wx.setStorageSync('isWXloginSwite', true);
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        if (res.code) {
          //发起网络请求
          console.log('微信登录');
          this.getWXlogin(res.code);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.data.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success: json => {
              console.log(json)
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
            }
          });
        }
      }
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
    wx.setStorageSync('js_code', '');
    wx.setStorageSync('isWXloginSwite', false);
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