// pages/record-detail/investigation-detail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listArr: [
            {
                name: '调解信息', list: [
                    { title: '案件类型', content: '', css: 'blue' },
                    {
                        title: '案件描述', content: ''
                    },
                    { title: '申请事项', content: '' },
                    { title: '履行时间', content: '' },
                    { title: '案件状态', content: '' },
                    { title: '案件时间', content: '' }
                ]
            },
            {
                name: '当事人信息', list: [
                    { title: '姓名', content: '' },
                    { title: '手机号码', content: '' }
                ]
            }
        ],
        ts: '',
        allowEdit: "none",
        status: "",
        datas: null,
        url:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id
        console.log(options.id)
        this.getDetail(id)
    },
    getDetail(id) {
        const that = this
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/mbmCaseDetail',
            dataType: 'json',
            method: 'GET',
            data: {
                id: id
            },
            success: function (json) {
                if (json.data.code === -1) {
                    that.setData({
                        ts: json.data.description
                    })
                } else {
                    let item = json.data;
                    if (item) {
                        console.log(item);
                        let arr = that.data.listArr
                        arr[0].list[0].content = item.type // 案件类型
                        arr[0].list[1].content = item.content // 案件描述
                        arr[0].list[2].content = item.items // 申请事项
                        arr[0].list[3].content = item.dateEnd // 履行时限
                        arr[0].list[4].content = item.statusStr // 案件状态
                        arr[0].list[5].content = item.date // 案件时间
                        arr[1].list[0].content = item.people1.name // 当事人姓名
                        arr[1].list[1].content = item.people1.mobile // 当事人联系方式
                        let allowEdit = "none";
                        let url = "";
                        //草稿、待办申请、正在调解、调解协议
                        console.log(item.status);               
                        if (item.status == "Drafted" || item.status == "Registered"){
                            allowEdit = "block";
                            url = "../oral/oral";
                        } else if (item.status == "IsMediate" || item.status == "Agreemented"){
                            allowEdit = "block";
                            url = "../oral-message/oral-message";
                        }
                        that.setData({
                            listArr: arr,
                            allowEdit: allowEdit,
                            status: item.status,
                            url: url,
                            datas:item
                        })
                    }
                }
            }
        })
    },
    edit:function(){
        let datas = this.data.datas;
        let kttj_edit_eid = datas.id;
        let kttj_step1_info = datas.content;
        let kttj_step2_info = {};
        kttj_step2_info.types = datas.typeIds;
        kttj_step2_info.types_index = -1;
        kttj_step2_info.pindex = -1;
        let kttj_step3_info_people1 = datas.people1;
        let kttj_step3_info_people2 = datas.people2;
        wx.setStorageSync("kttj_edit_eid", kttj_edit_eid);
        wx.setStorageSync("kttj_edit_status", this.data.status);
        wx.setStorageSync("kttj_step1_info", kttj_step1_info);
        wx.setStorageSync("kttj_step2_info", kttj_step2_info);
        wx.setStorageSync("kttj_step3_info_people1", kttj_step3_info_people1);
        wx.setStorageSync("kttj_step3_info_people2", kttj_step3_info_people2);
        wx.removeStorageSync("kttj_step4_info");
        wx.redirectTo({
            url: this.data.url
        })
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