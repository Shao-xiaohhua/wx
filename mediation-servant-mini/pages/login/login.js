// pages/login/login.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: '',
        access: '',
        error: ''
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
      this.checkUser();
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

    setUserName: function (e) {
        console.log(e);
        var n = e.detail.value;
        this.setData({
            userName: n
        });
    },
    setAccess: function (e) {
        var n = e.detail.value;
        this.setData({
            access: n
        });
    },
    checkUser: function(){
      var session = wx.getStorageSync('__session__');
      if (session && session.session) {
        let isDue = this.checkLoginTime(session.loginTime);
        if(!isDue){
          wx.request({
            url: app.globalData.$ctx + '/wechatMini/checkUser',
            data: {
              personId: session.session
            },
            success: function (res) {
              console.log(res);
              if (res.data.code == 1) {
                wx.showToast({
                  title: '已登录正在进入..',
                  icon: 'success',
                  duration: 1000
                });
                setTimeout(function () {
                  wx.redirectTo({ url: '../index/index' });
                }, 500);
              }else{
                wx.setStorageSync("__session__", '');
              }
            },
            fail: function (e) {

            }
          });
        }else {
          wx.setStorageSync("__session__", '');
        }
      }
    },
    checkLoginTime: function(time){
      let diff =new Date().getTime() -new Date(time).getTime();
      return (diff>(7*24*3600*1000)?true:false);
    },
    loginSubmit: function () {
        console.log("登录");
        var that = this;
        that.setData({
            error: ''
        });
        if (!that.data.userName || !that.data.access) {
            that.setData({
                error: '账号或密码不能为空!'
            });
        };
        console.log("登录1");
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/login',
            data: {
                userName: that.data.userName,
                access: that.data.access
            },
            success: function (res) {
                console.log("请求成功，参数：");
                console.log(res);
                if (res.data.code == 1) {
                    console.log("登录成功");
                    var u = res.data.result
                    wx.setStorageSync("__session__", u);
                    wx.redirectTo({
                        url: '../index/index',
                    })
                } else {
                    console.log("登录失败");
                    that.setData({
                        error: res.data.description || '账号密码错误',
                    });
                }
            },
            complete:function(e){
                console.log("complete，返回：");
                console.log(e);
            }
        })
    }
})