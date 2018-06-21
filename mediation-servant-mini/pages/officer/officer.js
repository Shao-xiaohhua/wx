// pages/officer/officer.js
const app = getApp();
const util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabSwite: [
            { active: true },
            { active: false }
        ],
        lawArr: [
            // {
            //     "tiaokuan": "第三十二条第三款",
            //     "name": "《中华人民共和国婚姻法》",
            //     "id": "488611b881cafbebeed474aa4b59e4ed",
            // }
        ],
        caseArr: [
            // {
            //     "title": "庄某某与梁某某离婚纠纷一审民事判决书",
            //     "id": "32b48c896098baba77a317fde50ad6b2",
            //     "time": 1458662400000,
            //     "court": "赤峰市松山区人民法院",
            //     "type": "判决书"
            // }
        ],
        hidden:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            hidden:false
        })
        let jiufenxinxi = "";
        let jiufenleixing = "";
        if(options.action){
            if(options.action == "kttj"){
                jiufenxinxi = wx.getStorageSync("kttj_step1_info");
                jiufenleixing = wx.getStorageSync("kttj_step2_info").types;
            } else if (options.action == "zxlr"){
                jiufenxinxi = wx.getStorageSync("zxlr_step4_data").text;
                jiufenleixing = wx.getStorageSync("zxlr_step4_data").type;
            }
        }
        console.log("智能辅助参数：来源="+options.action+",描述="+jiufenxinxi+",类型="+jiufenleixing);
        this.getData(jiufenxinxi, jiufenleixing);
    },
    getData: function (jiufenxinxi, jiufenleixing){
        const _this = this;
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/getQingdunDataList',
            data: {
                cause: jiufenleixing,
                text: jiufenxinxi
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                var data = res.data;
                if(data.msg=="success"){
                    _this.setData({
                        hidden: true
                    })
                    console.log(data);
                    let lawArr = _this.data.lawArr;
                    let caseArr = _this.data.caseArr;
                    let laws = data.data.law;
                    let cases = data.data.cases;
                    if(laws){
                        for (let i = 0; i < laws.length; i++) {
                           let law = {tiaokuan:laws[i].item,name:laws[i].name,id:laws[i].id};
                           lawArr.push(law);
                        }
                        _this.setData({
                            lawArr:lawArr
                        }); 
                    }
                    if(cases){
                        for (let i = 0; i < cases.length; i++) {
                            let time = "";
                            if (cases[i].time){
                                time = util.formatTime(new Date(cases[i].time));
                            }
                            let ca = { type: cases[i].type, court: cases[i].court, time: time, title: cases[i].name, id: cases[i].id};
                            caseArr.push(ca);
                        }
                        _this.setData({
                            caseArr: caseArr
                        }); 
                    }
                }else{
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

    },
    tabItem(event) {
        let e = event.currentTarget.dataset.id;
        let arr = this.data.tabSwite;
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            arr[i].active = false
        };
        arr[e].active = true;
        this.setData({
            tabSwite: arr
        });
    }
})