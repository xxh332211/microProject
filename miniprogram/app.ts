// app.ts
App<IAppOption>({
  globalData: {
    // api
    token:'',
  },
  onLaunch() {
    // 展示本地存储能力
    this.globalData.token = wx.getStorageSync('token')||'';
    let user = wx.getStorageSync('user')
    if (this.globalData.token) {
      if (user.type == 1) {
        wx.redirectTo({url:'/pages/patrol/patrol'});
      }else if(user.type == 5){
        wx.redirectTo({url:'/pages/adminUser/adminUser'});
      }else{
        wx.redirectTo({url:'/pages/audit/audit'});
        // wx.redirectTo({url:'/pages/bigscreen/activity/activity'});
      }
    }else{
      wx.redirectTo({url:'/pages/login/login'})
    }
    // 登录
    wx.login({
      success: () => {
        // console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
          })
        }
      },
    })
  },
})