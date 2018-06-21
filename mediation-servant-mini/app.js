//app.js


App({
    onLaunch: function () {
        // wx.request({
        //   url: 'https://12348.justice.gov.cn/service/rest/orgstruct.Map/collection/mapgroupdata?pageSize=-1&typeId=1309ace1040f457cb27f48d3b66e13cf',
        //   dataType: 'json',
        //   success: function (res) {
        //     console.log(res.data)
        //   }
        // })
        // 展示本地存储能力
        //var logs = wx.getStorageSync('logs') || []
        //logs.unshift(Date.now())
        //wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        // wx.getSetting({
        //     success: res => {
        //         if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             wx.getUserInfo({
        //                 success: res => {
        //                     console.log("微信用户信息：");
        //                     console.log(res.userInfo);
        //                     // 可以将 res 发送给后台解码出 unionId
        //                     this.globalData.userInfo = res.userInfo

        //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                     // 所以此处加入 callback 以防止这种情况
        //                     if (this.userInfoReadyCallback) {
        //                         this.userInfoReadyCallback(res)
        //                     }
        //                 }
        //             })
        //         }
        //     }
        // })
    },

    globalData: {
        //$ctx: "https://rmtj.justice.gov.cn",
        //$ctx: "https://t.homolo.net",
        $ctx: "https://rmtjtest.justice.gov.cn",
        //$ctx: "http://10.222.10.116:8081/mediation",
        formdata110_anyou: [],
        formdata110_suozairenqun: [],
        formdata110_chuzhiqingkuang: []
    },
    searchData: {
        $ctx: 'https://12348.justice.gov.cn/service/rest/12348.mobile/collection/getLegalServiceData?'
    },
    detailUrl: '1312'
})
