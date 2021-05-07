import api from '../../service/net.service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: <'community'|'unit'|'street'>'unit',
    mainData:<any>{},
  },
  tap (e:any) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
    this.getMainData();
  },
  getMainData() {
    api.getClassificationData().then((res:any)=>{
      console.log('数据', res);
      this.setData({
        mainData: res.data.result
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarColor({backgroundColor:'#FF625D',frontColor:'#ffffff'});
    this.getMainData();
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