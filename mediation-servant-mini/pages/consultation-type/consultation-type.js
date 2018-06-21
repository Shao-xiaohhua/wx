// pages/consultation-type/consultation-type.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: [
            { name: '咨询问题', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 4)' },
            { name: '咨询类型', url: '', now: 'now', pas: '', width: 'calc(100% / 4)' },
            { name: '当事人信息', url: '', now: '', pas: '', width: 'calc(100% / 4)' },
            { name: '完成', url: '', now: '', pas: '', width: 'calc(100% / 4)' }
        ],
        hyArr: []
    },
    // 自定义方法
    goNext() {
        wx.navigateTo({
            url: '../take-a-photo/take-a-photo',
        })
    },
    toFirstPage: function () {
        wx.navigateBack({
            delta: 1
        });
    },
    cl: function (event) {
        let ind = event.currentTarget.dataset.index
        let id = event.currentTarget.dataset.id
        let tp = event.currentTarget.dataset.tp
        let arr = this.data.hyArr[tp].labelArr
        let Aarr = this.data.hyArr
        let len = arr.length
        let stepData = wx.getStorageSync("zxlr_step2_info");
        let pindex = stepData.pindex;
        let tindex = stepData.types_index;
        if (pindex == -1 || pindex == tp) {
            if (arr[ind].check === true) {
                arr[ind].check = false
                arr[ind].active = ''
                stepData.types = "";
                stepData.types_index = -1;
                stepData.pindex = -1;
                wx.setStorageSync("zxlr_step2_info", stepData);
            } else {
                arr[ind].check = true
                arr[ind].active = 'active'
                if (tindex != -1) {
                    arr[tindex].check = false
                    arr[tindex].active = ''
                }
                stepData.types = id;
                stepData.types_index = ind;
                stepData.pindex = tp;
                wx.setStorageSync("zxlr_step2_info", stepData);
            }
        } else {
            let oldarr = this.data.hyArr[pindex].labelArr;
            oldarr[tindex].check = false
            oldarr[tindex].active = ''
            arr[ind].check = true
            arr[ind].active = 'active'
            stepData.types = id;
            stepData.types_index = ind;
            stepData.pindex = tp;
            wx.setStorageSync("zxlr_step2_info", stepData);
            Aarr[pindex].labelArr = oldarr;
        }
        Aarr[tp].labelArr = arr
        this.setData({
            hyArr: Aarr
        })
    },
    getCategory: function () {
        const _this = this;
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/getCategory',
            data: {
                id: "6d936e2d7ca94bf8a887619f3022ff4d"
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                var datap = res.data;
                console.log(datap);
                let hyArr = [];
                if (datap != null) {
                    for (let i = 0; i < datap.length; i++){
                        let data = datap[i].childNodes;
                        let html = { title: datap[i].name };
                        let labelArr = [];
                        for (let i = 0; i < data.length; i++) {
                            let active = "";
                            let check = false;
                            let types = wx.getStorageSync("zxlr_step2_info").types;

                            if (types == data[i].id) {
                                active = "active";
                                check = true;
                            }
                            let datai = { name: data[i].name, id: data[i].id, check: check, active: active };
                            labelArr.push(datai);
                        }
                        html.labelArr = labelArr;
                        hyArr.push(html);
                    }
                }
                _this.setData({
                    hyArr: hyArr
                });
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("咨询录入：consultation-type");
        this.getCategory();
        console.log("加载");
        let stepData = wx.getStorageSync("zxlr_step2_info");
        if (!stepData) {
            wx.setStorageSync("zxlr_step2_info", { types: "", types_index: -1,pindex:-1 });
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

    }
})