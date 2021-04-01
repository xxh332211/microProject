import api from '../../../../service/net.service';
let interval:any = null
Page({

  /**
   * 页面的初始数据
   */
  scoreList:<any>{},
  data: {
    patrolData:<any>{},
    scoring:<any>{},
    scoring_index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindKeyInput (e:any) {
    clearInterval(interval)
    interval = setTimeout(()=>{
      let temp = this.data.scoring
      let deduct_points = e.detail.value/1
      // debugger
      // let point = e.currentTarget.dataset.point/1
      // if ((deduct_points)>(point)) {
      //   deduct_points = point
      // }
      temp.detail[e.currentTarget.dataset.index].detail[e.currentTarget.dataset.i].deduct_points=deduct_points
      this.setData({
        scoring: temp
      })
    },1000)
    
  },
  calcula (sub:any) {
    let total = sub.deduct_points/1
    sub.detail.forEach((element:any) => {
      total = element.deduct_points/1 + total
    });
    return total
  },
  init () {
    api.getCurrentPenalties("community").then((res:any)=>{
      this.setData({
        patrolData: res
      })
      this.setData({
        scoring_index: wx.getStorageSync('scoring_index'),
      })
      let scoring = this.data.patrolData.penalties[this.data.scoring_index]
      scoring.detail.forEach((element:any) => {
        element.deduct_points = 0;
      });
      scoring.deduct_points = 0;
      this.setData({
        scoring: scoring
      })
      console.log(this.data)
    })
  },
  onRemoveImgTap (e:any) {
    console.log(e,'delete')
    let images = e.detail.all
    let index = e.currentTarget.dataset.index
      let scoring = this.data.scoring;
      scoring.detail[index].image_url = images
      this.setData({
        scoring:scoring
      })
    console.log( this.data.scoring)
  },
  uploadImgs (images:Array<any>) {
    return new Promise ((resolve)=>{
      
    })
    console.log(images)
  },
  onImgChangeTap(e:any){
    console.log(e)
    let images = e.detail.current
    let scoring = this.data.scoring;
    let index = e.currentTarget.dataset.index
    api.uploadImgs(images).then((res:any)=>{
      scoring.detail[index].image_url = [...scoring.detail[index].image_url,...res]
      this.setData({
        scoring:scoring
      })
    },(err:any) => {
      this.setData({
        scoring:scoring
      })
    })
  },
  textInput(e:any){
    let text = e.detail.value;
    let index = e.currentTarget.dataset.index
    let scoring = this.data.scoring;
    scoring.detail[index].desc = text
    this.setData({
      scoring:scoring
    })
  },
  // uploadImages (scoring:any) {
  //   return new Promise((resolve)=>{
  //     let all = 0
  //     let finish = 0
  //     scoring.detail.forEach((element:any,index:number) => {
  //       let picarr = <any>[];
  //       element.image_url.forEach((img:string,i:number) => {
  //         all = all + 1
  //         api.uploadFile(img).then((res:any)=>{
  //             let url = JSON.parse(res.data).resultList[0].access_url
  //             picarr.push(url)
  //             finish = finish + 1
  //             if(i === element.image_url.length-1) {
  //               element.image_url = picarr;
  //             }
  //             if (all === finish) {
  //               this.setData({
  //                 scoring:scoring
  //               })
  //               resolve(true)
  //             }
  //         })
  //       });
  //     });
  //     if (all === 0) {
  //       resolve(true)
  //     }
  //   })
  // },
  check () {
    // 如果扣分了没有上传图片,终止
    let flag = true
    let scoring = this.data.scoring
    scoring.detail.forEach((element:any) => {
      if (element.deduct_points>0&&element.image_url.length < 1) {
        flag = false
      }
    });
    if (!flag) {
      wx.showToast({
        title:'请为扣分项上传图片',
        icon:'none',
        duration:2000
      })
    }
    return flag;
  },
  calPoit () {
    let scoring = this.data.scoring
    scoring.detail.forEach((element:any) => {
      element.deduct_points = 0
      element.deduct_points = this.calcula(element)
    });
    scoring.deduct_points = 0
    scoring.deduct_points = this.calcula(scoring);
    this.setData({
      scoring:scoring
    })
  },
  save(e:any){
    wx.showLoading({
      title:'提交中'
    })
    this.calPoit()
    let canSave = this.check();
    if (!canSave) {
      return;
    }
    let patrolData:any = this.data.patrolData
    patrolData['penalties'][this.data.scoring_index] = this.data.scoring
    api.saveCurrentPenalties(patrolData).then((res:any)=>{
      wx.removeStorageSync('scoring_index');
      wx.hideLoading();
      wx.navigateBack()
    })
  },
  onLoad() {
    wx.showLoading({title:'加载中'})
    this.init();
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
    wx.hideLoading()
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