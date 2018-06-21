// pages/linvestigation-tp/linvestigation-tp.js
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: [
            { name: '纠纷', nameB: '信息', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '工作', nameB: '措施', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '纠纷', nameB: '类型', url: '', now: 'now', pas: '', width: 'calc(100% / 5)' },
            { name: '当事人', nameB: '信息', url: '', now: '', pas: '', width: 'calc(100% / 5)' },
            { name: '完成', nameB: '', url: '', now: '', pas: '', width: 'calc(100% / 5)' }
        ],
        hyArr: []
    },
    // 自定义方法
    cl: function (event) {
        let ind = event.currentTarget.dataset.index
        let id = event.currentTarget.dataset.id
        let tp = event.currentTarget.dataset.tp
        let arr = this.data.hyArr[tp].labelArr
        let Aarr = this.data.hyArr
        let len = arr.length
        let stepData = wx.getStorageSync("jfpc_step3_info");
        let pindex = stepData.pindex;
        let tindex = stepData.types_index;
        if (pindex == -1 || pindex == tp) {
            if (arr[ind].check === true) {
                arr[ind].check = false
                arr[ind].active = ''
                stepData.types = "";
                stepData.types_index = -1;
                stepData.pindex = -1;
                wx.setStorageSync("jfpc_step3_info", stepData);
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
                wx.setStorageSync("jfpc_step3_info", stepData);
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
            wx.setStorageSync("jfpc_step3_info", stepData);
            Aarr[pindex].labelArr = oldarr;
        }
        Aarr[tp].labelArr = arr
        this.setData({
            hyArr: Aarr
        })
    },
    clear: function () {
        let len = this.data.hyArr.length
        let item = this.data.hyArr
        for (let i = 0; i < len; i++) {
            let ineLen = item[i].labelArr.length
            for (let j = 0; j < ineLen; j++) {
                item[i].labelArr[j].check = false
                item[i].labelArr[j].active = ''
            }
        }
        wx.setStorageSync("jfpc_step3_info", []);
        this.setData({
            hyArr: item
        })
    },
    goNext() {
        wx.navigateTo({
            url: '../investigation-mess/investigation-mess',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCategory();
        console.log("纠纷排查：linvestigation-tp");
        let stepData = wx.getStorageSync("jfpc_step3_info");
        if (!stepData) {
            wx.setStorageSync("jfpc_step3_info", { types: "", types_index: -1, pindex: -1 });
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
    getCategory:function(){
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
                var data = res.data;
                console.log(data);
                let hyArr = [];
                if (data != null) {
                    for (let i = 0; i < data.length; i++) {
                        let html = { title: data[i].name, id: data[i].id };
                        let labelArr = [];
                        let childNodes = data[i].childNodes;
                        console.log(childNodes);
                        for (let y = 0; y < childNodes.length; y++) {
                            let active = "";
                            let check = false;
                            let types= wx.getStorageSync("jfpc_step3_info").types;

                            if (types == childNodes[y].id) {
                                active = "active";
                                check = true;
                            }
                            let datay = { name: childNodes[y].name, id: childNodes[y].id, check: check, active: active };
                            labelArr.push(datay);
                        }
                        html.labelArr = labelArr;
                        hyArr.push(html);
                    }
                }
                _this.setData({
                    hyArr: hyArr
                });
                console.log(hyArr);
            }
        })
    },
    toFirstPage: function () {
        wx.navigateBack({
            delta: 2
        });
    }
})