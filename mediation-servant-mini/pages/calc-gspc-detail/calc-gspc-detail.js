// pages/calc-gspc-detail/calc-gspc-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resArr: [
      { name: '停工留薪', number: '工资不变', full: '' },
      { name: '医疗费用', number: '实报实销', full: '' },
      { name: '伙食补助费', number: '20*天数', full: '' }
    ],
    resArrEnd: [
      { name: '护理等级', number: 0, value: true, full: '' },
      { name: '护理费', number: 0, value: true, full: '' },
      { name: '伤残等级', number: 0, value: true, full: '' },
      { name: '一次性伤残补助金', number: 0, value: true, full: '' },
      { name: '每月伤残津贴', number: 0, value: true, full: '' },
      { name: '一次性工伤医疗补助金', number: 0, value: true, full: '' },
      { name: '一次性伤残就业补助金', number: 0, value: true, full: '' },
      { name: '抚恤金', number: 2541, value: true, full: '' },
      { name: '一次性工亡补助金', number: 0, value: true, full: '' }
    ]
  },
  backOne () {
    let arr = wx.getStorageSync('key-gsbx')
    arr.hl = ''
    arr.sc = ''
    arr.num = ''
    wx.setStorageSync('key-gsbx', arr)
    wx.navigateBack()
  },
  backIndex () {
    let arr = wx.getStorageSync('key-gsbx')
    arr.hl = ''
    arr.sc = ''
    arr.num = ''
    wx.setStorageSync('key-gsbx', arr)
    wx.reLaunch({
      url: '../index/index'
    })
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
    let tranNumber = function (x) {
      return Math.round(x * 100) / 100;
    }
    let arr = wx.getStorageSync('key-gsbx')
    let number = 0
    let brgzCountNumber = 0;
    let brgzCountNumbert = 0;
    let brgzCountNumberw = 0;
    let brgzCountNumbertl = 0;
    let swnumber = 0;
    let brgz = parseInt(arr.num);
    let brgzCount = brgz;
    let spgz = { "2010": 3896, "2011": 4331, "2012": 4692 };
    let qgkzpsr = { "2010": 19019, "2011": 21810, "2012": 22880 };
    if (brgz > spgz["2012"] * 3)
      brgzCount = spgz["2012"] * 3;
    if (brgz < spgz["2012"] * 0.6)
      brgzCount = spgz["2012"] * 0.6;
    let _resArrEnd = this.data.resArrEnd
    _resArrEnd[0].number = arr.hl.title
    _resArrEnd[2].number = arr.sc.title
    if (arr.hl.value > 0) {
      number = tranNumber(spgz['2012'] * arr.hl.value)
      _resArrEnd[1].value = true
    } else {
      number = 0
      _resArrEnd[1].value = false
    }
    if (parseInt(arr.sc.value) > 0) {
      _resArrEnd[3].value = true
      _resArrEnd[4].value = true
      switch (parseInt(arr.sc.value)) {
        case 0:
          break;
        case 1:
          console.log('zheyiuji')
          brgzCountNumber = tranNumber(brgzCount * 27);
          brgzCountNumbert = tranNumber(brgzCount * 0.9);
          break;
        case 2:
          brgzCountNumber = tranNumber(brgzCount * 25);
          brgzCountNumbert = tranNumber(brgzCount * 0.85);
          break;
        case 3:
          brgzCountNumber = tranNumber(brgzCount * 23);
          brgzCountNumbert = tranNumber(brgzCount * 0.8);
          break;
        case 4:
          brgzCountNumber = tranNumber(brgzCount * 21);
          brgzCountNumbert = tranNumber(brgzCount * 0.75);
          break;
          console.log(brgzCountNumber)
        case 5:
          brgzCountNumber = tranNumber(brgzCount * 18);
          brgzCountNumbert = tranNumber(brgzCount * 0.7);
          brgzCountNumberw = tranNumber(spgz["2012"] * 18);
          brgzCountNumbertl = tranNumber(spgz["2012"] * 18);
          break;
        case 6:
          brgzCountNumber = tranNumber(brgzCount * 16);
          brgzCountNumbert = tranNumber(brgzCount * 0.6);
          brgzCountNumberw = tranNumber(spgz["2012"] * 15);
          brgzCountNumbertl = tranNumber(spgz["2012"] * 15);
          break;
        case 7:
          brgzCountNumber = tranNumber(brgzCount * 13);
          brgzCountNumberw = tranNumber(spgz["2012"] * 12);
          brgzCountNumbertl = tranNumber(spgz["2012"] * 12);
          break;
        case 8:
          brgzCountNumber = tranNumber(brgzCount * 11);
          brgzCountNumberw = tranNumber(spgz["2012"] * 9);
          brgzCountNumbertl = tranNumber(spgz["2012"] * 9);
          break;
        case 9:
          brgzCountNumber = tranNumber(brgzCount * 9);
          brgzCountNumberw = tranNumber(spgz["2012"] * 6);
          brgzCountNumbertl = tranNumber(spgz["2012"] * 6);
          break;
        case 10:
          brgzCountNumber = tranNumber(brgzCount * 7);
          brgzCountNumberw = tranNumber(spgz["2012"] * 3);
          brgzCountNumbertl = tranNumber(spgz["2012"] * 3);
          break;
        case 99:
          brgzCountNumber = tranNumber(brgzCount * 6);
          swnumber = tranNumber(qgkzpsr["2012"] * 20);
          break;
      }
    } else {
      brgzCountNumber = 0
      brgzCountNumbert = 0
      _resArrEnd[3].value = false
      _resArrEnd[4].value = false
    }
    if ( parseInt(arr.sc.value) >= 5 && parseInt(arr.sc.value) < 99 ) {
      _resArrEnd[5].value = true
      _resArrEnd[6].value = true
      if (parseInt(arr.sc.value) >= 7) {
        _resArrEnd[4].value = false
      }
    } else {
      _resArrEnd[5].value = false
      _resArrEnd[6].value = false
    }
    if (parseInt(arr.sc.value) === 99) {
      _resArrEnd[5].value = false
      _resArrEnd[6].value = false
      _resArrEnd[4].value = false
      _resArrEnd[7].value = true
      _resArrEnd[8].value = true
    } else {
      _resArrEnd[7].value = false
      _resArrEnd[8].value = false
    }
    console.log(brgz);
    console.log(brgzCountNumber)
    _resArrEnd[1].number = number;
    _resArrEnd[3].number = brgzCountNumber;
    _resArrEnd[4].number = brgzCountNumbert;
    _resArrEnd[5].number = brgzCountNumberw;
    _resArrEnd[6].number = brgzCountNumbertl;
    _resArrEnd[8].number = swnumber;
    console.log(arr)
    this.setData({
      resArrEnd: _resArrEnd
    })
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