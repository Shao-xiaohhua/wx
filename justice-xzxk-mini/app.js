//app.js
App({
  onLaunch: function () {
    // this.clearFun();
    wx.setStorageSync('falseIDnumber', '51070319910813312X');
    // wx.setStorageSync('falseIDnumberTwo', '51070319910813312X');
    wx.setStorageSync('setp-to-register', false);
    wx.setStorageSync('isWXloginSwite', false);
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          })
        }
      }
    })
  },
  clearFun () {
    // 正常申请
    wx.setStorageSync('moreListArrTwo', {});
    wx.setStorageSync('moreListArrTwo', {});
    wx.setStorageSync('upFileObj', {});
    wx.setStorageSync('BusinessType', '');
    wx.setStorageSync('MajorCode', '');
    wx.setStorageSync('ItemCode', '');
    wx.setStorageSync('Apply', '');
    wx.setStorageSync('busStr', {});
    wx.setStorageSync('busArr', {});
    wx.setStorageSync('busFileArr', {});
    wx.setStorageSync('stuffs', {});
    wx.setStorageSync('saveListArrSeven', {});
    wx.setStorageSync('sevenSaveNavbar', {});
    wx.setStorageSync('moreListArrTwo', {});
    wx.setStorageSync('moreListArrThree', {});
    wx.setStorageSync('sxmc', '');
    wx.setStorageSync('setpArr', {});
    wx.setStorageSync('bz1', {});
    wx.setStorageSync('bz2', {});
    wx.setStorageSync('bz3', {});
    wx.setStorageSync('StorNav', false);
    // 二次提交
    wx.setStorageSync('formItemcode', '');
    wx.setStorageSync('formID', '');
    wx.setStorageSync('formStuffs', {});
    wx.setStorageSync('FormUpFileObj', {});
    wx.setStorageSync('FormMoreListArrTwo', {});
    wx.setStorageSync('FormMoreListArrThree', {});
    wx.setStorageSync('FormBusArr', {});
    wx.setStorageSync('FormBusFileArr', {});
    wx.setStorageSync('formBusStr', {});
    wx.setStorageSync('onlyForm', false);
    // 我要查询
    wx.setStorageSync('myQueryListArr', {});
    // 我要预约
    wx.setStorageSync('justiceBureau', '');
    wx.setStorageSync('appoinSuccess', {});
    // 保存草稿ID
    wx.setStorageSync('storEntitID', '');
  },
  globalData: {
    userInfo: null
  },
  appUrl: {
    // urlHead: 'http://31.15.16.233/',
    // urlHead: 'https://xzxktest.justice.gov.cn',
    urlHead: 'http://192.168.123.198:8080/xzxk',
    // urlHead: 'http://10.222.14.109:8080/xzxk',
    urlBody: '/service/rest/xzxk.MiniProgramsData/collection/',
    getMechanism: 'getAdministrativeLicenseItemBusinessTypeList',
    getBusinessType: 'getAdministrativeLicenseItemListOfMajorItemByBusinessType?',
    getMajorCode: 'getAdministrativeLicenseItemListByMajorCode?',
    getItemCode: 'getAdministrativeLicenseServiceByItemCode?', // 获取表单列表
    upId: '/service/rest/tk.File/collection/upload', // 提交图片获取ID
    upLoad: 'onlineSubmitAndCreate?', // 提交
    getorgName: 'queryOrganization?', // 获取机构列表
    validate: 'validate?', // 校验
    PhoneCode: 'vertificateCode?',
    checkLogin: 'checkLogin?',
    personSearch: 'queryPerson?', // 获取人员信息
    register: 'register?', // 注册
    login: 'login?',
    getUserInfoByUserId: 'getUserInfoByUserId?', // 获取用户信息userId
    saveDraft: 'saveDraft?', // 保存草稿
    getFormList: 'getAllAdministrativeLicenseServiceValueByItemCode?', // 获取返回表单
    onlineCancel: 'onlineCancel?' // 撤销审批
  },
  queryUrl: {
    urlHead: 'https://xzxktest.justice.gov.cn/service/rest/xzxk.MiniProgramsData/collections/',
    search: 'appSearchDoc?', // 获取我要查询
    matter: 'getMyItem?', // 获取事项
    appointment: 'getJusticeData?', // 获取受理审查机构列表
    personSearch: 'personSearch?', // 搜索人员
    Search: 'Search?', // 我要查询接口
    myOrder: 'myOrder?', // 我要预约接口
    cancelApprove: 'cancelApprove?', // 删除事项
    getCodeImage: 'getCodeImage?', // 验证码图片
    SearchDetail: 'SearchDetail?' // 查询审批中
  },
  xzUrl: {
    // urlHead: 'http://10.222.13.3:8080/xzxk/',
    urlHead: 'https://xzxktest.justice.gov.cn',
    urlBody: 'service/rest/xzxk.MiniProgramsData/collections/',
    bszn: 'getAllGuideList?', // 办事指南
    getQuestionAndAnswerList: 'getQuestionAndAnswerList?' // 常见问答
  },
  phoneNumber: {
    reg: /^1[0-9]{10}$/
  },
  IDnumber: {
    reg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  }
})