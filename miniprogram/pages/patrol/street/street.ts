import api from '../../../service/net.service'
;
Page({
  /**
   * 页面的初始数
   */
  data: {
    position:'闵行区 梅陇镇',
    streetList:<any>[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  getStreet () {
    api.getStreet().then((res:any)=>{
      this.setData({
        streetList:res.data.result
      })
    })
  },
  search (name:string) {
    api.getStreet(name).then((res:any)=>{
      console.log(res)
      this.setData({
        streetList:res.data.result
      })
    })
  },
  onLoad() {
    
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
    this.getStreet()
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
  onShareAppMessage(opts:any): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  }
})