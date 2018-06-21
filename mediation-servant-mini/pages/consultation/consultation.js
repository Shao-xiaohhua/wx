// pages/consultation/consultation.js
const app = getApp();
const recorderManager = wx.getRecorderManager();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: [
            { name: '咨询问题', url: '', now: 'now', pas: '', width: 'calc(100% / 4)' },
            { name: '咨询类型', url: '', now: '', pas: '', width: 'calc(100% / 4)' },
            { name: '当事人信息', url: '', now: '', pas: '', width: 'calc(100% / 4)' },
            { name: '完成', url: '', now: '', pas: '', width: 'calc(100% / 4)' }
        ],
        content: "",
        recording: true,
        voiceLoginSwite: false
    },
    voiceB: function () {
        console.log("begin");
        this.setData({
            recording: false
        })
        recorderManager.start({
            duration: 60000,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192000,
            format: 'mp3',
            frameSize: 50
        });
    },
    voiceE: function () {
        console.log("end");
        this.setData({
            recording: true
        })
        recorderManager.stop();
    },
    onchange: function (e) {
        console.log("输入框的值：" + e.detail.value);
        this.setData({
            content: e.detail.value
        })
        console.log("data的值：" + this.data.content);
    },
    goNext(data) {
        let text = data.detail.value.content;
        if (text == "") {
            wx.showModal({
                title: '操作提示',
                content: "您尚未填写咨询问题，稍后您可以回来补充填写",
                showCancel: false,
                success: function (res) {
                    wx.setStorageSync("zxlr_step1_info", "");
                    wx.navigateTo({
                        url: '../consultation-type/consultation-type',
                    })
                }
            })
        } else {
            wx.setStorageSync("zxlr_step1_info", text);
            wx.navigateTo({
                url: '../consultation-type/consultation-type',
            })
        }
    },
    /**
     * 
     */
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("咨询录入：consultation");
        let text = wx.getStorageSync("zxlr_step1_info");
        console.log("===="+text);
        if (text != null && text != "") {
            this.setData({
                content: text
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //开始录音侦听
        recorderManager.onStart(() => {
            console.log('recorder start')
        })
        //录音结束侦听-上传翻译
        recorderManager.onStop((res) => {
            this.setData({
                voiceLoginSwite: true
            })
            console.log('recorder stop===', res);
            const _this = this;
            wx.uploadFile({
                url: app.globalData.$ctx + '/wechatMini/speechToText',
                filePath: res.tempFilePath,
                name: new Date().getTime() + ".mp3",
                success: function (res) {
                    _this.setData({
                        voiceLoginSwite: false
                    })
                    console.log("上传成功");
                    console.log(res);
                    if (res.data) {
                        let data = JSON.parse(res.data);
                        let result = "";
                        if (data) {
                            result = data.result;
                        }
                        let content = _this.data.content
                        if (result) {
                            content += result;
                        }
                        _this.setData({
                            content: content
                        })
                    }
                },
                complete:function(e){
                    _this.setData({
                        voiceLoginSwite: false
                    })
                }
            })
        })
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