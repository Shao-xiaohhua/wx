// pages/user/fild-core.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bjSwite: true,
    fildArr: [
      { name: '申请书', src: '../../images/expic02.jpg', active: false },
      { name: '身份证正面', src: '../../images/expic02.jpg', active: false },
      { name: '身份证反面', src: '../../images/expic02.jpg', active: false },
      { name: '学历证书', src: '../../images/expic02.jpg', active: false }
    ],
    imgSrc: '',
    imgSwite: false,
    imgIndex: 0
  },
  bjFile () {
    let Swite = this.data.bjSwite;
    Swite = !Swite;
    this.setData({
      bjSwite: Swite
    });
  },
  getImgSrc (e) {
    let index = e.currentTarget.dataset.index;
    let src = e.currentTarget.dataset.src;
    console.log(src)
    wx.previewImage({
      current: 'https://avatars2.githubusercontent.com/u/20313977?s=400&u=dfc9fa1f4e1272543b2f049e1b1e1993520f0132&v=4', // 当前显示图片的http链接
      urls: ['https://avatars2.githubusercontent.com/u/20313977?s=400&u=dfc9fa1f4e1272543b2f049e1b1e1993520f0132&v=4'], // 需要预览的图片http链接列表
      success: json => {
        console.log(json)
      }
    })
    // if (!this.data.bjSwite) {
    //   let arr = this.data.fildArr;
    //   arr[index].active = !arr[index].active;
    //   this.setData({
    //     fildArr: arr
    //   });
    // } else {
    //   this.setData({
    //     imgSrc: src,
    //     imgSwite: true,
    //     imgIndex: index
    //   });
    // }
  },
  downFildList () {
    let arr = this.data.fildArr;
    let len = arr.length;
    let newArr = [];
    for (let i = 0; i < len; i++) {
      if (arr[i].active) {
        let secArr = {name: arr[i].name, src: arr[i].src }
        newArr.push(secArr)
      }
    }
    console.log(newArr)
  },
  hImg () {
    let arr = this.data.fildArr;
    let index = this.data.imgIndex;
    wx.chooseImage({
      count: 1,
      success: json => {
        console.log(json)
        let src = json.tempFilePaths[0];
        arr[index].src = src;
        this.setData({
          fildArr: arr,
          imgSwite: false
        });
      }
    })
  },
  back () {
    this.setData({
      imgSwite: false
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