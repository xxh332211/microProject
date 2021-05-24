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
const net_service_1 = require("../../../../service/net.service");
const points_1 = require("./points");
Component({
    properties: {
        qqmapsdk: null
    },
    data: {
        currentInfo: {},
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
        markers: [],
        polyline: [{
                points: points_1.ply4.points,
                color: "#00f",
                width: 2,
            }]
    },
    methods: {
        markerTab(e) {
            console.log(e);
            let arr = this.data.markers.filter((item) => item.id === e.detail.markerId);
            this.setData({
                currentInfo: arr[0]
            });
        },
        getMap() {
            net_service_1.default.getMap().then((res) => {
                console.log(res);
                this.setData({
                    markers: res
                });
            });
        }
    },
    attached() {
        this.getMap();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0FBQ2xFLElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDO0lBQ3pCLEdBQUcsRUFBRSxxQ0FBcUM7Q0FDM0MsQ0FBQyxDQUFBO0FBQ0YsSUFBSSxXQUFXLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEVBQUU7SUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDYixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUN6QixJQUFJLFNBQVMsR0FBUSxFQUFFLENBQUE7UUFDdkIsSUFBSSxXQUFXLEdBQUcsR0FBRyxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQ2hCLE9BQU8sRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDM0IsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsT0FBTyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7b0JBQ3BCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUMxQixLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQTtvQkFDakIsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO3dCQUNqQixXQUFXLEVBQUUsQ0FBQTtxQkFDZDt5QkFBTTt3QkFDTCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7cUJBQ25CO2dCQUNILENBQUM7Z0JBQ0QsSUFBSSxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7b0JBQ2pCLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsSUFBSSxFQUFFLE1BQU07d0JB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RUFBRSxDQUFBO1FBQ2IsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxNQUFNLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbkIsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQUcsQ0FBQyxDQUFBO0lBQ2xCLENBQUM7SUFDRCxRQUFRO0lBRVIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImxldCBRUU1hcFdYID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vc3RhdGljL3FxbWFwLXd4LWpzc2RrLm1pbi5qcycpO1xyXG5sZXQgcXFtYXBzZGsgPSBuZXcgUVFNYXBXWCh7XHJcbiAga2V5OiAnNEpTQlotTjNRSFUtUDVVVk4tQk9FQ1UtN1VTSVQtTE1GS1EnXHJcbn0pXHJcbmxldCBnZXRMY2F0aW9ucyA9IChhcnI6IEFycmF5PHN0cmluZz4pID0+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgbGV0IGluZGV4ID0gMFxyXG4gICAgbGV0IGxhc3QgPSBhcnIubGVuZ3RoIC0gMVxyXG4gICAgbGV0IGxvY2F0aW9ucyA9IDxhbnk+W11cclxuICAgIGxldCBnZXRsb2NhdGlvbiA9ICgpID0+IHtcclxuICAgICAgcXFtYXBzZGsuZ2VvY29kZXIoe1xyXG4gICAgICAgIGFkZHJlc3M6ICflvpDmsYfljLonICsgYXJyW2luZGV4XSxcclxuICAgICAgICByZWdpb246ICfkuIrmtbfluIInLFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgbG9jYXRpb25zLnB1c2gocmVzLnJlc3VsdClcclxuICAgICAgICAgIGluZGV4ID0gaW5kZXggKyAxXHJcbiAgICAgICAgICBpZiAoaW5kZXggPD0gbGFzdCkge1xyXG4gICAgICAgICAgICBnZXRsb2NhdGlvbigpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKGxvY2F0aW9ucylcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWw6IChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICflnLDlnYDop6PmnpDlpLHotKUnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgcmVqZWN0KHJlcylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRsb2NhdGlvbigpXHJcbiAgfSlcclxufVxyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2UvbmV0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBwbHksIHBseTEsIHBseTMsIHBseTQsIHBseTUsIHBseTYsIHBseTcgfSBmcm9tICcuL3BvaW50cyc7XHJcbkNvbXBvbmVudCh7XHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgcXFtYXBzZGs6IG51bGxcclxuICB9LFxyXG4gIGRhdGE6IHtcclxuICAgIGN1cnJlbnRJbmZvOnt9LFxyXG4gICAgY2VudGVyOntcclxuICAgICAgbGF0OiczMS4xMDIzNDMnLFxyXG4gICAgICBsbmc6JzEyMS40MjY2NzQnXHJcbiAgICB9LFxyXG4gICAgcG9seWdvbnM6IFtcclxuICAgICAge1xyXG4gICAgICAgIHBvaW50czogcGx5LnBvaW50cyxcclxuICAgICAgICBmaWxsQ29sb3I6IFwiIzNmZmZmZjMzXCIsXHJcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwZlwiLFxyXG4gICAgICAgIHN0cm9rZVdpZHRoOiAyLFxyXG4gICAgICAgIHpJbmRleDogMVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcG9pbnRzOiBwbHkxLnBvaW50cyxcclxuICAgICAgICBmaWxsQ29sb3I6IFwiIzNmZmZmZjMzXCIsXHJcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwZlwiLFxyXG4gICAgICAgIHN0cm9rZVdpZHRoOiAyLFxyXG4gICAgICAgIHpJbmRleDogMVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcG9pbnRzOiBwbHkzLnBvaW50cyxcclxuICAgICAgICBmaWxsQ29sb3I6IFwiIzNmZmZmZjMzXCIsXHJcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwZlwiLFxyXG4gICAgICAgIHN0cm9rZVdpZHRoOiAyLFxyXG4gICAgICAgIHpJbmRleDogMVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcG9pbnRzOiBwbHk1LnBvaW50cyxcclxuICAgICAgICBmaWxsQ29sb3I6IFwiIzNmZmZmZjMzXCIsXHJcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwZlwiLFxyXG4gICAgICAgIHN0cm9rZVdpZHRoOiAyLFxyXG4gICAgICAgIHpJbmRleDogMVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcG9pbnRzOiBwbHk2LnBvaW50cyxcclxuICAgICAgICBmaWxsQ29sb3I6IFwiIzNmZmZmZjMzXCIsXHJcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwZlwiLFxyXG4gICAgICAgIHN0cm9rZVdpZHRoOiAyLFxyXG4gICAgICAgIHpJbmRleDogMVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcG9pbnRzOiBwbHk3LnBvaW50cyxcclxuICAgICAgICBmaWxsQ29sb3I6IFwiIzNmZmZmZjMzXCIsXHJcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwZlwiLFxyXG4gICAgICAgIHN0cm9rZVdpZHRoOiAyLFxyXG4gICAgICAgIHpJbmRleDogMVxyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgbWFya2VyczpbXSxcclxuICAgIHBvbHlsaW5lOlt7XHJcbiAgICAgIHBvaW50czogcGx5NC5wb2ludHMsXHJcbiAgICAgIGNvbG9yOiBcIiMwMGZcIixcclxuICAgICAgd2lkdGg6IDIsXHJcbiAgICB9XVxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgbWFya2VyVGFiIChlOmFueSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICBsZXQgYXJyID0gdGhpcy5kYXRhLm1hcmtlcnMuZmlsdGVyKChpdGVtOmFueSk9Pml0ZW0uaWQ9PT1lLmRldGFpbC5tYXJrZXJJZClcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBjdXJyZW50SW5mbyA6IGFyclswXVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGdldE1hcCAoKSB7XHJcbiAgICAgIGFwaS5nZXRNYXAoKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgbWFya2VyczpyZXNcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGF0dGFjaGVkKCkge1xyXG4gICAgdGhpcy5nZXRNYXAoKVxyXG4gICAgZ2V0TGNhdGlvbnMoWyfmooXpmYfplYcnLCAn5qKF6ZmH5LqM5p2RJ10pLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgY2VudGVyOnJlcy5kYXRhWzBdXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgY29uc29sZS5sb2cocGx5KVxyXG4gIH0sXHJcbiAgZGV0YWNoZWQoKSB7XHJcblxyXG4gIH0sXHJcbn0pIl19