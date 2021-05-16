import api from '../../../service/net.service';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: <'all'|'done'>'all',
    loading: true,
    show: false,
    updata: <any>{
      waste_dry: '',
      waste_wet: '',
      waste_recyclabl: '',
      waste_architecture: '',
      waste_harmful: '',
      departure_time: '选择日期',
      time: '选择时间'
    },
    dataObj: <any>{
      waste_glass: '',
      waste_plastic: '',
      waste_wood: '',
      waste_paper: '',
      waste_electronic: '',
      waste_clothes: '',
      waste_metal: '',
      waste_other: '',
      departure_time: '选择日期',
      time: '选择时间'
    }
  },
  tap (e:any) {
    this.setData({
      current: e.currentTarget.dataset.type
    });
  },
  inputform(e: any) {
    let key = e.currentTarget.dataset.key;
    let updata = this.data.updata
    updata[key] = e.detail.currentKey || e.detail.value
    this.setData({
      updata: updata
    })
    // console.log(this.data.updata);
  },
  inputform2(e: any) {
    let key = e.currentTarget.dataset.key;
    let dataObj = this.data.dataObj
    dataObj[key] = e.detail.currentKey || e.detail.value
    this.setData({
      dataObj: dataObj
    })
    // console.log(this.data.dataObj);
  },
  // check() {
  //   let flag = true
  //   Object.keys(this.data.updata).forEach((k) => {
  //     if (!this.data.updata[k]) {
  //       flag = false
  //     }
  //   })
  //   return flag
  // },
  // check2() {
  //   let flag = true
  //   Object.keys(this.data.dataObj).forEach((k) => {
  //     if (!this.data.dataObj[k]) {
  //       flag = false
  //     }
  //   })
  //   return flag
  // },
  submit() {
    if(this.data.current === "all") {
      // if (this.check()) {
        // 用户已授权且表单验证成功
        console.log(this.data.updata);
        // return;
        api.newAccount(this.data.updata).then(res=>{
          // console.log(res)
          // wx.navigateBack()
          this.setData({ show:true })
        })
        console.log('哈哈哈哈')
      // } else {
      //   wx.showToast({
      //     title: '请完善表单',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
    } else {
      // if (this.check2()) {
        // 用户已授权且表单验证成功
        console.log(this.data.dataObj);
        // return;
        api.newAccount2(this.data.dataObj).then(res=>{
          // console.log(res)
          // wx.navigateBack()
          this.setData({ show:true })
        })
        console.log('哈哈哈哈')
      // } else {
      //   wx.showToast({
      //     title: '请完善表单',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
    }
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