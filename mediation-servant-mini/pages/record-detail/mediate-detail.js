// pages/record-detail/mediate-detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [
      {name: '咨询信息', list: [
        {title: '咨询类型', content: '', css: 'blue'},
        {
          title: '咨询事项', content: '' },
        { title: '咨询时间', content: '' },
        { title: '是否转调解', content: '' }
      ]},
      {
        name: '当事人信息', list: [
          { title: '姓名', content: '' },
          { title: '手机号码', content: '' }
        ]
      }
    ],
    mdSwute: true,
    ts: '',
    idThis: '',
    tjSwite: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    console.log(options.id)
    this.setData({
      idThis: id
    })
    this.getDetail(id)
  },
  getDetail(id) {
      console.log(id);
    const that = this
    wx.request({
        url: app.globalData.$ctx + '/wechatMini/mbmCounselDetail',
      dataType: 'json',
      method: 'GET',
      data: {
        id: id
      },
      success: function (json) {
          console.log(json);
        if (json.data.toMediation === '是') {
          that.setData({
            tjSwite: false
          })
        }
        if (json.data.code === -1) {
          that.setData({
            ts: json.data.description,
            tjSwite: false
          })
        } else {
          let item = json.data
          console.log(json.data)
          let arr = that.data.listArr
          console.log(arr);
          console.log(arr[0].list);
          arr[0].list[0].content = item.type // 案件类型
          arr[0].list[1].content = item.content // 案件描述
          arr[0].list[2].content = item.date // 申请事项
          arr[0].list[3].content = item.toMediation // 案件状态
          arr[1].list[0].content = item.name // 当事人姓名
          arr[1].list[1].content = item.mobile // 当事人联系方式
          that.setData({
            listArr: arr
          })
        }
      }
    })
  },
  ztj() {
    let id = this.data.idThis
    let that = this
    wx.request({
      url: app.globalData.$ctx + '/wechatMini/mbmCounselToMediation',
      dataType: 'json',
      method: 'GET',
      data: {
        id: id
      },
      success: function (json) {
        console.log(json)
        if (json.data.code === 1) {
          that.setData({
            ts: '成功转为调解',
            tjSwite: false
          })
          setTimeout(() => {
            wx.reLaunch({
              url: '../core/core'
            })
          }, 500)
        } else {
          that.setData({
            ts: '转换调解失败'
          })
        }
      }
    })
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