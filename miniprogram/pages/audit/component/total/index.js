"use strict";
Component({
    properties: {
        title: {
            type: Object,
            value: {
                main: '各居委问题排名汇总',
                sub: '2020.12.1 截止'
            }
        },
        list: {
            type: Object,
            value: {
                species: ['居委', '新增问题', '累计问题', '整改率'],
                speciesKeys: ['name', 'new', 'all', 'percent'],
                detail: [
                    {
                        name: '居委',
                        key: 'community',
                        content: [
                            {
                                new: 0,
                                name: '梅陇一村',
                                all: 0,
                                percent: '95%'
                            },
                            {
                                new: 0,
                                all: 0,
                                name: '梅陇一村',
                                percent: '95%'
                            },
                            {
                                new: 0,
                                all: 0,
                                percent: '95%',
                                name: '梅陇一村'
                            }
                        ]
                    },
                    {
                        name: '小区',
                        key: 'communittee',
                        content: [
                            {
                                name: '梅陇2村',
                                new: 0,
                                all: 0,
                                percent: '95%'
                            },
                            {
                                name: '梅陇2村',
                                new: 0,
                                all: 0,
                                percent: '95%'
                            },
                            {
                                name: '梅陇2村',
                                new: 0,
                                all: 0,
                                percent: '95%'
                            }
                        ]
                    }
                ]
            }
        }
    },
    data: {
        bar: [{}, {}, {}, {}, {}],
        ec: {
            onInit: null
        },
    },
    methods: {
        getChartFunc() {
            let echarts = require('../../../../echart/ec-canvas/echarts.js');
            return function initChart(canvas, width, height, dpr) {
                let chart = null;
                chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr
                });
                canvas.setChart(chart);
                var option = {
                    color: ['#FD5175'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        confine: true
                    },
                    legend: {
                        data: []
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
                            splitLine: {
                                lineStyle: {
                                    color: '#DDE1ED'
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
            };
        }
    },
    attached() {
        let func = this.getChartFunc();
        this.setData({
            ec: {
                onInit: func
            }
        });
    },
    detached() { },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsU0FBUyxDQUFDO0lBQ1IsVUFBVSxFQUFDO1FBQ1QsS0FBSyxFQUFNO1lBQ1QsSUFBSSxFQUFDLE1BQU07WUFDWCxLQUFLLEVBQUM7Z0JBQ0osSUFBSSxFQUFDLFdBQVc7Z0JBQ2hCLEdBQUcsRUFBQyxjQUFjO2FBQ25CO1NBQ0Y7UUFDRCxJQUFJLEVBQU87WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBQztnQkFDSixPQUFPLEVBQUMsQ0FBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLENBQUM7Z0JBQ2xDLFdBQVcsRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFNBQVMsQ0FBQztnQkFDM0MsTUFBTSxFQUFDO29CQUNMO3dCQUNFLElBQUksRUFBRSxJQUFJO3dCQUNWLEdBQUcsRUFBQyxXQUFXO3dCQUNmLE9BQU8sRUFBRTs0QkFDUDtnQ0FFRSxHQUFHLEVBQUMsQ0FBQztnQ0FDTCxJQUFJLEVBQUUsTUFBTTtnQ0FDWixHQUFHLEVBQUMsQ0FBQztnQ0FDTCxPQUFPLEVBQUMsS0FBSzs2QkFDZDs0QkFDRDtnQ0FFRSxHQUFHLEVBQUMsQ0FBQztnQ0FDTCxHQUFHLEVBQUMsQ0FBQztnQ0FDTCxJQUFJLEVBQUUsTUFBTTtnQ0FDWixPQUFPLEVBQUMsS0FBSzs2QkFDZDs0QkFDRDtnQ0FDRSxHQUFHLEVBQUMsQ0FBQztnQ0FDTCxHQUFHLEVBQUMsQ0FBQztnQ0FDTCxPQUFPLEVBQUMsS0FBSztnQ0FDYixJQUFJLEVBQUUsTUFBTTs2QkFDYjt5QkFDRjtxQkFDRjtvQkFDRDt3QkFDRSxJQUFJLEVBQUUsSUFBSTt3QkFDVixHQUFHLEVBQUMsYUFBYTt3QkFDakIsT0FBTyxFQUFFOzRCQUNQO2dDQUNFLElBQUksRUFBRSxNQUFNO2dDQUNaLEdBQUcsRUFBQyxDQUFDO2dDQUNM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LEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDOzRCQUN6QyxTQUFTLEVBQUU7Z0NBQ1QsUUFBUSxFQUFFO29DQUNSLEtBQUssRUFBRSxTQUFTO2lDQUNqQjs2QkFDRjt5QkFDRjtxQkFDRjtpQkFDRixDQUFDO2dCQUVGLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hCLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFBO1FBQ0gsQ0FBQztLQUNGO0lBQ0QsUUFBUTtRQUNOLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsRUFBRSxFQUFFO2dCQUNGLE1BQU0sRUFBRSxJQUFJO2FBQ2I7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsUUFBUSxLQUFJLENBQUM7Q0FDZCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb25zdCBlY2hhcnRzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vZWNoYXJ0L2VjLWNhbnZhcy9lY2hhcnRzLmpzJyk7XHJcbi8vIGltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSAnLi4vLi4vLi4vLi4vZWNoYXJ0L2VjLWNhbnZhcy9lY2hhcnRzLmpzJ1xyXG5Db21wb25lbnQoe1xyXG4gIHByb3BlcnRpZXM6e1xyXG4gICAgdGl0bGU6PGFueT57XHJcbiAgICAgIHR5cGU6T2JqZWN0LFxyXG4gICAgICB2YWx1ZTp7XHJcbiAgICAgICAgbWFpbjon5ZCE5bGF5aeU6Zeu6aKY5o6S5ZCN5rGH5oC7JyxcclxuICAgICAgICBzdWI6JzIwMjAuMTIuMSDmiKrmraInXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsaXN0OiA8YW55PntcclxuICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICB2YWx1ZTp7XHJcbiAgICAgICAgc3BlY2llczpbJ+WxheWnlCcsJ+aWsOWinumXrumimCcsJ+e0r+iuoemXrumimCcsJ+aVtOaUueeOhyddLFxyXG4gICAgICAgIHNwZWNpZXNLZXlzOiBbJ25hbWUnLCduZXcnLCdhbGwnLCdwZXJjZW50J10sXHJcbiAgICAgICAgZGV0YWlsOltcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ+WxheWnlCcsXHJcbiAgICAgICAgICAgIGtleTonY29tbXVuaXR5JyxcclxuICAgICAgICAgICAgY29udGVudDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBuZXc6MCxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfmooXpmYfkuIDmnZEnLFxyXG4gICAgICAgICAgICAgICAgYWxsOjAsXHJcbiAgICAgICAgICAgICAgICBwZXJjZW50Oic5NSUnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG5ldzowLFxyXG4gICAgICAgICAgICAgICAgYWxsOjAsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn5qKF6ZmH5LiA5p2RJyxcclxuICAgICAgICAgICAgICAgIHBlcmNlbnQ6Jzk1JSdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5ldzowLFxyXG4gICAgICAgICAgICAgICAgYWxsOjAsXHJcbiAgICAgICAgICAgICAgICBwZXJjZW50Oic5NSUnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+aihemZh+S4gOadkSdcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICflsI/ljLonLFxyXG4gICAgICAgICAgICBrZXk6J2NvbW11bml0dGVlJyxcclxuICAgICAgICAgICAgY29udGVudDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfmooXpmYcy5p2RJyxcclxuICAgICAgICAgICAgICAgIG5ldzowLFxyXG4gICAgICAgICAgICAgICAgYWxsOjAsXHJcbiAgICAgICAgICAgICAgICBwZXJjZW50Oic5NSUnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn5qKF6ZmHMuadkScsXHJcbiAgICAgICAgICAgICAgICBuZXc6MCxcclxuICAgICAgICAgICAgICAgIGFsbDowLFxyXG4gICAgICAgICAgICAgICAgcGVyY2VudDonOTUlJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+aihemZhzLmnZEnLFxyXG4gICAgICAgICAgICAgICAgbmV3OjAsXHJcbiAgICAgICAgICAgICAgICBhbGw6MCxcclxuICAgICAgICAgICAgICAgIHBlcmNlbnQ6Jzk1JSdcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGRhdGE6e1xyXG4gICAgYmFyOlt7fSx7fSx7fSx7fSx7fV0sXHJcbiAgICBlYzoge1xyXG4gICAgICBvbkluaXQ6IDxhbnk+bnVsbFxyXG4gICAgfSxcclxuICAgIFxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgZ2V0Q2hhcnRGdW5jICgpIHtcclxuICAgICAgbGV0IGVjaGFydHMgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9lY2hhcnQvZWMtY2FudmFzL2VjaGFydHMuanMnKTtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGluaXRDaGFydCAoY2FudmFzOmFueSwgd2lkdGg6YW55LCBoZWlnaHQ6YW55LCBkcHI6YW55KSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0ID0gbnVsbFxyXG4gICAgICAgIGNoYXJ0ID0gZWNoYXJ0cy5pbml0KGNhbnZhcywgbnVsbCwge1xyXG4gICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgICBkZXZpY2VQaXhlbFJhdGlvOiBkcHIgLy8gbmV3XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2FudmFzLnNldENoYXJ0KGNoYXJ0KTtcclxuICAgICAgXHJcbiAgICAgICAgdmFyIG9wdGlvbiA9IHtcclxuICAgICAgICAgIGNvbG9yOiBbJyNGRDUxNzUnXSxcclxuICAgICAgICAgIHRvb2x0aXA6IHtcclxuICAgICAgICAgICAgdHJpZ2dlcjogJ2F4aXMnLFxyXG4gICAgICAgICAgICBheGlzUG9pbnRlcjogeyAgICAgICAgICAgIC8vIOWdkOagh+i9tOaMh+ekuuWZqO+8jOWdkOagh+i9tOinpuWPkeacieaViFxyXG4gICAgICAgICAgICAgIHR5cGU6ICdzaGFkb3cnICAgICAgICAvLyDpu5jorqTkuLrnm7Tnur/vvIzlj6/pgInkuLrvvJonbGluZScgfCAnc2hhZG93J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb25maW5lOiB0cnVlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgICAgIGRhdGE6IFtdLy/kuIpcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgIGxlZnQ6IDIwLFxyXG4gICAgICAgICAgICByaWdodDogMjAsXHJcbiAgICAgICAgICAgIGJvdHRvbTogMTUsXHJcbiAgICAgICAgICAgIHRvcDogNDAsXHJcbiAgICAgICAgICAgIGNvbnRhaW5MYWJlbDogdHJ1ZVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHhBeGlzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0eXBlOiAnY2F0ZWdvcnknLFxyXG4gICAgICAgICAgICAgIGRhdGE6IFsn5ZCN56ewJywgJ+WQjeensCcsICflkI3np7AnLCAn5ZCN56ewJywgJ+WQjeensCddLFxyXG4gICAgICAgICAgICAgIGF4aXNMaW5lOiB7XHJcbiAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgY29sb3I6ICcjRERFMUVEJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgYXhpc0xhYmVsOiB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJyM4NThGQUQnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIHlBeGlzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxyXG4gICAgICAgICAgICAgIGF4aXNUaWNrOiB7IHNob3c6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgYXhpc0xpbmU6IHtcclxuICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJyNGNUY2RkEnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBheGlzTGFiZWw6IHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzg1OEZBRCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHNwbGl0TGluZTp7XHJcbiAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgY29sb3I6JyNEREUxRUQnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgc2VyaWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiAn54Ot5bqmJyxcclxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbDoge1xyXG4gICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2luc2lkZSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGRhdGE6IFsxNTAsIDIwMCwgMzAwLCAzNDQsIDMwMCwgMzIwLCAzMTBdLFxyXG4gICAgICAgICAgICAgIGl0ZW1TdHlsZToge1xyXG4gICAgICAgICAgICAgICAgZW1waGFzaXM6IHtcclxuICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMzdhMmRhJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICAgIFxyXG4gICAgICAgIGNoYXJ0LnNldE9wdGlvbihvcHRpb24pO1xyXG4gICAgICAgIHJldHVybiBjaGFydDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXR0YWNoZWQoKSB7XHJcbiAgICBsZXQgZnVuYyA9IHRoaXMuZ2V0Q2hhcnRGdW5jKClcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGVjOiB7XHJcbiAgICAgICAgb25Jbml0OiBmdW5jXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBkZXRhY2hlZCgpIHt9LFxyXG59KSJdfQ==