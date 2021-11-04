import api from '../../../service/net.service';
import {mainType} from '../../../service/net.service'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: <'all'|'done'|'pending'|'notyet'>'all',
    keyword:'',
    feedbackType: <string>'',
    list:<any>[],
    height:'',
    page:1,
    total:0,
    startDate: '',
    endDate: '',
    user:<any>{}
  },
  scroll () {
    let totalPage = Math.ceil(this.data.total/10)
    if (this.data.page >= totalPage) {
      return;
    }
    this.setData({
      page : this.data.page + 1
    })
    this.getList()
  },
  tap (e:any) {
    this.setData({
      current: e.currentTarget.dataset.type,
      keyword:'',
      page: 1
    })
    this.getList('reset')
  },
  getList (reset?:'reset') {
    let data = {
      type:<mainType>this.data.feedbackType,
      status:this.data.current,
      page:this.data.page,
      name:this.data.keyword,
      begin_create_date: this.data.startDate,
      end_create_date: this.data.endDate
    }
    api.getFeedbackList(data).then((res:any)=>{
      if (reset) {
        this.setData({
          list:res.data.result,
          total: res.data.params.total
        })
      }else {
        this.setData({
          list: [...this.data.list,...res.data.result],
          total: res.data.params.total
        })
      }
      
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
  clear(){
    this.setData({
      keyword:''
    })
    this.getList('reset')
  },
  search (e:any) {
    this.setData({
      keyword:e.detail.value
    })
    this.getList('reset')
  },
  goUpfeedback(e:any){
    console.log(e)
    wx.setStorageSync('category_id',e.currentTarget.dataset.category_id)
    wx.setStorageSync('defuct_id',e.currentTarget.dataset.defuct_id)
    wx.navigateTo({url:'/pages/audit/feedback/upFeedback/upFeedback'})
  },
  startChange(e: any) {
    let startDate = e.detail.currentKey || e.detail.value
    // console.log(startDate)
    this.setData({startDate: startDate})
  },
  endChange(e: any) {
    let endDate = e.detail.currentKey || e.detail.value
    // console.log(endDate)
    this.setData({endDate: endDate})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarColor({backgroundColor:'#FF625D',frontColor:'#ffffff'})
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
      user: wx.getStorageSync('user')
    })
    this.setData({
      feedbackType:wx.getStorageSync('feedbackType')
    })
    this.setData({
      page:1
    })
    this.getList('reset');
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
  onShareAppMessage(opts): WechatMiniprogram.Page.ICustomShareContent {
    return {}
  }
})