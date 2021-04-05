import api from '../../service/net.service';
import {mainType} from '../../service/net.service';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mainData:<any>[],
    pagenum: 1,
    // subdistrict_id: 0,
    current: <mainType>'community',
    user:<any>{}
  },
  tap (e:any) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
    this.getMainData();
    console.log(1111);
  },
  go(e:any){
    // console.log(e.currentTarget.dataset.url)
    wx.navigateTo({url:e.currentTarget.dataset.url})
  },
  getMainData() {
    let data = {
      type:<mainType> 'unit',
      page: this.data.pagenum,
      pageSize: 10
    }
    api.getCommunityList(data).then((res:any)=>{
      console.log(res);
      var arr1 = this.data.mainData; //从data获取当前datalist数组
      var arr2 = res.data.result; //从此次请求返回的数据中获取新数组
      arr1 = arr1.concat(arr2); //合并数组
      this.setData({
        mainData: arr1 //合并后更新datalist
      })
    })
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      date:api.getDate()
    })
    // this.userInit()
    this.getMainData()
  },
  onReachBottom: function () { //触底开始下一页
    var that=this;
    var pagenum = that.data.pagenum + 1; //获取当前页数并+1
    console.log(that.data.pagenum, '1111');
    this.setData({
      pagenum: pagenum, //更新当前页数
    })
    this.getMainData();//重新调用请求获取下一页数据
  },

})