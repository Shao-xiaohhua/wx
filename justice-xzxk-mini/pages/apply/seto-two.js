// pages/apply/seto-two.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginLink: true,
    scrollId: 'one',
    setpArr: [
      { name: '事项类型', url: 'setp-one', id: 'one', dq: true, active: false, pass: true },
      { name: '事项名称', url: 'seto-two', id: 'two', dq: true, active: false, pass: false },
      { name: '阅读须知', url: '#', id: 'three', dq: false, active: false, pass: false },
      { name: '办理人', url: '#', id: 'four', dq: false, active: false, pass: false },
      { name: '办理方式', url: '#', id: 'five', dq: false, active: false, pass: false },
      { name: '填写信息', url: '#', id: 'six', dq: false, active: false, pass: false },
      { name: '上传材料', url: '#', id: 'seven', dq: false, active: false, pass: false },
      { name: '确认提交', url: '#', id: 'eight', dq: false, active: false, pass: false }
    ],
    getMechanism: [],
    getBusinessType: [],
    getMajorCode: [],
    swiperIndex: 0,
    nextSwite: false,
    hiddenLoading: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  AgetMechanism () { // 获取主列表
    this.setData({
      getMechanism: [],
      getBusinessType: [],
      getMajorCode: [],
      swiperIndex: 0,
      nextSwite: false,
      hiddenLoading: false
    })
    wx.setStorageSync('BusinessType', '');
    wx.setStorageSync('ItemCode', '');
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.getMechanism;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      method: 'POST',
      success: data => {
        this.setData({
          hiddenLoading: true,
          getBusinessType: [],
          getMajorCode: [],
          getMechanism: []
        });
        console.log(data)
        if (data.data.length) {
          let dataArr = data.data;
          for (let i = 0; i < dataArr.length; i++) {
            dataArr[i].active = false
          }
          this.setData({
            getMechanism: dataArr
          });
        }
      }
    })
  },
  AgetBusinessType (e) { // 获取次级列表
    this.setData({
      hiddenLoading: false
    });
    let val = '';
    let geJg = '';
    if (wx.getStorageSync('BusinessType')) {
      val = wx.getStorageSync('BusinessType');
      geJg = wx.getStorageSync('isPersonalItem');
      let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.getBusinessType;
      console.log(url)
      wx.request({
        url: url,
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType: 'json',
        method: 'POST',
        data: {
          businessType: val,
          isPersonalItem: geJg
        },
        success: data => {
          console.log(data.data)
          this.setData({
            hiddenLoading: true,
            getBusinessType: [],
            getMajorCode: []
          });
          if (data.data.length) {
            let dataArr = data.data;
            for (let i = 0; i < dataArr.length; i++) {
              dataArr[i].active = false
            }
            this.setData({
              getBusinessType: dataArr,
              swiperIndex: 1,
              nextSwite: false
            });
            wx.setStorageSync('ItemCode', '')
          }
          console.log(this.data.swiperIndex)
        }
      })
    } else {
      this.setData({
        getBusinessType: [],
        getMajorCode: []
      })
    }
  },
  AgetMajorCode () { // 获取三级列表
    this.setData({
      hiddenLoading: false,
      getMajorCode: []
    });
    let val = '';
    if (wx.getStorageSync('MajorCode')) {
      val = wx.getStorageSync('MajorCode');
      let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.getMajorCode;
      wx.request({
        url: url,
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType: 'json',
        method: 'POST',
        data: {
          majorCode: val
        },
        success: data => {
          console.log(data);
          this.setData({
            hiddenLoading: true
          });
          if (data.data.length) {
            let dataArr = data.data;
            for (let i = 0; i < dataArr.length; i++) {
              dataArr[i].active = false
            }
            this.setData({
              getMajorCode: dataArr,
              swiperIndex: 2,
              nextSwite: false
            });
            wx.setStorageSync('ItemCode', '');
          }
        }
      })
    }
  },
  getBtype (e) {
    this.clear();
    let type = e.currentTarget.dataset.type;
    let name = e.currentTarget.dataset.name;
    let index = e.currentTarget.dataset.index;
    let newgetMechanism = this.data.getMechanism;
    for (let i = 0; i < newgetMechanism.length; i++) {
      newgetMechanism[i].active = false
    }
    newgetMechanism[index].active = true;
    this.setData({
      getMechanism: newgetMechanism
    });
    wx.setStorageSync('bz1', newgetMechanism);
    wx.setStorageSync('bz2', {});
    wx.setStorageSync('bz3', {});
    wx.setStorageSync('BusinessType', type);
    this.AgetBusinessType();
    let busAr = wx.getStorageSync('busStr');
    busAr[0] = name;
    busAr[1] = '';
    busAr[2] = '';
    wx.setStorageSync('busStr', busAr);
  },
  getMajorCode (e) {
    wx.setStorageSync('setpArr', []); // 清空步骤条
    let code = e.currentTarget.dataset.code;
    let name = e.currentTarget.dataset.name;
    let index = e.currentTarget.dataset.index;
    console.log(index)
    let newgetBusinessType = this.data.getBusinessType;
    for (let i = 0; i < newgetBusinessType.length; i++) {
      newgetBusinessType[i].active = false
    }
    newgetBusinessType[index].active = true;
    this.setData({
      getBusinessType: newgetBusinessType
    });
    wx.setStorageSync('bz2', newgetBusinessType);
    wx.setStorageSync('bz3', {});
    wx.setStorageSync('MajorCode', code);
    this.AgetMajorCode();
    let busAr = wx.getStorageSync('busStr');
    busAr[1] = name;
    busAr[2] = '';
    wx.setStorageSync('busStr', busAr);
  },
  getItemCode (e) {
    wx.setStorageSync('setpArr', []); // 清空步骤条
    let code = e.currentTarget.dataset.code;
    let name = e.currentTarget.dataset.name;
    let index = e.currentTarget.dataset.index;
    let busAr = wx.getStorageSync('busStr');
    busAr[2] = name;
    wx.setStorageSync('busStr', busAr);
    wx.setStorageSync('ItemCode', code);
    wx.setStorageSync('sxmc', name);
    console.log(wx.getStorageSync('ItemCode'));
    console.log(wx.getStorageSync('sxmc'));
    if (wx.getStorageSync('ItemCode')) {
      let arr = this.data.getMajorCode;
      let len = arr.length;
      for (let i = 0; i < len; i++) {
        arr[i].active = false;
      }
      arr[index].active = true;
      this.setData({
        getMajorCode: arr,
        nextSwite: true
      });
      wx.setStorageSync('bz3', arr);
    }
  },
  gotNext () {
    if (wx.getStorageSync('ItemCode')) {
      wx.setStorageSync('setpArr', {});
      wx.setStorageSync('StorNav', false);
      wx.redirectTo({
        url: 'setp-three'
      });
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
  clear () {
    let arr = ['', '', ''];
    wx.setStorageSync('busStr', arr);
    wx.setStorageSync('upFileObj', {}); // 清空表单材料
    wx.setStorageSync('busFileArr', {}); // 清空上传文件
    wx.setStorageSync('sevenSaveNavbar', {}); // 清空保存navbar
    wx.setStorageSync('sxmc', ''); // 清空事项名称
    wx.setStorageSync('setpArr', []); // 清空步骤条
    wx.setStorageSync('StorNav', false);
    wx.setStorageSync('storEntitID', '');
    this.setData({
      setpArr: [
        { name: '事项类型', url: 'setp-one', id: 'one', dq: true, active: false, pass: true },
        { name: '事项名称', url: 'seto-two', id: 'two', dq: true, active: false, pass: false },
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
    if (wx.getStorageSync('StorNav')) {
      this.setData({
        setpArr: wx.getStorageSync('setpArr')
      });
    }
    if (!wx.getStorageSync('setpArr').length) {
      wx.setStorageSync('setpArr', this.data.setpArr);
    }
    if (wx.getStorageSync('bz1').length) {
      this.setData({
        getMechanism: wx.getStorageSync('bz1')
      });
    } else {
      this.AgetMechanism();
    }
    if (wx.getStorageSync('bz2').length) {
      this.setData({
        getBusinessType: wx.getStorageSync('bz2')
      });
    }
    if (wx.getStorageSync('bz3').length) {
      this.setData({
        getMajorCode: wx.getStorageSync('bz3')
      });
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
   * 
   */
  onShareAppMessage: function () {

  },
  getStorNav() {
    wx.setStorageSync('StorNav', true);
  }
})