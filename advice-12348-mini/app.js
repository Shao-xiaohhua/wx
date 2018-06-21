//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)
  },
  loginWeixin:function(cb){
    var that = this;
    
    wx.login({
      success: function (r) {
        var code = r.code;
        wx.getUserInfo({
          success: function (res) {
            var userInfo=res.userInfo;
            userInfo['loginCode']=code;
            wx.setStorage({
              key: "__userInfo__",
              data: userInfo
            });
            wx.setStorage({
              key: "__session__",
              data: ""
            });
            that.globalData.userInfo = userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)

          },
          fail:function(){
            wx.getSetting({
              success(res) {
                console.log(res, res.authSetting['scope.userInfo'] == false);
                if (res.authSetting['scope.userInfo'] == false) {
                  wx.showModal({
                    title: '授权检查',
                    content: '本站提供的服务需要取得您的用户信息，请授权！',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.openSetting({
                          success: (res) => {

                          }
                        })
                      } else if (res.cancel) {

                      }
                    }
                  })
                }
              }
            })
          }
        });
      }
    });
  },
  getUserInfo: function (cb) {
    var that = this
    //调用登录接口
    try {
      var info = wx.getStorageSync('__userInfo__');
      if (info) {
        wx.checkSession({
          success: function () {
            that.globalData.userInfo = info;
            typeof cb == "function" && cb(that.globalData.userInfo)
          },
          fail: function () {
            that.loginWeixin(cb) //重新登录
          }
        })
      } else {
        that.loginWeixin(cb);
      }
    } catch (e) {
      that.loginWeixin(cb);
    }
      
  },
  
  globalData: {
    apiPath: 'https://12348.justice.gov.cn',
    //apiPath: 'https://t.homolo.net/12348',
    //apiPath: 'http://192.168.10.77:8080/12348',
    userInfo: null,
    loginCode:null,
    sn:null,
    userId:null,
    mobile:null,
    consultantId:null
  }
})
