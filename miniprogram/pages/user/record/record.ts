import api from "../../../service/net.service";
;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityList:<any>[],
    unitList:[],
    streetList:[],
    villageList:[]
  },
  initData () {
    api.getRecord('community').then((res:any)=>{
      this.setData({
        communityList: res.data.result
      })
      console.log(this.data.communityList)
    })
    api.getRecord('village').then((res:any)=>{
      this.setData({
        villageList: res.data.result
      })
      console.log(this.data.communityList)
    })
    api.getRecord('unit').then((res:any)=>{
      this.setData({
        unitList: res.data.result
      })
    })
  },
  tapHandle (e:any) {
    let type = e.currentTarget.dataset.type; //community|unit|street
    let item = e.currentTarget.dataset.item;
    console.log(type,item)
    api.setPatrolType('record');
    api.setRecordData({
      type:type,
      committee_id:item.committee_id||0,
      subdistrict_id:item.subdistrict_id||0
    })
    wx.removeStorageSync('patrolData_'+type)
    setTimeout(()=>{
      wx.navigateTo({url:`/pages/patrol/${type}/${type}`})
    },100)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(opts): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  }
})