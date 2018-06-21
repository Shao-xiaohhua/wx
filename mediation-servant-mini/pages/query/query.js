// pages/query/query.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   tagArr: [
     { name: '交通意外', url: '' },
     { name: '医疗事故', url: '' },
     { name: '拆迁问题', url: '' },
     { name: '热搜', url: '' }
   ],
   linkArr: [
     {title: '类型查询', list: [
       { name: '交通', icon: 'icon-signal', color: 'orang', url: ''},
       { name: '劳动', icon: 'icon-labour', color: 'yellow', url: '' },
       { name: '房产', icon: 'icon-house', color: 'green', url: '' },
       { name: '侵权', icon: 'icon-tort', color: 'zi', url: '' },
       { name: '物业', icon: 'icon-property', color: 'blue', url: '' },
       { name: '综合', icon: 'icon-comprehensive', color: 'orang', url: '' }
     ]}
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