import api from '../../../../service/net.service'
import {mainType} from '../../../../service/net.service'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    feedbackType:<mainType>'',
    feedback:<string>'',
    image_url:<any>[],
    category_id:<string>'',
    defuct_id: <string>'',
    data:<any>{
      audit_status: null,
      category_id: "",
      committee_name: "",
      create_time: "",
      desc: "",
      feedback: "",
      feedback_image_url: [],
      feedback_time: null,
      id: "",
      image_url: [],
      infozc_name: "",
      is_improve: "",
      is_overtime: "",
      point: "",
      real_name: "",
      status: 1,
      subdistrict_name: "",
    }
  },
  init () {
    this.setData({
      feedbackType:wx.getStorageSync('feedbackType'),
      defuct_id:wx.getStorageSync('defuct_id'),
      category_id:wx.getStorageSync('category_id')
    })
  },
  textInput(e:any){
    let text = e.detail.value;
    this.setData({
      feedback:text
    })
  },
  onRemoveImgTap (e:any) {
      let images = e.detail.all
      this.setData({
        image_url:images
      })
  },
  onImgChangeTap(e:any){
    let images = e.detail.current
    let image_url = this.data.image_url
    api.uploadImgs(images).then((res:any)=>{
      image_url = [...image_url,...res]
      this.setData({
        image_url:image_url,
      })
    },(err:any)=>{
      this.setData({
        image_url:image_url,
      })
    })
  },
  getData () {
    wx.hideLoading()
    wx.showLoading({title:"加载中"})
    let data = {
      type: this.data.feedbackType,
      status:<"all" | "pending" | "notyet" | "done">'all',
      page:1,
      defuct_id:this.data.defuct_id,
      category_id:this.data.category_id
    }
    console.log(data)
    api.getFeedbackList(data).then((res:any)=>{
    //   console.log(res)
    wx.hideLoading()
    this.setData({
      data: res.data.result[0],
      image_url: res.data.result[0].feedback_image_url,
      feedback:res.data.result[0].feedback,
    })
    })
  },
  previewImg (e:any) {
    let urls = e.currentTarget.dataset.urls;
    let index = e.currentTarget.dataset.index;
    let sources = <any>[]
    urls.forEach((element:any) => {
      sources.push({url: element})
    });
    wx.previewMedia({sources:sources,current:index})
  },
  upload(){
    let data = {
      feedback:this.data.feedback,
      image_url:this.data.image_url,
      category_id:this.data.category_id,
      defuct_id:this.data.defuct_id,
    }
    console.log(data)
    api.upFeedback(data).then((res:any)=>{
      console.log(res);
      wx.showToast({
        title:res.data.message,
        icon:'success',
        duration:2000
      }).then(()=>{
        wx.navigateBack()
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad() {
    this.init()
    wx.setNavigationBarColor({backgroundColor:'#FF625D',frontColor:'#ffffff'})
    this.getData()
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