// pages/core.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        listArrOne: [
            { name: '调解记录管理', icon: 'icon-mediate', url: '../search-mediate/search-mediate', color: 'blue' },
            { name: '排查记录管理', icon: 'icon-task', url: '../investigation-mediate/investigation-mediate', color: 'green' },
            { name: '咨询记录管理', icon: 'icon-entrance', url: '../consultation-mediate/consultation-mediate', color: 'yellow' }
        ],
        listArrTwo: [
          { name: '通知公告', icon: 'icon-bell', url: '../notice-bulletin/notice-bulletin', color: 'ze' }
        ]
        // listArrTwo: [
        //     { name: '通知公告', icon: 'icon-bell', url: '', color: 'ze' },
        //     { name: '补贴保障', icon: 'icon-subsidy', url: '', color: 'qs' },
        //     { name: '排行榜', icon: 'icon-ranking', url: '', color: 'blue' },
        //     { name: '个人信息', icon: 'icon-id', url: '', color: 'ze' }
        // ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let workerInfo = wx.getStorageSync("workerInfo");
        let session = wx.getStorageSync("__session__");
        if (session) {
            this.setData({
                userInfo: session
            })
        }
        if (workerInfo) {
            //头像
            let uinfo = this.data.userInfo;
            if (workerInfo.photo) {
                uinfo.avatar = workerInfo.photo;
            }
            if (workerInfo.organization) {
                uinfo.org = workerInfo.organization;
            }
            this.setData({
                userInfo: uinfo
            })
        }
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

    },
    logout: function () {
        wx.removeStorageSync("__session__");
        wx.removeStorageSync("workerInfo");
        wx.reLaunch({
            url: '../login/login',
        })
    }
})