var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:[],
    // 访问业主姓名
    limit:10,
    bottomHidden1: "none"
  },
  loadMore: function () {
    var that = this;
    that.setData({
      limit: that.data.limit += 5
    })
    that.getGrounpList()
  },
  getGrounpList:function() {
    // wx.showLoading({
    //   title: 'loading...',
    // });
    var that = this;
    var https = app.globalData.url;
    wx.request({
      url: https + '/visitorMini/visitorList',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        villageId: app.data.id,
        visitorUnionId: app.data.unionid,
        type: 1,
        offset: 0,
        limit: that.data.limit
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 1000) {
          that.setData({
            record: res.data.data
          })
          if (res.data.data.length > 0) {
            that.setData({
              bottomHidden1: 'none'
            })
          }
          if (res.data.data.length == 0) {
            that.setData({
              bottomHidden1: 'block'
            })
          }
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000,
            mask: true
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          },1000)
        } 
      }
    })
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
    var that = this;
    var https = app.globalData.url;
    if (app.data.flag) {
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (resquest) {
              wx.request({
                url: https + '/carparkMini/getWxUserInfo',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                data: {
                  code: res.code,
                  encryptedData: resquest.encryptedData,
                  iv: resquest.iv
                },
                success: function (res) {
                  console.log(res)
                  if (res.data.code === 1000) {
                    app.data.openid = res.data.data.openid;
                    app.data.unionid = res.data.data.unionid;
                  }
                  that.getGrounpList()
                }
              })
            }
          })
        }
      })
      app.data.flag = false
    } else {
      that.getGrounpList()
    }
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
    // this.getGrounpList()
    wx.stopPullDownRefresh();//关闭下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(1)
    var that = this;
    this.setData({
      limit: that.data.limit += 5
    })
    wx.showLoading({
      title: 'loading...',
    });
    setTimeout(function () {
      that.getGrounpList()
      wx.hideLoading()
    }, 500)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})