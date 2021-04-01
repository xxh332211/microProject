// const echarts = require('../../../../echart/ec-canvas/echarts.js');
// import * as echarts from '../../../../echart/ec-canvas/echarts.js'
Component({
  properties:{
    title:<any>{
      type:Object,
      value:{
        main:'各居委问题排名汇总',
        sub:'2020.12.1 截止'
      }
    },
    list: <any>{
      type: Object,
      value:{
        species:['居委','新增问题','累计问题','整改率'],
        speciesKeys: ['name','new','all','percent'],
        detail:[
          {
            name: '居委',
            key:'community',
            content: [
              {
               
                new:0,
                name: '梅陇一村',
                all:0,
                percent:'95%'
              },
              {
                
                new:0,
                all:0,
                name: '梅陇一村',
                percent:'95%'
              },
              {
                new:0,
                all:0,
                percent:'95%',
                name: '梅陇一村'
              }
            ]
          },
          {
            name: '小区',
            key:'communittee',
            content: [
              {
                name: '梅陇2村',
                new:0,
                all:0,
                percent:'95%'
              },
              {
                name: '梅陇2村',
                new:0,
                all:0,
                percent:'95%'
              },
              {
                name: '梅陇2村',
                new:0,
                all:0,
                percent:'95%'
              }
            ]
          }
        ]
      }
    }
  },
  data:{
    bar:[{},{},{},{},{}],
    ec: {
      onInit: <any>null
    },
    
  },
  methods: {
    getChartFunc () {
      let echarts = require('../../../../echart/ec-canvas/echarts.js');
      return function initChart (canvas:any, width:any, height:any, dpr:any) {
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
              data: ['名称', '名称', '名称', '名称', '名称'],
              axisLine: {
                lineStyle: {
                  color: '#DDE1ED'
                }
              },
              axisLabel: {
                color: '#858FAD'
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
              splitLine:{
                lineStyle: {
                  color:'#DDE1ED'
                }
              }
            }
          ],
          series: [
            {
              name: '热度',
              type: 'line',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: [150, 200, 300, 344, 300, 320, 310],
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
    }
  },
  attached() {
    let func = this.getChartFunc()
    this.setData({
      ec: {
        onInit: func
      }
    })
  },
  detached() {},
})