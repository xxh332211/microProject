// import api from '../../service/net.service';

import api from "../../service/net.service"

// ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu:[
      {image:'xingzheng.png',text:'行政村巡查',url:'/pages/patrol/village/village',type:'village'},
      {image:'shequ.png',text:'社区巡查',url:'/pages/patrol/community/community',type:'community'},
      {image:'danwei.png',text:'单位巡查',url:'/pages/patrol/unit/unit',type:'unit'},
      {image:'jiedao.png',text:'沿街商铺巡查',url:'/pages/patrol/street/street',type:'street'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  tabHandle (e:any) {
    console.log(e)
    api.setPatrolType('new')
    wx.removeStorageSync('patrolData_'+e.currentTarget.dataset.cell.type)
    setTimeout(()=>{
      wx.navigateTo({url:e.currentTarget.dataset.cell.url})
    },100)
  },
  onLoad() {
      // api.checkToken().then((res:any)=>{
      //   console.log(res)
      // })
    // },1)
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
  onShareAppMessage(opts:any): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  }
})