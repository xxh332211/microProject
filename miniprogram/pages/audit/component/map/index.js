"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let QQMapWX = require('../../../../static/qqmap-wx-jssdk.min.js');
let qqmapsdk = new QQMapWX({
    key: '4JSBZ-N3QHU-P5UVN-BOECU-7USIT-LMFKQ'
});
let getLcations = (arr) => {
    return new Promise((resolve, reject) => {
        let index = 0;
        let last = arr.length - 1;
        let locations = [];
        let getlocation = () => {
            qqmapsdk.geocoder({
                address: '徐汇区' + arr[index],
                region: '上海市',
                success: (res) => {
                    locations.push(res.result);
                    index = index + 1;
                    if (index <= last) {
                        getlocation();
                    }
                    else {
                        resolve(locations);
                    }
                },
                fail: (res) => {
                    wx.showToast({
                        title: '地址解析失败',
                        icon: 'none',
                        duration: 2000
                    });
                    reject(res);
                }
            });
        };
        getlocation();
    });
};
const points_1 = require("./points");
Component({
    properties: {
        qqmapsdk: null
    },
    data: {
        center: {
            lat: '31.102343',
            lng: '121.426674'
        },
        polygons: [
            {
                points: points_1.ply.points,
                fillColor: "#3fffff33",
                strokeColor: "#00f",
                strokeWidth: 2,
                zIndex: 1
            },
            {
                points: points_1.ply1.points,
                fillColor: "#3fffff33",
                strokeColor: "#00f",
                strokeWidth: 2,
                zIndex: 1
            },
            {
                points: points_1.ply3.points,
                fillColor: "#3fffff33",
                strokeColor: "#00f",
                strokeWidth: 2,
                zIndex: 1
            },
            {
                points: points_1.ply5.points,
                fillColor: "#3fffff33",
                strokeColor: "#00f",
                strokeWidth: 2,
                zIndex: 1
            },
            {
                points: points_1.ply6.points,
                fillColor: "#3fffff33",
                strokeColor: "#00f",
                strokeWidth: 2,
                zIndex: 1
            },
            {
                points: points_1.ply7.points,
                fillColor: "#3fffff33",
                strokeColor: "#00f",
                strokeWidth: 2,
                zIndex: 1
            }
        ],
        polyline: [{
                points: points_1.ply4.points,
                color: "#00f",
                width: 2,
            }]
    },
    methods: {},
    attached() {
        getLcations(['梅陇镇', '梅陇二村']).then((res) => {
            this.setData({
                center: res.data[0]
            });
        });
        console.log(points_1.ply);
    },
    detached() {
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0FBQ2xFLElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDO0lBQ3pCLEdBQUcsRUFBRSxxQ0FBcUM7Q0FDM0MsQ0FBQyxDQUFBO0FBQ0YsSUFBSSxXQUFXLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEVBQUU7SUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDYixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUN6QixJQUFJLFNBQVMsR0FBUSxFQUFFLENBQUE7UUFDdkIsSUFBSSxXQUFXLEdBQUcsR0FBRyxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQ2hCLE9BQU8sRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDM0IsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsT0FBTyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7b0JBQ3BCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUMxQixLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQTtvQkFDakIsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO3dCQUNqQixXQUFXLEVBQUUsQ0FBQTtxQkFDZDt5QkFBTTt3QkFDTCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7cUJBQ25CO2dCQUNILENBQUM7Z0JBQ0QsSUFBSSxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7b0JBQ2pCLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsSUFBSSxFQUFFLE1BQU07d0JBQ1osUUFBUSxFQUFFLElBQUk7cUJBQ2YsQ0FBQyxDQUFBO29CQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDYixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFBO1FBQ0QsV0FBVyxFQUFFLENBQUE7SUFDZixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUNELHFDQUFtRTtBQUNuRSxTQUFTLENBQUM7SUFDUixVQUFVLEVBQUU7UUFDVixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFDO1lBQ0wsR0FBRyxFQUFDLFdBQVc7WUFDZixHQUFHLEVBQUMsWUFBWTtTQUNqQjtRQUNELFFBQVEsRUFBRTtZQUNSO2dCQUNFLE1BQU0sRUFBRSxZQUFHLENBQUMsTUFBTTtnQkFDbEIsU0FBUyxFQUFFLFdBQVc7Z0JBQ3RCLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixXQUFXLEVBQUUsQ0FBQztnQkFDZCxNQUFNLEVBQUUsQ0FBQzthQUNWO1lBQ0Q7Z0JBQ0UsTUFBTSxFQUFFLGFBQUksQ0FBQyxNQUFNO2dCQUNuQixTQUFTLEVBQUUsV0FBVztnQkFDdEIsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLFdBQVcsRUFBRSxDQUFDO2dCQUNkLE1BQU0sRUFBRSxDQUFDO2FBQ1Y7WUFDRDtnQkFDRSxNQUFNLEVBQUUsYUFBSSxDQUFDLE1BQU07Z0JBQ25CLFNBQVMsRUFBRSxXQUFXO2dCQUN0QixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLENBQUM7YUFDVjtZQUNEO2dCQUNFLE1BQU0sRUFBRSxhQUFJLENBQUMsTUFBTTtnQkFDbkIsU0FBUyxFQUFFLFdBQVc7Z0JBQ3RCLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixXQUFXLEVBQUUsQ0FBQztnQkFDZCxNQUFNLEVBQUUsQ0FBQzthQUNWO1lBQ0Q7Z0JBQ0UsTUFBTSxFQUFFLGFBQUksQ0FBQyxNQUFNO2dCQUNuQixTQUFTLEVBQUUsV0FBVztnQkFDdEIsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLFdBQVcsRUFBRSxDQUFDO2dCQUNkLE1BQU0sRUFBRSxDQUFDO2FBQ1Y7WUFDRDtnQkFDRSxNQUFNLEVBQUUsYUFBSSxDQUFDLE1BQU07Z0JBQ25CLFNBQVMsRUFBRSxXQUFXO2dCQUN0QixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLENBQUM7YUFDVjtTQUNGO1FBQ0QsUUFBUSxFQUFDLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLGFBQUksQ0FBQyxNQUFNO2dCQUNuQixLQUFLLEVBQUUsTUFBTTtnQkFDYixLQUFLLEVBQUUsQ0FBQzthQUNULENBQUM7S0FDSDtJQUNELE9BQU8sRUFBRSxFQUVSO0lBRUQsUUFBUTtRQUNOLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQzdDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsTUFBTSxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ25CLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFHLENBQUMsQ0FBQTtJQUNsQixDQUFDO0lBQ0QsUUFBUTtJQUVSLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgUVFNYXBXWCA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3N0YXRpYy9xcW1hcC13eC1qc3Nkay5taW4uanMnKTtcclxubGV0IHFxbWFwc2RrID0gbmV3IFFRTWFwV1goe1xyXG4gIGtleTogJzRKU0JaLU4zUUhVLVA1VVZOLUJPRUNVLTdVU0lULUxNRktRJ1xyXG59KVxyXG5sZXQgZ2V0TGNhdGlvbnMgPSAoYXJyOiBBcnJheTxzdHJpbmc+KSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGxldCBpbmRleCA9IDBcclxuICAgIGxldCBsYXN0ID0gYXJyLmxlbmd0aCAtIDFcclxuICAgIGxldCBsb2NhdGlvbnMgPSA8YW55PltdXHJcbiAgICBsZXQgZ2V0bG9jYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgIHFxbWFwc2RrLmdlb2NvZGVyKHtcclxuICAgICAgICBhZGRyZXNzOiAn5b6Q5rGH5Yy6JyArIGFycltpbmRleF0sXHJcbiAgICAgICAgcmVnaW9uOiAn5LiK5rW35biCJyxcclxuICAgICAgICBzdWNjZXNzOiAocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgIGxvY2F0aW9ucy5wdXNoKHJlcy5yZXN1bHQpXHJcbiAgICAgICAgICBpbmRleCA9IGluZGV4ICsgMVxyXG4gICAgICAgICAgaWYgKGluZGV4IDw9IGxhc3QpIHtcclxuICAgICAgICAgICAgZ2V0bG9jYXRpb24oKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShsb2NhdGlvbnMpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsOiAocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Zyw5Z2A6Kej5p6Q5aSx6LSlJyxcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJlamVjdChyZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgZ2V0bG9jYXRpb24oKVxyXG4gIH0pXHJcbn1cclxuaW1wb3J0IHsgcGx5LCBwbHkxLCBwbHkzLCBwbHk0LCBwbHk1LCBwbHk2LCBwbHk3IH0gZnJvbSAnLi9wb2ludHMnO1xyXG5Db21wb25lbnQoe1xyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIHFxbWFwc2RrOiBudWxsXHJcbiAgfSxcclxuICBkYXRhOiB7XHJcbiAgICBjZW50ZXI6e1xyXG4gICAgICBsYXQ6JzMxLjEwMjM0MycsXHJcbiAgICAgIGxuZzonMTIxLjQyNjY3NCdcclxuICAgIH0sXHJcbiAgICBwb2x5Z29uczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgcG9pbnRzOiBwbHkucG9pbnRzLFxyXG4gICAgICAgIGZpbGxDb2xvcjogXCIjM2ZmZmZmMzNcIixcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDBmXCIsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgekluZGV4OiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IHBseTEucG9pbnRzLFxyXG4gICAgICAgIGZpbGxDb2xvcjogXCIjM2ZmZmZmMzNcIixcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDBmXCIsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgekluZGV4OiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IHBseTMucG9pbnRzLFxyXG4gICAgICAgIGZpbGxDb2xvcjogXCIjM2ZmZmZmMzNcIixcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDBmXCIsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgekluZGV4OiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IHBseTUucG9pbnRzLFxyXG4gICAgICAgIGZpbGxDb2xvcjogXCIjM2ZmZmZmMzNcIixcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDBmXCIsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgekluZGV4OiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IHBseTYucG9pbnRzLFxyXG4gICAgICAgIGZpbGxDb2xvcjogXCIjM2ZmZmZmMzNcIixcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDBmXCIsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgekluZGV4OiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IHBseTcucG9pbnRzLFxyXG4gICAgICAgIGZpbGxDb2xvcjogXCIjM2ZmZmZmMzNcIixcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDBmXCIsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgekluZGV4OiAxXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBwb2x5bGluZTpbe1xyXG4gICAgICBwb2ludHM6IHBseTQucG9pbnRzLFxyXG4gICAgICBjb2xvcjogXCIjMDBmXCIsXHJcbiAgICAgIHdpZHRoOiAyLFxyXG4gICAgfV1cclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuXHJcbiAgfSxcclxuXHJcbiAgYXR0YWNoZWQoKSB7XHJcbiAgICBnZXRMY2F0aW9ucyhbJ+aihemZh+mVhycsICfmooXpmYfkuozmnZEnXSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBjZW50ZXI6cmVzLmRhdGFbMF1cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgICBjb25zb2xlLmxvZyhwbHkpXHJcbiAgfSxcclxuICBkZXRhY2hlZCgpIHtcclxuXHJcbiAgfSxcclxufSkiXX0=