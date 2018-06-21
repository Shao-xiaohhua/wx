// pages/toChaRecord/toChaRecord.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consultation:'',
    poster: '',
    name: '',
    author: '',
    src: '',
    listArr: [
      /**{typeName: 'goTo', name: '我的名字（文字）', contentSwite: true, headImg: 'roba.png', content: '请问有人嘛？', audio: false, audioActive: false, audioUrl: '', img: false, imgUrl: '', text: false, textUrl: ''},
      { typeName: 'goTo', name: '我的名字（音频）', contentSwite: false, headImg: 'roba.png', content: '', audio: true, audioActive: false, audioUrl: '', img: false, imgUrl: '', text: false, textUrl: '' },
      { typeName: 'goTo', name: '我的名字（文件）', contentSwite: false, headImg: 'roba.png', content: '', audioActive: false, audio: false, audioUrl: '', img: false, imgUrl: '', text: true, textUrl: '' },
      { typeName: 'goTo', name: '我的名字（图片）', contentSwite: false, headImg: 'roba.png', content: '', audioActive: false, audio: false, audioUrl: '', img: true, imgUrl: 'expic02.jpg', text: false, textUrl: '' },
      { typeName: 'goIn', name: '她的名字（文字）', contentSwite: true, headImg: 's.png', content: '我在，请说，你想干啥！！！', audio: false, audioActive: false, audioUrl: '', img: false, imgUrl: '', text: false, textUrl: '' },
      { typeName: 'goIn', name: '她的名字（音频）', contentSwite: false, headImg: 's.png', content: '', audio: true, audioActive: false, audioUrl: '', img: false, imgUrl: '', text: false, textUrl: '' },
      { typeName: 'goIn', name: '她的名字（文件）', contentSwite: false, headImg: 's.png', content: '', audioActive: false, audio: false, audioUrl: '', img: false, imgUrl: '', text: true, textUrl: '' },
      { typeName: 'goIn', name: '她的名字（图片）', contentSwite: false, headImg: 's.png', content: '', audioActive: false, audio: false, audioUrl: '', img: true, imgUrl: 'expic02.jpg', text: false, textUrl: '' }**/
    ]
  },
  toAudio (e) {
    let index = e.currentTarget.dataset.index
    let len = this.data.listArr.length
    let arr = this.data.listArr
    if (arr[index].audioActive === true) {
      arr[index].audioActive = false
    } else {
      for (let i = 0; i < len; i++) {
        arr[i].audioActive = false
      }
      arr[index].audioActive = true
    }
    this.setData({
      listArr: arr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var consultationId = options.id;
    if (!consultationId) {
      wx.showModal({
        title: '异常提示',
        content: "缺少参数 consultationId",
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack();
          };
        }
      });
    };
    this.setData({
      consultation: consultationId
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData();
  },

  loadData: function() {
    var that=this;
    wx.request({
      url: app.globalData.apiPath + '/service/rest/12348.WeChat/collection/chatroomRecord',
      method: 'POST',
      data: JSON.stringify({
        consultationId: that.data.consultation
      }),
      success: function (res) {
        if (res.data.code == 1) {
          console.log(res);
          var list = [];
          for(var i in res.data.result){
            var r = res.data.result[i];
            if (!r.talkerAvatar){
              if (r.talkerId === app.globalData.userId){
                r.talkerAvatar = app.globalData.userInfo.avatarUrl;
              }else{
                r.talkerAvatar = '../../images/s.png';
              }
            }
            var myRecord = (r.talkerId === app.globalData.userId ? 'goTo' :'goIn');
            if (r.type === 'TEXT'){
              var o = { 
                typeName: myRecord, 
                name: r.talkerName, 
                contentSwite: true, 
                headImg: r.talkerId == 'robot' ? '../../images/roba.png' : r.talkerAvatar, 
                content: r.text, 
                audio: false, 
                audioActive: false, 
                audioUrl: '', 
                img: false, 
                imgUrl: '', 
                text: false, 
                textUrl: '' 
              };
              list.push(o);
              
            } else if (r.type === 'MEDIA') {
              var data = JSON.parse(r.data);
              if(data.type ==='image'){
                var o = {
                  typeName: myRecord,
                  name: r.talkerName,
                  contentSwite: false,
                  headImg: r.talkerId == 'robot' ? 'roba.png' : r.talkerAvatar,
                  content: '',
                  audio: false,
                  audioActive: false,
                  audioUrl: '',
                  img: true,
                  imgUrl: data.data,
                  text: false,
                  textUrl: ''
                };
                list.push(o);
              }else {
                continue;
              }
            }else {
              continue;
            }
          }
          that.setData({
            listArr: list
          });
          if (that.data.listArr.length == 0){
            wx.showModal({
              title: '提示',
              content: "此咨询没有聊天记录",
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack();
                };
              }
            });
          }
        }else{
          wx.showModal({
            title: '提示',
            content: "未获取到聊天记录",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack();
              };
            }
          });
        }
      },
      fail:function (){
        wx.showModal({
          title: '提示',
          content: "请检查您的网络是否正常",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack();
            };
          }
        });
      }
    })
  },

  showImage: function (e) {
    var that = this;
    wx.previewImage({
      current: e.target.dataset.src,
      urls: [e.target.dataset.src]
    });
  }
})