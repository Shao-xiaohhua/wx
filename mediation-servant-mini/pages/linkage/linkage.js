// pages/linkage/linkage.js

//获取应用实例
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabArr: [
            { name: '全部', number: 0, cl: 'active' },
            { name: '未反馈', number: 0, cl: '' },
            { name: '已过期', number: 0, cl: '' }
        ],              //选项卡头
        listArr: [],    //信息列表
        //contArr: [],   //信息列表
        infoStatus: "",  //信息状态
        currentPage: 1,  //当前页面
        totalPage: 0,    //总页面数
        hidden: true    //加载动画
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.infostatus){
            let newArr = this.data.tabArr;
            newArr[0].cl = '';
            newArr[1].cl = 'active';
            this.setData({
                infoStatus: "weifankui",
                tabArr: newArr
            })
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
        console.log("展示列表=========================" + this.data.infoStatus);
        this.getInfoCount();
        this.setData({
            hidden: false,
            listArr:[]
        })
        this.getInfoList();
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

    },
    // 自定义事件
    ck: function (event) {
        this.data.currentPage = 1;  //设置当前页面为1
        this.data.listArr = [];     //清空当前页内容
        //this.data.contArr = [];     //清空当前页内容
        this.setData({
            hidden: false
        })
        let idx = parseInt(event.currentTarget.dataset.index);
        let newArr = this.data.tabArr;
        let len = newArr.length;
        for (let i = 0; i < len; i++) {
            newArr[i].cl = ''
        }
        newArr[idx].cl = 'active'
        this.setData({
            tabArr: newArr
        })
        //选项卡展示信息状态
        if (idx == 0) {
            console.log("page1");
            this.setData({
                infoStatus: ""
            })
        } else if (idx == 1) {
            console.log("page2");
            this.setData({
                infoStatus: "weifankui"
            })
        } else if (idx == 2) {
            console.log("page3");
            this.setData({
                infoStatus: "yiguoqi"
            })
        }
        //重新加载列表
        this.getInfoCount();
        this.getInfoList();
    },

    //获取信息统计
    getInfoCount: function () {
        const _this = this;
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/infoCount110',
            data: {
                personId: wx.getStorageSync("__session__").session
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                var data = res.data;
                console.log(res.data)
                let tabArr = _this.data.tabArr;
                if (data != null && data.code==1) {
                    tabArr[0].number = res.data.total;
                    tabArr[1].number = res.data.weifankui;
                    tabArr[2].number = res.data.yiguoqi;
                    _this.setData({
                        tabArr: tabArr
                    })
                }
            }
        })
    },


    //获取信息列表
    getInfoList: function () {
        const _this = this;
        let statusText = "";
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/searchinfo110',
            data: {
                personId: wx.getStorageSync("__session__").session,
                status: _this.data.infoStatus,
                pageSize: 20,
                page: _this.data.currentPage
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data)
                //let contArr = _this.data.contArr;
                let listArr = _this.data.listArr;
                var infoList = res.data.items;
                if (infoList != null) {
                    for (let i = 0; i < infoList.length; i++) {
                        var info = infoList[i];
                        var html = { 
                            title: info.type,
                            url: '../linkage-detail/linkage-detail?id=' + info.id, 
                            time: info.time, 
                            name: info.name, 
                            phone: info.mobile, 
                            tag: info.status, 
                            tagSwite: 'active' 
                        }
                        listArr.push(html);

                        // var html = {
                        //     time: info.time, url: '../linkage-detail/linkage-detail?id=' + info.id, active: info.status, list: [
                        //         { tp: '姓名', ct: info.name },
                        //         { tp: '性别', ct: info.gender },
                        //         { tp: '纠纷类型', ct: info.type },
                        //         { tp: '案件地点', ct: info.address }
                        //     ], overdue: ''
                        // };
                        //contArr.push(html);
                    }
                    _this.setData({
                        hidden: true,
                        //contArr: contArr,
                        listArr: listArr,
                        totalPage: res.data.totalPage
                    });
                }
            }
        })
    }
})