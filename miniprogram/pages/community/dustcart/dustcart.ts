// miniprogram/pages/community/dustcart/dustcart.js
// import api from '../../../service/net.service';
import {mainType} from '../../../service/net.service';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:<any>[],
    current: <mainType>'community',
  },
  tap (e:any) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
    console.log(1111);
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option:any) {
    console.log(option);
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    // 监听info事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on("carInfo", function(data) {
      console.log(data);
      that.setData({
        dataArr: data
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getDataObjt()
    console.log('12345', this.data.dataArr)
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