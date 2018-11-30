App({
  globalData: {
    userInfo: null,
    url: "https://rd.ghsapi.guangheplus.com"
  },
  data: {
    // 小区id
    id:0,
    // 物业id
    propertyId:'',
    // 物业名称
    propertyName:'',
    // 小区名称
    villageName:'',
    openid:'',
    unionid:'',
    // 获取数据开关
    flag:true,
    // 访问业主的车牌
    carnum1:[],
    //访问物业的车牌
    carnum2:[]
  },
});
