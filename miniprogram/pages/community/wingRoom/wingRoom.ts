// miniprogram/pages/community/wingRoom/wingRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:<any>[],
  },

    // 动态设置页面标题
    changeTit(goods_name:any) {
      wx.setNavigationBarTitle({
        title: goods_name
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options:any) {
    console.log('id', options);
    let tit:any = '';
    if (options.id ==="1") {
      tit = '生活垃圾厢房情况'
    } else {
      tit = '定时定点投放点位'
    }
    this.changeTit(tit);
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    // 监听info事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on("roomInfo", function(data) {
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
  // onShareAppMessage: function () {

  // }
})