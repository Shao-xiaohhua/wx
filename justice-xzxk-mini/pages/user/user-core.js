// pages/user/user-core.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerImg: '',
    hiddenLoading: true,
    getMechanism: [
      { name: '头像', cont: '', imgUrl: '../../images/default_male.jpg' },
      { name: '姓名', cont: '', imgUrl: ''},
      { name: '手机号', cont: '', imgUrl: ''},
      { name: '性别', cont: '', imgUrl: '' },
      { name: '身份证号', cont: '', imgUrl: '' },
      { name: '住址', cont: '', imgUrl: '' }
    ],
    getMessArr: {}
  },
  getUserMess() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res);
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res);
              let neagetMechanism = this.data.getMechanism;
              neagetMechanism[0].imgUrl = res.userInfo.avatarUrl;
              this.setData({
                headerImg: res.userInfo.avatarUrl,
                getMechanism: neagetMechanism
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
  getUsetId () {
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.getUserInfoByUserId;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userId')
      },
      success: json => {
        console.log(json);
        let id = json.data.idNumber;
        if (id) {
          this.getpersonSearchNEU(id, this.data.getMechanism);
        }
      }
    })
  },
  getpersonSearchNEU(value, nowArr) { // 获取人员信息自动
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
          let arr = json.data[0];
          let newArr = this.data.getMechanism;
          console.log(newArr);
          if (arr) {
            console.log(arr);
            newArr[1].cont = arr.applicant[0].val;
            newArr[2].cont = arr.applicant[6].val;
            newArr[3].cont = arr.applicant[13].cnList[arr.applicant[13].count];
            newArr[4].cont = arr.applicant[2].val;
            newArr[5].cont = arr.applicant[4].val;
            console.log(newArr);
            this.setData({
              getMechanism: newArr,
              hiddenLoading: true
            });
          }
        }
      }
    });
  },
  getOut () {
    if (wx.getStorageSync('wxLoginSwite')) {
      wx.setStorageSync('wxLoginSwite', false);
    }
    wx.reLaunch({
      url: '../index/index',
    });
  },
  headImg () {
    let arr = this.data.getMechanism;
    wx.chooseImage({
      count: 1,
      success: json => {
        let src = json.tempFilePaths[0];
        console.log(src)
        arr[0].imgUrl = src;
        this.setData({
          getMechanism: arr
        });
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
    this.getUsetId();
    this.getUserMess();
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