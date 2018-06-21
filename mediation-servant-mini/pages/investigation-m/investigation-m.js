// pages/investigation-m/investigation-m.js
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: [
            { name: '纠纷', nameB: '信息', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '工作', nameB: '措施', url: '', now: 'now', pas: '', width: 'calc(100% / 5)' },
            { name: '纠纷', nameB: '类型', url: '', now: '', pas: '', width: 'calc(100% / 5)' },
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
        let stepData = wx.getStorageSync("jfpc_step2_info");
        if (arr[ind].check === true) {
            arr[ind].check = false
            arr[ind].active = ''
            stepData.types = "";
            stepData.types_index = -1;
            wx.setStorageSync("jfpc_step2_info", stepData);
        } else {
            arr[ind].check = true
            arr[ind].active = 'active'
            let index = stepData.types_index;
            if (index != -1) {
                arr[index].check = false
                arr[index].active = ''
            }
            stepData.types = id;
            stepData.types_index = ind;
            wx.setStorageSync("jfpc_step2_info", stepData);
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
        wx.setStorageSync("jfpc_step2_info", []);
        this.setData({
            hyArr: item
        })
    },
    goNext() {
        wx.navigateTo({
            url: '../linvestigation-tp/linvestigation-tp',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCategory();
        console.log("纠纷排查：investigation-m");
        let stepData = wx.getStorageSync("jfpc_step2_info");
        if (!stepData) {
            wx.setStorageSync("jfpc_step2_info", { types: "", types_index: -1 });
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
                id: "e732c48f949d47abbc15bf5c430eddb6"
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                var data = res.data;
                console.log(data);
                let hyArr = [];
                if (data != null) {
                    let html = { title: "请选择适当的工作措施" };
                    let labelArr = [];
                    for (let i = 0; i < data.length; i++) {
                        let active = "";
                        let check = false;
                        let types = wx.getStorageSync("jfpc_step2_info").types;

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
                _this.setData({
                    hyArr: hyArr
                });
                console.log(hyArr);
            }
        })
    },
    toFirstPage: function () {
        wx.navigateBack({
            delta: 1
        });
    }
})