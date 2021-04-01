import api from '../../../service/net.service';
;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    username: '',
    password: '',
    updata: <any>{
      activity_type: '',
      title: '',
      content: '',
      start_time: '选择日期',
      image_url: []
    }
  },
  // getUserInfo (e:any) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   // this.submit();
  // },
  inputform(e: any) {

    let key = e.currentTarget.dataset.key;
    let updata = this.data.updata
    updata[key] = e.detail.currentKey || e.detail.value
    this.setData({
      updata: updata
    })
    console.log(this.data.updata)
    // if (key === 'username') {
    //   this.setData({
    //     user:{
    //       username: e.detail.value,
    //       password: this.data.updata.password
    //     }
    //   })
    // }else{
    //   this.setData({
    //     user:{
    //       username: this.data.updata.username,
    //       password: e.detail.value
    //     }
    //   })
    // }
  },
  onRemoveImgTap(e: any) {
    let images = e.detail.all
    let updata = this.data.updata
    updata.image_url = images
    this.setData({
      updata: updata
    })
  },
  onImgChangeTap(e: any) {
    let images = e.detail.current
    let image_url = this.data.updata.image_url
    let updata = this.data.updata
    api.uploadImgs(images).then((res: any) => {
      image_url = [...image_url, ...res]
      updata.image_url = image_url
      this.setData({
        updata: updata,
      })
      console.log(this.data.updata)
    }, (err: any) => {
      updata.image_url = image_url
      this.setData({
        updata: updata,
      })
    })

  },
  check() {
    let flag = true
    Object.keys(this.data.updata).forEach((k) => {
      if (!this.data.updata[k]) {
        flag = false
      }
    })
    return flag
  },
  submit(event: any) {
    if (this.check()) {
      // 用户已授权且表单验证成功
      api.newActivity(this.data.updata).then(res=>{
        console.log(res)
        wx.navigateBack()
      })
      console.log('哈哈哈哈')
    } else {
      wx.showToast({
        title: '请完善表单',
        icon: 'none',
        duration: 2000
      })
    }
  },
  reset() {
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
  onLoad() {
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
  onShareAppMessage(opts: any): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  }
})