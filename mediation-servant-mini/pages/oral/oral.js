// pages/oral/oral.js
const app = getApp();
const recorderManager = wx.getRecorderManager();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: [
            { name: '纠纷', nameB: '信息', url: '', now: 'now', pas: '', width: 'calc(100% / 5)' },
            { name: '纠纷', nameB: '类型', url: '', now: '', pas: '', width: 'calc(100% / 5)' },
            { name: '当事人', nameB: '信息', url: '', now: '', pas: '', width: 'calc(100% / 5)' },
            { name: '协议', nameB: '信息', url: '', now: '', pas: '', width: 'calc(100% / 5)' },
            { name: '完成', nameB: '信息', nameBH: 'hid', url: '', now: '', pas: '', width: 'calc(100% / 5)' }
        ],
        content: "",
        recording: true,
        voiceLoginSwite:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("口头调解：oral");
        //打开调解检查：是否是新数据，若是旧数据编辑，先清空数据
        let oldDataStatus = wx.getStorageSync("kttj_edit_status");
        if (oldDataStatus && (oldDataStatus == "IsMediate" || oldDataStatus == "Agreemented")){
            wx.removeStorageSync("kttj_step1_info");
            wx.removeStorageSync("kttj_step2_info");
            wx.removeStorageSync("kttj_step4_info");
            wx.removeStorageSync("kttj_step3_info_people1");
            wx.removeStorageSync("kttj_step3_info_people2");
            wx.removeStorageSync("kttj_edit_eid");
            wx.removeStorageSync("kttj_edit_status");
        }
        let text = wx.getStorageSync("kttj_step1_info");
        if (text != null && text != "") {
            this.setData({
                content: text
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
        //开始录音侦听
        recorderManager.onStart(() => {
            console.log('recorder start')
        })
        //录音结束侦听-上传翻译
        recorderManager.onStop((res) => {
            this.setData({
                voiceLoginSwite: true
            })
            const _this = this;
            wx.uploadFile({
                url: app.globalData.$ctx + '/wechatMini/speechToText',
                filePath: res.tempFilePath,
                name: new Date().getTime() + ".mp3",
                success: function (res) {
                    _this.setData({
                        voiceLoginSwite: false
                    })
                    console.log(res);
                    if (res.data) {
                        let data = JSON.parse(res.data);
                        console.log(data);
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
        this.setData({
            content: e.detail.value
        })
    },
    goNext(data) {
        let text = data.detail.value.content;
        if (text == "") {
            wx.showModal({
                title: '操作提示',
                content: "您尚未填写纠纷信息，稍后您可以点击左上角的返回键返回至该步骤补充填写，其他页面信息会自动保存",
                showCancel: false,
                success: function (res) {
                    wx.setStorageSync("kttj_step1_info", "");
                    wx.navigateTo({
                        url: '../oral-tp/oral-tp',
                    })
                }
            })
        } else {
            wx.setStorageSync("kttj_step1_info", text);
            wx.navigateTo({
                url: '../oral-tp/oral-tp',
            })
        }
    },
})