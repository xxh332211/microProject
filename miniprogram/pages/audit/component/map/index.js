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
                strokeColor: "#1296db",
                strokeWidth: 2,
                zIndex: 1
            },
            {
                points: points_1.ply1.points,
                fillColor: "#3fffff33",
                strokeColor: "#1296db",
                strokeWidth: 2,
                zIndex: 1
            },
            {
                points: points_1.ply3.points,
                fillColor: "#3fffff33",
                strokeColor: "#1296db",
                strokeWidth: 2,
                zIndex: 1
            },
        ],
        markers: [],
        polyline: [
            {
                points: points_1.ply4.points,
                color: "#1296db",
                width: 2,
            },
            {
                points: points_1.ply5.points,
                color: "#1296db",
                width: 2,
            },
            {
                points: points_1.ply6.points,
                color: "#1296db",
                width: 2,
            },
            {
                points: points_1.ply7.points,
                color: "#1296db",
                width: 2,
            }
        ]
    },
    methods: {
        tabmap(e) {
            this.setData({
                currentInfo: {}
            });
        },
        markerTab(e) {
            console.log(e);
            let arr = this.data.markers.filter((item) => item.id === e.detail.markerId);
            this.setData({
                currentInfo: arr[0]
            });
        },
        getMap() {
            net_service_1.default.getMap().then((res) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0FBQ2xFLElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDO0lBQ3pCLEdBQUcsRUFBRSxxQ0FBcUM7Q0FDM0MsQ0FBQyxDQUFBO0FBQ0YsSUFBSSxXQUFXLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEVBQUU7SUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDYixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUN6QixJQUFJLFNBQVMsR0FBUSxFQUFFLENBQUE7UUFDdkIsSUFBSSxXQUFXLEdBQUcsR0FBRyxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQ2hCLE9BQU8sRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDM0IsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsT0FBTyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7b0JBQ3BCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUMxQixLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQTtvQkFDakIsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO3dCQUNqQixXQUFXLEVBQUUsQ0FBQTtxQkFDZDt5QkFBTTt3QkFDTCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7cUJBQ25CO2dCQUNILENBQUM7Z0JBQ0QsSUFBSSxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7b0JBQ2pCLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsSUFBSSxFQUFFLE1BQU07d0JB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USxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxNQUFNLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbkIsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQUcsQ0FBQyxDQUFBO0lBQ2xCLENBQUM7SUFDRCxRQUFRO0lBRVIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImxldCBRUU1hcFdYID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vc3RhdGljL3FxbWFwLXd4LWpzc2RrLm1pbi5qcycpO1xyXG5sZXQgcXFtYXBzZGsgPSBuZXcgUVFNYXBXWCh7XHJcbiAga2V5OiAnNEpTQlotTjNRSFUtUDVVVk4tQk9FQ1UtN1VTSVQtTE1GS1EnXHJcbn0pXHJcbmxldCBnZXRMY2F0aW9ucyA9IChhcnI6IEFycmF5PHN0cmluZz4pID0+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgbGV0IGluZGV4ID0gMFxyXG4gICAgbGV0IGxhc3QgPSBhcnIubGVuZ3RoIC0gMVxyXG4gICAgbGV0IGxvY2F0aW9ucyA9IDxhbnk+W11cclxuICAgIGxldCBnZXRsb2NhdGlvbiA9ICgpID0+IHtcclxuICAgICAgcXFtYXBzZGsuZ2VvY29kZXIoe1xyXG4gICAgICAgIGFkZHJlc3M6ICflvpDmsYfljLonICsgYXJyW2luZGV4XSxcclxuICAgICAgICByZWdpb246ICfkuIrmtbfluIInLFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgbG9jYXRpb25zLnB1c2gocmVzLnJlc3VsdClcclxuICAgICAgICAgIGluZGV4ID0gaW5kZXggKyAxXHJcbiAgICAgICAgICBpZiAoaW5kZXggPD0gbGFzdCkge1xyXG4gICAgICAgICAgICBnZXRsb2NhdGlvbigpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKGxvY2F0aW9ucylcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWw6IChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICflnLDlnYDop6PmnpDlpLHotKUnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgcmVqZWN0KHJlcylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRsb2NhdGlvbigpXHJcbiAgfSlcclxufVxyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2UvbmV0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBwbHksIHBseTEsIHBseTMsIHBseTQsIHBseTUsIHBseTYsIHBseTcgfSBmcm9tICcuL3BvaW50cyc7XHJcbkNvbXBvbmVudCh7XHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgcXFtYXBzZGs6IG51bGxcclxuICB9LFxyXG4gIGRhdGE6IHtcclxuICAgIFxyXG4gICAgY3VycmVudEluZm86e30sXHJcbiAgICBjZW50ZXI6e1xyXG4gICAgICBsYXQ6JzMxLjEwMjM0MycsXHJcbiAgICAgIGxuZzonMTIxLjQyNjY3NCdcclxuICAgIH0sXHJcbiAgICBwb2x5Z29uczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgcG9pbnRzOiBwbHkucG9pbnRzLFxyXG4gICAgICAgIGZpbGxDb2xvcjogXCIjM2ZmZmZmMzNcIixcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjMTI5NmRiXCIsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgekluZGV4OiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IHBseTEucG9pbnRzLFxyXG4gICAgICAgIGZpbGxDb2xvcjogXCIjM2ZmZmZmMzNcIixcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjMTI5NmRiXCIsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgekluZGV4OiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IHBseTMucG9pbnRzLFxyXG4gICAgICAgIGZpbGxDb2xvcjogXCIjM2ZmZmZmMzNcIixcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjMTI5NmRiXCIsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgekluZGV4OiAxXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgbWFya2VyczpbXSxcclxuICAgIHBvbHlsaW5lOltcclxuICAgICAge1xyXG4gICAgICAgIHBvaW50czogcGx5NC5wb2ludHMsXHJcbiAgICAgICAgY29sb3I6IFwiIzEyOTZkYlwiLFxyXG4gICAgICAgIHdpZHRoOiAyLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcG9pbnRzOiBwbHk1LnBvaW50cyxcclxuICAgICAgICBjb2xvcjogXCIjMTI5NmRiXCIsXHJcbiAgICAgICAgd2lkdGg6IDIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IHBseTYucG9pbnRzLFxyXG4gICAgICAgIGNvbG9yOiBcIiMxMjk2ZGJcIixcclxuICAgICAgICB3aWR0aDogMixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHBvaW50czogcGx5Ny5wb2ludHMsXHJcbiAgICAgICAgY29sb3I6IFwiIzEyOTZkYlwiLFxyXG4gICAgICAgIHdpZHRoOiAyLFxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICB0YWJtYXAgKGU6YW55KSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgY3VycmVudEluZm8gOiB7fVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG1hcmtlclRhYiAoZTphbnkpIHtcclxuICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgXHJcbiAgICAgIGxldCBhcnIgPSB0aGlzLmRhdGEubWFya2Vycy5maWx0ZXIoKGl0ZW06YW55KT0+aXRlbS5pZD09PWUuZGV0YWlsLm1hcmtlcklkKVxyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGN1cnJlbnRJbmZvIDogYXJyWzBdXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0TWFwICgpIHtcclxuICAgICAgYXBpLmdldE1hcCgpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIG1hcmtlcnM6cmVzXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhdHRhY2hlZCgpIHtcclxuICAgIHRoaXMuZ2V0TWFwKClcclxuICAgIGdldExjYXRpb25zKFsn5qKF6ZmH6ZWHJywgJ+aihemZh+S6jOadkSddKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGNlbnRlcjpyZXMuZGF0YVswXVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICAgIGNvbnNvbGUubG9nKHBseSlcclxuICB9LFxyXG4gIGRldGFjaGVkKCkge1xyXG5cclxuICB9LFxyXG59KSJdfQ==