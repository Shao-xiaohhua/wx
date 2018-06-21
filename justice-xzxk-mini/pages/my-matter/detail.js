// pages/my-matter/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleText: '您申请的行政许可审批事项已完成!',
    listArr: [
      { name: '静安区司法局', type: '受理审查', time: '2018-04-04- 16:24', now: false, pass: false },
      { name: '静安区司法局', type: '受理审查', time: '2018-04-04- 16:24', now: false, pass: false },
      { name: '上海市司法局', type: '审核意见', time: '2018-04-04- 16:24', now: false, pass: false },
      { name: '上海市司法局', type: '核准决定', time: '2018-04-04- 16:24', now: true, pass: false },
      { name: '上海市司法局', type: '文书送达', time: '2018-04-04- 16:24', now: false, pass: true }
    ],
    getMechanism: [
      { name: '事项名称', cont: '律师事务所负责人变更审核登记', imgUrl: '' },
      {
        name: '受理编号', cont: '沪司审（5428-5）字（2018)4856号', imgUrl: ''
      },
      { name: '统一受理编号', cont: '040508', imgUrl: '' },
      { name: '受理时间', cont: '2018-04-25', imgUrl: '' },
      { name: '申请人', cont: '国浩律师事务所', imgUrl: '' },
      { name: '电话号码', cont: '13955656565', imgUrl: '' },
      { name: '地址', cont: '静安区xx中心', imgUrl: '' },
    ]
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
    let arr = wx.getStorageSync('myQueryListArr').stepList;
    console.log(arr);
    let arrAr = wx.getStorageSync('myQueryListArr').baseInfo;
    console.log(arrAr)
    let newArrAr = this.data.getMechanism;
    newArrAr[0].cont = arrAr.itemName;
    newArrAr[1].cont = arrAr.caseNumber;
    newArrAr[2].cont = arrAr.sn;
    newArrAr[3].cont = arrAr.slDate;
    newArrAr[4].cont = arrAr.application;
    newArrAr[5].cont = arrAr.phoneNumber;
    newArrAr[6].cont = arrAr.address;
    this.setData({
      listArr: arr,
      getMechanism: newArrAr
    });
  },
  getViwe() {
    wx.navigateTo({
      url: 'query-web-view'
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