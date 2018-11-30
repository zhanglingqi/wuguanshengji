var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      // 循环列表的数组
    record:[],
    // 默认分页
    limit:10,
  },
    getGrounpList: function() {
      var that = this;
      var https = app.globalData.url;
      console.log(app.data.unionid)
      wx.request({
        url:  https +'/carparkMini/carFeeList',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          villageId: app.data.id,
          unionId: app.data.unionid,
          offset: 0,
          limit: that.data.limit
        },
        success: function (res) {
          console.log(res)
          if (res.data.code === 1000) {
            that.setData({
              record: res.data.data
            })
          }
        }
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getGrounpList()
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
    var that = this;
    this.setData({
      limit: that.data.limit+=5
    })
      that.getGrounpList()
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})