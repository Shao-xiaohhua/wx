// pages/linkage-choice/linkage-choice.js
//获取应用实例
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hyArr: [],
        choiceType:""
    },
    // 自定义方法
    cl: function (event) {
        let ind = event.currentTarget.dataset.index
        let id = event.currentTarget.dataset.id
        let tp = event.currentTarget.dataset.tp
        let arr = this.data.hyArr[tp].labelArr
        let Aarr = this.data.hyArr
        let len = arr.length
        if (arr[ind].check === true) {
            arr[ind].check = false;
            arr[ind].active = '';
            if(this.data.choiceType == "案由"){
                let anyou = app.globalData.formdata110_anyou;
                if(anyou.indexOf(id)!=-1){
                    anyou.splice(anyou.indexOf(id),1);
                    app.globalData.formdata110_anyou = anyou;
               }
            }else if (this.data.choiceType == "所在人群") {
                let suozairenqun = app.globalData.formdata110_suozairenqun;
                if (suozairenqun.indexOf(id) != -1) {
                    suozairenqun.splice(suozairenqun.indexOf(id), 1);
                    app.globalData.formdata110_suozairenqun = suozairenqun
                }
            } else if (this.data.choiceType == "处置情况") {
                let chuzhiqingkuang = app.globalData.formdata110_chuzhiqingkuang;
                if (chuzhiqingkuang.indexOf(id) != -1) {
                    chuzhiqingkuang.splice(chuzhiqingkuang.indexOf(id), 1);
                    app.globalData.formdata110_chuzhiqingkuang = chuzhiqingkuang
                }
            }
            console.log("去除参数");
        } else {
            arr[ind].check = true
            arr[ind].active = 'active'
            if (this.data.choiceType == "案由") {
                let anyou = app.globalData.formdata110_anyou;
                if (anyou.indexOf(id) == -1) {
                    anyou.push(id);
                    app.globalData.formdata110_anyou = anyou
                }
            } else if (this.data.choiceType == "所在人群") {
                let suozairenqun = app.globalData.formdata110_suozairenqun;
                if (suozairenqun.indexOf(id) == -1) {
                    suozairenqun.push(id);
                    app.globalData.formdata110_suozairenqun = suozairenqun
                }
            } else if (this.data.choiceType == "处置情况") {
                let chuzhiqingkuang = app.globalData.formdata110_chuzhiqingkuang;
                if (chuzhiqingkuang.indexOf(id) == -1) {
                    chuzhiqingkuang.push(id);
                    app.globalData.formdata110_chuzhiqingkuang = chuzhiqingkuang;
                }
            }
            console.log("增加参数");
        }
        console.log(app.globalData.formdata110_anyou);
        console.log(app.globalData.formdata110_suozairenqun);
        console.log(app.globalData.formdata110_chuzhiqingkuang);
        Aarr[tp].labelArr = arr
        this.setData({
            hyArr: Aarr
        })
    },
    clear: function () {
        let len = this.data.hyArr.length
        let item = this.data.hyArr
        for (let i = 0; i < len; i++) {
            let ineLen = item[i].labelArr.length
            for (let j = 0; j < ineLen; j++) {
                item[i].labelArr[j].check = false
                item[i].labelArr[j].active = ''
            }
        }
        app.globalData.formdata110_anyou = [];
        app.globalData.formdata110_suozairenqun = [];
        app.globalData.formdata110_chuzhiqingkuang = [];
        this.setData({
            hyArr: item
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCategory(options.id, options.name);
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

    getCategory:function(id,name){
        const _this = this;
        wx.request({
            url: app.globalData.$ctx + '/wechatMini/getCategory',
            data: {
                id: id
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                var data = res.data;
                console.log(data);
                let hyArr = [];
                if (data != null) {
                    _this.setData({
                        choiceType : name
                    })
                    if (name=="所在人群"){
                        let html = { title: name };
                        let labelArr = [];
                        for(let i=0;i<data.length;i++){
                            let active = "";
                            let check = false;
                            if (app.globalData.formdata110_suozairenqun.indexOf(data[i].id)!=-1){
                                active = "active";
                                check = true;
                            }
                            let datai = { name: data[i].name, id: data[i].id, check: check, active: active};
                            labelArr.push(datai);
                        }
                        html.labelArr = labelArr;
                        hyArr.push(html);
                    } else if (name == "处置情况") {
                        let html = { title: name };
                        let labelArr = [];
                        for (let i = 0; i < data.length; i++) {
                            let active = "";
                            let check = false;
                            if (app.globalData.formdata110_chuzhiqingkuang.indexOf(data[i].id) != -1) {
                                active = "active";
                                check = true;
                            }
                            let datai = { name: data[i].name, id: data[i].id, check: check, active: active };
                            labelArr.push(datai);
                        }
                        html.labelArr = labelArr;
                        hyArr.push(html);
                    }else if(name=="案由"){
                        for (let i = 0; i < data.length; i++) {
                            let html = {title: data[i].name,id:data[i].id};
                            let labelArr = [];
                            let childNodes = data[i].childNodes;
                            console.log(childNodes);
                            for (let y = 0; y < childNodes.length;y++){
                                let active = "";
                                let check = false;
                                if (app.globalData.formdata110_anyou.indexOf(childNodes[y].id) != -1) {
                                    active = "active";
                                    check = true;
                                }
                                let datay = { name: childNodes[y].name, id: childNodes[y].id, check: check, active: active };
                                labelArr.push(datay);
                            }
                            html.labelArr = labelArr;
                            hyArr.push(html);
                        }
                    }
                    _this.setData({
                        hyArr: hyArr
                    });
                }
            }
        })
    },
    next:function(){
        wx.navigateBack({
            delta: 1
        });
    }

})