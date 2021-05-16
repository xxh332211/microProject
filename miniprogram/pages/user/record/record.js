"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../../service/net.service");
;
Page({
    data: {
        communityList: [],
        unitList: [],
        streetList: [],
        villageList: []
    },
    initData() {
        net_service_1.default.getRecord('community').then((res) => {
            this.setData({
                communityList: res.data.result
            });
            console.log(this.data.communityList, 'xxxxxxxxxxxx');
        });
        net_service_1.default.getRecord('village').then((res) => {
            this.setData({
                villageList: res.data.result
            });
            console.log(this.data.communityList);
        });
        net_service_1.default.getRecord('unit').then((res) => {
            this.setData({
                unitList: res.data.result
            });
        });
    },
    tapHandle(e) {
        let type = e.currentTarget.dataset.type;
        let item = e.currentTarget.dataset.item;
        console.log(type, item);
        net_service_1.default.setPatrolType('record');
        net_service_1.default.setRecordData({
            type: type,
            committee_id: item.committee_id || 0,
            subdistrict_id: item.subdistrict_id || 0
        });
        wx.removeStorageSync('patrolData_' + type);
        setTimeout(() => {
            wx.navigateTo({ url: `/pages/patrol/${type}/${type}` });
        }, 100);
    },
    onLoad() {
        this.initData();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOERBQStDO0FBQy9DLENBQUM7QUFDRCxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixhQUFhLEVBQU0sRUFBRTtRQUNyQixRQUFRLEVBQUMsRUFBRTtRQUNYLFVBQVUsRUFBQyxFQUFFO1FBQ2IsV0FBVyxFQUFDLEVBQUU7S0FDZjtJQUNELFFBQVE7UUFDTixxQkFBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFPLEVBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLGFBQWEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07YUFDL0IsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUN0RCxDQUFDLENBQUMsQ0FBQTtRQUNGLHFCQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQU8sRUFBQyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTthQUM3QixDQUFDLENBQUE7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDdEMsQ0FBQyxDQUFDLENBQUE7UUFDRixxQkFBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFPLEVBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07YUFDMUIsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsU0FBUyxDQUFFLENBQUs7UUFDZCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDeEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RCLHFCQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLHFCQUFHLENBQUMsYUFBYSxDQUFDO1lBQ2hCLElBQUksRUFBQyxJQUFJO1lBQ1QsWUFBWSxFQUFDLElBQUksQ0FBQyxZQUFZLElBQUUsQ0FBQztZQUNqQyxjQUFjLEVBQUMsSUFBSSxDQUFDLGNBQWMsSUFBRSxDQUFDO1NBQ3RDLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEMsVUFBVSxDQUFDLEdBQUUsRUFBRTtZQUNiLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBQyxHQUFHLEVBQUMsaUJBQWlCLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBQyxDQUFDLENBQUE7UUFDdEQsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1IsQ0FBQztJQUlELE1BQU07UUFDSixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUtELE9BQU87SUFFUCxDQUFDO0lBS0QsTUFBTTtJQUVOLENBQUM7SUFLRCxNQUFNO0lBRU4sQ0FBQztJQUtELFFBQVE7SUFFUixDQUFDO0lBS0QsaUJBQWlCO0lBRWpCLENBQUM7SUFLRCxhQUFhO0lBRWIsQ0FBQztJQUtELGlCQUFpQixDQUFDLElBQUk7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDeEIsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZS9uZXQuc2VydmljZVwiO1xyXG47XHJcblBhZ2Uoe1xyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cclxuICAgKi9cclxuICBkYXRhOiB7XHJcbiAgICBjb21tdW5pdHlMaXN0Ojxhbnk+W10sXHJcbiAgICB1bml0TGlzdDpbXSxcclxuICAgIHN0cmVldExpc3Q6W10sXHJcbiAgICB2aWxsYWdlTGlzdDpbXVxyXG4gIH0sXHJcbiAgaW5pdERhdGEgKCkge1xyXG4gICAgYXBpLmdldFJlY29yZCgnY29tbXVuaXR5JykudGhlbigocmVzOmFueSk9PntcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBjb21tdW5pdHlMaXN0OiByZXMuZGF0YS5yZXN1bHRcclxuICAgICAgfSlcclxuICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmNvbW11bml0eUxpc3QsICd4eHh4eHh4eHh4eHgnKVxyXG4gICAgfSlcclxuICAgIGFwaS5nZXRSZWNvcmQoJ3ZpbGxhZ2UnKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIHZpbGxhZ2VMaXN0OiByZXMuZGF0YS5yZXN1bHRcclxuICAgICAgfSlcclxuICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmNvbW11bml0eUxpc3QpXHJcbiAgICB9KVxyXG4gICAgYXBpLmdldFJlY29yZCgndW5pdCcpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgdW5pdExpc3Q6IHJlcy5kYXRhLnJlc3VsdFxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHRhcEhhbmRsZSAoZTphbnkpIHtcclxuICAgIGxldCB0eXBlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudHlwZTsgLy9jb21tdW5pdHl8dW5pdHxzdHJlZXRcclxuICAgIGxldCBpdGVtID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbTtcclxuICAgIGNvbnNvbGUubG9nKHR5cGUsaXRlbSlcclxuICAgIGFwaS5zZXRQYXRyb2xUeXBlKCdyZWNvcmQnKTtcclxuICAgIGFwaS5zZXRSZWNvcmREYXRhKHtcclxuICAgICAgdHlwZTp0eXBlLFxyXG4gICAgICBjb21taXR0ZWVfaWQ6aXRlbS5jb21taXR0ZWVfaWR8fDAsXHJcbiAgICAgIHN1YmRpc3RyaWN0X2lkOml0ZW0uc3ViZGlzdHJpY3RfaWR8fDBcclxuICAgIH0pXHJcbiAgICB3eC5yZW1vdmVTdG9yYWdlU3luYygncGF0cm9sRGF0YV8nK3R5cGUpXHJcbiAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe3VybDpgL3BhZ2VzL3BhdHJvbC8ke3R5cGV9LyR7dHlwZX1gfSlcclxuICAgIH0sMTAwKVxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cclxuICAgKi9cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLmluaXREYXRhKClcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxyXG4gICAqL1xyXG4gIG9uUmVhZHkoKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxyXG4gICAqL1xyXG4gIG9uU2hvdygpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXHJcbiAgICovXHJcbiAgb25IaWRlKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cclxuICAgKi9cclxuICBvblVubG9hZCgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICovXHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcclxuICAgKi9cclxuICBvblJlYWNoQm90dG9tKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXHJcbiAgICovXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2Uob3B0cyk6IFdlY2hhdE1pbmlwcm9ncmFtLlBhZ2UuSUN1c3RvbVNoYXJlQ29udGVudCB7XHJcbiAgICBjb25zb2xlLmxvZyhvcHRzLnRhcmdldClcclxuICAgIHJldHVybiB7fVxyXG4gIH1cclxufSkiXX0=