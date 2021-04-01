import api from '../../service/net.service';
;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    rules: {
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        // { min: 8, max: 20, message: '密码长度在8-20个字符之间', trigger: ['blur','change'] },
        // { pattern: '^[A-Za-z0-9]+$', message: '密码必须由数字字母组成',trigger: ['blur','change']}
      ],
      username: [
        { required: true, message: '请输入登录账号', trigger: 'blur' },
      ]
    },
    username: '',
    password: '',
    user:{
      username: '',
      password: '',
    }
  },
  // getUserInfo (e:any) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   // this.submit();
  // },
  inputform (e:any) {
    
    let key = e.currentTarget.dataset.key;
    if (key === 'username') {
      this.setData({
        user:{
          username: e.detail.value,
          password: this.data.user.password
        }
      })
    }else{
      this.setData({
        user:{
          username: this.data.user.username,
          password: e.detail.value
        }
      })
    }
  },
  submit(event:any){
    console.log(event.detail)
    if (this.data.user.username&&this.data.user.password) {
      // 用户已授权且表单验证成功
      api.login(event.detail.values.username,event.detail.values.password).then((res:any)=>{
        let token = res.data.result.token;
        let user = res.data.result
        wx.setStorageSync('token',token)
        wx.setStorageSync('user',user)
        app.globalData.token = token;
        if (user.type == 1) {
          wx.redirectTo({url:'/pages/patrol/patrol'});
        }else{
          if (user.type == 1) {
            wx.redirectTo({url:'/pages/patrol/patrol'});
          }else if(user.type == 5){
            wx.redirectTo({url:'/pages/adminUser/adminUser'});
          }else{
            wx.redirectTo({url:'/pages/audit/audit'});
          }
        }
      })
    }else{
      wx.showToast({
        title:'请输入用户名密码',
        icon:'none',
        duration:2000
      })
    }
  },
  reset () {
    this.setData({
      user: {
        username: '',
        password: '',
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    wx.lin.initValidateForm(this)
    // if (app.globalData.token) {
    //   wx.navigateTo({url:'/pages/main/patrol/index/index'});
    // }
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