// pages/oral-done/oral-done.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: [
            { name: '纠纷', nameB: '信息', url: '../index/index', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '纠纷', nameB: '类型', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '当事人', nameB: '信息', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '协议', nameB: '信息', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '完成', nameB: '信息', nameBH: 'hid', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' }
        ],
        invNumber: [
            { name: '今日处理案件', y: '个', number: 0 },
            { name: '本月处理案件', y: '个', number: 0 }
        ],
        description:"案件录入完成"
    },
    goIndex() {
        wx.removeStorageSync("kttj_step5_data");
        wx.reLaunch({
            url: '../index/index',
        })
    },
    goUrl() {
        wx.removeStorageSync("kttj_step5_data");
        wx.reLaunch({
            url: '../core/core',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("口头调解：oral-done");
        let count = wx.getStorageSync("kttj_step5_data");
        let invNumber = this.data.invNumber;
        invNumber[0].number = count.todayCount;
        invNumber[1].number = count.thisMonthCount;
        this.setData({
            invNumber: invNumber,
            description: count.description
        })
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

    }
})