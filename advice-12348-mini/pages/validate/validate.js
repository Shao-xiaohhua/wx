// validate.js
var countDown = 60;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:'',
    numdisabled:false,
    errinfo:'',
    timerval: '获取验证码',
    counterNum: 0
  },
  setNum:function(e){
    var n = e.detail.value
    var regex = /^1(3|4|5|7|8)\d{9}$/;
    if (regex.test(n)){
      this.setData({
        num: n
      })
    }else{
      this.setData({
        num: ''
      })
    }
  },
  validateSubmit: function (e) {
    var that = this
    that.setData({
      errorinfo: ''
    });
    if (!that.data.num) {
      that.setData({
        errorinfo: '请输入手机号'
      });
      return
    }
    var f = e.detail.value;
    console.log(f)
    if (!f.code) {
      that.setData({
        errorinfo: '请输入短信验证码'
      });
      return
    };
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.Consultant/collection/login',
      method: 'POST',
      data: JSON.stringify({
        mobile: f.mobile,
        code:f.code
      }),
      success: function (res) {
        if (res.data.code == 1) {
          var u=res.data.result
          wx.request({
            url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/validate',
            data: { userId: u, sn: app.globalData.sn },
            success: function (resp) {
              if (resp.data.code == 1) {
                console.log(resp.data.result)
                var r = resp.data.result
                app.globalData.sn=r.sn
                app.globalData.userId = r.userId
                app.globalData.mobile = r.mobile
                wx.setStorage({
                  key: "__session__",
                  data: r
                });
                wx.navigateBack();
              }else{
                that.setData({
                  errorinfo: resp.data.description||'验证码错误',
                  numdisabled: false
                });
              }
            }
          })
        }else{
          console.log(res.data);
          that.setData({
            errorinfo: res.data.description || '验证码错误',
            numdisabled:false
          });
        }
      }
    })

  },
  htap: function (e) {
    var that=this
    var regMobile = new RegExp('^1(3|4|5|7|8)\d{9}$', 'g');
    if (!that.data.num){
      this.setData({
        errorinfo: '请输入正确的手机号'
      })
      return
    }
    if (regMobile.exec(that.data.num)) {
      this.setData({
        errorinfo: '请输入正确的手机号'
      })
      return
    }
    if (this.data.timerval == '获取验证码') {
      this.getVcode(e)
    }
    this.setData({
      numdisabled: true,
      errorinfo: ''
    })
    console.log(that.data.num)
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.Consultant/collection/sendCode',
      method:'POST',
      data: JSON.stringify({ 
        mobile: that.data.num
      }),
      success: function (res) {
        if(res.data.code==1){
          console.log('send short message success')
        }else{
          console.log(res.data)
        }
        
      }
    })
  },
  getVcode: function (e) {
    if (countDown == 0) {
      this.setData({
        timerval: '获取验证码'
      })
      countDown = 60;
    } else {
      this.setData({
        timerval: countDown + ' 秒'
      })
      countDown--;
      var that = this
      setTimeout(function () {
        that.getVcode(e);
      }, 1000);
    };
  }
})