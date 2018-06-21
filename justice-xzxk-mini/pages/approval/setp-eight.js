// pages/approval/setp-eight.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginLink: true,
    onlyFormSwite: false,
    more: ['0285-2', '0285-3'],
    scrollId: 'seven',
    hiddenLoading: true,
    setpArr: [
      { name: '事项类型', url: 'setp-one', id: 'one', dq: false, active: false, pass: false },
      { name: '事项名称', url: 'seto-two', id: 'two', dq: false, active: false, pass: false },
      { name: '阅读须知', url: 'setp-three', id: 'three', dq: false, active: false, pass: false },
      { name: '办理人', url: 'setp-four', id: 'four', dq: false, active: false, pass: false },
      { name: '办理方式', url: 'setp-five', id: 'five', dq: false, active: false, pass: false },
      { name: '填写信息', url: 'setp-six', id: 'six', dq: true, active: false, pass: true },
      { name: '上传材料', url: 'setp-seven', id: 'seven', dq: true, active: false, pass: true },
      { name: '确认提交', url: 'setp-eight', id: 'eight', dq: true, active: false, pass: false }
    ],
    setpStr: '',
    busArr: [],
    busFileArr: [],
    newbusFileArr: []
  },
  getNext() {
    let arr;
    let applyFile = wx.getStorageSync('FormUpFileObj');
    applyFile.userId = wx.getStorageSync('userId');
    let busFileArr = wx.getStorageSync('FormBusFileArr');
    let lensB = applyFile.baseFields.length;
    for (let i = 0; i < lensB; i++) {
      let name = applyFile.baseFields[i].name;
      if (name === 'item') {
        console.log('成功!')
        applyFile.baseFields[i].val = wx.getStorageSync('formItemcode');
        break;
      }
    }
    let applyFileMoreTwo = wx.getStorageSync('FormMoreListArrTwo');
    let applyFileMoreThree = wx.getStorageSync('FormMoreListArrThree');
    let len = this.data.more.length;
    let code = wx.getStorageSync('formItemcode');
    for (let i = 0; i < len; i++) {
      if (code === this.data.more[i]) {
        arr = {
          applicationData: applyFile,
          stuffsData: busFileArr,
          applicant_1: applyFileMoreTwo,
          applicant_2: applyFileMoreThree,
          applicationEntityId: wx.getStorageSync('formID')
        }
        break;
      } else {
        arr = {
          applicationData: applyFile,
          stuffsData: busFileArr,
          applicationEntityId: wx.getStorageSync('formID')
        }
      }
    }
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.upLoad;
    console.log(url);
    console.log(arr);
    this.setData({
      hiddenLoading: false
    });
    wx.request({
      url: url,
      method: 'POST',
      data: {
        ala: arr
      },
      success: json => {
        console.log(json)
        this.setData({
          hiddenLoading: true
        });
        console.log(json.data);
        wx.setStorageSync('mesgBack', json.data);
        wx.reLaunch({
          url: '../feedback/feedback'
        });
        this.clear();
      }
    });
  },
  clear() {
    wx.setStorageSync('formItemcode', '');
    wx.setStorageSync('formID', '');
    wx.setStorageSync('formStuffs', {});
    wx.setStorageSync('FormUpFileObj', {});
    wx.setStorageSync('FormMoreListArrTwo', {});
    wx.setStorageSync('FormMoreListArrThree', {});
    wx.setStorageSync('FormBusArr', {});
    wx.setStorageSync('FormBusFileArr', {});
    wx.setStorageSync('formBusStr', {});
    wx.setStorageSync('onlyForm', false);
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
    if (wx.getStorageSync('onlyForm')) {
      this.setData({
        setpArr: [
          { name: '事项类型', url: '', id: 'one', dq: false, active: false, pass: false },
          { name: '事项名称', url: '', id: 'two', dq: false, active: false, pass: false },
          { name: '阅读须知', url: '', id: 'three', dq: false, active: false, pass: false },
          { name: '办理人', url: '', id: 'four', dq: false, active: false, pass: false },
          { name: '办理方式', url: '', id: 'five', dq: false, active: false, pass: false },
          { name: '填写信息', url: '', id: 'six', dq: false, active: false, pass: false },
          { name: '上传材料', url: 'setp-seven-clear', id: 'seven', dq: true, active: false, pass: true },
          { name: '确认提交', url: '#', id: 'eight', dq: true, active: false, pass: false }
        ],
        onlyFormSwite: true
      });
    }
    if (wx.getStorageSync('wxLoginSwite')) {
      this.setData({
        loginLink: false
      });
    } else {
      this.setData({
        loginLink: true
      });
    }
    let setpStr = wx.getStorageSync('formBusStr').join('/');
    let busArr = wx.getStorageSync('FormBusArr');
    let NbusArr = [];
    for (let i = 0; i < busArr.length; i++) {
      if (busArr[i].type !== 'select') {
        NbusArr.push(busArr[i]);
      }
    };
    let busFileArr = wx.getStorageSync('FormBusFileArr');
    console.log(setpStr);
    console.log(busFileArr);
    let fkObj = {
      xs: [],
      xx: []
    }
    for (let i = 0; i < busFileArr.length; i++) {
      console.log(busFileArr[i])
      if (busFileArr[i].swite) {
        fkObj.xs.push(busFileArr[i])
      } else {
        fkObj.xx.push(busFileArr[i])
      }
    }
    console.log(fkObj);
    this.setData({
      setpStr: setpStr,
      busArr: NbusArr,
      busFileArr: busFileArr,
      newbusFileArr: fkObj
    });
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