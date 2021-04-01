// const echarts = require('../../../../echart/ec-canvas/echarts.js');
// import * as echarts from '../../../../echart/ec-canvas/echarts.js'
import api from '../../../../service/net.service'
type type = {
  type: StringConstructor,
  value: "community" | "street" | "unit" | "village"
}
Component({
  properties: {
    type: <type>{
      type: String,
      value: 'community'
    },
  },
  data: {
    date: '',
    list:<any>[],
    x:[],
    yData:[],
    show:false,
    ec: {
      onInit: <any>null
    }
  },
  methods: {
    getChartFunc() {
      let _this = this
      let echarts = require('../../../../echart/ec-canvas/echarts.js');
      return function initChart(canvas: any, width: any, height: any, dpr: any) {
        let chart = null
        chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chart);

        var option = {
          color: ['#FD5175'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            confine: true
          },
          legend: {
            data: []//上
          },
          grid: {
            left: 20,
            right: 20,
            bottom: 15,
            top: 40,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: _this.data.x,
              axisLine: {
                lineStyle: {
                  color: '#DDE1ED'
                }
              },
              axisLabel: {
                width: '40px',
                overflow: 'breakAll',
                interval: 0,
                fontSize: '10px',
                color: '#858FAD',
              },
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: { show: false },
              axisLine: {
                lineStyle: {
                  color: '#F5F6FA'
                }
              },
              axisLabel: {
                color: '#858FAD'
              },
              splitLine: {
                lineStyle: {
                  color: '#DDE1ED'
                }
              }
            }
          ],
          series: [
            {
              name: '达标率',
              type: 'line',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: _this.data.yData,
              itemStyle: {
                emphasis: {
                  color: '#37a2da'
                }
              }
            }
          ]
        };

        chart.setOption(option);
        return chart;
      }
    },
    init() {
      api.rectification(this.data.type).then((res:any)=>{
        this.setData({
          list:res.data.result.data
        })
      })
      api.getRate(this.data.type).then((res:any)=>{
        let data = res.data.result
        let x:any = []
        let ydata:any = []
        data.forEach((element:any) => {
          x.push(element.create_time)
          ydata.push(element.yield*100)
        });
        this.setData({
          x:x,
          yData:ydata
        })
        let func = this.getChartFunc()
        this.setData({
          ec: {
            onInit: func
          }
        })
        this.setData({
          show:true
        })
      })
      this.setData({
        date: api.getDate()
      })
    }
  },
  attached() {
    this.init()
  },
  detached() { },
})