//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        numberArr: [
            { number: 0, text: '本月调结', url: '../search-mediate/search-mediate?bdate=&edate=&status=banjieAll' },//状态：案件已办结
            { number: 0, text: '本月在调', url: '../search-mediate/search-mediate?status=IsMediate' },//状态：案件办理中
            { number: 0, text: '110待办', url: '../linkage/linkage?infostatus=weifankui' }
        ],
        linkArr: [
            { name: '口头调解', icon: 'icon-consultation', url: '../oral/oral', cl: '', color: 'yellow' },
            { name: '110联动', icon: 'icon-linkage', url: '../linkage/linkage', cl: '', color: 'ze' },
            { name: '纠纷排查', icon: 'icon-investigation', url: '../investigation/investigation', cl: '', color: 'green' },
            { name: '咨询录入', icon: 'icon-entrance', url: '../consultation/consultation', cl: '', color: 'orange' },
            { name: '智能助手', icon: 'icon-assistant', url: '../assistant/assistant', cl: '', color: 'blue' },
            { name: '智能咨询', icon: 'icon-roba', url: '../znzx/znzx?hts=https://h5.law.push.aegis-info.com/html/index?id=5748', cl: '', color: 'green' },
        ],
        noticeArr: [],
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        verticale: true,
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        // this.checkUserInfo();
        this.getCurrentWorkerInfo();
        // if (app.globalData.userInfo) {
        //     this.setData({
        //         userInfo: app.globalData.userInfo,
        //     })
        // } else if (this.data.canIUse) {
        //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //     // 所以此处加入 callback 以防止这种情况
        //     app.userInfoReadyCallback = res => {
        //         this.setData({
        //             userInfo: res.userInfo,
        //         })
        //     }
        // } else {
        //     // 在没有 open-type=getUserInfo 版本的兼容处理
        //     wx.getUserInfo({
        //         success: res => {
        //             app.globalData.userInfo = res.userInfo
        //             this.setData({
        //                 userInfo: res.userInfo,
        //             })
        //         }
        //     })
        // }
        this.getInfoCount();
        this.getNotice();
    },
    onShow: function () {
        //this.checkUserInfo();
    },

    checkUserInfo: function () {
        var session = wx.getStorageSync('__session__');
        if (session){
            this.setData({
                userInfo: session
            })
        }else{
            wx.redirectTo({ url: '../login/login' });
        }
    },
    // getUserInfo: function (e) {
    //     console.log(e)
    //     app.globalData.userInfo = e.detail.userInfo
    //     this.setData({
    //         userInfo: e.detail.userInfo,
    //     })
    // },
    getInfoCount: function () {
        const index = this;
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/infoCount',
            data: {
                personId: wx.getStorageSync("__session__").session
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data)
                var numberArr = index.data.numberArr;
                numberArr[0].number = res.data.count1;
                numberArr[0].url = "../search-mediate/search-mediate?bdate=" + res.data.bdate + "&edate=" + res.data.edate +"&status=banjieAll";
                numberArr[1].number = res.data.count2;
                numberArr[2].number = res.data.count3;
                index.setData({
                    numberArr: numberArr
                })
                console.log(numberArr)
            }
        })

    },
    getCurrentWorkerInfo: function () {
        const _this = this;
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/currentWorkerInfo',
            data: {
                id: _this.data.userInfo.session
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log("getCurrentWorkerInfo返回值：");
                console.log(res);
                if (res.data != null) {
                    if (res.data.code == 1) {
                        let uinfo = _this.data.userInfo;
                        console.log(uinfo);
                        uinfo.org = res.data.organization;
                        uinfo.peopleType = res.data.peopleType;
                        if (res.data.photo){
                            uinfo.avatar = res.data.photo;
                        } else if (res.data.gender==="女"){
                            uinfo.avatar = "../../images/default_female.jpg";
                            res.data.photo = "../../images/default_female.jpg";
                        }else{
                            uinfo.avatar = "../../images/default_male.jpg";
                            res.data.photo = "../../images/default_male.jpg";
                        }
                        wx.setStorageSync("workerInfo", res.data);
                        _this.setData({
                            userInfo:uinfo
                        })
                    } else {
                        wx.setStorageSync("workerInfo", {});
                    }
                } else {
                    wx.setStorageSync("workerInfo", {});
                }
            }
        })
    },
    getNotice: function () {
        const _this = this;
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/notice',
            data: {
                personId: wx.getStorageSync("__session__").session,
                pageSize: 3,
                page: 1
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data)
                let noticeArr = _this.data.noticeArr;
                var infoList = res.data.items;
                console.log(infoList)
                if (infoList != null) {
                    for (let i = 0; i < infoList.length; i++) {
                        var info = infoList[i];
                        var html = {
                            title: info.title,
                            url: '../notice-bulletin-detail/notice-bulletin-detail?id=' + info.id
                        }
                        noticeArr.push(html);
                    }
                    _this.setData({
                        noticeArr: noticeArr,
                    });
                }
            }
        })
    }
})
