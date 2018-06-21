// pages/el-Id/el-Id.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        arrOne: [
            { head: '性别', content: '' }
        ],
        arrTwo: [
            // { head: '所属调解组织', content: '' },
            // { head: '登记机构', content: '' }
            { head: '职务', content: '' },
            { head: '所属区', content: '' },
            { head: '调解员编号', content: '' }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        let workerInfo = wx.getStorageSync("workerInfo");
        let session = wx.getStorageSync("__session__");
        if(session){
            this.setData({
                userInfo:session
            })
        }
        if (workerInfo){
            //头像
            let uinfo = this.data.userInfo;
            if (workerInfo.photo) {
                uinfo.avatar = workerInfo.photo;
            }
            if (workerInfo.organization) {
                uinfo.org = workerInfo.organization;
            }
            if (workerInfo.peopleType) {
                uinfo.peopleType = workerInfo.peopleType;
            }
            //性别
            let arrOne = this.data.arrOne;
            if (workerInfo.gender) {
                arrOne[0].content = workerInfo.gender;
            }
            //机构
            let arrTwo = this.data.arrTwo;
            if (workerInfo.position){
                arrTwo[0].content = workerInfo.position;
            }
            if (workerInfo.justice){
                arrTwo[1].content = workerInfo.zone;
            }
            this.setData({
                arrOne: arrOne,
                arrTwo: arrTwo,
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
})