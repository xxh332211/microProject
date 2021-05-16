import api from '../../service/net.service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: <'community'|'unit'|'street'>'unit',
    mainData:<any>{},
    nowDate: ''
  },
  tap (e:any) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
    this.getMainData();
  },
  getMainData() {
    api.getClassificationData().then((res:any)=>{
      console.log('数据', res);
      res.data.result.gan = this.toPoint(res.data.result['干垃圾完成率']);
      res.data.result.shi = this.toPoint(res.data.result['湿垃圾完成率']);
      res.data.result.khs = this.toPoint(res.data.result['可回收物完成率']);
      this.setData({
        mainData: res.data.result
      })
    })
  },
  toPoint (percent: any){
    var str=percent.replace("%","");
    console.log(str);
    str = parseInt(str);
    return str;
},
// 获取当前日期
getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  this.setData({
    nowDate: currentdate
  })
  // return currentdate;
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarColor({backgroundColor:'#FF625D',frontColor:'#ffffff'});
    this.getMainData();
    this.getNowFormatDate();
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
  onShareAppMessage(opts): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  }
})