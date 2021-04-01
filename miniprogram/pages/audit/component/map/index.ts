let QQMapWX = require('../../../../static/qqmap-wx-jssdk.min.js');
let qqmapsdk = new QQMapWX({
  key:'4JSBZ-N3QHU-P5UVN-BOECU-7USIT-LMFKQ'
})
let getLcations = (arr:Array<string>) =>{
  return new Promise((resolve,reject)=>{
    let index = 0
    let last = arr.length - 1
    let locations = <any>[]
    let getlocation = ()=>{
        qqmapsdk.geocoder({
          address: '徐汇区'+arr[index],
          region:'上海市',
          success:(res:any)=>{
            locations.push(res.result)
            index = index + 1
            if (index <=last) {
              getlocation()
            }else{
              resolve(locations)
            }
          },
          fail:(res:any)=>{
            wx.showToast({
              title: '地址解析失败',
              icon:'none',
              duration:2000
            })
            reject(res)
          }
        })
    }
    getlocation()
  })
}
Component({
  properties:{
    qqmapsdk:null
  },
  data:{
  },
  methods: {
    
  },
  
  attached() {
    getLcations(['梅陇镇','梅陇二村']).then((res:any)=>{
      console.log(res)
    })
  },
  detached() {
    
  },
})