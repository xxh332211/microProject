import api from '../../../service/net.service'
;
Page({
  /**
   * 页面的初始数
   */
  data: {
    patrolType:'new',
    record: {
      type: 'village',
      committee_id:0,
      subdistrict_id: 0
    },
    totalPoint:0,
    committee:<any>[],//村委列表
    village:<any>[],//行政村列表
    penalties:<any>[],//扣分项目
    position:'闵行区 梅陇镇',
    keyword:'',
    showSearchList:false,
    searchList:<any>[],
    s_committee:{
      address: "",
      committee_id: "0",
      contacts: "    ",
      contacts_mobile: "     ",
      create_time: "",
      del_flag: "1",
      name: "请选择村委",
      type: "1",
    },//选中村委
    s_village:{
      committee_id: "",
      name: "请选择行政村",
      subdistrict_id: ""
    },//选中小区
  },
  selectSearch (e:any) {
    let selected = e.currentTarget.dataset.item
    console.log(selected)
    api.getVillageCommitte([selected.committee_id]).then((res:any)=>{
      this.setData({
        s_village:selected,
        s_committee:res.data.result[0],
        showSearchList:false,
        searchList:[],
        keyword:''
      })
      this.getPenalties()
    })
  },
  beginSearch () {
    this.setData({
      showSearchList:true,
    })
    console.log(this.data.searchList)
  },
  cancleSearch () {
    this.setData({
      showSearchList:false,
      searchList:[]
    })
  },
  search (e:any) {
    console.log(e);
    api.searchVillage(e.detail.value).then((res:any)=>{
      console.log(res)
      this.setData({
        searchList:res.data.result
      })
    })
  },
  getPenalties () {
    api.getVillagePenalties(this.data.s_village.subdistrict_id).then((res:any)=>{
      this.setData({
        penalties:res.data.result
      })
      this.calPoint();
    })
  },
  selectVillage (e:any) {
    if (this.data.village.length<1||this.data.patrolType === 'record'){
      return
    }
    const index = e.detail.value;
    this.setData({
      s_village:this.data.village[index]
    })
    this.getPenalties();
  },
  selectComunitee (e:any) {
    if (this.data.patrolType === 'record') {
      return
    }
    const index = e.detail.value;
    this.setData({
      s_committee:this.data.committee[index],
      s_village:{
        committee_id: "",
        name: "请选择行政村",
        subdistrict_id: ""
      }
    })
    this.setData({
      s_village:{committee_id:'',name:'请选择行政村',subdistrict_id:''},
      penalties:[]
    })
    api.getVillage([this.data.s_committee.committee_id]).then((res:any)=>{
      this.setData({
        village:res.data.result
      })
      if (this.data.village.length<2){
        this.setData({
          s_village:this.data.village[0]
        })
        this.getPenalties();
      }
    })
  },
  scoring (e:any) {
    api.saveCurrentPenalties({
      type:"village",
      committee:this.data.committee,
      village:this.data.village,
      s_committee:this.data.s_committee,
      s_village:this.data.s_village,
      penalties:this.data.penalties
    }).then((res:any)=>{
      if (res) {
        wx.setStorageSync('scoring_index',e.currentTarget.dataset.index)
        wx.navigateTo({url:'/pages/patrol/village/scroring/scroring'})
      }
    })
    
  },
  remakeData () {
    let data = this.data.penalties
    let newData = {
      point:this.data.totalPoint, 
      subdistrict_id:this.data.s_village.subdistrict_id,
      content: <any>[]
    }
    data.forEach((element_1:any) => {
      let data_1 = {
        id:element_1.id,
        deduct_points:element_1.deduct_points,
        desc:element_1.desc,
        image_url:element_1.image_url,
        detail:<any>[]
      }
      element_1.detail.forEach((element_2:any) => {
        let data_2 = {
          id:element_2.id,
          deduct_points:element_2.deduct_points,
          desc:element_2.desc,
          image_url:element_2.image_url,
          detail:<any>[]
        }
        element_2.detail.forEach((element_3:any) => {
          let data_3 = {
            id:element_3.id,
            deduct_points:element_3.deduct_points,
            desc:element_3.desc,
            image_url:element_3.image_url,
          }
          data_2.detail.push(data_3);
        });
        data_1.detail.push(data_2);
      });
      newData.content.push(
        data_1
      )
    });
    return newData
  },
  upDecut (e:any){
    let _data = this.remakeData()
    api.upDecutVillage(_data).then((res:any)=>{
      if (res.data.code === 200) {
        wx.showToast({
          title:'提交打分成功',
          icon: 'success',
          duration: 2000
        }).then((res)=>{
          setTimeout(()=>{wx.navigateBack()},2000)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  calPoint () {
    if (this.data.penalties.length<1) {
      return
    }
    let total = 0
    let dedcut = 0
    this.data.penalties.forEach((ele:any) => {
      total = ele.point/1+total
      dedcut = ele.deduct_points/1+dedcut
    });
    total = total - dedcut
    this.setData({
      totalPoint:total
    })
  },
  newPatrolInit () {
    api.getCurrentPenalties('village').then((res:any)=>{
      if (res) {
        this.setData(res);
        this.calPoint();
      }else{
        // 没有缓存数据
        api.getVillageCommitte().then((res:any)=>{
          this.setData({
            committee:  res.data.result
          })
        })
      }
    })
  },
  historyInit () {
    this.setData({
      record: wx.getStorageSync('recordData')
    })
    api.getCurrentPenalties('village').then((res:any)=>{
      if (res) {
        this.setData(res);
        this.calPoint();
      }else{
        // 没有缓存数据
        api.getVillageCommitte([this.data.record.committee_id]).then((res:any)=>{
          this.setData({
            s_committee:  res.data.result[0]
          })
        })
        api.getVillage([this.data.record.committee_id+''],this.data.record.subdistrict_id).then((res:any)=>{
          this.setData({
            s_village:  res.data.result[0]
          })
          this.getPenalties()
        })
      }
    })
  },
  onLoad() {
    
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
      patrolType:wx.getStorageSync('patrolType')
    })
    if (this.data.patrolType==="new") {
      this.newPatrolInit()
    }else{
      // 从个人中心等直接进入查看的
      this.historyInit()
    }
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