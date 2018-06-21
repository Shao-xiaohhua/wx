// pages/calc-choice/calc-choice.js
var database = require('../../utils/calc-static-data.js');
Page({
    /**
    * 页面的初始数据
    */
    data: {
        list:[],
        choiceData: {
            pindex:0,
            cindex:0,
            title:"",
            value:1,
            returnIndex:null,
        },
        pageN: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      if (!wx.getStorageSync('calc-result')) {
        wx.setStorageSync('calc-result', {})
      }
        let returnIndex = options.index;
        let type = options.type;
        let choiceData = this.data.choiceData
        choiceData.title = database[type][choiceData.pindex].childs[choiceData.cindex].title
        choiceData.returnIndex = returnIndex
        this.setData({
            list: database[type],
            choiceData: choiceData,
            pageN: options.type
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

    },
    onchange: function (event) {
        console.log(event);
        let arr = this.data.list;
        let ct = this.data.choiceData
        let pindex = event.currentTarget.dataset.pindex;
        let cindex = event.currentTarget.dataset.index;
        let title = event.currentTarget.dataset.title;
        let value = event.currentTarget.dataset.value;
        //先去掉原来选中的
        arr[ct.pindex].childs[ct.cindex].active = false;
        //标记当前选中的
        arr[pindex].childs[cindex].active = true;
        //存储选中值
        ct.pindex = pindex;
        ct.cindex = cindex;
        ct.title = title;
        ct.value = value;
        this.setData({
            choiceData: ct,
            list: arr
        })
        console.log(this.data.choiceData);
    },
    next:function(){
        wx.setStorageSync("calc-choiceData", this.data.choiceData);
        let chAr = wx.getStorageSync('calc-result')
        let newChar = chAr
        let typ = this.data.pageN
        if (typ === 'caseTypeArr') {
          newChar.tp = this.data.choiceData.title
          wx.setStorageSync('calc-result', newChar)
        } else if (typ === 'court') {
          newChar.dq = this.data.choiceData.title
          wx.setStorageSync('calc-result', newChar)
        }
        console.log(newChar)
        console.log(this.data.pageN)
        wx.navigateBack({
            delta:1
        })
    }

})