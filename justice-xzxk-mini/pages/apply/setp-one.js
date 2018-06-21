// pages/apply/setp-one.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginLink: true,
    scrollId: 'one',
    setpArr: [
      { name: '事项类型', url: 'setp-one', id: 'one', dq: true, active: false, pass: false },
      { name: '事项名称', url: '#', id: 'two', dq: false, active: false, pass: false },
      { name: '阅读须知', url: '#', id: 'three', dq: false, active: false, pass: false },
      { name: '办理人', url: '#', id: 'four', dq: false, active: false, pass: false },
      { name: '办理方式', url: '#', id: 'five', dq: false, active: false, pass: false },
      { name: '填写信息', url: '#', id: 'six', dq: false, active: false, pass: false },
      { name: '上传材料', url: '#', id: 'seven', dq: false, active: false, pass: false },
      { name: '确认提交', url: '#', id: 'eight', dq: false, active: false, pass: false }
    ],
    typeArr: [
      { name: '个人事项', icon: 'icon-lawyer-fill', active: true, geJg: true },
      { name: '机构事项', icon: 'icon-girm-fill', active: false, geJg: false }
    ]
  },
  choiceType: function (e) {
    this.clear();
    let index = e.currentTarget.dataset.index;
    let type = e.currentTarget.dataset.type;
    wx.setStorageSync('isPersonalItem', type);
    let arr = this.data.typeArr;
    let len = arr.length;
    for (let i = 0; i <len; i++) {
      arr[i].active = false;
    }
    arr[index].active = true;
    this.setData({
      typeArr: arr
    });
  },
  getNext () {
    wx.setStorageSync('bz1', {});
    wx.setStorageSync('bz2', {});
    wx.setStorageSync('bz3', {});
    wx.setStorageSync('StorNav', false);
    wx.redirectTo({
      url: 'seto-two'
    });
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
    wx.setStorageSync('isPersonalItem', true);
    wx.setStorageSync('upFileObj', {}); // 清空表单材料
    wx.setStorageSync('busFileArr', {}); // 清空上传文件
    wx.setStorageSync('sevenSaveNavbar', {}); // 清空保存navbar
    wx.setStorageSync('setpArr', []); // 清空步骤条
    wx.setStorageSync('bz1', {});
    wx.setStorageSync('bz2', {});
    wx.setStorageSync('bz3', {});
    wx.setStorageSync('StorNav', false);
    wx.setStorageSync('storEntitID', '');
    this.setData({
      setpArr: [
        { name: '事项类型', url: 'setp-one', id: 'one', dq: true, active: false, pass: false },
        { name: '事项名称', url: '#', id: 'two', dq: false, active: false, pass: false },
        { name: '阅读须知', url: '#', id: 'three', dq: false, active: false, pass: false },
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
    console.log(app.appUrl);
    if (wx.getStorageSync('isPersonalItem') === true) {
      let arr = this.data.typeArr;
      arr[0].active = true;
      arr[1].active = false;
      this.setData({
        typeArr: arr
      });
    } else if (wx.getStorageSync('isPersonalItem') === false) {
      let arr = this.data.typeArr;
      arr[0].active = false;
      arr[1].active = true;
      this.setData({
        typeArr: arr
      });
    } else {
      wx.setStorageSync('isPersonalItem', true);
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