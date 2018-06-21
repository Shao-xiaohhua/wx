// pages/assistant/assistant.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        assArr: [
            {
                title: '常用知识库', list: [
                    //{ name: '法律法规', icon: 'icon-statute', color: 'blue', url: '../query/query', nameTwo: '' },
                    { name: '机构查询', icon: 'icon-mechanism', color: 'green', url: '../jigou-query/jigou-query', nameTwo: '' },
                    { name: '人员查询', icon: 'icon-expert-database', color: 'orange', url: '../renyuan-query/renyuan-query', nameTwo: '' },
                    //{ name: '案例查询', icon: 'icon-anli', color: 'yellow', url: '' }
                ]
            },
            {
                title: '智慧工具', list: [
                    { name: '诉讼费', icon: 'icon-litigation', color: 'blue', url: '../calc-ssf/calc-ssf', nameTwo: '计算器' },
                    { name: '工伤赔偿', icon: 'icon-injury', color: 'green', url: '../calc-gspc/calc-gspc', nameTwo: '计算器' },
                    { name: '医疗期', icon: 'icon-mechanism', color: 'orange', url: '../calc-ylq/calc-ylq', nameTwo: '计算器' },
                    { name: '病假工资', icon: 'icon-id', color: 'blue', url: '../calc-bjgz/calc-bjgz', nameTwo: '计算器' },
                    // { name: '智能咨询', icon: 'icon-roba', color: 'green', url: '../znzx/znzx?hts=https://h5.law.push.aegis-info.com/html/index?id=5748', nameTwo: '' },
                    { name: '在线调解', icon: 'icon-consultation', color: 'orange', url: '../mediate-online/mediate-online', nameTwo: '' }
                ]
            },
            {
                title: '普法学法', list: [
                    { name: '普法视频', icon: 'icon-v', color: 'orange', url: '../study-of-law-web-view/study-of-law-web-view?ur=https://12348.justice.gov.cn/m/miniApps/video/index.jsp', nameTwo: '' },
                    { name: '指导案例', icon: 'icon-case', color: 'yellow', url: '../study-of-law-web-view/study-of-law-web-view?ur=https://12348.justice.gov.cn/m/miniApps/judgement/index.jsp', nameTwo: '' },
                    { name: 'O2O', icon: 'icon-expert', color: 'blue', url: '../study-of-law-web-view/o2o', nameTwo: '法治沙龙' },
                    { name: '法律服务', icon: 'icon-expert-database', color: 'green', url: '../study-of-law-web-view/fwdt', nameTwo: '动态' },
                    { name: '司法行政', icon: 'icon-task', color: 'orange', url: '../study-of-law-web-view/sfxz', nameTwo: '法律法规' },
                    { name: '司法行政', icon: 'icon-party', color: 'blue', url: '../study-of-law-web-view/zyal', nameTwo: '专业案例' },
                    { name: '经典问答', icon: 'icon-investigation', color: 'yellow', url: '../study-of-law-web-view/study-of-law-web-view?ur=https://12348.justice.gov.cn/m/miniApps/laq/index.jsp', nameTwo: '' },
                    { name: '法律服务', icon: 'icon-mechanism', color: 'green', url: '../study-of-law-web-view/jdwd', nameTwo: '指引' }
                ]
            },
            //   {
            //     title: '案例分析', list: [
            //       { name: '类似纠纷', icon: 'icon-mediate', color: 'orange', url: '', nameTwo: '智能分析' },
            //       { name: '类似当事人', icon: 'icon-party', color: 'green', url: '', nameTwo: '智能分析' },
            //       { name: '类似案件', icon: 'icon-case', color: 'blue', url: '', nameTwo: '智能分析' }
            //     ]
            //   },
            //   {
            //     title: '专家咨询', list: [
            //       { name: '专家咨询', icon: 'icon-expert', color: 'blue', url: '', nameTwo: '' }
            //     ]
            //   }
        ]
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {

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