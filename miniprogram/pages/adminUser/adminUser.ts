import api from '../../service/net.service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:<any>{},
    user:<any>{},
    phoneNumber: '',
    show: false,
    isShow: false
  },
  go(e:any){
    // console.log(e.currentTarget.dataset.url)
    wx.navigateTo({url:e.currentTarget.dataset.url})
  },
  getData () {
    api.getAnalysisData().then((res:any)=>{
      this.setData({
        user:wx.getStorageSync('user'),
        mainData: res.data.result[0]
      })
    })
  },
  handleInputChange(e: any) {
    let _this = this;
    let dataset  = e.currentTarget.dataset;
    let value = e.detail.value;
    let phoneNumber = dataset.phoneNumber;
    _this.data.phoneNumber = value;
    _this.setData({
      phoneNumber: _this.data.phoneNumber
    })
    // this.setData({
    //   [e.currentTarget.dataset.prop]: e.detail.value
    // })
  },
  bindPhone() {
    // let phone = parseInt(this.data.phone);
    let data = {
      mobile: this.data.phoneNumber
    }
    console.log('xxxxx', data);
    // return;
    api.iptPhone(data).then((res) => {
      console.log('绑定成功', res);
      this.setData({
        show:true
      })
    }).catch((err) => {
      console.log('err', err);
      this.setData({
        isShow:true
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getData();
    api.getPhoneNumber().then((res: any) => {
      console.log('是否绑定手机号', res);
      if(res.data.code === 200) {
        this.setData({
          isShow: true
        })
        console.log('用户需要授权绑定手机');
      }
    })
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