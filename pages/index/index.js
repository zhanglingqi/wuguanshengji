var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 停车场
    title: "",
    //停车费
    hour:'',
    //总车位
    total:'',
    //剩余车位
    residue:'',
    //展示车牌号
    plates:'',
    // 请求车牌号
    carpai:'',
    // code值
    codeId:'',
  },
  deleteT:function() {
    var that = this;
    wx.showModal({
      title: '',
      content: '是否要删除车牌号',
      success:function(res) {
        if(res.confirm) {
          wx.removeStorage({
            key: app.data.openid + app.data.id + 1,
            success: function(res) {
              wx.removeStorage({
                key: app.data.openid + app.data.id,
                success: function (res) {
                  that.setData({
                    plates:''
                  })
                },
              })
            },
          })
        }
      }
    })
  },
  go: function() {
    var that = this;
    var car = that.data.carpai;
    var https = app.globalData.url;
    wx.request({
      url:  https +'/carparkMini/ownerDriveOff',
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        villageId: app.data.id,
        carNum: that.data.carpai,
        unionId: app.data.unionid
      },

      success: function(res) {
        console.log(res)
        if(res.data.code === 1000) {
          if (res.data.data.totalFee == 0) {
            wx.showToast({
              title: '免费时段，无需支付',
              icon: 'none',
              duration: 2000,
              mask: true
            })
            return false;
          }else {
            wx.navigateTo({
              url: "/pages/payment/payment?carNum=" + res.data.data.carNum + "&orderId=" + res.data.data.orderId + "&serviceDay=" + res.data.data.serviceDay + "&serviceHoursAndMinute=" + res.data.data.serviceHoursAndMinute + "&serviceTime=" + res.data.data.serviceTime + "&hour=" + that.data.hour + "&totalFee=" + res.data.data.totalFee + "&out_trade_no=" + res.data.data.out_trade_no ,
            })
          }
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var https = app.globalData.url;
    that.setData({
      title: app.data.villageName
    })
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
                  wx.getStorage({
                    key: app.data.openid + app.data.id,
                    success: function (res) {
                      that.setData({
                        plates: res.data
                      })
                    },
                  })
                  wx.getStorage({
                    key: app.data.openid + app.data.id + 1,
                    success: function (res) {
                      that.setData({
                        carpai: res.data
                      })
                    },
                  })
                }
              })
            }
          })
          app.data.flag = false
        }
      })
    }
    wx.request({
      url: https + '/carparkMini/getCarPortRuleMsg',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        'villageId': app.data.id
      },
      success: function (res) {
        if (res.data.code === 1000) {
          that.setData({
            hour: res.data.data.ruleDescription,
            total: res.data.data.tempCarportNumTotal,
            residue: res.data.data.tempCarportNumRemain
          })
        }
      }
    });
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
    wx.getStorage({
      key: app.data.openid + app.data.id,
      success: function (res) {
        that.setData({
          plates: res.data
        })
      },
    })
    wx.getStorage({
      key: app.data.openid + app.data.id + 1,
      success: function (res) {
        that.setData({
          carpai: res.data
        })
      },
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
    // this.init();//初始化页面的接口请求
    wx.stopPullDownRefresh();//关闭下拉刷新

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