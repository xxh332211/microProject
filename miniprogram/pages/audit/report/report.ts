// miniprogram/pages/audit/report.js
import api from '../../../service/net.service';
import {mainType} from '../../../service/net.service';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:<any>[],
    current: <mainType>'community',
    pagenum: 1,
  },
  tap (e:any) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
    this.getDataObjt();
  },

  getDataObjt() {
    let data = {
      // type:<mainType> 'community',
      type: this.data.current,
      page: this.data.pagenum,
      pageSize: 25
    }
    api.getReportData((data)).then((res:any)=>{
      console.log('数据', res)
      res.data.result.map((item:any) => {
        // return item.create_time = item.create_time.split(' ')[0].replace(/-/g,"/");
        let time = item.create_time.substring(0,10);
        return item.create_time = time.replace(/-/g,"/");
      })
      var arr1 = this.data.dataObj; //从data获取当前datalist数组
      var arr2 = res.data.result; //从此次请求返回的数据中获取新数组
      arr1 = arr1.concat(arr2); //合并数组
      this.setData({
        dataObj: arr1 //合并后更新datalist
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    // 监听info事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on("currentInfo", function(data) {
      console.log(data);
      that.setData({
        current: data
      })
    });
    setTimeout(()=>{
      this.getDataObjt();
    },100)
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
    var that=this;
    var pagenum = that.data.pagenum + 1; //获取当前页数并+1
    console.log(that.data.pagenum, 'onReachBottom');
    this.setData({
      pagenum: pagenum, //更新当前页数
    })
    this.getDataObjt();//重新调用请求获取下一页数据
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})