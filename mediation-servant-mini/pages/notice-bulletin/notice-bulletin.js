// pages/notice-bulletin/notice-bulletin.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listArr: [],
        currentPage: 1,  //当前页面
        totalPage: 0,    //总页面数
        hidden: true,    //加载动画
        keyWord:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getNotice();
    },
    //获取信息列表 { name: '', id: '', time: '', content: '' },
    getNotice: function () {
        const _this = this;
        let statusText = "";
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/notice',
            data: {
                personId: wx.getStorageSync("__session__").session,
                pageSize: 10,
                page: _this.data.currentPage,
                keyWord: _this.data.keyWord
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data)
                let listArr = _this.data.listArr;
                var infoList = res.data.items;
                console.log(infoList)
                if (infoList != null) {
                    for (let i = 0; i < infoList.length; i++) {
                        var info = infoList[i];
                        var html = {
                            title: info.title,
                            url: '../notice-bulletin-detail/notice-bulletin-detail?id=' + info.id,
                            time: info.date,
                            content: info.content
                        }
                        listArr.push(html);
                    }
                    _this.setData({
                        hidden: true,
                        listArr: listArr,
                        totalPage: res.data.totalPage
                    });
                }else{
                    _this.setData({
                        hidden: true
                    });
                }
            }
        })
    },
    search:function(e){
        console.log(e.detail.value);
        this.setData({
            listArr: [],
            currentPage: 1,  //当前页面
            totalPage: 0,    //总页面数
            hidden: true,    //加载动画
            keyWord:e.detail.value
        });
        this.getNotice();
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
        let currp = this.data.currentPage;
        let totalp = this.data.totalPage;
        if (currp < totalp) {
            this.setData({
                currentPage: currp + 1
            })
            this.getInfoList();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})