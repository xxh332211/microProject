// miniprogram/pages/community/dustcart/dustcart.js
import api from '../../../service/net.service';
import {mainType} from '../../../service/net.service';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:<any>{},
    addressData:<any>{},
    isShow: false,
    id: 1,
    current: <mainType>'community',
    // background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  tap (e:any) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
    this.getDataObjt();
    console.log(1111);
  },
  go(e:any){
    // console.log(e.currentTarget.dataset.url)
    let that = this;
    wx.navigateTo({
      url:e.currentTarget.dataset.url,
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        // let data = {productId: 'sadf2323',productName:'金龙鱼花生油'};
        let data = that.data.dataObj.car;
        res.eventChannel.emit("carInfo", data);
      }
    })
  },
  goRoom(e:any){
    let that = this;
    wx.navigateTo({
      url:e.currentTarget.dataset.url,
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        let data = that.data.dataObj.wing_room;
        res.eventChannel.emit("roomInfo", data);
      }
    })
  },
  goFixed(e:any){
    let that = this;
    wx.navigateTo({
      url:e.currentTarget.dataset.url,
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        let data = that.data.dataObj.fixed_time;
        res.eventChannel.emit("roomInfo", data);
      }
    })
  },
  getDataObjt() {
    let data = {
      // type:<mainType> 'unit',
      // subdistrict_id: 206
      subdistrict_id: this.data.id
    }
    api.getCommunityDetail((data)).then((res:any)=>{
      console.log('详情数据', res)
      this.setData({
        dataObj: res.data.result
      })
      this.changeTit(res.data.result.subdistrict_name)
    })
  },
  // 动态设置页面标题
  changeTit(goods_name:any) {
    wx.setNavigationBarTitle({
      title: goods_name?goods_name:'社区管理详情'
    })
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  // 获取位置经纬度
  getCoordinate() {
    console.log('address:', this.data.dataObj.address)
    let data: string = this.data.dataObj.address;
    // let data: string = '上海徐汇';
    api.getCoordinateMsg((data)).then((res:any)=>{
      console.log('坐标数据', res);
      this.setData({addressData: res.data.result})
      this.getAddress();
    }).catch(err => {
      console.log('err', err);
    })
  },
  // 导航
  getAddress() {
    let addressObj = this.data.addressData;
    wx.getLocation({
      // type: 'gcj02', //返回可以用于wx.openLocation的经纬度wgs84
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度wgs84
      success (res) {
        console.log('addressObj',addressObj)
        const latitude = addressObj.lat ? addressObj.lat : res.latitude
        const longitude = addressObj.lng ? addressObj.lng : res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
     })
  },
  // intervalChange(e) {
  //   this.setData({
  //     interval: e.detail.value
  //   })
  // },
  // durationChange(e) {
  //   this.setData({
  //     duration: e.detail.value
  //   })
  // }
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option:any) {
    let productId = option.subdistrict_id;
    console.log(productId);
    this.setData({
      id:productId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDataObjt();
    console.log('12345', this.data.dataObj)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
})