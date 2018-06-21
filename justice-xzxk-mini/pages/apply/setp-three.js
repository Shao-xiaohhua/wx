// pages/apply/setp-three.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginLink: true,
    scrollId: 'two',
    setpArr: [
      { name: '事项类型', url: 'setp-one', id: 'one', dq: true, active: false, pass: true },
      { name: '事项名称', url: 'seto-two', id: 'two', dq: true, active: false, pass: true },
      { name: '阅读须知', url: 'setp-three', id: 'three', dq: true, active: false, pass: false },
      { name: '办理人', url: '#', id: 'four', dq: false, active: false, pass: false },
      { name: '办理方式', url: '#', id: 'five', dq: false, active: false, pass: false },
      { name: '填写信息', url: '#', id: 'six', dq: false, active: false, pass: false },
      { name: '上传材料', url: '#', id: 'seven', dq: false, active: false, pass: false },
      { name: '确认提交', url: '#', id: 'eight', dq: false, active: false, pass: false }
    ],
    nextSwite: false
  },
  gotNext () {
    if (wx.getStorageSync('wxLoginSwite')) {
      if (this.data.nextSwite) {
        wx.redirectTo({
          url: 'setp-four'
        });
        wx.setStorageSync('setp-to-register', false);
        this.clear();
      }
    } else {
      wx.navigateTo({
        url: '../user/register'
      });
      wx.setStorageSync('setp-to-register', true);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  checkboxChange (e) {
    this.setData({
      nextSwite: !this.data.nextSwite
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  clear () {
    wx.setStorageSync('upFileObj', {}); // 清空表单材料
    wx.setStorageSync('busFileArr', {}); // 清空上传文件
    wx.setStorageSync('sevenSaveNavbar', {}); // 清空保存navbar
    wx.setStorageSync('setpArr', []);
    wx.setStorageSync('StorNav', false);
    wx.setStorageSync('storEntitID', '');
    this.setData({
      setpArr: [
        { name: '事项类型', url: 'setp-one', id: 'one', dq: true, active: false, pass: true },
        { name: '事项名称', url: 'seto-two', id: 'two', dq: true, active: false, pass: true },
        { name: '阅读须知', url: 'setp-three', id: 'three', dq: true, active: false, pass: false },
        { name: '办理人', url: '#', id: 'four', dq: false, active: false, pass: false },
        { name: '办理方式', url: '#', id: 'five', dq: false, active: false, pass: false },
        { name: '填写信息', url: '#', id: 'six', dq: false, active: false, pass: false },
        { name: '上传材料', url: '#', id: 'seven', dq: false, active: false, pass: false },
        { name: '确认提交', url: '#', id: 'eight', dq: false, active: false, pass: false }
      ]
    });
  },
  onShow: function () {
    if (wx.getStorageSync('wxLoginSwite')) {
      this.setData({
        loginLink: false
      });
    } else {
      this.setData({
        loginLink: true
      });
    }
    console.log(wx.getStorageSync('ItemCode'));
    if (wx.getStorageSync('StorNav')) {
      this.setData({
        setpArr: wx.getStorageSync('setpArr')
      });
    }
    if (!wx.getStorageSync('setpArr').length) {
      wx.setStorageSync('setpArr', this.data.setpArr);
    }
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
  getStorNav() {
    wx.setStorageSync('StorNav', true);
  }
})