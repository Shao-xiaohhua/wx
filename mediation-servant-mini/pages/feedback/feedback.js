// pages/feedback/feedback.js
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        anyouTip:"请选择案由",
        suozairenqunTip:"请选择所在人群",
        chuzhiqingkuangTip:"请选择处置情况",
        currentInfoId:"",
        isTiaoweihui : false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let ist = options.isTiaoweihui;
        this.setData({
            currentInfoId: options.id,
            isTiaoweihui: ist
        })
        console.log(options.isTiaoweihui+"==========================="+options.id);
        this.showTips();
        console.log(app.globalData.formdata110_anyou);
        console.log(app.globalData.formdata110_suozairenqun);
        console.log(app.globalData.formdata110_chuzhiqingkuang);
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
        this.showTips();
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
    submitForm:function(e){
        console.log(e.detail.value);
        let anyou = app.globalData.formdata110_anyou.toString();
        let suozairenqun = app.globalData.formdata110_suozairenqun.toString();
        let chuzhiqingkuang = app.globalData.formdata110_chuzhiqingkuang.toString();
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/feedBackRecord110',
            data: {
                id: this.data.currentInfoId,
                anyou: anyou,
                suozairenqun: suozairenqun,
                chuzhiqingkuang: chuzhiqingkuang,
                tiaoweihui:e.detail.value.tiaoweihui
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                if(res.data!=null){
                    if(res.data.code==1){
                        wx.showModal({
                            title: '操作提示',
                            content: res.data.description,
                            showCancel:false,
                            success: function (res) {
                                app.globalData.formdata110_anyou = [];
                                app.globalData.formdata110_suozairenqun = [];
                                app.globalData.formdata110_chuzhiqingkuang = [];
                                wx.navigateBack({
                                    delta: 2
                                });
                                // wx.redirectTo({
                                //     url: '../linkage/linkage',
                                // })
                            }
                        })
                        
                    }else{
                        wx.showModal({
                            title: '操作提示',
                            content: res.data.description,
                            showCancel: false,
                            success: function (res) {
                                
                            }
                        })
                    }
                }else{
                    wx.showModal({
                        title: '操作提示',
                        content: "操作失败，服务器未响应",
                        showCancel: false,
                        success: function (res) {

                        }
                    })
                }
            }
        })
    },
    showTips:function(){
        let anyouCount = app.globalData.formdata110_anyou.length;
        let renqunCount = app.globalData.formdata110_suozairenqun.length;
        let chuzhiCount = app.globalData.formdata110_chuzhiqingkuang.length;
        if (anyouCount > 0) {
            this.setData({
                anyouTip: "已选择（" + anyouCount + "）"
            })
        }
        if (renqunCount > 0) {
            this.setData({
                suozairenqunTip: "已选择（" + renqunCount + "）"
            })
        }
        if (chuzhiCount > 0) {
            this.setData({
                chuzhiqingkuangTip: "已选择（" + chuzhiCount + "）"
            })
        }
    }
    

})