"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../service/net.service");
Page({
    data: {
        mainData: {},
        current: 'community',
        user: {},
        date: ''
    },
    tap(e) {
        this.setData({
            current: e.currentTarget.dataset.type
        });
        this.getMainData();
        console.log(this.data.current);
    },
    goFeedback() {
        net_service_1.default.setFeedbackType(this.data.current);
        setTimeout(() => {
            wx.navigateTo({ url: '/pages/audit/feedback/feedback' });
        }, 100);
    },
    goReport() {
        net_service_1.default.setFeedbackType(this.data.current);
        let that = this;
        setTimeout(() => {
            wx.navigateTo({
                url: '/pages/audit/report/report',
                success: function (res) {
                    let data = that.data.current ? that.data.current : 'community';
                    res.eventChannel.emit("currentInfo", data);
                }
            });
        }, 100);
    },
    getMainData() {
        net_service_1.default.getAnalysisData(this.data.current).then((res) => {
            this.setData({
                mainData: res.data.result[0]
            });
        });
    },
    userInit() {
        this.setData({
            user: wx.getStorageSync('user')
        });
        switch (this.data.user.type) {
            case '6':
                this.setData({
                    current: 'unit'
                });
                break;
            case '8':
                this.setData({
                    current: 'village'
                });
                break;
            case '9':
                this.setData({
                    current: 'village'
                });
                break;
            default:
                break;
        }
    },
    onLoad() {
    },
    onReady() {
    },
    onShow() {
        this.setData({
            date: net_service_1.default.getDate()
        });
        this.userInit();
        this.getMainData();
    },
    onHide() {
    },
    onUnload() {
    },
    onPullDownRefresh() {
    },
    onReachBottom() {
    },
    onShareAppMessage(opts) {
        console.log(opts.target);
        return {};
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdWRpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUE0QztBQUc1QyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQU0sRUFBRTtRQUNoQixPQUFPLEVBQVksV0FBVztRQUM5QixJQUFJLEVBQU0sRUFBRTtRQUNaLElBQUksRUFBQyxFQUFFO0tBQ1I7SUFDRCxHQUFHLENBQUUsQ0FBSztRQUNSLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxPQUFPLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSTtTQUN0QyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWpDLENBQUM7SUFDRCxVQUFVO1FBQ1IscUJBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxVQUFVLENBQUMsR0FBRSxFQUFFO1lBQ2IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFDLEdBQUcsRUFBQyxnQ0FBZ0MsRUFBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1IsQ0FBQztJQUVELFFBQVE7UUFDTixxQkFBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixVQUFVLENBQUMsR0FBRSxFQUFFO1lBQ2IsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDWixHQUFHLEVBQUMsNEJBQTRCO2dCQUNoQyxPQUFPLEVBQUUsVUFBUyxHQUFHO29CQUVuQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFBLFdBQVcsQ0FBQztvQkFDM0QsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1IsQ0FBQztJQUNELFdBQVc7UUFDVCxxQkFBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQU8sRUFBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsUUFBUSxFQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUM5QixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxRQUFRO1FBR04sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLElBQUksRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztTQUNoQyxDQUFDLENBQUE7UUFDRixRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUMzQixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxPQUFPLEVBQUUsTUFBTTtpQkFDaEIsQ0FBQyxDQUFBO2dCQUNGLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxPQUFPLEVBQUUsU0FBUztpQkFDbkIsQ0FBQyxDQUFBO2dCQUNGLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxPQUFPLEVBQUUsU0FBUztpQkFDbkIsQ0FBQyxDQUFBO2dCQUNGLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBSUQsTUFBTTtJQUVOLENBQUM7SUFJRCxPQUFPO0lBRVAsQ0FBQztJQUtELE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsSUFBSSxFQUFDLHFCQUFHLENBQUMsT0FBTyxFQUFFO1NBQ25CLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNmLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBS0QsTUFBTTtJQUVOLENBQUM7SUFLRCxRQUFRO0lBRVIsQ0FBQztJQUtELGlCQUFpQjtJQUVqQixDQUFDO0lBS0QsYUFBYTtJQUViLENBQUM7SUFLRCxpQkFBaUIsQ0FBQyxJQUFRO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3hCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGkgZnJvbSAnLi4vLi4vc2VydmljZS9uZXQuc2VydmljZSc7XHJcbmltcG9ydCB7bWFpblR5cGV9IGZyb20gJy4uLy4uL3NlcnZpY2UvbmV0LnNlcnZpY2UnO1xyXG5cclxuUGFnZSh7XHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxyXG4gICAqL1xyXG4gIGRhdGE6IHtcclxuICAgIG1haW5EYXRhOjxhbnk+e30sXHJcbiAgICBjdXJyZW50OiA8bWFpblR5cGU+J2NvbW11bml0eScsXHJcbiAgICB1c2VyOjxhbnk+e30sXHJcbiAgICBkYXRlOicnXHJcbiAgfSxcclxuICB0YXAgKGU6YW55KSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBjdXJyZW50OiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50eXBlXHJcbiAgICB9KVxyXG4gICAgdGhpcy5nZXRNYWluRGF0YSgpO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5kYXRhLmN1cnJlbnQpO1xyXG4gICAgXHJcbiAgfSxcclxuICBnb0ZlZWRiYWNrICgpIHtcclxuICAgIGFwaS5zZXRGZWVkYmFja1R5cGUodGhpcy5kYXRhLmN1cnJlbnQpO1xyXG4gICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHt1cmw6Jy9wYWdlcy9hdWRpdC9mZWVkYmFjay9mZWVkYmFjayd9KTtcclxuICAgIH0sMTAwKVxyXG4gIH0sXHJcbiAgLy8g5beh5p+l5oql5ZGKXHJcbiAgZ29SZXBvcnQoKSB7XHJcbiAgICBhcGkuc2V0RmVlZGJhY2tUeXBlKHRoaXMuZGF0YS5jdXJyZW50KTtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOicvcGFnZXMvYXVkaXQvcmVwb3J0L3JlcG9ydCcsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAvLyDpgJrov4dldmVudENoYW5uZWzlkJHooqvmiZPlvIDpobXpnaLkvKDpgIHmlbDmja5cclxuICAgICAgICAgIGxldCBkYXRhID0gdGhhdC5kYXRhLmN1cnJlbnQ/dGhhdC5kYXRhLmN1cnJlbnQ6J2NvbW11bml0eSc7XHJcbiAgICAgICAgICByZXMuZXZlbnRDaGFubmVsLmVtaXQoXCJjdXJyZW50SW5mb1wiLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSwxMDApXHJcbiAgfSxcclxuICBnZXRNYWluRGF0YSgpIHtcclxuICAgIGFwaS5nZXRBbmFseXNpc0RhdGEodGhpcy5kYXRhLmN1cnJlbnQpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbWFpbkRhdGEgOiByZXMuZGF0YS5yZXN1bHRbMF1cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSxcclxuICB1c2VySW5pdCgpe1xyXG4gICAgLy8gMuWSjDPkuLrmnIDpq5jmnYPpmZAgICA05Y+q6IO955yL5bGF5L2P5Yy6IDXlj6rog73nnIvkuKrkurrkuK3lv4MgIDblj6rog73nnIvljZXkvY1cclxuICAgIC8vIDE95beh5p+l55So5oi3IDI95Yy657qn55So5oi3IDM96KGX6YGT55So5oi3IDQ95bGF5aeU55So5oi3IDU954mp5Lia55So5oi3IDY95Y2V5L2N55So5oi3XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICB1c2VyOiB3eC5nZXRTdG9yYWdlU3luYygndXNlcicpXHJcbiAgICB9KVxyXG4gICAgc3dpdGNoICh0aGlzLmRhdGEudXNlci50eXBlKSB7XHJcbiAgICAgIGNhc2UgJzYnOlxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBjdXJyZW50OiAndW5pdCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICc4JzpcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgY3VycmVudDogJ3ZpbGxhZ2UnXHJcbiAgICAgICAgfSlcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnOSc6XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIGN1cnJlbnQ6ICd2aWxsYWdlJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgYnJlYWs7ICBcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XHJcbiAgICovXHJcbiAgb25Mb2FkICgpIHtcclxuICAgIFxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcclxuICAgKi9cclxuICBvblJlYWR5KCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcclxuICAgKi9cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBkYXRlOmFwaS5nZXREYXRlKClcclxuICAgIH0pXHJcbiAgICB0aGlzLnVzZXJJbml0KClcclxuICAgIHRoaXMuZ2V0TWFpbkRhdGEoKVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXHJcbiAgICovXHJcbiAgb25IaWRlKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cclxuICAgKi9cclxuICBvblVubG9hZCgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICovXHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcclxuICAgKi9cclxuICBvblJlYWNoQm90dG9tKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXHJcbiAgICovXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2Uob3B0czphbnkpOiBXZWNoYXRNaW5pcHJvZ3JhbS5QYWdlLklDdXN0b21TaGFyZUNvbnRlbnQge1xyXG4gICAgY29uc29sZS5sb2cob3B0cy50YXJnZXQpXHJcbiAgICByZXR1cm4ge31cclxuICB9XHJcbn0pIl19