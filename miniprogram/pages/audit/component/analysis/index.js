"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../../../service/net.service");
Component({
    properties: {
        type: {
            type: String,
            value: 'community'
        },
    },
    data: {
        date: '',
        list: [],
        x: [],
        yData: [],
        show: false,
        ec: {
            onInit: null
        }
    },
    methods: {
        getChartFunc() {
            let _this = this;
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
            };
        },
        init() {
            net_service_1.default.rectification(this.data.type).then((res) => {
                this.setData({
                    list: res.data.result.data
                });
            });
            net_service_1.default.getRate(this.data.type).then((res) => {
                let data = res.data.result;
                let x = [];
                let ydata = [];
                data.forEach((element) => {
                    x.push(element.create_time);
                    ydata.push(element.yield * 100);
                });
                this.setData({
                    x: x,
                    yData: ydata
                });
                let func = this.getChartFunc();
                this.setData({
                    ec: {
                        onInit: func
                    }
                });
                this.setData({
                    show: true
                });
            });
            this.setData({
                date: net_service_1.default.getDate()
            });
        }
    },
    attached() {
        this.init();
    },
    detached() { },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGlFQUFpRDtBQUtqRCxTQUFTLENBQUM7SUFDUixVQUFVLEVBQUU7UUFDVixJQUFJLEVBQVE7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxXQUFXO1NBQ25CO0tBQ0Y7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksRUFBTSxFQUFFO1FBQ1osQ0FBQyxFQUFDLEVBQUU7UUFDSixLQUFLLEVBQUMsRUFBRTtRQUNSLElBQUksRUFBQyxLQUFLO1FBQ1YsRUFBRSxFQUFFO1lBQ0YsTUFBTSxFQUFPLElBQUk7U0FDbEI7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLFlBQVk7WUFDVixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUE7WUFDaEIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7WUFDakUsT0FBTyxTQUFTLFNBQVMsQ0FBQyxNQUFXLEVBQUUsS0FBVSxFQUFFLE1BQVcsRUFBRSxHQUFRO2dCQUN0RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUE7Z0JBQ2hCLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7b0JBQ2pDLEtBQUssRUFBRSxLQUFLO29CQUNaLE1BQU0sRUFBRSxNQUFNO29CQUNkLGdCQUFnQixFQUFFLEdBQUc7aUJBQ3RCLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV2QixJQUFJLE1BQU0sR0FBRztvQkFDWCxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ2xCLE9BQU8sRUFBRTt3QkFDUCxPQUFPLEVBQUUsTUFBTTt3QkFDZixXQUFXLEVBQUU7NEJBQ1gsSUFBSSxFQUFFLFFBQVE7eUJBQ2Y7d0JBQ0QsT0FBTyxFQUFFLElBQUk7cUJB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Z0JBQ0YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO2dCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLEVBQUUsRUFBRTt3QkFDRixNQUFNLEVBQUUsSUFBSTtxQkFDYjtpQkFDRixDQUFDLENBQUE7Z0JBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxJQUFJLEVBQUMsSUFBSTtpQkFDVixDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsSUFBSSxFQUFFLHFCQUFHLENBQUMsT0FBTyxFQUFFO2FBQ3BCLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUNELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDYixDQUFDO0lBQ0QsUUFBUSxLQUFLLENBQUM7Q0FDZixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb25zdCBlY2hhcnRzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vZWNoYXJ0L2VjLWNhbnZhcy9lY2hhcnRzLmpzJyk7XHJcbi8vIGltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSAnLi4vLi4vLi4vLi4vZWNoYXJ0L2VjLWNhbnZhcy9lY2hhcnRzLmpzJ1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2UvbmV0LnNlcnZpY2UnXHJcbnR5cGUgdHlwZSA9IHtcclxuICB0eXBlOiBTdHJpbmdDb25zdHJ1Y3RvcixcclxuICB2YWx1ZTogXCJjb21tdW5pdHlcIiB8IFwic3RyZWV0XCIgfCBcInVuaXRcIiB8IFwidmlsbGFnZVwiXHJcbn1cclxuQ29tcG9uZW50KHtcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICB0eXBlOiA8dHlwZT57XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdmFsdWU6ICdjb21tdW5pdHknXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgZGF0ZTogJycsXHJcbiAgICBsaXN0Ojxhbnk+W10sXHJcbiAgICB4OltdLFxyXG4gICAgeURhdGE6W10sXHJcbiAgICBzaG93OmZhbHNlLFxyXG4gICAgZWM6IHtcclxuICAgICAgb25Jbml0OiA8YW55Pm51bGxcclxuICAgIH1cclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGdldENoYXJ0RnVuYygpIHtcclxuICAgICAgbGV0IF90aGlzID0gdGhpc1xyXG4gICAgICBsZXQgZWNoYXJ0cyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2VjaGFydC9lYy1jYW52YXMvZWNoYXJ0cy5qcycpO1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaW5pdENoYXJ0KGNhbnZhczogYW55LCB3aWR0aDogYW55LCBoZWlnaHQ6IGFueSwgZHByOiBhbnkpIHtcclxuICAgICAgICBsZXQgY2hhcnQgPSBudWxsXHJcbiAgICAgICAgY2hhcnQgPSBlY2hhcnRzLmluaXQoY2FudmFzLCBudWxsLCB7XHJcbiAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICAgIGRldmljZVBpeGVsUmF0aW86IGRwciAvLyBuZXdcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYW52YXMuc2V0Q2hhcnQoY2hhcnQpO1xyXG5cclxuICAgICAgICB2YXIgb3B0aW9uID0ge1xyXG4gICAgICAgICAgY29sb3I6IFsnI0ZENTE3NSddLFxyXG4gICAgICAgICAgdG9vbHRpcDoge1xyXG4gICAgICAgICAgICB0cmlnZ2VyOiAnYXhpcycsXHJcbiAgICAgICAgICAgIGF4aXNQb2ludGVyOiB7ICAgICAgICAgICAgLy8g5Z2Q5qCH6L205oyH56S65Zmo77yM5Z2Q5qCH6L206Kem5Y+R5pyJ5pWIXHJcbiAgICAgICAgICAgICAgdHlwZTogJ3NoYWRvdycgICAgICAgIC8vIOm7mOiupOS4uuebtOe6v++8jOWPr+mAieS4uu+8midsaW5lJyB8ICdzaGFkb3cnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbmZpbmU6IHRydWVcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgZGF0YTogW10vL+S4ilxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgbGVmdDogMjAsXHJcbiAgICAgICAgICAgIHJpZ2h0OiAyMCxcclxuICAgICAgICAgICAgYm90dG9tOiAxNSxcclxuICAgICAgICAgICAgdG9wOiA0MCxcclxuICAgICAgICAgICAgY29udGFpbkxhYmVsOiB0cnVlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeEF4aXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXHJcbiAgICAgICAgICAgICAgZGF0YTogX3RoaXMuZGF0YS54LFxyXG4gICAgICAgICAgICAgIGF4aXNMaW5lOiB7XHJcbiAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgY29sb3I6ICcjRERFMUVEJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgYXhpc0xhYmVsOiB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzQwcHgnLFxyXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdicmVha0FsbCcsXHJcbiAgICAgICAgICAgICAgICBpbnRlcnZhbDogMCxcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTBweCcsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJyM4NThGQUQnLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICB5QXhpczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcclxuICAgICAgICAgICAgICBheGlzVGljazogeyBzaG93OiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgIGF4aXNMaW5lOiB7XHJcbiAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgY29sb3I6ICcjRjVGNkZBJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgYXhpc0xhYmVsOiB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJyM4NThGQUQnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBzcGxpdExpbmU6IHtcclxuICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJyNEREUxRUQnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgc2VyaWVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiAn6L6+5qCH546HJyxcclxuICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbDoge1xyXG4gICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2luc2lkZSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGRhdGE6IF90aGlzLmRhdGEueURhdGEsXHJcbiAgICAgICAgICAgICAgaXRlbVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICBlbXBoYXNpczoge1xyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJyMzN2EyZGEnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2hhcnQuc2V0T3B0aW9uKG9wdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgYXBpLnJlY3RpZmljYXRpb24odGhpcy5kYXRhLnR5cGUpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIGxpc3Q6cmVzLmRhdGEucmVzdWx0LmRhdGFcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICBhcGkuZ2V0UmF0ZSh0aGlzLmRhdGEudHlwZSkudGhlbigocmVzOmFueSk9PntcclxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLnJlc3VsdFxyXG4gICAgICAgIGxldCB4OmFueSA9IFtdXHJcbiAgICAgICAgbGV0IHlkYXRhOmFueSA9IFtdXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKChlbGVtZW50OmFueSkgPT4ge1xyXG4gICAgICAgICAgeC5wdXNoKGVsZW1lbnQuY3JlYXRlX3RpbWUpXHJcbiAgICAgICAgICB5ZGF0YS5wdXNoKGVsZW1lbnQueWllbGQqMTAwKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICB4OngsXHJcbiAgICAgICAgICB5RGF0YTp5ZGF0YVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IGZ1bmMgPSB0aGlzLmdldENoYXJ0RnVuYygpXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIGVjOiB7XHJcbiAgICAgICAgICAgIG9uSW5pdDogZnVuY1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIHNob3c6dHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgZGF0ZTogYXBpLmdldERhdGUoKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXR0YWNoZWQoKSB7XHJcbiAgICB0aGlzLmluaXQoKVxyXG4gIH0sXHJcbiAgZGV0YWNoZWQoKSB7IH0sXHJcbn0pIl19