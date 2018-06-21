// pages/appointment/appointment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: true,
    shadowSwite: false,
    tsCont: '',
    array: ['09:00 - 10:00','10:00 - 11:00', '14:00 - 15: 00', '15:00 - 16:00'],
    objectArray: [
      {
        id: 0,
        name: '09:00 - 10:00'
      },
      {
        id: 1,
        name: '10:00 - 11:00'
      },
      {
        id: 2,
        name: '14:00 - 15: 00'
      },
      {
        id: 3,
        name: '15:00 - 16:00'
      }
    ],
    timeArr: '',
    reserveStartTime: '', // 开始时间
    reserveEndTime: '', // 结束时间
    timeIndex: 0, // 时间下标
    listArr: {
      baseFields: [
        { name: 'aa', displayName: '申请人姓名', type: 'number', val: '' },
        { name: 'berb', displayName: '证件类型', type: 'select', cnList: ['身份证', '军官证', '护照'], enList: ['身份证', '军官证', '护照'], count: 0 },
        { name: 'aeqra', displayName: '证件号码', type: 'number', val: '' },
        { name: 'aera', displayName: '手机号码', type: 'number', val: '' },
        { name: 'atta', displayName: '预约时段', type: 'time', time: '12:01' },
        { name: 'cyec', displayName: '预约日期', type: 'date', date: '' }
      ]
    }
  },
  getNext () {
    // wx.reLaunch({
    //   url: '../index/index'
    // });
    let ks = '';
    let js = '';
    if (this.data.timeIndex === 0) {
      ks = this.data.listArr.baseFields[5].date + 'T01:00:00.000Z';
      js = this.data.listArr.baseFields[5].date + 'T02:00:00.000Z';
    } else if (this.data.timeIndex === 1) {
      ks = this.data.listArr.baseFields[5].date + 'T02:00:00.000Z';
      js = this.data.listArr.baseFields[5].date + 'T03:00:00.000Z';
    } else if (this.data.timeIndex === 2) {
      ks = this.data.listArr.baseFields[5].date + 'T06:00:00.000Z';
      js = this.data.listArr.baseFields[5].date + 'T07:00:00.000Z';
    } else if (this.data.timeIndex === 3) {
      ks = this.data.listArr.baseFields[5].date + 'T07:00:00.000Z';
      js = this.data.listArr.baseFields[5].date + 'T08:00:00.000Z';
    };
    console.log(ks + '' + js);
    this.setData({
      reserveStartTime: ks,
      reserveEndTime: js,
      hiddenLoading: false
    });
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.queryUrl.myOrder;
    let ower = this.data.listArr.baseFields[0].val;
    let idNumber = this.data.listArr.baseFields[2].val;
    let mobile = this.data.listArr.baseFields[3].val;
    let date = this.data.listArr.baseFields[5].date;
    let reserveStartTime = this.data.reserveStartTime;
    let reserveEndTime = this.data.reserveEndTime;
    let justiceBureau = wx.getStorageSync('justiceBureau');
    let arr = {
      owner: ower, // 姓名
      idNumber: idNumber, // 身份证号
      mobile: mobile, // 手机号
      date: date, // 预约日期
      reserveStartTime: reserveStartTime, // 预约开始时间
      reserveEndTime: reserveEndTime, // 预约结束时间
      justiceBureau: justiceBureau // 司法局ID
    };
    console.log(arr)
    wx.request({
      url: url,
      method: 'POST',
      data: arr,
      success: json => {
        console.log(json);
        this.setData({
          hiddenLoading: true
        });
        let arr = this.data.listArr;
        if (json.data.code < 0) {
          if (json.data.description === '请输入正确的身份证号码!') {
            arr.baseFields[2].error = true;
            arr.baseFields[2].val = json.data.description;
          } else if (json.data.description === '请输入正确的手机号码!' || json.data.description === '请输入手机号码!') {
            arr.baseFields[3].error = true;
            arr.baseFields[3].val = json.data.description;
          } else if (json.data.description === '请输入姓名!' || json.data.description === '姓名不能长于15位!') {
            arr.baseFields[0].error = true;
            arr.baseFields[0].val = json.data.description;
          } else if (json.data.description === '预约日期错误，请选择明天及以后的日期') {
            console.log(json.data.description);
            this.setData({
              shadowSwite: true,
              tsCont: json.data.description
            });
          } else {
            console.log(json.data.description);
            this.setData({
              shadowSwite: true,
              tsCont: json.data.description
            });
            wx.setStorageSync('appointmentText', json.data.description);
          }
          this.setData({
            listArr: arr
          });
        } else if (json.data.code === 9) {
          this.setData({
            shadowSwite: true,
            tsCont: json.data.description
          });
        } else {
          wx.setStorageSync('appoinSuccess', json.data);
          wx.navigateTo({
            url: 'callback'
          });
        }
      }
    })
  },
  getUsetId() { // 获取身份证
    let url = app.appUrl.urlHead + '' + app.appUrl.urlBody + '' + app.appUrl.getUserInfoByUserId;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userId')
      },
      success: json => {
        console.log(json);
        let id = json.data.idNumber;
        this.getpersonSearchNEU(id, this.data.getMechanism);
      }
    })
  },
  getpersonSearchNEU(value, nowArr) { // 获取人员信息自动
    this.setData({
      hiddenLoading: false
    });
    let val = value;
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
        // value: wx.getStorageSync('falseIDnumber'),
        itemCode: '0284-1'
      },
      success: json => {
        console.log(json)
        this.setData({
          hiddenLoading: true
        });
        if (json.data.description === '未查询到数据') {
          console.log('未查询到数据');
        } else {
          let arr = json.data[0];
          let newArr = this.data.listArr;
          newArr.baseFields[0].val = arr.applicant[0].val;
          newArr.baseFields[2].val = arr.applicant[2].val;
          newArr.baseFields[3].val = arr.applicant[6].val;
          console.log(arr);
          this.setData({
            listArr: newArr
          });
        }
      }
    });
  },
  clearShadow () {
    this.setData({
      shadowSwite: false
    });
  },
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    console.log(currentdate);
    let arr = this.data.listArr;
    arr.baseFields[5].date = currentdate;
    this.setData({
      listArr: arr
    });
  },
  inputVal(e) {
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    arr[key][index].val = e.detail.value;
    this.setData({
      listArr: arr
    });
    console.log(this.data.listArr);
  },
  inputClear (e) {
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    arr[key][index].val = '';
    arr[key][index].error = false;
    this.setData({
      listArr: arr
    });
  },
  bindDateChange: function (e) {
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    arr[key][index].date = e.detail.value
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      listArr: arr
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let key = e.currentTarget.dataset.parent;
    let index = e.currentTarget.dataset.index;
    let arr = this.data.listArr;
    arr[key][index].count = e.detail.value
    this.setData({
      listArr: arr
    })
  },
  // bindTimeChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   let key = e.currentTarget.dataset.parent;
  //   let index = e.currentTarget.dataset.index;
  //   let arr = this.data.listArr;
  //   arr[key][index].time = e.detail.value
  //   this.setData({
  //     listArr: arr
  //   })
  // },
  bindTimeChange : function (e) {
    let index = e.detail.value;
    let num = parseInt(index);
    let arr = this.data.array;
    this.setData({
      timeArr: arr[index],
      timeIndex: num
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
    let arr = this.data.array;
    this.getNowFormatDate();
    this.setData({
      timeArr: arr[0]
    });
    if (wx.getStorageSync('wxLoginSwite')) {
      this.getUsetId();
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
  
  }
})