// const api:any = {};

const failHandle = (err: any) => {
  switch (err.data.code) {
    case 400:
      wx.hideToast();
      wx.showToast({
        title: err.data.message || '请求失败',
        icon: "none",
        duration: 2000
      })
      break;
    case 401:
      wx.hideToast();
      wx.redirectTo({ url: '/pages/login/login' })
      break;
    default:
      wx.showToast({
        title: '请求失败',
        icon: "none",
        duration: 2000
      })
      wx.hideToast();
      break;
  }
};
const successHandle = (res: any) => {
  switch (res.data.code) {
    case 200:
      wx.hideToast();
      break;
    case 400:
      wx.hideToast();
      wx.showToast({
        title: res.data.message || '请求成功',
        icon: "none",
        duration: 2000
      })
      break;
    case 401:
      wx.hideToast();
      wx.redirectTo({ url: '/pages/login/login' })
      break;
    default:
      wx.hideToast();
      break;
  }
}
interface patrolData {
  type: mainType,
  committee?: [any],
  unit?: [any],
  community?: [any],
  village?: [any],
  penalties: any,
  s_unit?: any,
  s_committee?: any,
  s_community?: any
  s_village?: any
}

export type mainType = "community" | "street" | "unit" | "village" | Number;

class API {
  // private HOST = 'https://testapi.021xzy.com/'; // 测试环境2
  // private HOST = 'https://ticket-api.jia-expo.com'; // 测试环境
  private HOST = 'https://api.021xzy.com' // 正式环境
  private http(URL: string, type: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined, option: { data?: any, header?: any }, authority?: 'authority') {
    let token = wx.getStorageSync('token')
    let _data: any = option.data || {};
    let _header: any = option.data || {};
    if (authority === 'authority') {
      _header = { Token: token, ..._header }
    }
    wx.showToast({
      title: "加载中",
      icon: 'loading',
      duration: 9999
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.HOST + URL,
        method: type,
        data: _data,
        timeout: 5000,
        header: {
          'content-type': 'application/json',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          'Access-Control-Allow-Method': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Origin': "*",
          ..._header
        },
        complete(e: any) {
          if (e.statusCode === 200 && e.data.code === 200) {
            successHandle(e);
            resolve(e);
          } else {
            failHandle(e);
            reject(e)
          }
        }
      })
    })
  }
  private typeHandle(type?: mainType|string) {
    let typeNumber
    switch (type) {
      case 'community':
        typeNumber = 5
        break;
      case 'village':
        typeNumber = 8
        break;
      case 'unit':
        typeNumber = 6
        break;
      case 'street':
        typeNumber = 7
        break;
      default:
        typeNumber = 0;
        break;
    }
    return typeNumber
  }
  /**
   * getDate
   */
  public getDate() {
    return new Date().toISOString().split('T')[0]
  }
  constructor() { }
  checkToken() {
    this.http(`/backend/api/checkToken`, 'GET', {}, 'authority')
  }
  login(username: string, password: string) {
    return this.http('/backend/api/login', "POST", { data: { user_name: username, pwd: password, type: 1 } })
  }
  /**
 * getUnit
 * 获取单位
 */
  public getUnit(committee_id?: number | string) {
    let data = committee_id ? { committee_ids: committee_id + '' } : {}
    return this.http(`/backend/api/checkArea`, "GET", { data: { type: 6, ...data } }, 'authority')
  }
  /**
   * getStreet
   * 获取街道巡查列表
   */
  public getStreet(name?: string) {
    let data = name ? { name } : {}
    return this.http(`/backend/api/streetRoadList`, "GET", { data: { ...data } }, 'authority')
  }
  // 获取居委
  getCommitte(committee_ids?: [string | number]) {
    let id_string = ''
    let data = {}
    if (committee_ids) {
      committee_ids.forEach((e, i) => {
        if (i === 0) {
          id_string = e + ''
        } else {
          id_string = id_string + ',' + e
        }
      })
    }
    if (id_string) {
      data = { committee_ids: id_string }
    }

    return this.http(`/backend/api/checkArea`, "GET", { data: { type: 4, ...data } }, 'authority')
  }
  /**
   * 获取村委
   */
  getVillageCommitte(committee_ids?: [string | number]) {
    let id_string = ''
    let data = {}
    if (committee_ids) {
      committee_ids.forEach((e, i) => {
        if (i === 0) {
          id_string = e + ''
        } else {
          id_string = id_string + ',' + e
        }
      })
    }
    if (id_string) {
      data = { committee_ids: id_string }
    }
    return this.http(`/backend/api/checkArea`, "GET", { data: { type: 8, ...data } }, 'authority')
  }
  getComunity(committee_ids: [string], subdistrict_id?: number | string) {
    // 获取小区
    let id_string = ''
    committee_ids.forEach((e, i) => {
      if (i === 0) {
        id_string = e
      } else {
        id_string = id_string + ',' + e
      }
    })
    let data = {}
    data = subdistrict_id ? { subdistrict_id: subdistrict_id + '' } : {}
    return this.http(`/backend/api/checkArea`, "GET", { data: { type: 5, committee_ids: id_string, ...data } }, 'authority')
  }
  getVillage(committee_ids: [string], subdistrict_id?: number | string) {
    // 获取小区
    let id_string = ''
    committee_ids.forEach((e, i) => {
      if (i === 0) {
        id_string = e
      } else {
        id_string = id_string + ',' + e
      }
    })
    let data = {}
    data = subdistrict_id ? { subdistrict_id: subdistrict_id + '' } : {}
    return this.http(`/backend/api/checkArea`, "GET", { data: { type: 5, committee_ids: id_string, ...data } }, 'authority')
  }
  // 搜索小区
  searchComunity(name: string) {
    return this.http(`/backend/api/checkArea`, "GET", { data: { type: 5, name: encodeURI(name) } }, 'authority')
  }

  // 搜索行政村
  searchVillage(name: string) {
    return this.http(`/backend/api/checkArea`, "GET", { data: { type: 5, name: encodeURI(name) } }, 'authority')
  }
  /**
   * searchUnit
   * 搜索单位
   */
  public searchUnit(name: string) {
    return this.http(`/backend/api/checkArea`, "GET", { data: { type: 6, name: encodeURI(name) } }, 'authority')
  }
  /**
   * getPenalties
   * 获取小区扣分项
   */
  public getComunityPenalties(subdistrict_id: number | string) {
    return this.http('/backend/api/deductPointsConfig', "GET", { data: { type: 5, subdistrict_id } }, 'authority')
  }
  /**
 * getPenalties
 * 获取行政村扣分项
 */
  public getVillagePenalties(subdistrict_id: number | string) {
    return this.http('/backend/api/deductPointsConfig', "GET", { data: { type: 8, subdistrict_id } }, 'authority')
  }
  /**
   * getStreetPenalties
   * 获取沿街街道扣分项
   */
  public getStreetPenalties() {
    return this.http('/backend/api/deductPointsConfig', "GET", { data: { type: 7 } }, 'authority')
  }
  /**
   * getUnitPenalties
   * 获取单位道扣分项
   */
  public getUnitPenalties(committee_id: number | string) {
    return this.http('/backend/api/deductPointsConfig', "GET", { data: { type: 6, committee_id } }, 'authority')
  }

  /**
   * saveCurrentPenalties
   * 保存当前正在巡查的页面缓存
   */
  public saveCurrentPenalties(patrolData: patrolData) {
    return new Promise((resolve) => {
      wx.setStorageSync('patrolData_' + patrolData.type, patrolData);
      resolve(true)
    })
  }
  /**
   * getCurrentPenalties
   * 获取当前正在巡查的页面缓存
   */
  public getCurrentPenalties(type: string) {
    return new Promise((resolve) => {
      resolve(wx.getStorageSync('patrolData_' + type))
    })
  }
  /**
   * upDecutComunity
   * 上传社区打分
   */
  public upDecutComunity(data: any) {
    return this.http('/backend/api/deductPointsAction', "POST", { data: { ...data, type: 5 } }, 'authority')
  }
  /**
 * upDecutComunity
 * 上传社区打分
 */
  public upDecutVillage(data: any) {
    return this.http('/backend/api/deductPointsAction', "POST", { data: { ...data, type: 8 } }, 'authority')
  }
  /**
   * upDecutUnit
   * 上传单位打分
   */
  public upDecutUnit(data: any) {
    return this.http('/backend/api/deductPointsAction', "POST", { data: { ...data, type: 6 } }, 'authority')
  }
  /**
   * uploadFile
   * 微信上传图片
   */
  public uploadFile(tempUrl: string) {
    return new Promise((resolve, reject) => {
      if (tempUrl.indexOf('https://img.hxjbcdn.com') > -1) {
        // JSON.parse(res.data).resultList[0].access_url
        let data = {
          data: JSON.stringify({ resultList: [{ access_url: tempUrl }] })
        }
        resolve(data)
        return;
      }
      wx.uploadFile({
        url: 'https://api.51jiabo.com/file/v2.0/uploadImage', //仅为示例，非真实的接口地址
        filePath: tempUrl,
        name: 'file',
        timeout: 5000,
        header: {
          'Token': wx.getStorageSync('token'),
          'content-type': 'multipart/form-data',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          'Access-Control-Allow-Method': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Origin': "*",
        },
        success(res) {
          successHandle(res);
          resolve(res)
        },
        fail(e) {
          wx.showToast({
            title: "上传图片失败",
            icon: 'none',
            duration: 2000
          });
          reject(e);
        }
      })
    })
  }

  public uploadImgs(images: Array<any>) {
    return new Promise((resolve, reject) => {
      let index = 0
      let last = images.length - 1
      let picarr = <any>[]
      wx.showLoading({ title: '上传中' })
      let up = () => {
        if (index <= last) {
          this.uploadFile(images[index].url || images[index]).then((res: any) => {
            picarr.push(JSON.parse(res.data).resultList[0].access_url)
            index = index + 1
            up();
          }, (err: any) => {
            wx.hideLoading()
            reject(err)
          })
        } else {
          wx.hideLoading()
          resolve(picarr)
        }
      }
      up();
    })
  }

  /**
   * getRecord
   * 获取当日巡查记录
   */
  public getRecord(type: mainType) {
    let type2: Number | String = 0
    type2 = this.typeHandle(type)
    return this.http(`/backend/api/UserPatrolList`, 'GET', { data: { type: type2 } }, "authority")
  }
  /**
   * setPatrolType
   * 设置进入巡查页面的累心
   */
  public setPatrolType(type: 'new' | 'record') {
    wx.setStorageSync('patrolType', type)
  }
  /**
   * setRecordData
   * 设置查看巡查记录时的传递数据
   */
  public setRecordData(data: { type: mainType, committee_id?: number, subdistrict_id?: number }) {
    wx.setStorageSync('recordData', data)
  }

    /**
   * 获取社区管理列表
   */
  public getCommunityList(upData: {
    type: mainType | number,
    page: number | string,
    pageSize?: number
  }) {
    let typeNumber: number | string = 0
    typeNumber = this.typeHandle(upData.type)
    upData.type = typeNumber
    upData.page = upData.page || 1
    upData.pageSize = upData.pageSize || 10
    return this.http('/information/api/areaList', "GET", { data: upData }, 'authority')
  }
  /**
   * 获取社区管理详情
   */
  public getCommunityDetail(upData: {
    subdistrict_id?: number | string,
  }) {
    return this.http('/backend/xcx/SubDistrictDetail', "GET", { data: upData }, 'authority')
  }

  /**
   * 获取巡查报告数据
   */
  public getReportData(upData: {
    type: mainType | number,
    page: number | string,
    pageSize?: number
  }) {
    let typeNumber: number | string = 0
    typeNumber = this.typeHandle(upData.type)
    upData.type = typeNumber
    upData.page = upData.page || 1
    upData.pageSize = upData.pageSize || 25
    return this.http('/backend/api/patrolList', "GET", { data: upData }, 'authority')
  }

  /**
   * 获取分类时效数据
   */
  public getClassificationData() {
    return this.http('/backend/api/classification', "GET", {}, 'authority')
  }

  // 检查是否绑定手机号
  public getPhoneNumber() {
    return this.http('/backend/api/checkUserMobile', "GET", {}, 'authority')
  }
  // 绑定微信手机号
  public bindPhone(upData: {
    wxcode: string,
    encryptedData: string,
    offset: string
    }) {
      return this.http('/backend/api/bindMobile', "POST", {data: upData}, 'authority')
    }
  // 输入手机号绑定
  public iptPhone(upData: {
    mobile: string,
    }) {
      return this.http('/backend/api/bindMobileNew', "POST", {data: upData}, 'authority')
  }
  // 台账填报
  public newAccount(data: {
    waste_dry: string,
    waste_wet: string,
    waste_recyclabl: string,
    waste_architecture: string,
    waste_harmful: string,
    departure_time: string,
  }) {
    return this.http(`/backend/api/selfSaveRecord`, 'POST', { data: data }, 'authority')
  }
  public newAccount2(data: {
    waste_glass: number | string,
    waste_plastic: number | string,
    waste_wood: number | string,
    waste_paper: number | string,
    waste_electronic: number | string,
    waste_clothes: number | string,
    waste_metal: number | string,
    waste_other: number | string,
    departure_time: string,
  }) {
    return this.http(`/backend/api/selfSaveRecord`, 'POST', { data: data }, 'authority')
  }

  // 后台
  /**
   * getAnalysisData
   * 获取整改数量
   * 后台首页
   */
  public getAnalysisData(type?: mainType) {
    let typeNumber: number | string = 0
    typeNumber = this.typeHandle(type)
    return this.http('/backend/api/analysisData', "GET", { data: { type: typeNumber } }, 'authority')
  }
  public setFeedbackType(type: mainType) {
    wx.setStorageSync('feedbackType', type)
  }
  public getPoints(type?: mainType) {
    let typeNumber: number | string = 0
    typeNumber = this.typeHandle(type)
    return this.http('/backend/xcx/rateData', "GET", { data: { type: typeNumber } }, 'authority')
  }
  /**
   * getFeedbackList
   * 获取整改反馈列表
   */
  public getFeedbackList(upData: {
    type: mainType | number,
    status: 'all' | 'pending' | 'notyet' | 'done' | number | string,
    page: number | string,
    name?: string,
    pageSize?: number,
    defuct_id?: number | string,
    category_id?: number | string
  }) {
    let typeNumber = 0
    let statusCode: number | string = 0
    typeNumber = this.typeHandle(upData.type)
    switch (upData.status) {
      case 'all':
        statusCode = ''
        break;
      case 'pending':
        statusCode = 2
        break;
      case 'notyet':
        statusCode = -1
        break;
      case 'done':
        statusCode = 1
        break;
      default:
        break;
    }
    upData.type = typeNumber
    upData.pageSize = 10
    upData.status = statusCode
    console.log(upData)
    // pageSize:10,type:typeNumber,status:statusCode?statusCode:'',page:data.page,name:data.name?data.name:''
    return this.http(`/backend/api/analysisList`, 'GET', { data: upData }, 'authority')
  }
  /**
   * upFeedback
   * 上传反馈
   */
  public upFeedback(data: {
    feedback: string,
    image_url: Array<string>,
    category_id: number | string,
    defuct_id: number | string,
  }) {
    return this.http('/backend/api/doActionFeedback', 'POST', { data: data }, 'authority')
  }
  /**
   * newActivity
   * 创建活动
   */
  public newActivity(data: {
    title: string,
    image_url: Array<string>,
    activity_type: number | string,
    start_time: string,
    content: string,
  }) {
    return this.http(`/backend/api/activity/create`, 'POST', { data: data }, 'authority')
  }
  /**
   * getSummary
   * 获取问题汇总数据
   */
  public getSummary(type: mainType|string,page:any, size:any) {
    let typenumber = this.typeHandle(type)
    return this.http('/backend/xcx/questionRanking', 'GET', { data: { type: typenumber, page: page, pageSize: size } }, 'authority')
  }

  /**
   * rectification
   * 问题分析-问题汇总
   */
  public rectification(type: mainType|string) {
    let typenumber = this.typeHandle(type)
    return this.http('/backend/xcx/rectification', 'GET', { data: { type: typenumber } }, 'authority')
  }

  /**
   * getRate
   * 问题分析-达标率
   */
  public getRate(type: mainType|string) {
    let typenumber = this.typeHandle(type)
    return this.http('/backend/xcx/yield', 'GET', { data: { type: typenumber } }, 'authority')
  }
  /**
   * getMap
   * 获取地图接口
   */
  public getMap() {
    return new Promise((resolve,reject)=>{
      this.http(`xcx/api/map`,'GET',{},'authority').then((res:any)=>{
        let outPut = <any>[]
        let data = res.data.result
        data.forEach((element:any,index:number) => {
          let point = element.center.split(',')
          let  longitude = point[0]
          let  latitude = point[1]
          outPut.push({
            id:index,
            width:40,
            height:40,
            latitude,
            longitude,
            iconPath: '/static/markerHome.png',
            list:element.list,
            customCallout: {
              anchorY: 10,
              anchorX: 10,
              display: 'BYCLICK',
            },
          })
        });
        resolve(outPut)
      },(err)=>{
        reject(err)
      })
    }) 
  }
}
const api = new API
export default api





// export default api;