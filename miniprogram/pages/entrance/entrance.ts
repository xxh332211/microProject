// logs.ts
// const util = require('../../utils/util.js')
// 入口,判断角色,权限,分配去不同的界面
const app = getApp()
Page({
  data: {
    
  },
  onLoad() {
    // wx.redirectTo({url:'/pages/community/community'});
    // wx.redirectTo({url:'/pages/community/communityDetail/communityDetail'});
    // wx.redirectTo({url:'/pages/community/dustcart/dustcart'});
    // wx.redirectTo({url:'/pages/community/wingRoom/wingRoom'});
    // wx.redirectTo({url:'/pages/bigscreen/account/account'});
    // wx.redirectTo({url:'/pages/adminUser/adminUser'});
    wx.showLoading({
      title:'加载中'
    });
    // console.log(app.globalData,'111')
    
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
          console.log(2222);
          wx.redirectTo({url:'/pages/audit/audit'});
        }
      }else{
        wx.redirectTo({url:'/pages/login/login'})
      }
    },0)
  },
  onHide(){
    wx.hideLoading()
  },
  onUnload() {
    wx.hideLoading()
  },
})
