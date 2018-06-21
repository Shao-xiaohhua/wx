// pages/approval/setp-six.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginLink: true,
    allShow: true,
    hiddenLoading: true,
    checkSwite: false, // 校验开关
    JGindex: 0, // 不可填写下标
    JGname: '', // 不可填写父键
    RYindex: 0, // 人员不可填写下标
    RYname: '', // 人员不可填写父键
    more: ['0285-2', '0285-3'],
    applyMoreSwite: false, // 是否为多个申请人
    // more: ['0285-2', '0285-3'],
    JGswite: false, // 机构搜索开关
    RYswite: false, // 人员搜索开关
    shadowSwite: false, // 提示遮罩开关
    scrollId: 'five', // 顶部num
    agentFieldsSwite: true, // 是否显示委托人
    array: ['身份证', '军官证', '驾照', '护照'],
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
    index: 0,
    date: '请选择日期',
    listArr: { // 基本信息
      baseFields: [
        { Ename: 'aa', name: '申请人姓名', type: 'text' },
        { Ename: 'bb', name: '证件类型', type: 'slcet', slListEN: ['英文身份证', '英文军官证', '英文护照'], slList: ['身份证', '军官证', '护照'], slNumber: 0 },
        { Ename: 'cc', name: '生日', type: 'date', date: '请输入日期' },
        { Ename: 'dd', name: '身份证号', type: 'number' }
      ]
    },
    applicantFields_1: [], // 多个申请人信息
    applicantFields_2: [], // 多个申请人信息
    JGlist: [], // 机构列表
    RYlist: [], // 人员列表
    region: ['广东省', '广州市', '海珠区'],
    RYtext: '',
    JGtext: ''
  },
  getNext() {
  },
  getorgName(e) { // 获取机构名称
    let val = e.detail.value;
    console.log(e)
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.getorgName;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        orgName: val,
        itemCode: wx.getStorageSync('formItemcode')
      },
      success: json => {
        console.log(json.data)
        this.setData({
          JGlist: json.data
        })
      }
    })
  },
  getpersonSearch(e) { // 获取人员信息
    let val = e.detail.value;
    console.log(e)
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.personSearch;
    console.log(url);
    console.log(val);
    wx.request({
      url: url,
      method: 'POST',
      data: {
        page: 1,
        size: 20,
        value: val,
        itemCode: wx.getStorageSync('formItemcode')
      },
      success: json => {
        console.log(json.data)
        this.setData({
          RYlist: json.data
        });
      }
    });
  },
  cloesJGswite() {
    this.setData({
      JGswite: false,
      JGtext: ''
    });
  },
  cloesRYwite() {
    this.setData({
      RYswite: false,
      RYtext: ''
    });
  },
  getJGtext(e) { // 获取机构名称信息
    let text = e.currentTarget.dataset.text;
    let key = this.data.JGname;
    let index = this.data.JGindex;
    if (key === 'applicantFields_1') {
      let arr = this.data.applicantFields_1;
      arr[index].val = text;
      arr[index].error = false;
      console.log(arr)
      this.setData({
        applicantFields_1: arr,
        JGswite: false,
        JGtext: ''
      });
    } else if (key === 'applicantFields_2') {
      let arr = this.data.applicantFields_2;
      arr[index].val = text;
      arr[index].error = false;
      this.setData({
        applicantFields_2: arr,
        JGswite: false,
        JGtext: ''
      });
    } else {
      let arr = this.data.listArr;
      arr[key][index].val = text;
      arr[key][index].error = false;
      this.setData({
        listArr: arr,
        JGswite: false,
        JGtext: ''
      });
    }
  },
  getRYtext(e) { // 获取人员名称信息
    let text = e.currentTarget.dataset.text;
    let messageArr = e.currentTarget.dataset.arr.applicant;
    console.log(messageArr)
    let key = this.data.RYname;
    let index = this.data.RYindex;
    if (key === 'applicantFields_1') {
      console.log('多个人员1');
      let arr = {};
      arr = messageArr;
      console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].date === '请输入日期') {
          if (arr[i].val) {
            arr[i].date = arr[i].val;
            arr[i].disabled = true;
          } else {
            arr[i].disabled = false;
          }
        }
      }
      this.setData({
        applicantFields_1: arr,
        RYswite: false,
        RYtext: ''
      });
    } else if (key === 'applicantFields_2') {
      console.log('多个人员2');
      let arr = {};
      arr = messageArr;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].date === '请输入日期') {
          if (arr[i].val) {
            arr[i].date = arr[i].val;
            arr[i].disabled = true;
          } else {
            arr[i].disabled = false;
          }
        }
      }
      this.setData({
        applicantFields_2: arr,
        RYswite: false,
        RYtext: ''
      });
    } else {
      console.log('普通人员');
      let arr = messageArr;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].date === '请输入日期') {
          if (arr[i].val) {
            arr[i].date = arr[i].val;
            arr[i].disabled = true;
          } else {
            arr[i].disabled = false;
          }
        }
      }
      let newArr = this.data.listArr;
      newArr.applicantFields = arr;
      this.setData({
        listArr: newArr,
        RYswite: false,
        RYtext: ''
      });
    }
  },
  inputTpJG(e) { // 机构搜索
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    this.setData({
      JGswite: true,
      JGindex: index,
      JGname: key,
      JGtext: ''
    })
  },
  inputTpRY(e) { // 人员搜索
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    this.setData({
      RYswite: true,
      RYindex: index,
      RYname: key,
      RYtext: ''
    })
  },
  inputRYMore(e) { // 多个人员搜索
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    this.setData({
      RYswite: true,
      RYindex: index,
      RYname: key,
      RYtext: ''
    })
  },
  inputVal(e) { // 储存val
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    arr[key][index].val = e.detail.value;
    arr[key][index].error = false;
    this.setData({
      listArr: arr
    });
  },
  inputValMore(e) { // 多人储存val
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    if (key === 'applicantFields_1') {
      let arr = this.data.applicantFields_1;
      arr[index].val = e.detail.value;
      arr[index].error = false;
      this.setData({
        applicantFields_1: arr
      });
    } else {
      let arr = this.data.applicantFields_2;
      arr[index].val = e.detail.value;
      arr[index].error = false;
      this.setData({
        applicantFields_2: arr
      });
    }
  },
  bindRegionChange: function (e) { // 地区
    console.log(e)
    let value = e.detail.value;
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    if (key === 'applicantFields_1') {
      let arr = this.data.applicantFields_1;
      arr[index].region = value;
      arr[index].error = false;
      this.setData({
        applicantFields_1: arr
      });
    } else if (key === 'applicantFields_2') {
      let arr = this.data.applicantFields_2;
      arr[index].region = value;
      arr[index].error = false;
      this.setData({
        applicantFields_2: arr
      });
    } else {
      let arr = this.data.listArr;
      arr[key][index].region = value;
      arr[key][index].error = false;
      this.setData({
        listArr: arr
      });
    }
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindDateChange: function (e) { // 日期
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    arr[key][index].date = e.detail.value;
    arr[key][index].error = false;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      listArr: arr
    });
  },
  bindDateChangeMove: function (e) { // 多人日期
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    if (key === 'applicantFields_1') {
      let arr = this.data.applicantFields_1;
      arr[index].date = e.detail.value;
      arr[index].error = false;
      this.setData({
        applicantFields_1: arr
      });
    } else {
      let arr = this.data.applicantFields_2;
      arr[index].date = e.detail.value;
      arr[index].error = false;
      this.setData({
        applicantFields_2: arr
      });
    }
  },
  bindPickerChangeMore(e) { // 多人下拉
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    if (key === 'applicantFields_1') {
      let arr = this.data.applicantFields_1;
      arr[index].count = e.detail.value;
      arr[index].error = false;
      this.setData({
        applicantFields_1: arr
      });
    } else {
      let arr = this.data.applicantFields_2;
      arr[index].count = e.detail.value;
      arr[index].error = false;
      this.setData({
        applicantFields_2: arr
      });
    }
  },
  getListArr() { // 获取列表
    this.setData({
      hiddenLoading: false
    });
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.getFormList;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      method: 'POST',
      data: {
        itemCode: wx.getStorageSync('formItemcode'),
        id: wx.getStorageSync('formID')
      },
      success: data => {
        let newArrData = data.data;
        console.log(data);
        let moreAppl_1 = [];
        let moreAppl_2 = [];
        for (let i = 0; i < this.data.more.length; i++) {
          if (wx.getStorageSync('formItemcode') === this.data.more[i]) {
            console.log('匹配');
            moreAppl_1 = data.data.applicant_1
            moreAppl_2 = data.data.applicant_2
            this.setData({
              applyMoreSwite: true
            });
            break;
          } else {
            this.setData({
              applyMoreSwite: false
            });
          }
        }
        this.setData({
          listArr: newArrData,
          allShow: false,
          hiddenLoading: true,

        });
        if (data.data.agentFields[0].val === '') {
          this.setData({
            agentFieldsSwite: true
          });
        } else {
          this.setData({
            agentFieldsSwite: false
          });
        }
        wx.setStorageSync('formStuffs', this.data.listArr.stuffs);
        wx.setStorageSync('formBusStr', this.data.listArr.itemSteps);
        console.log(this.data.listArr);
      }
    })
  },
  bindPickerChange: function (e) { // 下拉
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let key = e.currentTarget.dataset.parent;
    console.log(key)
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    arr[key][index].count = e.detail.value;
    arr[key][index].error = false;
    let len = arr[key].length;
    if (arr[key][0].count === '1') {
      for (let i = 0; i < len - 1; i++) {
        arr[key][i].required = true
      }
    } else {
      for (let i = 1; i < len; i++) {
        arr[key][i].required = false
      }
    }
    console.log(arr[key])
    this.setData({
      listArr: arr
    });
  },
  formSubmit: function (e) { // 提交数据
    let val = e.detail.value;
    let useArr = this.data.listArr.applicantFields;
    let newListArr = this.data.listArr;
    let moreListArr_1 = this.data.applicantFields_1;
    let moreListArr_2 = this.data.applicantFields_2;
    for (let i in val) {
      for (let s in newListArr) { // 主要数据
        if (s !== 'applicationTypeId' || s !== 'applicationTypeId') {
          let len = newListArr[s].length;
          for (let re = 0; re < len; re++) {
            if (newListArr[s][re]!==null) {
              if (i === newListArr[s][re].name) {
                newListArr[s][re].val = val[i];
              }
            }
          }
        }
      }
      if (newListArr.agentFields[0].val) {
        for (let a = 0; a < moreListArr_1.length; a++) { // 申请人2
          if (i === 'applicantFields_1_' + moreListArr_1[a].name) {
            moreListArr_1[a].val = val[i]
          }
        }
        for (let a = 0; a < moreListArr_2.length; a++) { // 申请人3
          if (i === 'applicantFields_2_' + moreListArr_1[a].name) {
            moreListArr_2[a].val = val[i]
          }
        }
      }
    }
    let goTonext = true;
    let goTonext_1 = true;
    let goTonext_2 = true;
    let oneselfSwite = true;
    if (this.data.listArr.agentFields[0].val === '') {
      oneselfSwite = true;
    } else {
      oneselfSwite = false;
    }
    for (let i in newListArr) {
      if (i !== 'applicationTypeId' || i !== 'applicationTypeId') {
        let len = newListArr[i].length;
        for (let j = 0; j < len; j++) {
          if (oneselfSwite) {
            if (i !== 'agentFields' && newListArr[i][j].required) {
              if (newListArr[i][j].val === '') {
                console.log(i)
                newListArr[i][j].error = true;
                goTonext = false;
              }
            }
          } else {
            if (newListArr[i][j].required) {
              if (newListArr[i][j].val === '') {
                console.log(i)
                newListArr[i][j].error = true;
                goTonext = false;
              }
            }
          }
        }
      }
    }
    for (let i in moreListArr_1) {
      if (moreListArr_1[i].required) {
        if (moreListArr_1[i].val === '') {
          moreListArr_1[i].error = true;
          goTonext_1 = false;
        }
      }
    }
    for (let i in moreListArr_2) {
      if (moreListArr_2[i].required) {
        if (moreListArr_2[i].val === '') {
          moreListArr_2[i].error = true;
          goTonext_2 = false;
        }
      }
    }
    this.setData({
      listArr: newListArr,
      applicantFields_1: moreListArr_1,
      applicantFields_2: moreListArr_2
    });
    wx.setStorageSync('FormUpFileObj', newListArr);
    wx.setStorageSync('FormMoreListArrTwo', moreListArr_1);
    wx.setStorageSync('FormMoreListArrThree', moreListArr_2);
    wx.setStorageSync('FormBusArr', useArr);
    this.setData({
      shadowSwite: !goTonext
    });
    console.log(goTonext);
    if (goTonext) { // 最后校验
      console.log('已经全部添加完毕');
      if (this.data.checkSwite) {
        console.log('校验成功');
      } else {
        console.log('校验失败');
        // this.getJY();
      }
      wx.redirectTo({
        url: 'setp-seven'
      });
      console.log(goTonext);
    } else { // 需要删除!!!
      console.log('未全部添加！');
    }
  },
  clearShadow: function () {
    this.setData({
      shadowSwite: false
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
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
  getMoreGies() {
    for (let i = 0; i < this.data.more.length; i++) {
      if (wx.getStorageSync('formItemcode') === this.data.more[i]) {
        console.log('匹配');
        this.setData({
          applyMoreSwite: true
        });
        break;
      } else {
        this.setData({
          applyMoreSwite: false
        });
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
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
    this.getMoreGies(); // 是否为多个申请人开关
    if (wx.getStorageSync('FormUpFileObj').baseFields) { // 关于是否调用缓存
      this.setData({
        listArr: wx.getStorageSync('FormUpFileObj'),
        applicantFields_1: wx.getStorageSync('FormMoreListArrTwo'),
        applicantFields_2: wx.getStorageSync('FormMoreListArrThree'),
        allShow: false
      });
      let self = wx.getStorageSync('FormUpFileObj').agentFields[0].val;
      if (self) {
        this.setData({
          agentFieldsSwite: false
        });
      } else {
        this.setData({
          agentFieldsSwite: true
        });
      }
      console.log('缓存');
      console.log(this.data.listArr);
    } else {
      this.getListArr();
      console.log('数据');
    }
    let self = wx.getStorageSync('FormUpFileObj');
    console.log(self)
    if (self === 'oneself') { // 是否委托
      this.setData({
        agentFieldsSwite: true
      });
    } else {
      this.setData({
        agentFieldsSwite: false
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
   */
  onShareAppMessage: function () {

  },
  // 校验函数
  getJY() {
    let arr;
    let applyFile = wx.getStorageSync('FormUpFileObj');
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
          applicant_1: applyFileMoreTwo,
          applicant_2: applyFileMoreTwo
        }
        break;
      } else {
        arr = {
          applicationData: applyFile
        }
      }
    }
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.validate;
    console.log(url)
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
        console.log(json);
        this.setData({
          hiddenLoading: true
        });
      }
    });
  },
  getStorNav() {
    wx.setStorageSync('StorNav', true);
  }
});