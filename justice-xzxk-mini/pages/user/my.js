// pages/user/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImg: '../../images/default_male.jpg',
    userName: '000',
    userPhone: '00000000001',
    loginSwite: true,
    messArr: [
      { num: 0, type: '未受理' },
      { num: 0, type: '审批中' },
      { num: 0, type: '已审批' }
    ],
    getMechanism: [
      { num: 1, type: '个人信息', url: 'user-core' },
      { num: 88, type: '证照中心', url: 'fild-core' }
    ],
    listNot: [],
    listYes: [],
    listPass: []
  },
  getUsetId() {
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.getUserInfoByUserId;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userId')
      },
      success: json => {
        console.log(json);
        console.log('获取userid');
        if (json.data.mobile) {
          this.setData({
            userPhone: json.data.mobile
          });
        }
        if (json.data.idNumber) {
          this.getpersonSearchNEU(json.data.idNumber);
        }
      }
    })
  },
  getpersonSearchNEU(value) { // 获取人员信息自动
    this.setData({
      hiddenLoading: false
    });
    let val = value;
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.personSearch;
    console.log(url);
    console.log(val);
    wx.request({
      url: url,
      method: 'POST',
      data: {
        page: 1,
        size: 20,
        value: val,
        // value: wx.getStorageSync('falseIDnumber'),
        itemCode: '0284-1'
      },
      success: json => {
        console.log(json)
        this.setData({
          hiddenLoading: true
        });
        if (json.data.description === '未查询到数据') {
          console.log('未查询到数据');
        } else {
          this.setData({
            userName: json.data[0].name
          });
        }
      }
    });
  },
  getMatterType (e) {
    let type = e.currentTarget.dataset.type;
    console.log(type + '传过来的值');
    wx.setStorageSync('matterType', type);
  },
  getlistNot() { // 获取未提交
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.matter;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        status: 'wtj',
        userid: wx.getStorageSync('userId')
      },
      success: json => {
        let len = json.data.length;
        let arr = this.data.messArr;
        arr[0].num = len;
        this.setData({
          listNot: json.data,
          messArr: arr
        })
        console.log('未提交');
        console.log(json);
      }
    });
  },
  getlistYes() { // 获取审批中
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.matter;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        status: 'spz',
        userid: wx.getStorageSync('userId')
      },
      success: json => {
        let len = json.data.length;
        let arr = this.data.messArr;
        arr[1].num = len;
        this.setData({
          listYes: json.data,
          messArr: arr
        })
        console.log('审批中');
        console.log(json);
      }
    });
  },
  getlistPass() { // 获取已审批
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.matter;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        status: 'ysp',
        userid: wx.getStorageSync('userId')
      },
      success: json => {
        let len = json.data.length;
        let arr = this.data.messArr;
        arr[2].num = len;
        this.setData({
          listPass: json.data,
          messArr: arr
        })
        console.log('已审批');
        console.log(json);
      }
    });
  },
  getNext (e) {
    let url = e.currentTarget.dataset.url;
    console.log(url)
    if (url) {
      wx.navigateTo({
        url: url
      })
    };
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
  getUserMess () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res);
              this.setData({
                userImg: res.userInfo.avatarUrl,
                userName: res.userInfo.nickName 
              });
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        } else {
          console.log('未授权');
          wx.authorize({
            scope: 'scope.userInfo',
            success: json => {
              console.log(json)
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  console.log(res);
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res);
                  }
                }
              });
            }
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserMess();
    if (!wx.getStorageSync('wxLoginSwite')) {
      wx.reLaunch({
        url: 'user',
      });
      this.setData({
        loginSwite: false
      });
    } else {
      this.getlistNot();
      this.getlistYes();
      this.getlistPass();
      this.getUsetId();
      this.setData({
        loginSwite: true
      });
    }
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