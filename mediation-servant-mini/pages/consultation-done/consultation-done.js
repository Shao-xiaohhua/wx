// pages/consultation-done/consultation-done.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: [
            { name: '咨询问题', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 4)' },
            { name: '咨询类型', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 4)' },
            { name: '当事人信息', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 4)' },
            { name: '完成', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 4)' }
        ],
        numberArr: [
            { name: '累计咨询数', number: 0 },
            { name: '最新回复数', number: 0 }
        ]
    },
    // 自定义函数
    goIndex() {
        wx.removeStorageSync("zxlr_step4_data");
        wx.reLaunch({
            url: '../index/index',
        })
    },
    goUrl() {
        wx.navigateTo({
            url: '../officer/officer?action=zxlr',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("咨询录入：consultation-done");
        let count = wx.getStorageSync("zxlr_step4_data");
        let numberArr = this.data.numberArr;
        numberArr[0].number = count.allCount;
        numberArr[1].number = count.todayCount;
        this.setData({
            numberArr: numberArr
        })
        console.log(this.data.numberArr);
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