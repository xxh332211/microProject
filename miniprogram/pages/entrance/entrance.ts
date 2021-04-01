// logs.ts
// const util = require('../../utils/util.js')
// 入口,判断角色,权限,分配去不同的界面
const app = getApp()
Page({
  data: {
    
  },
  onLoad() {
    wx.showLoading({
      title:'加载中'
    });
    console.log(app.globalData)
    
  },
  onShow(){
    let user = wx.getStorageSync('user')
    setTimeout(()=>{
      if (app.globalData.token) {
        if (user.type == 1) {
          wx.redirectTo({url:'/pages/patrol/patrol'});
        }else if(user.type == 5){
          wx.redirectTo({url:'/pages/adminUser/adminUser'});
        }else{
          wx.redirectTo({url:'/pages/audit/audit'});
        }
      }else{
        wx.redirectTo({url:'/pages/login/login'})
      }
    },1000)
  },
  onHide(){
    wx.hideLoading()
  },
  onUnload() {
    wx.hideLoading()
  },
})
