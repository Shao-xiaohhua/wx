// pages/officer-detail/officer-detail.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lawData: {
            id: "",
            name: "",//法律名称
            item: "",//条款
            content: "",//内容
            effective: "",//效力级别
            aging: ""//时效性
        },
        caseData: {
            id: "",
            title: "",//标题
            gist: "",//裁判要旨
            number: "",//案件编号
            court: "",//法院
            time: "",//时间
            cause: "",//案由
            type: "",//文书类型
            grade: "",//审理程序
            content: ""//正文
        },
        isLaw:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id;
        let type = options.type;
        if(type==2){
            this.setData({
                isLaw:false
            })
        }
        this.getData(id, type);
    },
    getData: function (id, type) {
        const _this = this;
        console.log("id:"+id+",type:"+type);
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/getQingdunDataDetail',
            data: {
                id: id,
                type: type
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                var data = res.data;
                console.log("data值:");
                console.log(data);
                if (data.msg == "success") {
                    _this.setData({
                        hidden: true
                    })
                    console.log(data);
                    let lawData = _this.data.lawData;
                    let caseData = _this.data.caseData;
                    if(type==1){
                        let laws = data.data.law;
                        console.log("laws值：");
                        console.log(laws);
                        if (laws) {
                            lawData.id = laws.id ? laws.id : "";
                            lawData.name = laws.name ? laws.name : "";
                            lawData.item = laws.item ? laws.item : "";
                            lawData.content = laws.text ? laws.text : "";
                            lawData.effective = laws.effective ? laws.effective : "";//效力级别
                            lawData.aging = laws.aging ? laws.aging : "";//时效性
                            _this.setData({
                                lawData: lawData
                            });
                            console.log("this lawData:");
                            console.log(_this.data.lawData);
                        }
                    }else if(type==2){
                        let cases = data.data.info;
                        console.log("cases值：");
                        console.log(cases);
                        if (cases) {
                            caseData.id = cases.id ? cases.id : "";
                            caseData.title = cases.name ? cases.name : "";
                            caseData.gist = cases.gist ? cases.gist : "";
                            caseData.number = cases.caseNumber ? cases.caseNumber : "";
                            caseData.court = cases.court ? cases.court : "";
                            caseData.time = cases.time ? cases.time : "";
                            caseData.cause = cases.causeStr ? cases.causeStr : "";
                            caseData.type = cases.type ? cases.type : "";
                            caseData.grade = cases.grade ? cases.grade : "";
                            caseData.content = cases.text ? cases.text : "";
                            _this.setData({
                                caseData:caseData
                            });
                            console.log("this caseData:");
                            console.log(_this.data.caseData);
                        }
                    }
                } else {
                    _this.setData({
                        hidden: true
                    })
                }
            }
        })
        setTimeout(() => {
            _this.setData({
                hidden: true
            })
        }, 30000)
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