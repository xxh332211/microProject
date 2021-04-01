Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    menu:[
      {image:'aim',text:'巡查记录',url:'/pages/user/record/record'},
      {image:'shuxie',text:'敬请期待',url:false},
      {image:'tubiao',text:'敬请期待',url:false}
    ]
  },
  tabHandle (e:any) {
    let url =e.currentTarget.dataset.item.url
    if (url) {
      wx.navigateTo({url:url})
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
    this.setData({
      user:wx.getStorageSync('user')
    })
    console.log(this.data.user)
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