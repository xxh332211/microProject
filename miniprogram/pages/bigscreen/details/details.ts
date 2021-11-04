import api from '../../../service/net.service';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: <'jc'|'shlj'|'by'|'ljxf'>'jc',
    subdistrict_id: '',
    address: '',
    date: '',
    showDate: false,
    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: new Date(2050, 11, 31).getTime(),
    show: false,
    isShow1: false,
    isShow2: false,
    isShow3: false,
    detailsObj: <any>{},
    array: ['多层','高层','别墅','混合','其他'],
    array2: ['公建配套厢房','临建厢房','违建厢房','不详厢房','临时_定时定点投放点位','固定_定时定点投放点位'],
    items1: [
      { name: '供水', value: 1, checked: false, disabled: false },
      { name: '供电', value: 2, checked: false, disabled: false },
      { name: '排污', value: 3, checked: false, disabled: false },
      { name: '监控', value: 4, checked: false, disabled: false },
    ],
    items: [
      { name: '干垃圾', value: 1, checked: false, disabled: false },
      { name: '湿垃圾', value: 2, checked: false, disabled: false },
      { name: '可回收垃圾', value: 3, checked: false, disabled: false },
      { name: '有害垃圾', value: 4, checked: false, disabled: false },
    ],
    index: -1,
    jcData: <any>{
      thumb_img: '',
      household_num: '',
      building_num: '',
      volunteer_total: '',
      cleaner_total: '',
      house_type: '选择房屋类型',
      building_time: '',
      address: '',
      class_manager: '',
      class_manager_mobile: '',
      cleaner_person: '',
      cleaner_mobile: ''
    },
    shljData: <any>{
      dry_garbage_container: '',
      wet_refuse_container: '',
      recyclable_garbage_container: '',
      hazardous_waste_container: '',
      building_waste_container: '',
    },
    byData: <any>{
      img_url: '',
      brand: '',
      use_type: '',
      plate_number: '',
      model: ''
    },
    ljxfData: <any>{
      image_url: '',
      wing_room_name: '',
      mark: '',
      address: '',
      wing_type: '选择箱房性质',
      infoList: [],
      classList: []
    }
  },
  tap (e:any) {
    this.setData({
      current: e.currentTarget.dataset.type
    });
  },
  add2() {
    this.setData({
      isShow2: true
    })
  },
  add3() {
    this.setData({
      isShow3: true
    })
  },
  delete2(e: any) {
    // 删除驳运机
    console.log(e);
    let data = {
      subdistrict_id: this.data.subdistrict_id,
      car_id: e.currentTarget.dataset.car_id,
      del_flag: -1
    }
    api.deleteBy(data).then(res=>{
      console.log(res);
      this.getDataObjt();
    })
  },
  delete3(e: any) {
    // 删除垃圾箱房
    console.log(e);
    let data = {
      subdistrict_id: this.data.subdistrict_id,
      type: this.data.detailsObj.type||this.data.detailsObj.wing_room[0].type,
      wing_room_id: e.currentTarget.dataset.wing_room_id,
      del_flag: -1
    }
    api.deleteLjxf(data).then(res=>{
      console.log(res);
      this.getDataObjt();
    })
  },
  // 万年历
  showDate() {
    this.setData({showDate: true})
  },
  nClose() {
    this.setData({ showDate: false });
  },
  formatDate(e: any) {
    let date = new Date(e);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event: any) {
    this.data.date = ''
    let newDate = this.formatDate(event.detail)
    this.setData({
      showDate: false,
      date: newDate
    });
    this.data.jcData.building_time = newDate;
    // console.log(event, this.data.date);
  },
  // 获取社区详情
  getDataObjt() {
    api.getCommunityDetail2().then((res:any)=>{
      console.log('详情数据', res)
      this.setData({
        detailsObj: res.data.result,
        subdistrict_id: res.data.result.subdistrict_id
      });
    })
  },
  // 图片赋值
  onRemoveImgTap(e: any) {
    let images = e.detail.all
    let updata = this.data.jcData
    updata.thumb_img = images
    this.setData({
      jcData: updata
    })
  },
  onImgChangeTap(e: any) {
    let images = e.detail.current
    let thumb_img = this.data.jcData.thumb_img
    let updata = this.data.jcData
    api.uploadImgs(images).then((res: any) => {
      thumb_img = [...thumb_img, ...res]
      updata.thumb_img = thumb_img
      this.setData({
        jcData: updata,
      })
      // console.log(this.data.jcData)
    }, (err: any) => {
      updata.thumb_img = thumb_img
      this.setData({
        jcData: updata,
      })
    })
  },
  onRemoveImgTap2(e: any) {
    let images = e.detail.all
    let updata = this.data.byData
    updata.img_url = images
    this.setData({
      byData: updata
    })
  },
  onImgChangeTap2(e: any) {
    let images = e.detail.current
    let img_url = this.data.byData.img_url
    let updata = this.data.byData
    api.uploadImgs(images).then((res: any) => {
      img_url = [...img_url, ...res]
      updata.img_url = img_url
      this.setData({
        byData: updata,
      })
      // console.log(this.data.byData)
    }, (err: any) => {
      updata.img_url = img_url
      this.setData({
        byData: updata,
      })
    })
  },
  onRemoveImgTap3(e: any) {
    let images = e.detail.all
    let updata = this.data.ljxfData
    updata.image_url = images
    this.setData({
      ljxfData: updata
    })
  },
  onImgChangeTap3(e: any) {
    let images = e.detail.current
    let image_url = this.data.ljxfData.image_url
    let updata = this.data.ljxfData
    api.uploadImgs(images).then((res: any) => {
      image_url = [...image_url, ...res]
      updata.image_url = image_url
      this.setData({
        ljxfData: updata,
      })
    }, (err: any) => {
      updata.img_url = image_url
      this.setData({
        ljxfData: updata,
      })
    })
  },
  // checkbox
  onChangeTap(e: any) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.data.ljxfData.infoList = e.detail.value
  },
  checkboxChange(e: any) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.data.ljxfData.classList = e.detail.value
  },
  // 获取当前地理位置 授权验证
  getCurrentLocal(){
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation'] == false){
          // 如果已拒绝授权，则打开设置页面
          wx.openSetting({
            success(res) {}
          })
        }  else { 
          // 第一次授权，或者已授权，直接调用相关api
          that.getMyLocation()
        }
        that.getMyLocation()
      }
    })
  },
  // 获取当前地理位置
  getMyLocation(){
    let that = this
    this.data.address = ''
    wx.chooseLocation({
      success(res) {
        console.log('地理位置', res)
        that.setData({
          address: res.address
        })
        that.data.ljxfData.address = res.address
        console.log('xxx1', that.data.ljxfData.address);
      }
    })
  },
  // 表单提交
  inputform1(e: any) {
    let key = e.currentTarget.dataset.key;
    let data = this.data.jcData
    data[key] = e.detail.currentKey || e.detail.value
    this.setData({
      jcData: data
    })
    // console.log(this.data.jcData);
  },
  inputform3(e: any) {
    let key = e.currentTarget.dataset.key;
    let data = this.data.shljData
    data[key] = e.detail.currentKey || e.detail.value
    this.setData({
      shljData: data
    })
  },
  inputform4(e: any) {
    let key = e.currentTarget.dataset.key;
    let data = this.data.byData
    data[key] = e.detail.currentKey || e.detail.value
    this.setData({
      byData: data
    })
  },
  inputform5(e: any) {
    let key = e.currentTarget.dataset.key;
    let data = this.data.ljxfData
    data[key] = e.detail.currentKey || e.detail.value
    this.setData({
      ljxfData: data
    })
  },
  submit1() {
    if(this.data.jcData.house_type) {
       this.data.jcData.house_type = this.data.jcData.house_type*1 + 1 
    }
    this.data.jcData.subdistrict_id = this.data.subdistrict_id
    this.data.jcData.thumb_img = this.data.jcData.thumb_img.toString()
    console.log('基础：', this.data.jcData);
    api.jcEdit(this.data.jcData).then(res=>{
      console.log(res);
      this.setData({ show:true });
    })
  },
  submit3() {
    this.data.shljData.subdistrict_id = this.data.subdistrict_id
    console.log('生活垃圾：', this.data.shljData);
    api.jcEdit(this.data.shljData).then(res=>{
      console.log(res);
      this.setData({ show:true });
    })
  },
  submit4() {
    this.data.byData.subdistrict_id = this.data.subdistrict_id
    this.data.byData.img_url = this.data.byData.img_url.toString()
    console.log('驳运：', this.data.byData);
    api.byEdit(this.data.byData).then(res=>{
      console.log(res);
      this.setData({
        show:true,
        isShow2: false
      });
      this.getDataObjt();
    })
  },
  submit5() {
    if(this.data.ljxfData.wing_type) {
      this.data.ljxfData.wing_type = this.data.ljxfData.wing_type*1 + 1 
   }
    this.data.ljxfData.subdistrict_id = this.data.subdistrict_id
    this.data.ljxfData.type = this.data.detailsObj.type||this.data.detailsObj.wing_room[0].type
    this.data.ljxfData.image_url = this.data.ljxfData.image_url.toString()
    console.log('垃圾箱房：', this.data.ljxfData);
    api.ljxfEdit(this.data.ljxfData).then(res=>{
      console.log(res);
      this.setData({
         show:true,
         isShow3: false
      });
      this.getDataObjt();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.lin.initValidateForm(this)
    // if (app.globalData.token) {
    //   wx.navigateTo({url:'/pages/main/patrol/index/index'});
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getDataObjt();
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
  onShareAppMessage(opts: any): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  }
})