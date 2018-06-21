// pages/apply/setp-four.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginLink: true,
    scrollId: 'three',
    setpArr: [
      { name: '事项类型', url: 'setp-one', id: 'one', dq: true, active: false, pass: true },
      { name: '事项名称', url: 'seto-two', id: 'two', dq: true, active: false, pass: true },
      { name: '阅读须知', url: 'setp-three', id: 'three', dq: true, active: false, pass: true },
      { name: '办理人', url: 'setp-four', id: 'four', dq: true, active: false, pass: false },
      { name: '办理方式', url: '#', id: 'five', dq: false, active: false, pass: false },
      { name: '填写信息', url: '#', id: 'six', dq: false, active: false, pass: false },
      { name: '上传材料', url: '#', id: 'seven', dq: false, active: false, pass: false },
      { name: '确认提交', url: '#', id: 'eight', dq: false, active: false, pass: false }
    ],
    typeArr: [
      { name: '本人申请', icon: 'icon-lawyer-fill', active: true, type: 'oneself' },
      { name: '委托申请', icon: 'icon-entrust', active: false, type: 'entrust' }
    ]
  },
  choiceType: function (e) {
    this.clear();
    let index = e.currentTarget.dataset.index;
    let arr = this.data.typeArr;
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      arr[i].active = false;
    }
    arr[index].active = true;
    this.setData({
      typeArr: arr
    });
    wx.setStorageSync('Apply', arr[index].type);
  },
  getNext() {
    wx.redirectTo({
      url: 'setp-five'
    });
    wx.setStorageSync('setpArr', []);
    wx.setStorageSync('StorNav', false);
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
  clear () {
    wx.setStorageSync('isOnLine', true);
    wx.setStorageSync('Apply', 'oneself');
    wx.setStorageSync('upFileObj', {}); // 清空表单材料
    wx.setStorageSync('busFileArr', {}); // 清空上传文件
    wx.setStorageSync('sevenSaveNavbar', {}); // 清空保存navbar
    wx.setStorageSync('setpArr', []); // 清空步骤提示
    wx.setStorageSync('StorNav', false);
    wx.setStorageSync('storEntitID', '');
    this.setData({
      setpArr: [
        { name: '事项类型', url: 'setp-one', id: 'one', dq: true, active: false, pass: true },
        { name: '事项名称', url: 'seto-two', id: 'two', dq: true, active: false, pass: true },
        { name: '阅读须知', url: 'setp-three', id: 'three', dq: true, active: false, pass: true },
        { name: '办理人', url: 'setp-four', id: 'four', dq: true, active: false, pass: false },
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
    console.log(app.appUrl);
    console.log(wx.getStorageSync('ItemCode'));
    if (wx.getStorageSync('Apply')) {
      let type = wx.getStorageSync('Apply');
      let arr = this.data.typeArr;
      if (type === 'oneself') {
        arr[0].active = true;
        arr[1].active = false;
      } else {
        arr[0].active = false;
        arr[1].active = true;
      }
      this.setData({
        typeArr: arr
      });
    } else {
      wx.setStorageSync('Apply', 'oneself');
    }
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