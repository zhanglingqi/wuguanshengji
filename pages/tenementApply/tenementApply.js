var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择 ▼',
    time: '00:00',
    time1: '24:00',
    // 姓名
    username: '',
    // 手机号
    userphone: '',
    // 车牌
    car: '',
    // 访问原因
    text: ''
  },
  bindUser: function bindUser(e) {
    var val = e.detail.value;
    this.setData({
      username: val
    });
  },
  bindphone: function bindUser(e) {
    var val = e.detail.value;
    this.setData({
      userphone: val
    });
  },
  carText: function bindUser(e) {
    var val = e.detail.value;
    this.setData({
      text: val
    });
  },
  carTab: function() {
    var that = this;
    wx.navigateTo({
      url: '/pages/plateMinput/plateMinput?car=' + that.data.car
    })
  },
  login: function() {
    var https = app.globalData.url;
    var that = this;
    var username = that.data.username;
    var userphone = that.data.userphone;
    var date = that.data.date;
    var text = that.data.text;
    if (!username) {
      wx.showToast({
        title: '请输入访客姓名',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (!userphone) {
      wx.showToast({
        title: '请输入访客手机号',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (date == '请选择 ▼') {
      wx.showToast({
        title: '请输入访客到访日期',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (!text) {
      wx.showToast({
        title: '请输入访客访问原因',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    var nameText = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
    if (!nameText.test(that.data.username)) {
      wx.showToast({
        title: '姓名格式不正确',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (that.data.username.length > 10) {
      wx.showToast({
        title: '姓名长度不能超过10个字符',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    var mobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    if ( !mobile.test(that.data.userphone)) {
      wx.showToast({
        title: '电话号格式不正确',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (username != '' && userphone != '' && date != '请选择 ▼' && text != '') {
      wx.request({
        url: https + '/visitorMini/applyVisitProperty',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          villageId: app.data.id,
          visitorUnionId: app.data.unionid,
          visitorName: that.data.username,
          visitorMobile: that.data.userphone,
          visitDay: that.data.date,
          startTime: that.data.time,
          endTime: that.data.time1,
          carNum: that.data.car,
          reason: that.data.text
        },
        success: function (res) {
          if (res.data.code === 1000) {
            wx.showToast({
              title: '申请成功',
              icon: 'none',
              duration: 1000,
              mask: true
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1400)
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000,
              mask: true
            })
          }
        }
      })
    }
  },
  // 年月日
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      date: e.detail.value
    })
  },
  //  时间
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindTimeChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})