var app = getApp();
Page({
    data: {
        keyValue: {
            keyValue1: '京沪浙苏粤鲁晋',
            keyValue2: '冀豫川渝辽吉黑',
            keyValue3: '皖鄂湘赣闽陕甘',
            keyValue4: '宁蒙津贵云桂琼',
            keyValue5: '青新藏',
            keyNumber: '12345678',
            keyLetterValue1: '90QWERTY',
            keyLetterValue2: 'UIOPASDF',
            keyLetterValue3: 'GHJKLZXC',
            keyLetterValue4: 'VBNM警',
            showkKeyboardType: 1, //1是省份键盘 0是数字字母键盘
            carNumber:''
        },
        inputPlate: {
            plates: [], //接收输入的内容
            plateCount: [1, 2, 3, 4, 5, 6, 7], //输入框的个数
        },
        isShowKeyboard: true, //是否显示键盘,默认显示
    },
    onLoad: function(options) {

    },
    //唤起键盘事件
    onFocusTap: function() {
        this.data.isShowKeyboard = true;
        this.setData({
            isShowKeyboard:this.data.isShowKeyboard
        })
    },
    //点击键盘事件
    onKeyboardTap: function(event) {
        var value = event.currentTarget.dataset.value;

        if (this.data.inputPlate.plates.length == 0) {
            this.setData({
              'keyValue.showkKeyboardType':0
            })
          }

        switch (value) {
            case 'delete':
                if (this.data.inputPlate.plates.length > 0) {
                    this.data.inputPlate.plates.pop();
                }
                //如果输入的值被删除完，显示省份键盘
                if (this.data.inputPlate.plates.length == 0) {
                    this.data.keyValue.showkKeyboardType = true;
                }
                break;
            default:
                if (this.data.inputPlate.plates.length == 8) {
                    //替换数组最后一个元素
                    this.data.inputPlate.plates.splice(7, 1, value);
                } else {
                    this.data.inputPlate.plates.push(value);
                }
        }
        this.setData({
            keyValue: this.data.keyValue,
            inputPlate: this.data.inputPlate,
            isShowKeyboard: this.data.isShowKeyboard
        })
    },
    //提交事件
    onSubmitBtnTap: function() {
      if (this.data.inputPlate.plates.length === 7 || this.data.inputPlate.plates.length ===8) {
          wx.navigateBack({
            delta: 1
          })
        //数组组装字符串
        var paltes = this.data.inputPlate.plates;
        var pai = paltes.join("");
        wx.setStorage({
          key: app.data.openid + app.data.id + 1,
          data: pai,
        })
        var plate = paltes.splice(2,0,'·');
        var chepai = this.data.inputPlate.plates.join("")
        wx.setStorage({
          key: app.data.openid + app.data.id,
          data: chepai
        })
      } else {
        wx.showToast({
          title: '号码输入有误',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
      
    },
  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    // this.init();//初始化页面的接口请求
    wx.stopPullDownRefresh();//关闭下拉刷新

  },
})