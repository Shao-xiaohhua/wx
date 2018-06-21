// pages/user/register.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shadowSwite: false,
    msg: '',
    codeText: '获取验证码',
    codeSwite: true, // 获取验证码开关
    numYz: true, // 正则验证
    phoneNumber: '',
    Code: '',
    ID: '',
    PassWord: '',
    IdActive: false,
    phoneActive: false,
    hiddenLoading: true
  },
  clearWXswite() {
    wx.setStorageSync('isWXloginSwite', false);
  },
  getphoneNumber (e) {
    let val = e.detail.value;
    this.setData({
      phoneNumber: val
    });
    console.log(val);
  },
  getCoded (e) {
    let val = e.detail.value;
    this.setData({
      Code: val
    });
    console.log(val);
  },
  getID (e) {
    let val = e.detail.value;
    this.setData({
      ID: val
    });
    console.log(val);
  },
  getPassWord (e) {
    let val = e.detail.value;
    this.setData({
      PassWord: val
    });
    console.log(val);
  },
  getCode (e) {
    let phoneNum = this.data.phoneNumber;
    let resCode = app.phoneNumber.reg;
    if (resCode.test(phoneNum)) {
      let num = 60;
      let text = '';
      if (this.data.codeSwite) {
        this.setData({
          codeSwite: false
        });
        let t = setInterval(() => {
          num--;
          text = num + 's';
          if (num <= 0) {
            num = 60;
            text = '获取验证码';
            clearInterval(t);
            this.setData({
              codeSwite: true,
              codeText: '获取验证码'
            });
          }
          this.setData({
            codeText: text
          });
        }, 1000);
        this.getCodeUrl();
      } 
    } else if (!resCode.test(phoneNum) && !this.data.codeSwite) {
      console.log('验证失败');
    } else {
      console.log('显示验证失败');
      this.setData({
        phoneActive: true,
        phoneNumber: '请输入正确手机号码'
      });
    }
  },
  getCodeUrl () {
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.PhoneCode;
    console.log(url);
    wx.request({
      url: url,
      method: 'POST',
      data: {
        mobile: this.data.phoneNumber
      },
      success: json => {
        console.log(json);
      }
    })
  },
  getReg () { // 注册
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
        let reg = app.IDnumber.reg;
        let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.register
        console.log(url);
        if (reg.test(this.data.ID)) {
          console.log('验证成功');
          this.setData({
            hiddenLoading: false
          });
          let dataObj = {
            idNumber: this.data.ID,
            password: this.data.PassWord,
            mobile: this.data.phoneNumber,
            vertificateCode: this.data.Code,
            js_code: jsCode
          };
          console.log(dataObj);
          wx.request({
            url: url,
            method: 'POST',
            data: dataObj,
            success: json => {
              wx.setStorageSync('js_code', '');
              console.log(json);
              this.setData({
                hiddenLoading: true
              });
              if (json.data.status) {
                let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.login;
                let obj = {
                  js_code: jsCode,
                  account: this.data.ID,
                  password: this.data.PassWord
                };
                console.log(obj);
                console.log('注册成功');
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
              } else {
                this.setData({
                  msg: json.data.msg,
                  shadowSwite: true
                });
              }
            }
          });
        } else {
          this.setData({
            IdActive: true,
            ID: '身份证格式不正确'
          })
        }
      }
    });
  },
  clearID () {
    this.setData({
      IdActive: false,
      ID: ''
    });
  },
  clearPhone () {
    this.setData({
      phoneActive: false,
      phoneNumber: ''
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
    let res = app.phoneNumber.reg;
    console.log(res);
    console.log(wx.getStorageSync('setp-to-register'));
    // if (wx.getStorageSync('setp-to-register')) {
    //   wx.redirectTo({
    //     url: '../apply/setp-three'
    //   })
    // }
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
  
  },
  clearShadow () {
    this.setData({
      shadowSwite: false
    });
    if (this.data.msg === '验证码有误，请重新输入') {
      console.log('重来');
    } else {
      wx.redirectTo({
        url: 'login',
      });
    }
  }
})