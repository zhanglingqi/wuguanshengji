var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hoem:'',
    cityName:'',
    districtName:'',
    communityName:''
  },
  // 业主
  bindGetUserInfo(e) {
    var that = this;
    var https = app.globalData.url;
    if (e.detail.userInfo) {
        wx.navigateTo({
          url: '/pages/owner/owner',
        })
    }
  },
  // 物业
  bindGetUserInfo1(e) {
    if (e.detail.userInfo) {
        wx.navigateTo({
          url: '/pages/tenement/tenement',
        })
    }
  },
  // 停车场
  bindGetUserInfo2(e) {
    // console.log(e.detail.userInfo)
    var that = this;
    if (e.detail.userInfo) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  },
  //首页渲染请求
  indexF:function() {
    var https = app.globalData.url;
    var that = this;
    var viildid = wx.getStorageSync('id')
    console.log( "赋值 "+viildid)
    wx.request({
      url: https + '/carparkMini/getVillageMsg',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        propertyId: viildid
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 1000) {
          app.data.id = res.data.data.id;
          app.data.propertyId = res.data.data.propertyId;
          app.data.propertyName = res.data.data.propertyName;
          app.data.villageName = res.data.data.villageName;
          that.setData({
            hoem: res.data.data.propertyName,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var https = app.globalData.url;
    var that = this;
    var scene = decodeURIComponent(options.scene);
    if (scene!= 'undefined') {
      wx.request({
        url: https + '/carparkMini/getVillageMsg',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          propertyId: scene
        },
        success: function (res) {
          if (res.data.code === 1000) {
            app.data.id = res.data.data.id;
            app.data.propertyId = res.data.data.propertyId;
            app.data.propertyName = res.data.data.propertyName;
            app.data.villageName = res.data.data.villageName;
            that.setData({
              hoem: res.data.data.propertyName,
              cityName: res.data.data.cityName,
              districtName: res.data.data.districtName,
              communityName: res.data.data.communityName
            })
          }
          wx.setStorageSync('id', scene)
        }
      })
      
    } else {
      that.indexF();
    }
   
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