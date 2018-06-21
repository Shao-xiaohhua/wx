// pages/calc/calc.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputArr: [
            { title: '案件类型', ip: '请选择案件类型', data: '', value: '', arrow: true, link: true, linkUrl: '../calc-choice/calc-choice?type=caseTypeArr&index=', error: false, y: '' },
            { title: '法院地区', ip: '请选择法院地区', data: '' , value:'', arrow: true, link: true, linkUrl: '../calc-choice/calc-choice?type=court&index=', error: false, y: '' },
            { title: '诉讼金额', ip: '请输入诉讼费', data: '' , value:'', arrow: false, link: false, error:false, y: '元' }
        ],
        sw: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        inputArr: [
          { title: '案件类型', ip: '请选择案件类型', data: '', value: '', arrow: true, link: true, linkUrl: '../calc-choice/calc-choice?type=caseTypeArr&index=', error: false, y: '' },
          { title: '法院地区', ip: '请选择法院地区', data: '', value: '', arrow: true, link: true, linkUrl: '../calc-choice/calc-choice?type=court&index=', error: false, y: '' },
          { title: '诉讼金额', ip: '请输入诉讼费', data: '', value: '', arrow: false, link: false, error: false, y: '元' }
        ]
      })
      wx.setStorageSync('calc-choiceData', {
        pindex: 0,
        cindex: 0,
        title: "",
        value: 1,
        returnIndex: null,
        pageN: ''
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
        let inputArr = this.data.inputArr
        let choiceData = wx.getStorageSync('calc-choiceData');
        if (choiceData && choiceData.returnIndex){
            let index = choiceData.returnIndex;
            inputArr[index].value = choiceData.title;
            inputArr[index].data = choiceData.value
            console.log(index)
            // let lenI = inputArr.length
            // for (let i = 0; i < lenI; i++) {
            //   if (inputArr[i].data === '') {
            //     inputArr[i].error = true
            //   } else {
            //     inputArr[i].error = false
            //   }
            // }
            if (inputArr[index].value) {
              inputArr[index].error = false
            } else {
              inputArr[index].error = true
            }
            console.log(inputArr[index].value)
        } else {
          inputArr = [
            { title: '案件类型', ip: '请选择案件类型', data: '', value: '', arrow: true, link: true, linkUrl: '../calc-choice/calc-choice?type=caseTypeArr&index=', error: false, y: '' },
            { title: '法院地区', ip: '请选择法院地区', data: '', value: '', arrow: true, link: true, linkUrl: '../calc-choice/calc-choice?type=court&index=', error: false, y: '' },
            { title: '诉讼金额', ip: '请输入诉讼费', data: '', value: '', arrow: false, link: false, error: false, y: '元' }
          ]
        }
        console.log(choiceData)
        this.setData({
            inputArr: inputArr
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

    },
    chInput (opt) {
      let val = opt.detail.value;
      let inputArr = this.data.inputArr;
      console.log(isNaN(parseInt(val)))
      if (!isNaN(parseInt(val))) {
        inputArr[2].data = val
        inputArr[2].value = val
      } else {
        inputArr[2].data = ''
        inputArr[2].value = ''
      } 
      let arrs = wx.getStorageSync('calc-result')
      arrs.zy = val + '元'
      wx.setStorageSync('calc-result', arrs)
      if (inputArr[2].data === '') {
        inputArr[2].error = true
      } else {
        inputArr[2].error = false
      }
      this.setData({
        inputArr: inputArr
      })
    },
    cares: function () {
        let inputArr = this.data.inputArr;
        let caseType = inputArr[0].data;
        console.log(caseType)
        let zone = inputArr[1].data;
        console.log(zone)
        let caseFee = inputArr[2].data;
        console.log(caseFee)
        let curCaseFee = this.calculator(caseType, zone, caseFee);//计算费用
        let r = "";
        if (caseType < 100) {
            r = curCaseFee + '元';
        } else {
            r = curCaseFee + '元';
        }
        let cuArr = wx.getStorageSync('calc-result')
        let newA = cuArr
        newA.y = r
        wx.setStorageSync('calc-result', newA)
        let lenI = inputArr.length
        for (let i = 0; i < lenI; i++) {
          if (inputArr[i].data === '') {
            inputArr[i].error = true
          } else {
            inputArr[i].error = false
          }
        }
        this.setData({
          inputArr: inputArr
        })
        if (inputArr[0].data && inputArr[1].data && inputArr[2].data) {
          wx.navigateTo({
            url: '../calc-result/calc-result'
          })
        }
    },
    calculator: function (curCaseTypeId, curCaseAreaId, curCaseValue) {
        let baseFee = 0;
        let curCaseFee = 0;
        curCaseTypeId = parseInt(curCaseTypeId);
        curCaseAreaId = parseInt(curCaseAreaId);
        switch (curCaseTypeId) {
            case 1://一般财产案件
                curCaseFee = this.calculatorNormal(curCaseValue);
                break;
            case 2://离婚案件
                switch (curCaseAreaId) {
                    case 1:
                        baseFee = 200;
                        break;
                    default:
                        baseFee = 50;
                        break;
                }

                if (curCaseValue > 200000) {
                    curCaseFee = (curCaseValue - 200000) * 0.005 + baseFee;
                } else {
                    curCaseFee = baseFee;
                }
                break;
            case 3://侵害人格权案件
                switch (curCaseAreaId) {
                    case 1:
                        baseFee = 300;
                        break;
                    default:
                        baseFee = 100;
                        break;
                }

                if (curCaseValue <= 50000) {
                    curCaseFee = baseFee;
                } else if (curCaseValue <= 100000) {
                    curCaseFee = (curCaseValue - 50000) * 0.01 + baseFee;
                } else if (curCaseValue > 100000) {
                    curCaseFee = (curCaseValue - 100000) * 0.005 + 500 + baseFee;
                }
                break;
            case 4://其他非财产案件
                switch (curCaseAreaId) {
                    case 1:
                        baseFee = 80;
                        break;
                    default:
                        baseFee = 50;
                        break;
                }
                curCaseFee = baseFee;
                break;
            case 5://知识产权民事案件
                switch (curCaseAreaId) {
                    case 1:
                        baseFee = 800;
                        break;
                    default:
                        baseFee = 500;
                        break;
                }

                if (curCaseValue > 0) {
                    curCaseFee = this.calculatorNormal(curCaseValue);
                } else {
                    curCaseFee = baseFee;
                }
                break;
            case 6://劳动争议案件
                curCaseFee = 10;
                break;
            case 7://商标专利海事行政案件
                curCaseFee = 100;
                break;
            case 8://其他行政案件
                curCaseFee = 50;
                break;
            case 9://管辖权异议案件
                switch (curCaseAreaId) {
                    case 1:
                        baseFee = 80;
                        break;
                    default:
                        baseFee = 50;
                        break;
                }
                curCaseFee = baseFee;
                break;
            //以下为申请类案件
            case 101://无执行金额或价额
                curCaseFee = 50;
                break;
            case 102://有执行金额或价额
                if (curCaseValue <= 10000) {
                    curCaseFee = 50;
                } else if (curCaseValue <= 500000) {
                    curCaseFee = curCaseValue * 0.015 - 100;
                } else if (curCaseValue <= 5000000) {
                    curCaseFee = curCaseValue * 0.01 + 2400;
                } else if (curCaseValue <= 10000000) {
                    curCaseFee = curCaseValue * 0.005 + 27400;
                } else if (curCaseValue > 10000000) {
                    curCaseFee = curCaseValue * 0.001 + 67400;
                }
                break;
            case 103://民诉法。。。条
                if (curCaseValue <= 10000) {
                    curCaseFee = 50;
                } else if (curCaseValue <= 500000) {
                    curCaseFee = curCaseValue * 0.015 - 100;
                } else if (curCaseValue <= 5000000) {
                    curCaseFee = curCaseValue * 0.01 + 2400;
                } else if (curCaseValue <= 10000000) {
                    curCaseFee = curCaseValue * 0.005 + 27400;
                } else if (curCaseValue > 10000000) {
                    curCaseFee = curCaseValue * 0.001 + 67400;
                }
                break;
            case 104://财产保全
                if (curCaseValue <= 1000) {
                    curCaseFee = 30;
                } else if (curCaseValue <= 100000) {
                    curCaseFee = curCaseValue * 0.01 + 20;
                } else if (curCaseValue > 100000) {
                    curCaseFee = curCaseValue * 0.005 + 520;
                }
                if (curCaseFee > 5000) curCaseFee = 5000;
                break;
            case 105://申请支付令
                curCaseFee = this.calculatorNormal(curCaseValue) / 3;

                break;
            case 106://申请公示催告
                curCaseFee = 100;
                break;
            case 107://申请撤销仲裁
                curCaseFee = 400;
                break;
            case 108://申请破产
                curCaseFee = this.calculatorNormal(curCaseValue) / 2;
                if (curCaseFee > 300000) curCaseFee = 300000;
                break;
            case 109://海事1
                curCaseFee = "1000-10000";
                break;
            case 110://海事2
                curCaseFee = "1000-5000";
                break;
            case 111://海事3
                curCaseFee = "1000-5000";
                break;
            case 112://海事4
                curCaseFee = 1000;
                break;
            case 113://海事5
                curCaseFee = 1000;
                break;

            default:
                curCaseFee = 0;
                break;

        }
        if (typeof (curCaseFee) == "number") {
            curCaseFee = Math.round(curCaseFee * 100) / 100;
        }
        return curCaseFee;
    },
    calculatorNormal: function (v) {
        let r = 0;
        if (v <= 10000) {
            r = 50;
        } else if (v <= 100000) {
            r = v * 0.025 - 200;
        } else if (v <= 200000) {
            r = v * 0.02 + 300;
        } else if (v <= 500000) {
            r = v * 0.015 + 1300;
        } else if (v <= 1000000) {
            r = v * 0.01 + 3800;
        } else if (v <= 2000000) {
            r = v * 0.009 + 4800;
        } else if (v <= 5000000) {
            r = v * 0.008 + 6800;
        } else if (v <= 10000000) {
            r = v * 0.007 + 11800;
        } else if (v <= 20000000) {
            r = v * 0.006 + 21800;
        } else if (v > 20000000) {
            r = v * 0.005 + 41800;
        }
        return r;
    }
})