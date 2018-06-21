// pages/mediate-online/mediate-online-detail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listArr: [
            {
                name: '预约人基本信息', list: [
                    { title: '姓　　名', content: '', css: 'blue' },
                    { title: '身份证号', content: '' },
                    { title: '联系方式', content: '' },
                    { title: '联系地址', content: '' },
                    { title: '预约调委会', content: '' },
                    { title: '预约时间', content: '' },
                    { title: '预约人简介', content: '' }
                ]
            },
        ],
        currentInfoId: "",
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
            url: app.globalData.$ctx + '/wechatMini/mbmMediationReserveDetail',
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
                let datas0 = listArr[0].list;
                if (data != null) {

                    datas0[0].content = data.name;
                    datas0[1].content = data.idNumber;
                    datas0[2].content = data.mobile;
                    datas0[3].content = data.address;
                    datas0[4].content = data.mediationCommitteeName;
                    datas0[5].content = data.date;
                    datas0[6].content = data.description;
                    listArr[0].list = datas0;
                    console.log(listArr);
                    _this.setData({
                        listArr: listArr,
                    });
                }
            }
        })
    },

    //打电话
    call: function () {
        let phoneNumber = this.data.listArr[0].list[2].content;
        console.log(phoneNumber);
        wx.makePhoneCall({
            phoneNumber: phoneNumber
        })
    }
})