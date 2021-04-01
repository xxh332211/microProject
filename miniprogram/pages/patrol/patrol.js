"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../service/net.service");
Page({
    data: {
        menu: [
            { image: 'xingzheng.png', text: '行政村巡查', url: '/pages/patrol/village/village', type: 'village' },
            { image: 'shequ.png', text: '社区巡查', url: '/pages/patrol/community/community', type: 'community' },
            { image: 'danwei.png', text: '单位巡查', url: '/pages/patrol/unit/unit', type: 'unit' },
            { image: 'jiedao.png', text: '沿街商铺巡查', url: '/pages/patrol/street/street', type: 'street' }
        ]
    },
    tabHandle(e) {
        console.log(e);
        net_service_1.default.setPatrolType('new');
        wx.removeStorageSync('patrolData_' + e.currentTarget.dataset.cell.type);
        setTimeout(() => {
            wx.navigateTo({ url: e.currentTarget.dataset.cell.url });
        }, 100);
    },
    onLoad() {
    },
    onReady() {
    },
    onShow() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMkRBQTJDO0FBRzNDLElBQUksQ0FBQztJQUtILElBQUksRUFBRTtRQUNKLElBQUksRUFBQztZQUNILEVBQUMsS0FBSyxFQUFDLGVBQWUsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQywrQkFBK0IsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDO1lBQ3ZGLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxtQ0FBbUMsRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDO1lBQ3hGLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyx5QkFBeUIsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO1lBQzFFLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyw2QkFBNkIsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDO1NBQ25GO0tBQ0Y7SUFLRCxTQUFTLENBQUUsQ0FBSztRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZCxxQkFBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN4QixFQUFFLENBQUMsaUJBQWlCLENBQUMsYUFBYSxHQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNyRSxVQUFVLENBQUMsR0FBRSxFQUFFO1lBQ2IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQTtRQUN2RCxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUE7SUFDUixDQUFDO0lBQ0QsTUFBTTtJQUtOLENBQUM7SUFJRCxPQUFPO0lBRVAsQ0FBQztJQUtELE1BQU07SUFFTixDQUFDO0lBS0QsTUFBTTtJQUVOLENBQUM7SUFLRCxRQUFRO0lBRVIsQ0FBQztJQUtELGlCQUFpQjtJQUVqQixDQUFDO0lBS0QsYUFBYTtJQUViLENBQUM7SUFLRCxpQkFBaUIsQ0FBQyxJQUFRO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3hCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vc2VydmljZS9uZXQuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi9zZXJ2aWNlL25ldC5zZXJ2aWNlXCJcclxuXHJcbi8vIDtcclxuUGFnZSh7XHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxyXG4gICAqL1xyXG4gIGRhdGE6IHtcclxuICAgIG1lbnU6W1xyXG4gICAgICB7aW1hZ2U6J3hpbmd6aGVuZy5wbmcnLHRleHQ6J+ihjOaUv+adkeW3oeafpScsdXJsOicvcGFnZXMvcGF0cm9sL3ZpbGxhZ2UvdmlsbGFnZScsdHlwZTondmlsbGFnZSd9LFxyXG4gICAgICB7aW1hZ2U6J3NoZXF1LnBuZycsdGV4dDon56S+5Yy65beh5p+lJyx1cmw6Jy9wYWdlcy9wYXRyb2wvY29tbXVuaXR5L2NvbW11bml0eScsdHlwZTonY29tbXVuaXR5J30sXHJcbiAgICAgIHtpbWFnZTonZGFud2VpLnBuZycsdGV4dDon5Y2V5L2N5beh5p+lJyx1cmw6Jy9wYWdlcy9wYXRyb2wvdW5pdC91bml0Jyx0eXBlOid1bml0J30sXHJcbiAgICAgIHtpbWFnZTonamllZGFvLnBuZycsdGV4dDon5rK/6KGX5ZWG6ZO65beh5p+lJyx1cmw6Jy9wYWdlcy9wYXRyb2wvc3RyZWV0L3N0cmVldCcsdHlwZTonc3RyZWV0J31cclxuICAgIF1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxyXG4gICAqL1xyXG4gIHRhYkhhbmRsZSAoZTphbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICBhcGkuc2V0UGF0cm9sVHlwZSgnbmV3JylcclxuICAgIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKCdwYXRyb2xEYXRhXycrZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY2VsbC50eXBlKVxyXG4gICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHt1cmw6ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY2VsbC51cmx9KVxyXG4gICAgfSwxMDApXHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICAgIC8vIGFwaS5jaGVja1Rva2VuKCkudGhlbigocmVzOmFueSk9PntcclxuICAgICAgLy8gICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIC8vIH0pXHJcbiAgICAvLyB9LDEpXHJcbiAgfSxcclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxyXG4gICAqL1xyXG4gIG9uUmVhZHkoKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxyXG4gICAqL1xyXG4gIG9uU2hvdygpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXHJcbiAgICovXHJcbiAgb25IaWRlKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cclxuICAgKi9cclxuICBvblVubG9hZCgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICovXHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcclxuICAgKi9cclxuICBvblJlYWNoQm90dG9tKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXHJcbiAgICovXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2Uob3B0czphbnkpOiBXZWNoYXRNaW5pcHJvZ3JhbS5QYWdlLklDdXN0b21TaGFyZUNvbnRlbnQge1xyXG4gICAgY29uc29sZS5sb2cob3B0cy50YXJnZXQpXHJcbiAgICByZXR1cm4ge31cclxuICB9XHJcbn0pIl19