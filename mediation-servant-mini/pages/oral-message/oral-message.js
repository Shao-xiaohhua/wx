// pages/oral-message/oral-message.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: [
            { name: '纠纷', nameB: '信息', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '纠纷', nameB: '类型', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '当事人', nameB: '信息', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '协议', nameB: '信息', url: '', now: 'now', pas: '', width: 'calc(100% / 5)' },
            { name: '完成', nameB: '信息', nameBH: 'hid', url: '', now: '', pas: '', width: 'calc(100% / 5)' }
        ],
        hyArr: [
            {
                title: '请在下列选项中选择适用的履行方式',
                labelArr: []
            }
        ],
        timeArr: [
            { time: "187aeac6238e43258559df87c0730673", tp1:'7日内', tp2: '履行',choosed:'' },
            { time: "589b0d4c0102472f94e6f770f9ec964f", tp1: '15日内', tp2: '履行', choosed: ''},
            { time: "85f208a5a55a48cdb3a6c333af30acd1", tp1: '30日内', tp2: '履行', choosed: ''},
            { time: "94e9f160b19d413588834709c843bc96", tp1: '更长', tp2: '时间', choosed: ''}
        ],
        resultArr: [
            { val: "84e7df38dbe3479592c6fcd6412c9e62", tp: '终止', choosed: '' },
            { val: "acb169298c904750b6c45e4220595172", tp: '成功', choosed: '' },
            { val: "zancun", tp: '暂存', choosed: '' }
        ],
        lijilvxing: "active",
        liji_time: "56d1ee6a2c2a4fc195d14c6420426354",
        showXieyi: "none",
        allowEdit: true
    },
    // 自定义方法
    cl: function (event) {     
        let ind = event.currentTarget.dataset.index
        let id = event.currentTarget.dataset.id
        let tp = event.currentTarget.dataset.tp
        let hyArr = this.data.hyArr
        let arr = hyArr[tp].labelArr
        let len = arr.length

        let stepData = wx.getStorageSync("kttj_step4_info")
        if (arr[ind].check === true) {
            arr[ind].check = false
            arr[ind].active = ''
            if (stepData.types==id) {
                stepData.types = "";
                stepData.types_index = -1;
                wx.setStorageSync("kttj_step4_info", stepData);
            }
        } else {
            arr[ind].check = true
            arr[ind].active = 'active'
            if (stepData.types!=id) {
                let index = stepData.types_index;
                if (index != -1){
                    arr[index].check = false
                    arr[index].active = ''
                }
                stepData.types = id;
                stepData.types_index = ind;
                wx.setStorageSync("kttj_step4_info", stepData);
            }
        }
        hyArr[tp].labelArr = arr
        this.setData({
            hyArr: hyArr
        })
        console.log(arr[ind])
    },
    toFirstPage: function () {
        wx.navigateBack({
            delta:4
        })
    },
    goList: function(){
        wx.removeStorageSync("kttj_step1_info");
        wx.removeStorageSync("kttj_step2_info");
        wx.removeStorageSync("kttj_step4_info");
        wx.removeStorageSync("kttj_step3_info_people1");
        wx.removeStorageSync("kttj_step3_info_people2");
        wx.removeStorageSync("kttj_edit_eid");
        wx.removeStorageSync("kttj_edit_status");
        wx.navigateBack({
            delta: 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCategory();
        console.log("口头调解：oral-message");
        let stepData = wx.getStorageSync("kttj_step4_info");
        let editInfoStatus = wx.getStorageSync("kttj_edit_status");
        if (editInfoStatus && (editInfoStatus == "IsMediate" || editInfoStatus == "Agreemented")) {
            this.setData({
                allowEdit : false
            })
        }
        if (!stepData) {
            wx.setStorageSync("kttj_step4_info", { time: this.data.liji_time,types:"",types_index:-1,result:''});
        }else{
            if (stepData.time && stepData.time != this.data.liji_time){
                let timeArr = this.data.timeArr;
                for (let i = 0; i < timeArr.length; i++) {
                    if (timeArr[i].time == stepData.time) {
                        timeArr[i].choosed = "choosed";
                        this.setData({
                            lijilvxing: "",
                            timeArr: timeArr
                        })
                        break;
                    }
                }
            }else{
                stepData.time = this.data.liji_time
            }
            if (!stepData.types){
                stepData.types = [];
            }
            stepData.result = "";
            this.setData({
                showXieyi: "none",
            })
            wx.setStorageSync("kttj_step4_info", stepData);
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
    getCategory: function () {
        const _this = this;
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/getCategory',
            data: {
                id: "8cfbad541e6c4c43ad2d2aaa3dbe3b11"
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                var data = res.data;
                console.log(data);
                let hyArr = _this.data.hyArr;
                if (data != null) {
                    let labelArr = []; //{ name: '家暴', check: true, active: 'active' },
                    for (let i = 0; i < data.length; i++) {
                        let active = "";
                        let check = false;
                        let types = wx.getStorageSync("kttj_step4_info").types;

                        if (types == data[i].id) {
                            active = "active";
                            check = true;
                        }
                        let datai = { name: data[i].name, id: data[i].id, check: check, active: active };
                        labelArr.push(datai);
                    }
                    hyArr[0].labelArr = labelArr;
                }
                _this.setData({
                    hyArr: hyArr
                });
                console.log(hyArr);
            }
        })
    },
    chooseResult: function (e) {
        let resultArr = this.data.resultArr;
        let id = e.currentTarget.dataset.id;
        let stepData = wx.getStorageSync("kttj_step4_info");
        console.log(id);
        for (let i = 0; i < resultArr.length; i++) {
            if (resultArr[i].val == id) {
                resultArr[i].choosed = "choosed";
                if (resultArr[i].val =="acb169298c904750b6c45e4220595172"){
                    this.setData({
                        showXieyi:"block"
                    })
                }else{
                    this.setData({
                        showXieyi: "none"
                    })
                }
                stepData.result = id;
                this.setData({
                    resultArr: resultArr
                })
            } else {
                resultArr[i].choosed = "";
                this.setData({
                    resultArr: resultArr
                })
            }
        }
        wx.setStorageSync("kttj_step4_info", stepData);
    },
    chooseTime:function(e){
        let timeArr = this.data.timeArr;
        let time = e.currentTarget.dataset.time;
        let stepData = wx.getStorageSync("kttj_step4_info");
        console.log(time);
        for (let i = 0; i < timeArr.length;i++){
            if (timeArr[i].time==time){
                timeArr[i].choosed = "choosed";
                stepData.time = time;
                this.setData({
                    lijilvxing:"",
                    timeArr: timeArr
                })
            }else{
                timeArr[i].choosed = "";
                this.setData({
                    timeArr: timeArr
                })
            }
        }
        wx.setStorageSync("kttj_step4_info", stepData);
    },

    chooseTimeLiji:function(e){
        let time = e.currentTarget.dataset.time;
        this.setData({
            lijilvxing:"active"
        })
        let timeArr = this.data.timeArr;
        for (let i = 0; i < timeArr.length; i++) {
            timeArr[i].choosed = "";
            this.setData({
                timeArr: timeArr
            })
        }
        let stepData = wx.getStorageSync("kttj_step4_info");
        stepData.time = this.data.liji_time;
        wx.setStorageSync('kttj_step4_info', stepData);
    },
    submit: function (data) {
        const _this = this;
        let infoId = wx.getStorageSync("kttj_edit_eid");
        let jiufenxinxi = wx.getStorageSync("kttj_step1_info");
        let jiufenleixing = wx.getStorageSync("kttj_step2_info").types;
        let people1 = wx.getStorageSync("kttj_step3_info_people1");
        let people2 = wx.getStorageSync("kttj_step3_info_people2");
        let xieyixinxi = wx.getStorageSync("kttj_step4_info");
        let status = wx.getStorageSync("kttj_edit_status");
        if (status && (status == "IsMediate" || status == "Agreemented")){
            status = "donot";
        }else{
            status = wx.getStorageSync("kttj_step4_info").result;
        }
        if (xieyixinxi.result=="") {
            wx.showModal({
                title: '操作提示',
                content: "请选择调解结果",
                showCancel: false,
                success: function (res) {
                   
                }
            })
            return;
        }
        if (xieyixinxi.result =="acb169298c904750b6c45e4220595172" && xieyixinxi.types == "" ) {
            wx.showModal({
                title: '操作提示',
                content: "您尚未选择履行方式，请先选择，再保存",
                showCancel: false,
                success: function (res) {
                 
                }
            })
            return;
        }

        if (!jiufenxinxi) {
            wx.showModal({
                title: '操作提示',
                content: "您尚未填写纠纷信息，请先填写，再保存",
                showCancel: false,
                success: function (res) {
                    wx.navigateBack({
                        delta: 4
                    })
                }
            })
            return;
        }
        if (jiufenleixing == "") {
            wx.showModal({
                title: '操作提示',
                content: "您尚未选择纠纷类型，请先选择，再保存",
                showCancel: false,
                success: function (res) {
                    wx.navigateBack({
                        delta: 3
                    })
                }
            })
            return;
        }
        if (!people1.name) {
            wx.showModal({
                title: '操作提示',
                content: "当事人姓名为必填！",
                showCancel: false,
                success: function (res) {
                    wx.navigateBack({
                        delta: 2
                    })
                }
            })
            return;
        }
        if (!people2.name) {
            wx.showModal({
                title: '操作提示',
                content: "被申请人姓名为必填！",
                showCancel: false,
                success: function (res) {
                    wx.navigateBack({
                        delta:1
                    })
                }
            })
            return;
        }

        let types = "";
        let time = "";
        if (xieyixinxi.result == "acb169298c904750b6c45e4220595172") {
            types = xieyixinxi.types;
            time = wx.getStorageSync("kttj_step4_info").time;
        }
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/submitKTTJ',
            method: "POST",
            data: {
                entityId:infoId,
                personId: wx.getStorageSync("__session__").session,
                result: status,
                jiufenxinxi: jiufenxinxi,
                jiufenleixing: jiufenleixing,
                lvxingfangshi: types,
                lvxingshixian: time,
                name1: people1.name,
                number1: people1.number,
                mobile1: people1.mobile,
                name2: people2.name,
                number2: people2.number,
                mobile2: people2.mobile
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                if (res.data) {
                    console.log(res.data);
                    if (res.data.code == 1) {
                        wx.removeStorageSync("kttj_step1_info");
                        wx.removeStorageSync("kttj_step2_info");
                        wx.removeStorageSync("kttj_step4_info");
                        wx.removeStorageSync("kttj_step3_info_people1");
                        wx.removeStorageSync("kttj_step3_info_people2");
                        wx.removeStorageSync("kttj_edit_eid");
                        wx.removeStorageSync("kttj_edit_status");

                        wx.setStorageSync("kttj_step5_data", res.data.count);
                        wx.reLaunch({
                            url: '../oral-done/oral-done'
                        })
                    } else{
                        wx.showModal({
                            title: '操作提示',
                            content: res.data.description,
                            showCancel: false,
                            success: function (res) {
                                
                            }
                        })
                    }
                }
            }
        })
    },
})