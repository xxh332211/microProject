let QQMapWX = require('../../../../static/qqmap-wx-jssdk.min.js');
let qqmapsdk = new QQMapWX({
  key: '4JSBZ-N3QHU-P5UVN-BOECU-7USIT-LMFKQ'
})
let getLcations = (arr: Array<string>) => {
  return new Promise((resolve, reject) => {
    let index = 0
    let last = arr.length - 1
    let locations = <any>[]
    let getlocation = () => {
      qqmapsdk.geocoder({
        address: '徐汇区' + arr[index],
        region: '上海市',
        success: (res: any) => {
          locations.push(res.result)
          index = index + 1
          if (index <= last) {
            getlocation()
          } else {
            resolve(locations)
          }
        },
        fail: (res: any) => {
          wx.showToast({
            title: '地址解析失败',
            icon: 'none',
            duration: 2000
          })
          reject(res)
        }
      })
    }
    getlocation()
  })
}
import { ply, ply1, ply3, ply4, ply5, ply6, ply7 } from './points';
Component({
  properties: {
    qqmapsdk: null
  },
  data: {
    center:{
      lat:'31.102343',
      lng:'121.426674'
    },
    polygons: [
      {
        points: ply.points,
        fillColor: "#3fffff33",
        strokeColor: "#00f",
        strokeWidth: 2,
        zIndex: 1
      },
      {
        points: ply1.points,
        fillColor: "#3fffff33",
        strokeColor: "#00f",
        strokeWidth: 2,
        zIndex: 1
      },
      {
        points: ply3.points,
        fillColor: "#3fffff33",
        strokeColor: "#00f",
        strokeWidth: 2,
        zIndex: 1
      },
      {
        points: ply5.points,
        fillColor: "#3fffff33",
        strokeColor: "#00f",
        strokeWidth: 2,
        zIndex: 1
      },
      {
        points: ply6.points,
        fillColor: "#3fffff33",
        strokeColor: "#00f",
        strokeWidth: 2,
        zIndex: 1
      },
      {
        points: ply7.points,
        fillColor: "#3fffff33",
        strokeColor: "#00f",
        strokeWidth: 2,
        zIndex: 1
      }
    ],
    polyline:[{
      points: ply4.points,
      color: "#00f",
      width: 2,
    }]
  },
  methods: {

  },

  attached() {
    getLcations(['梅陇镇', '梅陇二村']).then((res: any) => {
      this.setData({
        center:res.data[0]
      })
    })
    console.log(ply)
  },
  detached() {

  },
})