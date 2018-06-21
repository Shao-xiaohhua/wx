// pages/calc/calc.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputArr: [
            { name: '案件类型', ip: '请选择案件类型', arrow: true, link: true, linkUrl: '../calc-choice/calc-choice?type=案件类型', error: '', y: '' },
            { name: '伤残等级', ip: '请选择伤残等级', arrow: true, link: true, linkUrl: '../calc-choice/calc-choice?type=案件类型', error: '', y: '' },
            { name: '受害人年龄', ip: '请输入年龄', arrow: false, link: false, error: '', y: '' },
            { name: '受诉法院地址', ip: '请选择受理地址', arrow: true, link: true, linkUrl: '../calc-choice/calc-choice?type=案件类型', error: '', y: '' },
            { name: '受害人户口', ip: '请选择户口类别', arrow: true, link: true, linkUrl: '../calc-choice/calc-choice?type=案件类型', error: '', y: '' },
            { name: '医疗费用', ip: '请输入医疗费用', arrow: false, link: false, error: 'error', y: '元' },
            { name: '月薪', ip: '请输入月薪', arrow: false, link: false, error: '', y: '元' },
            { name: '误工天数', ip: '请输入误工天数', arrow: false, link: false, error: '', y: '天' }
        ]
    },
    cares: function () {
        wx.navigateTo({
            url: '../calc-result/calc-result'
        })
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
        let choiceData = wx.getStorageSync('choiceData');
        if (choiceData){
            
        }
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