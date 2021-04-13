import api from '../../service/net.service';
import {mainType} from '../../service/net.service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:<any>{},
    current: <mainType>'community',
    user:<any>{},
    date:''
  },
  tap (e:any) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
    this.getMainData();
  },
  goFeedback () {
    api.setFeedbackType(this.data.current);
    setTimeout(()=>{
      wx.navigateTo({url:'/pages/audit/feedback/feedback'});
    },100)
  },
  getMainData() {
    api.getAnalysisData(this.data.current).then((res:any)=>{
      this.setData({
        mainData : res.data.result[0]
      })
    })
  },
  userInit(){
    // 2和3为最高权限   4只能看居住区 5只能看个人中心  6只能看单位
    // 1=巡查用户 2=区级用户 3=街道用户 4=居委用户 5=物业用户 6=单位用户
    this.setData({
      user: wx.getStorageSync('user')
    })
    switch (this.data.user.type) {
      case '6':
        this.setData({
          current: 'unit'
        })
        break;
      case '8':
        this.setData({
          current: 'village'
        })
        break;
      case '9':
        this.setData({
          current: 'village'
        })
        break;  
      default:
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    
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
      date:api.getDate()
    })
    this.userInit()
    this.getMainData()
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
    return {}
  }
})