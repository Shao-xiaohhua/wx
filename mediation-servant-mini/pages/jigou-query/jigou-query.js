// pages/jigou-query/jigou-query.js
let choose_year = null,
  choose_month = null;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    hidden: true,
    timeNum: 0,
    tabArr: [
      { name: '机构类型', url: '', code: '', width: 'calc(100% / 2)', active: '' },
      { name: '所属区县', url: '', code: '', width: 'calc(100% / 2)', active: '' }
    ],
    addNewNum: 0,
    typeArr: [
      { name: '全部', id: 'orgs', active: true },
      { name: '律师事务所', id: 'cf2ec647762641e897c0d1fd7f474141', active: false },
      { name: '公证处', id: 'f2c12d3fe56845c79154dea5a90c8bb1', active: false },
      { name: '司法鉴定所', id: '6943237e1b2948afb6625abd7f86ac7e', active: false },
      { name: '法律服务所', id: 'f2292375b0664a5d873bc833b0c2fb36', active: false },
      { name: '法援机构', id: 'bf6f10555f54425483df978649473325', active: false },
      { name: '人民调解委员会', id: '7454a420f4ef4e539c1b9b4e30e8f6e7', active: false },
      { name: '社区工作站', id: 'd8e85be433264b6f86e318d784694fae', active: false }
    ],
    ZoneArr: [
      { name: '全部', id: '', active: true },
      { name: '黄浦', id: 'eab9e51dbeb940cf97ae8b54f38d306d', active: false },
      { name: '徐汇', id: 'eab9e51d261c4710846dbc9a8a7be794', active: false },
      { name: '长宁', id: 'eab9e51d569248ea87da1412ca0a1985', active: false },
      { name: '静安', id: 'eab9e51dbfda482abe4a511ea8e3a62c', active: false },
      { name: '普陀', id: 'eab9e51db3c648ef9237fcce442e6e5a', active: false },
      { name: '虹口', id: 'eab9e51d2db246aeaafcc5606ae9a8a5', active: false },
      { name: '杨浦', id: 'eab9e51d56584d1f8b36da835d0a2c61', active: false },
      { name: '闵行', id: 'eab9e51d8a574b4087abe36c6062bc91', active: false },
      { name: '宝山', id: 'eab9e51d98cb417bbc52f588527fc3a1', active: false },
      { name: '嘉定', id: 'eab9e51db68a40758d1482cc482e4f74', active: false },
      { name: '浦东', id: 'eab9e51ddf814505b95537bc6c4aa293', active: false },
      { name: '金山', id: 'eab9e51dd74d475b9ed4afb2e7cdca1f', active: false },
      { name: '青浦', id: 'eab9e51d0bb54ab4a8e2196ec401830c', active: false },
      { name: '奉贤', id: 'eab9e51d7077471bbf18ae5a038869da', active: false },
      { name: '崇明', id: 'eab9e51d6f90491da45d0223a3c3b176', active: false },
      { name: '松江', id: 'eab9e51d660d45c6834dfad0f7c48109', active: false }
    ],
    timeArr: [
      { name: '今日' },
      { name: '昨日' },
      { name: '本周' },
      { name: '上周' },
      { name: '本月' },
      { name: '上月' }
    ],
    scrollArr: [
      { name: '综合', active: false, id: '' },
      { name: '满意率', active: false, id: 'dgoodRate' },
      { name: '咨询人次', active: false, id: 'serviceCount' },
      { name: '团队规模', active: false, id: 'lawyerNumber' },
      { name: '执业年限', active: false, id: 'practiceYears' },
      { name: '公益积分', active: false, id: 'communityScore' }
    ],
    contentList: [],
    morSwite: true,
    stateSwite: false,
    timeSwite: false,
    timeMoreSwite: true,
    shadoWhite: false,
    typeID: 'orgs', // 查询机构
    ZoneID: '',      // 地区ID
    partWord: '', // 关键字检索
    pageNum: 1, // 翻页
    pageSwite: true,
    sort: '' // 排序
  },
  swClick (e) {
    let index = e.currentTarget.dataset.index
    let len = this.data.scrollArr.length
    let id = e.currentTarget.dataset.id
    let arr = this.data.scrollArr
    // if (arr[index].active === true) {
    //   arr[index].active = false
    // } else {
    //   for (let i = 0; i < len; i++) {
    //     arr[i].active = false
    //   }
    //   arr[index].active = true
    // }
    for (let i = 0; i < len; i++) {
      arr[i].active = false
    }
    arr[index].active = true
    this.setData({
      scrollArr: arr,
      sort: id
    })
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
  tabCheck(e) {
    let index = e.target.dataset.index
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
    } else {
      this.setData({
        morSwite: false,
        stateSwite: true,
        timeSwite: false
      })
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
    let swite = this.data.pageSwite
    let typeId = this.data.typeID
    let zoneId = this.data.ZoneID
    let partWord = this.data.partWord
    let pageNum = this.data.pageNum
    let sort = this.data.sort
    let that = this
    if (swite) {
      pageNum += 1
      this.setData({
        pageNum: pageNum,
        pageSwite: false
      })
      wx.request({
        url: app.searchData.$ctx,
        dataType: 'json',
        data: {
          page: pageNum,
          pageSize: 15,
          typeId: typeId,
          zoneId: zoneId,
          partWord: partWord,
          sort: sort
        },
        success: function (data) {
          let arr = that.data.contentList
          let newArr = arr.concat(data.data.items)
          console.log(newArr)
          that.setData({
            contentList: newArr,
            hidden: true,
            pageSwite: true
          })
        }
      })
    }
    console.log('到底了')
    console.log(this.data.pageNum)
  },
  clearPage () {
    let num = 1
    this.setData({
      pageNum: num
    })
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
    this.getListArr()
  },
  // 获取列表数据
  getListArr () {
    let that = this
    let typeId = this.data.typeID
    let zoneId = this.data.ZoneID
    let partWord = this.data.partWord
    let sort = this.data.sort
    this.setData({
      hidden: false
    })
    wx.request({
      url: app.searchData.$ctx,
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 15,
        typeId: typeId,
        zoneId: zoneId,
        partWord: partWord,
        sort: sort
      },
      success: function (data) {
        let newArrList = data.data.items
        console.log(data.data.items)
        that.setData({
          contentList: []
        })
        setTimeout(() => {
          that.setData({
            contentList: newArrList,
            hidden: true
          })
        }, 500)
      }
    })
  },
  getTypeID (e) {
    this.clearPage()
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let arr = this.data.typeArr
    let tpArr = this.data.tabArr
    let tpLen = tpArr.length
    for (let i = 0; i < tpLen; i++) {
      tpArr[i].active = ''
    }
    let len = arr.length
    for (let i = 0; i < len; i++) {
      arr[i].active = false
    }
    arr[index].active = true
    this.setData({
      typeID: id,
      typeArr: arr,
      shadoWhite: false,
      tabArr: tpArr
    })
    this.getListArr()
  },
  getZoneID (e) {
    this.clearPage()
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let arr = this.data.ZoneArr
    let len = arr.length
    let tpArr = this.data.tabArr
    let tpLen = tpArr.length
    for (let i = 0; i < tpLen; i++) {
      tpArr[i].active = ''
    }
    for (let i = 0; i < len; i++) {
      arr[i].active = false
    }
    arr[index].active = true
    this.setData({
      ZoneID: id,
      ZoneArr: arr,
      shadoWhite: false,
      tabArr: tpArr
    })
    this.getListArr()
  },
  inputSearch (e) {
    let partWord = e.detail.value
    this.setData({
      partWord: partWord
    })
    this.getListArr()
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
  onShow: function () {

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