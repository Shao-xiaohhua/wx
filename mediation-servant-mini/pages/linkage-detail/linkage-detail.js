// pages/linkage-detail/linkage-detail.js
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // ldArr: [
        //     { tp: '案件信息', ct: ''},
        //     { tp: '案件类型', ct: '' },
        //     { tp: '案件描述', ct: '' },
        //     { tp: '案件地址', ct: '' },
        //     { tp: '案件时间', ct: '' },
        //     { tp: '案件编号', ct: '' }
        // ],
        // dsrArr: [
        //     { tp: '当事人信息', ct: '' },
        //     { tp: '姓名', ct: '无' },
        //     { tp: '手机号码', ct: '18301844444' },
        //     { tp: '报警人', ct: '无' }
        // ],
        listArr: [
            {
                name: '调解信息', list: [
                    { title: '案件类型', content: '', css: 'blue' },
                    { title: '案件描述', content: '' },
                    { title: '案件时间', content: '' },
                    { title: '案件地址', content: '' },
                    { title: '案件编号', content: '' }
                ]
            },
            {
                name: '当事人信息', list: [
                    { title: '姓名', content: '' },
                    { title: '手机号码', content: '' }
                ]
            }
        ],
        currentInfoId: "",
        isTiaoweihui: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            currentInfoId: options.id
        })
        this.getInfo();
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

    getInfo: function () {
        const _this = this;
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/getInfoDetail110',
            data: {
                id: _this.data.currentInfoId
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                var data = res.data;
                console.log(data);
                let listArr = _this.data.listArr;
                let ldArr = listArr[0].list;
                let dsrArr = listArr[1].list;
                if (data != null) {
                    if (data.anyou != null) {
                        app.globalData.formdata110_anyou = data.anyou;
                    }
                    if (data.anyou != null) {
                        app.globalData.formdata110_suozairenqun = data.suozairenqun;
                    }
                    if (data.anyou != null) {
                        app.globalData.formdata110_chuzhiqingkuang = data.chuzhiqingkuang;
                    }

                    ldArr[0].content = data.type;
                    ldArr[1].content = data.description;
                    ldArr[3].content = data.address;
                    ldArr[2].content = data.time;
                    ldArr[4].content = data.number;
                    dsrArr[0].content = data.name;
                    dsrArr[1].content = data.mobile;
                    listArr[0].list = ldArr;
                    listArr[1].list = dsrArr;
                    console.log(listArr);
                    let ist = data.isTiaoweihui;
                    _this.setData({
                        listArr: listArr,
                        isTiaoweihui: ist
                    });
                }
            }
        })
    },

    //打电话
    call: function () {
        let phoneNumber = this.data.listArr[1].list[1].content;
        console.log(phoneNumber);
        wx.makePhoneCall({
            phoneNumber: phoneNumber
        })
    }
})