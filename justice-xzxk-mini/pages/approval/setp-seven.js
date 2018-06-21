// pages/approval/setp-seven.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginLink: true,
    scrollId: 'six',
    nexwSwite: false,
    hiddenLoading: true,
    more: ['0285-2', '0285-3'],
    shadowSwite: false,
    setpArr: [
      { name: '事项类型', url: '', id: 'one', dq: false, active: false, pass: false },
      { name: '事项名称', url: '', id: 'two', dq: false, active: false, pass: false },
      { name: '阅读须知', url: '', id: 'three', dq: false, active: false, pass: false },
      { name: '办理人', url: '', id: 'four', dq: false, active: false, pass: false },
      { name: '办理方式', url: '', id: 'five', dq: false, active: false, pass: false },
      { name: '填写信息', url: 'setp-six', id: 'six', dq: true, active: false, pass: true },
      { name: '上传材料', url: 'setp-seven', id: 'seven', dq: true, active: false, pass: false },
      { name: '确认提交', url: '#', id: 'eight', dq: false, active: false, pass: false }
    ],
    fileArr: [
      {
        stuffName: '申请书', list: [
          { displayStuffName: '申请书', url: '', stuffId: '' }
        ]
      },
      {
        stuffName: '申请人身份证', list: [
          { displayStuffName: '身份证正面', url: '', stuffId: '' },
          { displayStuffName: '身份证反面', url: '', stuffId: '' }
        ]
      },
      {
        stuffName: '近期彩色证件照片', list: [
          { displayStuffName: '证件照', url: '', stuffId: '' }
        ]
      },
      {
        stuffName: '其他证明', list: [
          { displayStuffName: '其他', url: '', id: '' }
        ]
      }
    ]
  },
  getNext() {
    if (this.data.nexwSwite) {
      wx.redirectTo({
        url: 'setp-eight',
      });
      console.log('上传中...')
    } else {
      console.log('请全部上传完毕');
    }
  },
  upDataFileSwite() {
    wx.setStorageSync('upDataFileSwite', true);
  },
  getFile(e) {
    let index = e.currentTarget.dataset.index;
    let fIndex = e.currentTarget.dataset.findex;
    let arr;
    if (wx.getStorageSync('FormBusFileArr').length) {
      arr = wx.getStorageSync('FormBusFileArr');
    } else {
      arr = this.data.fileArr;
    }
    if (arr[fIndex].swite) {
      wx.chooseImage({
        count: 1,
        success: res => {
          var tempFilePaths = res.tempFilePaths[0];
          console.log(tempFilePaths);
          this.setData({
            hiddenLoading: false
          });
          let url = app.appUrl.urlHead + '' + app.appUrl.upId;
          wx.uploadFile({
            url: url,
            filePath: tempFilePaths,
            header: {
              'content-type': 'application/json' // 默认值
            },
            name: 'aaa',
            success: json => {
              console.log('成功');
              let id = JSON.parse(json.data).fileId
              arr[fIndex].list[index].url = tempFilePaths;
              arr[fIndex].list[index].stuffId = id;
              wx.setStorageSync('FormBusFileArr', arr);
              this.setData({
                fileArr: arr,
                hiddenLoading: true
              });
              let lenArr = arr.length;
              this.setData({
                nexwSwite: true
              });
              for (let i = 0; i < lenArr; i++) {
                let len = arr[i].list.length;
                for (let j = 0; j < len; j++) {
                  if (arr[i].swite && arr[i].list[j].stuffId === '') {
                    this.setData({
                      nexwSwite: false
                    });
                    break;
                  }
                }
              }
              console.log(this.data.nexwSwite);
              console.log(this.data.fileArr)
            },
            fail: json => {
              console.log('失败');
              console.log(json);
            }
          })
        }
      });
    } else {
      console.log('这个已经关掉了');
    }
  },
  saveFile() {
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.saveDraft;
    this.getNextSeave(url);
  },
  getNextSeave(url) {
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
        this.setData({
          shadowSwite: true
        });
        console.log(json)
        this.setData({
          hiddenLoading: true
        });
        // wx.setStorageSync('mesgBack', json.data);
        console.log('保存成功');
      }
    });
  },
  clearShadow() {
    this.setData({
      shadowSwite: false
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
          { name: '上传材料', url: 'setp-seven', id: 'seven', dq: true, active: false, pass: false },
          { name: '确认提交', url: '#', id: 'eight', dq: false, active: false, pass: false }
        ]
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
    if (wx.getStorageSync('FormBusFileArr').length) {
      console.log('缓存');
      console.log(wx.getStorageSync('FormBusFileArr'));
      let arr = wx.getStorageSync('FormBusFileArr');
      let lenArr = arr.length;
      this.setData({
        nexwSwite: true
      });
      for (let i = 0; i < lenArr; i++) {
        let len = arr[i].list.length;
        for (let j = 0; j < len; j++) {
          if (arr[i].swite && arr[i].list[j].stuffId === '') {
            this.setData({
              nexwSwite: false
            });
            break;
          }
        }
      }
      this.setData({
        fileArr: wx.getStorageSync('FormBusFileArr')
      });
    } else {
      console.log('数据');
      this.setData({
        fileArr: wx.getStorageSync('formStuffs')
      });
      let arr = this.data.fileArr;
      let lenArr = arr.length;
      this.setData({
        nexwSwite: true
      });
      for (let i = 0; i < lenArr; i++) {
        let len = arr[i].list.length;
        for (let j = 0; j < len; j++) {
          if (arr[i].swite && arr[i].list[j].stuffId === '') {
            this.setData({
              nexwSwite: false
            });
            break;
          }
        }
      }
      wx.setStorageSync('FormBusFileArr', this.data.fileArr);
    }
  },
  closeFile(e) {
    let index = e.currentTarget.dataset.index;
    let arr = {};
    if (wx.getStorageSync('FormBusFileArr')) {
      arr = wx.getStorageSync('FormBusFileArr');
    } else {
      arr = this.data.fileArr;
    }
    for (let i = 0; i < arr[index].list.length; i++) {
      if (arr[index].list[i].url) {
        arr[index].list[i].url = ''
      }
      if (arr[index].list[i].stuffId) {
        arr[index].list[i].stuffId = ''
      }
    }
    arr[index].swite = !arr[index].swite;
    wx.setStorageSync('FormBusFileArr', arr);
    this.setData({
      fileArr: arr
    });
    console.log(this.data.fileArr)
    let lenArr = arr.length;
    this.setData({
      nexwSwite: true
    });
    for (let i = 0; i < lenArr; i++) {
      let len = arr[i].list.length;
      for (let j = 0; j < len; j++) {
        if (arr[i].swite && arr[i].list[j].stuffId === '') {
          this.setData({
            nexwSwite: false
          });
          break;
        }
      }
    }
    console.log(this.data.nexwSwite);
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