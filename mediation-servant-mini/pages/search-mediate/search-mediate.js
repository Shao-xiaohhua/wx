// pages/search-mediate/search-mediate.js
let choose_year = null,
  choose_month = null;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    timeNum: 0,
    tabArr: [
      { name: '案件类型', url: '', code: '', width: 'calc(100% / 3)', active: '' },
      { name: '案件状态', url: '', code: '', width: 'calc(100% / 3)', active: '' },
      { name: '案件时间', url: '', code: '', width: 'calc(100% / 3)', active: '' }
    ],
    addNewNum: 0,
    listArr: [
      // { title: '邻里纠纷', url: '../record-detail/investigation-detail', time: '2018-10-18 10:30:25', name: '刘长瑞', phone: '15155151515',  tag: '文档归类', tagSwite: 'active' },
      // { title: '房地产物业纠纷', url: '../record-detail/investigation-detail', time: '2018-10-18 10:30:25', name: '刘长瑞', phone: '15155151515', tag: '文档归类', tagSwite: 'active' },
      // { title: '合同纠纷', url: '../record-detail/investigation-detail', time: '2018-10-18 10:30:25', name: '刘长瑞', phone: '15155151515', tag: '回访中', tagSwite: 'active' },
      // { title: '邻里纠纷', url: '../record-detail/investigation-detail', time: '2018-10-18 10:30:25', name: '刘长瑞', phone: '15155151515', tag: '文档归类', tagSwite: 'active' }
    ],
    typeArr: [
      //   { name: '全部', active: true },
      //   {name: '邻里纠纷', active: false },
      //   { name: '合同纠纷', active: false },
      //   { name: '婚姻家庭纠纷', active: false },
      //   { name: '旅游纠纷', active: false },
      //   { name: '房地产物业纠纷', active: false },
      //   { name: '抚养赡养纠纷', active: false },
      //   { name: '房地产宅基地纠纷', active: false },
    ],
    stateArr: [
      //   { name: '全部', active: true },
      //   { name: '办理中', active: false },
      //   { name: '文档归档', active: false },
      //   { name: '回访中', active: false }
    ],
    timeArr: [],
    morSwite: true,
    stateSwite: false,
    timeSwite: false,
    timeMoreSwite: true,
    shadoWhite: false,
    DkeyWord: '', // 关键字
    Dstatus: '', // 案件状态
    DtypeId: '', // 案件类型
    DbeginDate: '', // 开始时间
    DendDate: '', // 结束时间
    Dpage: 1, // 第几页
    AllDpage: 0, // 总页数
    DpageSize: 20, // 数量
    hidden: true,    //加载动画
    pushSwite: true // 触底更新开关
  },
  kewTtext(e) {
    let text = e.detail.value
    this.setData({
      DkeyWord: text
    })
  },
  blurGetList() {
    const that = this
    let newtypeArr = this.data.typeArr.map((n) => {
      if (n.name === '全部') {
        n.active = true
      } else {
        n.active = false
      }
      return n
    });
    let newstateArr = this.data.stateArr.map((n) => {
      if (n.name === '全部') {
        n.active = true
      } else {
        n.active = false
      }
      return n
    });
    let newdays = this.data.days.map((n) => {
      n.centeSwite = false
      n.choosed = false
      return n
    });
    console.log(this.data.days)
    this.setData({
      listArr: [],
      Dpage: 1,
      DpageSize: 20,
      typeArr: newtypeArr,
      stateArr: newstateArr,
      DtypeId: '',
      Dstatus: '',
      timeArr: [],
      DbeginDate: '',
      DendDate: '',
      days: newdays
    })
    this.getListArr();

  },
  getListArr() {
    let keyWord = this.data.DkeyWord
    let status = this.data.Dstatus
    let typeId = this.data.DtypeId
    let beginDate = this.data.DbeginDate
    let endDate = this.data.DendDate
    const that = this
    wx.request({
      url: app.globalData.$ctx + '/wechatMini/mbmCaseSearch',
      dataType: 'json',
      method: 'GET',
      data: {
        personId: wx.getStorageSync("__session__").session,
        status: status,
        typeId: typeId,
        beginDate: beginDate,
        endDate: endDate,
        keyWord: keyWord,
        page: that.data.Dpage,
        pageSize: that.data.DpageSize
      },
      success: function (json) {
        console.log(json)
        if (json.data.code === 1) {
          let arr = json.data.items
          let len = arr.length
          console.log(json.data.items)
          let oldArr = that.data.listArr
          let newArr = oldArr.concat(arr)
          that.setData({
            listArr: newArr,
            hidden: true,
            AllDpage: json.data.totalPage,
            pushSwite: true
          })
        } else {
          setTimeout(() => {
            that.setData({
              hidden: true,
              pushSwite: true
            })
          }, 3000)
        }
        console.log(json.data.totalPage)
      }
    })
  },
  pushListArr() {
    const that = this
    let page = this.data.Dpage
    let pageSize = this.data.DpageSize
    if (this.data.pushSwite && this.data.Dpage <= this.data.AllDpage) {
      page += 1
      this.setData({
        pushSwite: false,
        Dpage: page
      })
      console.log(this.data.Dpage)
      this.getListArr()
    }
  },
  getType(e) {
    let index = e.currentTarget.dataset.index
    let len = this.data.typeArr.length
    let id = e.currentTarget.dataset.id
    let arr = this.data.typeArr
    let arrT = this.data.tabArr
    let lenT = arrT.length
    for (let i = 0; i < lenT; i++) {
      arrT[i].active = ''
    }
    for (let i = 0; i < len; i++) {
      arr[i].active = false
    }
    arr[index].active = true
    this.setData({
      typeArr: arr,
      shadoWhite: false,
      tabArr: arrT,
      DtypeId: id,
      hidden: false,
      Dpage: 1,
      listArr: []
    });
    console.log(this.data.DtypeId)
    this.getListArr()
  },
  getState(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let len = this.data.stateArr.length
    let arr = this.data.stateArr
    let arrT = this.data.tabArr
    let lenT = arrT.length
    for (let i = 0; i < lenT; i++) {
      arrT[i].active = ''
    }
    for (let i = 0; i < len; i++) {
      arr[i].active = false
    }
    arr[index].active = true
    this.setData({
      stateArr: arr,
      shadoWhite: false,
      tabArr: arrT,
      Dstatus: id,
      hidden: false,
      Dpage: 1,
      listArr: []
    });
    this.getListArr()
  },
  mp(e) {
    let arr = this.data.tabArr
    let len = arr.length
    for (let i = 0; i < len; i++) {
      arr[i].active = ''
    }
    this.setData({
      morSwite: false,
      stateSwite: false,
      timeSwite: false,
      timeMoreSwite: true,
      shadoWhite: false,
      tabArr: arr
    })
  },
  mpC(e) {
    let arr = this.data.tabArr
    let len = arr.length
    for (let i = 0; i < len; i++) {
      arr[i].active = ''
    }
    this.setData({
      morSwite: false,
      stateSwite: false,
      timeSwite: false,
      timeMoreSwite: true,
      shadoWhite: false,
      tabArr: arr
    })
    console.log(this.data.timeArr)
    let cur_year = this.data.cur_year;
    let cur_month = this.data.cur_month;
    // console.log(cur_year)
    // console.log(cur_month)
    let StTime
    let StTimeE
    if (this.data.timeArr.length === 1) {
      let atS
      if (this.data.timeArr[0] < 10) {
        atS = '0' + '' + (this.data.timeArr[0] + 1)
        StTime = cur_year + '-' + cur_month + '-' + atS
        StTimeE = cur_year + '-' + cur_month + '-' + atS
      } else {
        atS = (this.data.timeArr[0] + 1)
        StTime = cur_year + '-' + cur_month + '-' + atS
        StTimeE = cur_year + '-' + cur_month + '-' + atS
      }
    } else if (this.data.timeArr.length === 2) {
      let yiS = this.data.timeArr[0] < 10 ? '0' + '' + (this.data.timeArr[0] + 1) : (this.data.timeArr[0] + 1)
      let erS = this.data.timeArr[1] < 10 ? '0' + '' + (this.data.timeArr[1] + 1) : (this.data.timeArr[1] + 1)
      StTime = cur_year + '-' + cur_month + '-' + yiS
      StTimeE = cur_year + '-' + cur_month + '-' + erS
    } else {
      StTime = ''
      StTimeE = ''
    }
    this.setData({
      DbeginDate: StTime,
      DendDate: StTimeE,
      hidden: false,
      Dpage: 1,
      listArr: []
    })
    console.log(StTime)
    console.log(StTimeE)
    this.getListArr()
  },
  tabCheck(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.tabArr
    let len = arr.length
    if (arr[index].active === 'active') {
      arr[index].active = ''
      this.setData({
        shadoWhite: false
      });
    } else {
      for (let i = 0; i < len; i++) {
        arr[i].active = ''
      }
      arr[index].active = 'active'
      this.setData({
        shadoWhite: true
      });
    }
    this.setData({
      tabArr: arr
    })
    if (index === 0) {
      this.setData({
        morSwite: true,
        stateSwite: false,
        timeSwite: false
      })
    } else if (index === 1) {
      this.setData({
        morSwite: false,
        stateSwite: true,
        timeSwite: false
      })
    } else {
      this.setData({
        morSwite: false,
        stateSwite: false,
        timeSwite: true
      })
    }

    if (this.data.DbeginDate && this.data.DendDate && this.data.days) {
      let dateBGI = new Date(this.data.DbeginDate).getDate();
      let dateEND = new Date(this.data.DendDate).getDate();
      let timeArr = []
      timeArr.push(dateBGI)
      timeArr.push(dateEND);
      let timLingth = timeArr.length;
      let arr = this.data.days
      let len = arr.length
      for (let i = 0; i < len; i++) {
        arr[i].choosed = false
        for (let j = 0; j < timLingth; j++) {
          if (arr[i].day === timeArr[j]) {
            arr[i].choosed = true
          }
        }
      }
      if (timLingth > 1) {
        for (let c = 0; c < len; c++) {
          arr[c].centeSwite = false
        }
        for (let m = timeArr[0]; m < timeArr[1] - 1; m++) {
          arr[m].centeSwite = true
        }
      }
      this.setData({
        days: arr
      });
    }
  },
  timeMore() {
    this.setData({
      timeMoreSwite: false
    })
  },
  upper: function (e) {
    // console.log(e)
  },
  lower: function (e) {
    console.log('‘到底了');
  },
  scroll: function (e) {
    // console.log(e.detail.scrollTop)
    let num = e.detail.scrollTop
    this.setData({
      addNewNum: num
    })
    // console.log(e.detail)
  },
  addNew() {
    // console.log(this.data.addNewNum)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.bdate && options.edate) {
      this.setData({
        DbeginDate: options.bdate,
        DendDate: options.edate
      });
    }
    if (options.status) {
      this.setData({
        Dstatus: options.status
      })
      console.log(options.status);
    }
    // this.setData({
    //     timeArr: arr
    // });
    const that = this
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    });
    wx.request({
      url: app.globalData.$ctx + '/wechatMini/mbmCaseSearchCondition',
      dataType: 'json',
      success: function (json) {
        console.log(json.data)
        let typeArr = json.data.caseTypes
        let Tta = []
        let lenT = typeArr.length
        for (let i = 0; i < lenT; i++) {
          let obj = { name: typeArr[i].name, value: typeArr[i].value, active: false }
          Tta.push(obj)
        }
        Tta.unshift({ name: '全部', value: '', active: true })
        let staArr = json.data.statuses
        let Sta = []
        let lenS = staArr.length
        for (let i = 0; i < lenS; i++) {
          let obj = { name: staArr[i].name, value: staArr[i].value, active: false }
          Sta.push(obj)
        }
        Sta.unshift({ name: '全部', value: '', active: true })
        that.setData({
          typeArr: Tta,
          stateArr: Sta
        })
        let newArrSta = that.data.stateArr
        let len = newArrSta.length
        if (that.data.Dstatus && that.data.Dstatus !="banjieAll") {
          for (let i = 0; i < len; i++) {
            newArrSta[i].active = false
            if (newArrSta[i].value === that.data.Dstatus) {
              newArrSta[i].active = true
            }
          }
          console.log(newArrSta)
          console.log(that.data.Dstatus)
          that.setData({
            stateArr: newArrSta
          })
        }
      }
    });
    this.setData({
      hidden: false,
      Dpage: 1,
      listArr: []
    });
    this.getListArr()

  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
      console.log(empytGrids + 'riqi')
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        day: i,
        choosed: false,
        centeSwite: false
      });
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });
    }
  },
  tapDayItem(e) {
    const idx = e.currentTarget.dataset.idx;
    const days = this.data.days;
    let len = this.data.days.length;
    days[idx].choosed = !days[idx].choosed;
    let num = this.data.timeNum
    let numArr = []
    for (let i = 0; i < len; i++) {
      if (days[i].choosed === true) {
        num += 1
        numArr.push(i)
      }
    }
    if (num > 2) {
      let max = numArr[0];
      let min = numArr[0]
      let lens = numArr.length
      for (let i = 0; i < lens; i++) {
        if (numArr[i] > max) {
          max = numArr[i]
        }
      }
      for (let i = 0; i < lens; i++) {
        if (numArr[i] <= min) {
          min = numArr[i]
        }
      }
      let arrNwe = []
      arrNwe.push(min)
      arrNwe.push(max)
      numArr = arrNwe
    }
    let lend = numArr.length
    // for (let i = 0; i < lend; i++) {
    //   if (idx > numArr[i]) {
    //      console.log('kaishi')
    //      numArr.splice(i, 1, idx)
    //      break
    //   }
    // }
    for (let i = 0; i < len; i++) {
      days[i].choosed = false
    }
    for (let i = 0; i < lend; i++) {
      days[numArr[i]].choosed = true
    }
    let lena = numArr.length
    if (lena === 2) {
      let b = numArr[0]
      let e = numArr[1]
      let nel = e - b
      for (let i = 0; i < len; i++) {
        if (i > b && i < e) {
          days[i].centeSwite = true
        } else {
          days[i].centeSwite = false
        }
      }
    } else {
      for (let i = 0; i < len; i++) {
        days[i].centeSwite = false
      }
    }
    console.log(numArr)
    this.setData({
      days,
      timeArr: numArr
    });
  },
  chooseYearAndMonth() {
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    let picker_year = [],
      picker_month = [];
    for (let i = 1900; i <= 2100; i++) {
      picker_year.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      picker_month.push(i);
    }
    const idx_year = picker_year.indexOf(cur_year);
    const idx_month = picker_month.indexOf(cur_month);
    this.setData({
      picker_value: [idx_year, idx_month],
      picker_year,
      picker_month,
      showPicker: true,
    });
  },
  pickerChange(e) {
    const val = e.detail.value;
    choose_year = this.data.picker_year[val[0]];
    choose_month = this.data.picker_month[val[1]];
  },
  tapPickerBtn(e) {
    const type = e.currentTarget.dataset.type;
    const o = {
      showPicker: false,
    };
    if (type === 'confirm') {
      o.cur_year = choose_year;
      o.cur_month = choose_month;
      this.calculateEmptyGrids(choose_year, choose_month);
      this.calculateDays(choose_year, choose_month);
    }
    this.setData(o);
  },
  // 日历结束
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
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
    this.pushListArr()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})