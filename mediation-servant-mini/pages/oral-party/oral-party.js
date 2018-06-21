// pages/oral-party/oral-party.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: [
            { name: '纠纷', nameB: '信息', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '纠纷', nameB: '类型', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 5)' },
            { name: '当事人', nameB: '信息', url: '', now: 'now', pas: '', width: 'calc(100% / 5)' },
            { name: '协议', nameB: '信息', url: '', now: '', pas: '', width: 'calc(100% / 5)' },
            { name: '完成', nameB: '信息', nameBH: 'hid', url: '', now: '', pas: '', width: 'calc(100% / 5)' }
        ],
        inputArr: [
            { name: '姓名', n: 'name', ip: '请输入姓名', arrow: false, link: true, error: '', y: '' },
            { name: '身份号码', n: 'number', ip: '请输入身份证号', arrow: false, link: true, error: '', y: '' },
            { name: '联系电话', n: 'mobile', ip: '请输入联系电话', arrow: false, link: true, error: '', y: '' }
        ],
        inputArrTwo: [
            { name: '所在地区', n: 'zone', ip: '未知', arrow: false, link: false, error: '', y: '' },
            { name: '所在街道', n: 'street', ip: '未知', arrow: false, link: false, error: '', y: '' },
            { name: '所在居委会', n: 'committee', ip: '未知', arrow: false, link: false, error: '', y: '' }
        ],
        picUrl: '',
        picUrlSwite: false,
        errorMsg:'该信息为必填项'
    },
    getPic() {
        let _this = this
        wx.chooseImage({
            count: 1,
            success: function (res) {
                let tempFilePaths = res.tempFilePaths;
                let tempFilePath = tempFilePaths[0];
                console.log(tempFilePath);
                let temparr = tempFilePath.split(".");
                let imgtype = "." + temparr[temparr.length - 1];
                console.log(imgtype);
                _this.setData({
                    picUrl: tempFilePaths,
                    picUrlSwite: true
                })
                wx.uploadFile({
                    url: app.globalData.$ctx + '/wechatMini/ocrIdCard',
                    filePath: tempFilePath,
                    name: new Date().getTime() + imgtype,
                    success: function (res) {
                        if (res.data) {
                            let data = JSON.parse(res.data);
                            console.log(data);
                            if (data.code == 1) {
                                let inputArr = _this.data.inputArr;
                                let infos = wx.getStorageSync("kttj_step3_info_people1");
                                if (data.name) {
                                    inputArr[0].y = data.name;
                                    infos.name = data.name;
                                }
                                if (data.number) {
                                    inputArr[1].y = data.number;
                                    infos.number = data.number;
                                }
                                wx.setStorageSync("kttj_step3_info_people1", infos);
                                _this.setData({
                                    inputArr: inputArr
                                })
                            } else {
                                wx.showModal({
                                    title: '操作提示',
                                    content: data.description,
                                    showCancel: false,
                                    success: function (res) {
                                       
                                    }
                                })
                            }

                        }
                    }
                })
            }
        })
    },
    getCurrentWorkerInfo: function () {
        let winfo = wx.getStorageSync("workerInfo");
        if (winfo) {
            let inputArrTwo = this.data.inputArrTwo;
            inputArrTwo[0].y = winfo.zone;
            inputArrTwo[1].y = winfo.street;
            inputArrTwo[2].y = winfo.organization;
            this.setData({
                inputArrTwo: inputArrTwo
            })
        }
    },
    onchange: function (e) {
        let inputArr = this.data.inputArr;
        let id = e.target.id;
        let value = e.detail.value;
        if (id == "name") {
            inputArr[0].y = value;
            if (value) {
                inputArr[0].error = "";
            }
        }
        if (id == "number") {
            inputArr[1].y = value;
        }
        if (id == "mobile") {
            inputArr[2].y = value;
        }
        this.setData({
            inputArr: inputArr
        })
        let infos = wx.getStorageSync("kttj_step3_info_people1");
        if (!infos) {
            infos = {};
        }
        infos[id] = value;
        console.log(infos);
        wx.setStorageSync("kttj_step3_info_people1", infos);
    },
    goNext() {
        const _this = this;
        let params = wx.getStorageSync("kttj_step3_info_people1");
        let regNum = new RegExp('^[\u4E00-\u9FA5A-Za-z]+$');
        if (!params.name) {
            wx.showModal({
                title: '操作提示',
                content: "当事人姓名为必填！",
                showCancel: false,
                success: function (res) {
                    let inputArr = _this.data.inputArr
                    inputArr[0].error = "error";
                    _this.setData({
                        errorMsg: '请输入姓名，只能输入一名当事人',
                        inputArr: inputArr
                    })
                }
            })
            return;
        } else if (!regNum.test(params.name)){
            wx.showModal({
                title: '操作提示',
                content: "当事人姓名填写不合法！",
                showCancel: false,
                success: function (res) {
                    let inputArr = _this.data.inputArr
                    inputArr[0].error = "error";
                    _this.setData({
                        errorMsg: '姓名不合法，只能输入中文或英文',
                        inputArr: inputArr
                    })
                }
            })
            return;
        }
        wx.navigateTo({
            url: '../oral-applied/oral-applied',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("口头调解：oral-party");
        let infos = wx.getStorageSync("kttj_step3_info_people1");
        if (!infos) {
            wx.setStorageSync("kttj_step3_info_people1", {});
        } else {
            let inputArr = this.data.inputArr;
            inputArr[0].y = infos.name;
            inputArr[1].y = infos.number;
            inputArr[2].y = infos.mobile;
            this.setData({
                inputArr: inputArr
            })
        }
        this.getCurrentWorkerInfo();
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