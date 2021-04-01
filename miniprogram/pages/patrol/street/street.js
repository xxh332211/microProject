"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../../service/net.service");
Page({
    data: {
        position: '闵行区 梅陇镇',
        streetList: []
    },
    getStreet() {
        net_service_1.default.getStreet().then((res) => {
            this.setData({
                streetList: res.data.result
            });
        });
    },
    search(name) {
        net_service_1.default.getStreet(name).then((res) => {
            console.log(res);
            this.setData({
                streetList: res.data.result
            });
        });
    },
    onLoad() {
    },
    onReady() {
    },
    onShow() {
        this.getStreet();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyZWV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOERBQ0M7QUFDRCxJQUFJLENBQUM7SUFJSCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUMsU0FBUztRQUNsQixVQUFVLEVBQU0sRUFBRTtLQUNuQjtJQUtELFNBQVM7UUFDUCxxQkFBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQU8sRUFBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsVUFBVSxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTthQUMzQixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxNQUFNLENBQUUsSUFBVztRQUNqQixxQkFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFPLEVBQUMsRUFBRTtZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsVUFBVSxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTthQUMzQixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxNQUFNO0lBRU4sQ0FBQztJQUlELE9BQU87SUFFUCxDQUFDO0lBS0QsTUFBTTtRQUNKLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0lBS0QsTUFBTTtJQUVOLENBQUM7SUFLRCxRQUFRO0lBRVIsQ0FBQztJQUtELGlCQUFpQjtJQUVqQixDQUFDO0lBS0QsYUFBYTtJQUViLENBQUM7SUFLRCxpQkFBaUIsQ0FBQyxJQUFRO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3hCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGkgZnJvbSAnLi4vLi4vLi4vc2VydmljZS9uZXQuc2VydmljZSdcclxuO1xyXG5QYWdlKHtcclxuICAvKipcclxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbBcclxuICAgKi9cclxuICBkYXRhOiB7XHJcbiAgICBwb3NpdGlvbjon6Ze16KGM5Yy6IOaihemZh+mVhycsXHJcbiAgICBzdHJlZXRMaXN0Ojxhbnk+W11cclxuICB9LFxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XHJcbiAgICovXHJcbiAgZ2V0U3RyZWV0ICgpIHtcclxuICAgIGFwaS5nZXRTdHJlZXQoKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIHN0cmVldExpc3Q6cmVzLmRhdGEucmVzdWx0XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc2VhcmNoIChuYW1lOnN0cmluZykge1xyXG4gICAgYXBpLmdldFN0cmVldChuYW1lKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgc3RyZWV0TGlzdDpyZXMuZGF0YS5yZXN1bHRcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICBcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXHJcbiAgICovXHJcbiAgb25SZWFkeSgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XHJcbiAgICovXHJcbiAgb25TaG93KCkge1xyXG4gICAgdGhpcy5nZXRTdHJlZXQoKVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXHJcbiAgICovXHJcbiAgb25IaWRlKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cclxuICAgKi9cclxuICBvblVubG9hZCgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICovXHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcclxuICAgKi9cclxuICBvblJlYWNoQm90dG9tKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXHJcbiAgICovXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2Uob3B0czphbnkpOiBXZWNoYXRNaW5pcHJvZ3JhbS5QYWdlLklDdXN0b21TaGFyZUNvbnRlbnQge1xyXG4gICAgY29uc29sZS5sb2cob3B0cy50YXJnZXQpXHJcbiAgICByZXR1cm4ge31cclxuICB9XHJcbn0pIl19