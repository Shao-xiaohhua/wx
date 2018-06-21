// pages/my-matter/my-matter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: true,
    isType: '',
    tabList: [
      { name: '未受理', type: '', num: 0, swite: true },
      { name: '审批中', type: '', num: 0, swite: false },
      { name: '已审批', type: '', num: 0, swite: false }
    ],
    lsitArr: [
      { name: '关于孟涛律师执业审核——首次申请律师专职执业审核的准予行政审批决定', type: '律师管理', wh: '沪司审（0284-1）字（2018）4124号', time: '2018-04-11 10:23' },
      { name: '关于孟涛律师执业审核——首次申请律师专职执业审核的准予行政审批决定', type: '律师管理', wh: '沪司审（0284-1）字（2018）4124号', time: '2018-04-11 10:23' },
      { name: '关于孟涛律师执业审核——首次申请律师专职执业审核的准予行政审批决定', type: '律师管理', wh: '沪司审（0284-1）字（2018）4124号', time: '2018-04-11 10:23' },
      { name: '关于孟涛律师执业审核——首次申请律师专职执业审核的准予行政审批决定', type: '律师管理', wh: '沪司审（0284-1）字（2018）4124号', time: '2018-04-11 10:23' },
      { name: '关于孟涛律师执业审核——首次申请律师专职执业审核的准予行政审批决定', type: '律师管理', wh: '沪司审（0284-1）字（2018）4124号', time: '2018-04-11 10:23' },
      { name: '关于孟涛律师执业审核——首次申请律师专职执业审核的准予行政审批决定', type: '律师管理', wh: '沪司审（0284-1）字（2018）4124号', time: '2018-04-11 10:23' },
      { name: '关于孟涛律师执业审核——首次申请律师专职执业审核的准予行政审批决定', type: '律师管理', wh: '沪司审（0284-1）字（2018）4124号', time: '2018-04-11 10:23' },
      { name: '关于孟涛律师执业审核——首次申请律师专职执业审核的准予行政审批决定', type: '律师管理', wh: '沪司审（0284-1）字（2018）4124号', time: '2018-04-11 10:23' },
      { name: '关于孟涛律师执业审核——首次申请律师专职执业审核的准予行政审批决定', type: '律师管理', wh: '沪司审（0284-1）字（2018）4124号', time: '2018-04-11 10:23' }
    ],
    listNot: [],
    listYes: [],
    listPass: [], 
    showSwite: false,
    removeID: '', // 删除ID
    statusID: ''
  },
  checkDetail (e) { // 查看详情
    this.setData({
      hiddenLoading: false
    });
    let id = e.currentTarget.dataset.id;
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.SearchDetail;
    console.log(id);
    wx.request({
      url: url,
      method: 'POST',
      data: {
        applicationEntityId: id
      },
      success: json => {
        console.log(json);
        this.setData({
          hiddenLoading: true
        });
        if (json.statusCode === 200) {
          wx.navigateTo({
            url: 'detail'
          });
          wx.setStorageSync('myQueryListArr', json.data);
        }
      }
    })
  },
  toNext () {
    wx.navigateTo({
      url: '../approval/new-six'
    })
  },
  toNextSeven() {
    wx.navigateTo({
      url: '../approval/setp-seven-clear'
    });
  },
  getListArr(e) { // 获取列表
    let id = e.currentTarget.dataset.id;
    let code = e.currentTarget.dataset.code;
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.getFormList;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      method: 'POST',
      data: {
        itemCode: code,
        id: id
      },
      success: data => {
        console.log(data);
        wx.setStorageSync('FormUpFileObj', data.data);
        wx.setStorageSync('FormMoreListArrTwo', data.data.applicant_1);
        wx.setStorageSync('FormMoreListArrThree', data.data.applicant_2);
        wx.setStorageSync('FormBusArr', data.data.applicantFields);
        wx.setStorageSync('formStuffs', data.data.stuffs);
        wx.setStorageSync('formBusStr', data.data.itemSteps);
        wx.setStorageSync('onlyForm', true);
        this.toNextSeven();
        console.log(this.data.listArr);
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  getFormList (e) {
    let id = e.currentTarget.dataset.id;
    let code = e.currentTarget.dataset.code;
    console.log(code);
    wx.setStorageSync('formItemcode', code);
    wx.setStorageSync('formID', id);
  },
  onShow: function () {
    wx.setStorageSync('formItemcode', '');
    wx.setStorageSync('formID', '');
    wx.setStorageSync('formStuffs', {});
    wx.setStorageSync('FormUpFileObj', {});
    wx.setStorageSync('FormMoreListArrTwo', {});
    wx.setStorageSync('FormMoreListArrThree', {});
    wx.setStorageSync('FormBusArr', {});
    wx.setStorageSync('formBusStr', {});
    wx.setStorageSync('FormBusFileArr', {});
    wx.setStorageSync('onlyForm', false);
    this.getlistNot();
    this.getlistYes();
    this.getlistPass();
    let type = wx.getStorageSync('matterType');
    let arr = this.data.tabList;
    for (let i = 0; i < arr.length; i++) {
      arr[i].swite = false;
      if (arr[i].name === type) {
        arr[i].swite = true
      }
    }
    this.setData({
      tabList: arr,
      isType: type
    });
  },
  getlistNot () { // 获取未提交
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.matter;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        status: 'wtj',
        userid: wx.getStorageSync('userId')
      },
      success: json => {
        let len = json.data.length;
        let arr = this.data.tabList;
        arr[0].num = len;
        this.setData({
          listNot: json.data,
          tabList: arr
        })
        console.log('未提交');
        console.log(json);
      }
    });
  },
  getlistYes() { // 获取审批中
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.matter;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        status: 'spz',
        userid: wx.getStorageSync('userId')
      },
      success: json => {
        let len = json.data.length;
        let arr = this.data.tabList;
        arr[1].num = len;
        this.setData({
          listYes: json.data,
          tabList: arr
        })
        console.log('审批中');
        console.log(json);
      }
    });
  },
  getlistPass() { // 获取已审批
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.matter;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        status: 'ysp',
        userid: wx.getStorageSync('userId')
      },
      success: json => {
        let len = json.data.length;
        let arr = this.data.tabList;
        arr[2].num = len;
        this.setData({
          listPass: json.data,
          tabList: arr
        })
        console.log('已审批');
        console.log(json);
      }
    });
  },
  tabGet (e) {
    let type = e.currentTarget.dataset.type;
    wx.setStorageSync('matterType', type);
    let index = e.currentTarget.dataset.index;
    let arr = this.data.tabList;
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      arr[i].swite = false
    };
    arr[index].swite = true;
    this.setData({
      tabList: arr
    });
  },
  removeSx (e) {
    let id = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    console.log(status);
    this.setData({
      statusID: status
    });
    console.log(id)
    this.setData({
      showSwite: true,
      removeID: id
    });
  },
  closeShdow () {
    this.setData({
      hiddenLoading: false
    });
    let type = wx.getStorageSync('matterType');
    let dataStatus = this.data.statusID;
    if (type === '未受理') {
      console.log('删除未受理');
      let url = '';
      if (dataStatus === 'Draft') {
        url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.cancelApprove;
      } else {
        url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.onlineCancel;
      }
      console.log(url);
      wx.request({
        url: url,
        method: 'POST',
        data: {
          applicationEntityId: this.data.removeID
        },
        success: json => {
          console.log(json);
          this.setData({
            showSwite: false,
            hiddenLoading: true
          });
          this.getlistNot();
          this.getlistYes();
          this.getlistPass();
        }
      });
    } else if (type === '审批中') {
      console.log('删除审批中');
      let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.onlineCancel;
      wx.request({
        url: url,
        method: 'POST',
        data: {
          applicationEntityId: this.data.removeID
        },
        success: json => {
          console.log(json);
          this.setData({
            showSwite: false,
            hiddenLoading: true
          });
          this.getlistNot();
          this.getlistYes();
          this.getlistPass();
        }
      });
    } else {
      console.log('删除已审批');
    }
  },
  closeShdownomor () {
    this.setData({
      showSwite: false
    });
  },
  getNext () {
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