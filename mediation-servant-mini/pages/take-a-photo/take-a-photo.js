
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: [
            { name: '咨询问题', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 4)' },
            { name: '咨询类型', url: '', now: 'now', pas: 'pass', width: 'calc(100% / 4)' },
            { name: '当事人信息', url: '', now: 'now', pas: '', width: 'calc(100% / 4)' },
            { name: '完成', url: '', now: '', pas: '', width: 'calc(100% / 4)' }
        ],
        inputArr: [
            { name: '姓名', n: 'name', ip: '请输入姓名', arrow: false, link: true, error: '', y: '' },
            { name: '身份号码', n: 'number', ip: '请输入身份证号', arrow: false, link: true, error: '', y: '' },
            { name: '联系电话', n: 'mobile', ip: '请输入联系电话', arrow: false, link: true, error: '', y: '' }
        ],
        inputArrTwo: [
            { name: '所在地区', n: 'zone', ip: '', arrow: false, link: false, error: '', y: '' },
            { name: '所在街道', n: 'street', ip: '', arrow: false, link: false, error: '', y: '' },
            { name: '所在居委会', n: 'committee', ip: '', arrow: false, link: false, error: '', y: '' }
        ],
        picUrl: '',
        picUrlSwite: false,
        errorMsg: '该信息为必填项'
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
                                let infos = wx.getStorageSync("zxlr_step3_info");
                                if (data.name) {
                                    inputArr[0].y = data.name;
                                    infos.name = data.name;
                                }
                                if (data.number) {
                                    inputArr[1].y = data.number;
                                    infos.number = data.number;
                                }
                                wx.setStorageSync("zxlr_step3_info", infos);
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
    submitForm: function (data) {
        const _this = this;
        let zixunwenti = wx.getStorageSync("zxlr_step1_info");
        let zixunleixing = wx.getStorageSync("zxlr_step2_info").types;
        let params = wx.getStorageSync("zxlr_step3_info");

        if (!zixunwenti) {
            wx.showModal({
                title: '操作提示',
                content: "您尚未填写咨询问题，请先填写，再保存",
                showCancel: false,
                success: function (res) {
                    wx.navigateBack({
                        delta: 2
                    });
                }
            })
            return;
        }
        if (zixunleixing == "") {
            wx.showModal({
                title: '操作提示',
                content: "您尚未选择咨询类型，请先选择，再保存",
                showCancel: false,
                success: function (res) {
                    wx.navigateBack({
                        delta: 1
                    });
                }
            })
            return;
        }
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
                        inputArr: inputArr
                    })
                }
            })
            return;
        } else if (!regNum.test(params.name)) {
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
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/submitZX',
            method: "POST",
            data: {
                personId: wx.getStorageSync("__session__").session,
                zixunwenti: zixunwenti,
                zixunleixing: zixunleixing,
                name: params.name,
                number: params.number,
                mobile: params.mobile
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                if (res.data) {
                    console.log(res.data);
                    if (res.data.code == 1) {
                        let s1 = wx.getStorageSync("zxlr_step1_info");
                        let s2 = wx.getStorageSync("zxlr_step2_info").types;
                        wx.removeStorageSync("zxlr_step1_info");
                        wx.removeStorageSync("zxlr_step2_info");
                        wx.removeStorageSync("zxlr_step3_info");
                        let s4 = res.data.count;
                        s4["text"] = s1;
                        s4["type"] = s2;
                        wx.setStorageSync("zxlr_step4_data", s4);
                        wx.reLaunch({
                            url: '../consultation-done/consultation-done'
                        })
                    }
                }
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("咨询录入：take-a-photo");
        let infos = wx.getStorageSync("zxlr_step3_info");
        if (!infos) {
            wx.setStorageSync("zxlr_step3_info", {});
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

    },
    toFirstPage: function () {
        wx.navigateBack({
            delta: 2
        });
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
        let infos = wx.getStorageSync("zxlr_step3_info");
        if (!infos) {
            infos = {};
        }
        infos[id] = value;
        console.log(infos);
        wx.setStorageSync("zxlr_step3_info", infos);
    },

})