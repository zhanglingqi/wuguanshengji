var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 访客id
    id:0,
    // 访客姓名
    fangName:'',
    // 访客电话
    fangPhone:'',
    // 访客年
    fangTime:'',
    //访客开始时间
    seartTime:'',
    // 访客结束时间
    endTime:'',
    // 车牌
    car:'',
    // 业主姓名
    username:'',
    // 业主电话
    userphone:'',
    // 业主地址
    useraddres:'',
    // 是否同意
    status:'',
    // 门禁密码
    userword:'',
    bottomHidden1: 'none'
  },
  details:function() {
    var that = this;
    var https = app.globalData.url;
    wx.request({
      url: https + '/visitorMini/visitorDetail',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        visitorId:that.data.id
      },
      success:function(res) {
        console.log(res)
          if(res.data.code === 1000) {
            if (res.data.data.lockPassword == null) {
              that.setData({
                fangName: res.data.data.visitorName,
                fangPhone: res.data.data.visitorMobile,
                fangTime: res.data.data.visitDay,
                seartTime: res.data.data.startTime,
                endTime: res.data.data.endTime,
                car: res.data.data.carNum,
                username: res.data.data.ghsUserName,
                userphone: res.data.data.ghsUserMobile,
                useraddres: res.data.data.roomFullName,
                status: res.data.data.state,
                // userword: res.data.data.lockPassword
                bottomHidden1: 'none'
              })
            } else {
              that.setData({
                fangName: res.data.data.visitorName,
                fangPhone: res.data.data.visitorMobile,
                fangTime: res.data.data.visitDay,
                seartTime: res.data.data.startTime,
                endTime: res.data.data.endTime,
                car: res.data.data.carNum,
                username: res.data.data.ghsUserName,
                userphone: res.data.data.ghsUserMobile,
                useraddres: res.data.data.roomFullName,
                status: res.data.data.state,
                userword: res.data.data.lockPassword,
                bottomHidden1: 'block'
              })
            }
            
          }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id : options.id
    })
    this.details()
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