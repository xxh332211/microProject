"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../../service/net.service");
Page({
    data: {
        dataObj: {},
        addressData: {},
        isShow: false,
        id: 1,
        current: 'community',
        indicatorDots: false,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500
    },
    tap(e) {
        this.setData({
            current: e.currentTarget.dataset.type
        });
        this.getDataObjt();
        console.log(1111);
    },
    go(e) {
        let that = this;
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
            success: function (res) {
                let data = that.data.dataObj.car;
                res.eventChannel.emit("carInfo", data);
            }
        });
    },
    goRoom(e) {
        let that = this;
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
            success: function (res) {
                let data = that.data.dataObj.wing_room;
                res.eventChannel.emit("roomInfo", data);
            }
        });
    },
    goFixed(e) {
        let that = this;
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
            success: function (res) {
                let data = that.data.dataObj.fixed_time;
                res.eventChannel.emit("roomInfo", data);
            }
        });
    },
    getDataObjt() {
        let data = {
            subdistrict_id: this.data.id
        };
        net_service_1.default.getCommunityDetail((data)).then((res) => {
            console.log('详情数据', res);
            this.setData({
                dataObj: res.data.result
            });
            this.changeTit(res.data.result.subdistrict_name);
        });
    },
    changeTit(goods_name) {
        wx.setNavigationBarTitle({
            title: goods_name ? goods_name : '社区管理详情'
        });
    },
    changeIndicatorDots() {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeAutoplay() {
        this.setData({
            autoplay: !this.data.autoplay
        });
    },
    getCoordinate() {
        console.log('address:', this.data.dataObj.address);
        let data = this.data.dataObj.address;
        net_service_1.default.getCoordinateMsg((data)).then((res) => {
            console.log('坐标数据', res);
            this.setData({ addressData: res.data.result });
            this.getAddress();
        }).catch(err => {
            console.log('err', err);
        });
    },
    getAddress() {
        let addressObj = this.data.addressData;
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                console.log('addressObj', addressObj);
                const latitude = addressObj.lat ? addressObj.lat : res.latitude;
                const longitude = addressObj.lng ? addressObj.lng : res.longitude;
                wx.openLocation({
                    latitude,
                    longitude,
                    scale: 18
                });
            }
        });
    },
    onLoad: function (option) {
        let productId = option.subdistrict_id;
        console.log(productId);
        this.setData({
            id: productId
        });
    },
    onReady: function () {
        this.getDataObjt();
        console.log('12345', this.data.dataObj);
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onReachBottom: function () {
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5RGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbXVuaXR5RGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsOERBQStDO0FBRS9DLElBQUksQ0FBQztJQUtILElBQUksRUFBRTtRQUNKLE9BQU8sRUFBTSxFQUFFO1FBQ2YsV0FBVyxFQUFNLEVBQUU7UUFDbkIsTUFBTSxFQUFFLEtBQUs7UUFDYixFQUFFLEVBQUUsQ0FBQztRQUNMLE9BQU8sRUFBWSxXQUFXO1FBRTlCLGFBQWEsRUFBRSxLQUFLO1FBQ3BCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLFFBQVEsRUFBRSxHQUFHO0tBQ2Q7SUFDRCxHQUFHLENBQUUsQ0FBSztRQUNSLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxPQUFPLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSTtTQUN0QyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUs7UUFFTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHO1lBQy9CLE9BQU8sRUFBRSxVQUFTLEdBQUc7Z0JBR25CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDakMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pDLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQUs7UUFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHO1lBQy9CLE9BQU8sRUFBRSxVQUFTLEdBQUc7Z0JBRW5CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztnQkFDdkMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFDLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsT0FBTyxDQUFDLENBQUs7UUFDWCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHO1lBQy9CLE9BQU8sRUFBRSxVQUFTLEdBQUc7Z0JBRW5CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztnQkFDeEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFDLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksSUFBSSxHQUFHO1lBR1QsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUM3QixDQUFBO1FBQ0QscUJBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBTyxFQUFDLEVBQUU7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO2FBQ3pCLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUNsRCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxTQUFTLENBQUMsVUFBYztRQUN0QixFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDdkIsS0FBSyxFQUFFLFVBQVUsQ0FBQSxDQUFDLENBQUEsVUFBVSxDQUFBLENBQUMsQ0FBQSxRQUFRO1NBQ3RDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtTQUN4QyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsY0FBYztRQUNaLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7U0FDOUIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsRCxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFFN0MscUJBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBTyxFQUFDLEVBQUU7WUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUE7WUFDNUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBRWIsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLENBQUUsR0FBRztnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBQyxVQUFVLENBQUMsQ0FBQTtnQkFDcEMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQTtnQkFDL0QsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQTtnQkFDakUsRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDZCxRQUFRO29CQUNSLFNBQVM7b0JBQ1QsS0FBSyxFQUFFLEVBQUU7aUJBQ1YsQ0FBQyxDQUFBO1lBQ0osQ0FBQztTQUNELENBQUMsQ0FBQTtJQUNMLENBQUM7SUFjRCxNQUFNLEVBQUUsVUFBVSxNQUFVO1FBQzFCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsRUFBRSxFQUFDLFNBQVM7U0FDYixDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7SUFLRCxhQUFhLEVBQUU7SUFFZixDQUFDO0NBS0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWluaXByb2dyYW0vcGFnZXMvY29tbXVuaXR5L2R1c3RjYXJ0L2R1c3RjYXJ0LmpzXHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vLi4vc2VydmljZS9uZXQuc2VydmljZSc7XHJcbmltcG9ydCB7bWFpblR5cGV9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvbmV0LnNlcnZpY2UnO1xyXG5QYWdlKHtcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXHJcbiAgICovXHJcbiAgZGF0YToge1xyXG4gICAgZGF0YU9iajo8YW55Pnt9LFxyXG4gICAgYWRkcmVzc0RhdGE6PGFueT57fSxcclxuICAgIGlzU2hvdzogZmFsc2UsXHJcbiAgICBpZDogMSxcclxuICAgIGN1cnJlbnQ6IDxtYWluVHlwZT4nY29tbXVuaXR5JyxcclxuICAgIC8vIGJhY2tncm91bmQ6IFsnZGVtby10ZXh0LTEnLCAnZGVtby10ZXh0LTInLCAnZGVtby10ZXh0LTMnXSxcclxuICAgIGluZGljYXRvckRvdHM6IGZhbHNlLFxyXG4gICAgdmVydGljYWw6IGZhbHNlLFxyXG4gICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgaW50ZXJ2YWw6IDIwMDAsXHJcbiAgICBkdXJhdGlvbjogNTAwXHJcbiAgfSxcclxuICB0YXAgKGU6YW55KSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBjdXJyZW50OiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50eXBlXHJcbiAgICB9KVxyXG4gICAgdGhpcy5nZXREYXRhT2JqdCgpO1xyXG4gICAgY29uc29sZS5sb2coMTExMSk7XHJcbiAgfSxcclxuICBnbyhlOmFueSl7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmwpXHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgdXJsOmUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybCxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgLy8g6YCa6L+HZXZlbnRDaGFubmVs5ZCR6KKr5omT5byA6aG16Z2i5Lyg6YCB5pWw5o2uXHJcbiAgICAgICAgLy8gbGV0IGRhdGEgPSB7cHJvZHVjdElkOiAnc2FkZjIzMjMnLHByb2R1Y3ROYW1lOifph5HpvpnpsbzoirHnlJ/msrknfTtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoYXQuZGF0YS5kYXRhT2JqLmNhcjtcclxuICAgICAgICByZXMuZXZlbnRDaGFubmVsLmVtaXQoXCJjYXJJbmZvXCIsIGRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZ29Sb29tKGU6YW55KXtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAvLyDpgJrov4dldmVudENoYW5uZWzlkJHooqvmiZPlvIDpobXpnaLkvKDpgIHmlbDmja5cclxuICAgICAgICBsZXQgZGF0YSA9IHRoYXQuZGF0YS5kYXRhT2JqLndpbmdfcm9vbTtcclxuICAgICAgICByZXMuZXZlbnRDaGFubmVsLmVtaXQoXCJyb29tSW5mb1wiLCBkYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGdvRml4ZWQoZTphbnkpe1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDplLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmwsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIC8vIOmAmui/h2V2ZW50Q2hhbm5lbOWQkeiiq+aJk+W8gOmhtemdouS8oOmAgeaVsOaNrlxyXG4gICAgICAgIGxldCBkYXRhID0gdGhhdC5kYXRhLmRhdGFPYmouZml4ZWRfdGltZTtcclxuICAgICAgICByZXMuZXZlbnRDaGFubmVsLmVtaXQoXCJyb29tSW5mb1wiLCBkYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGdldERhdGFPYmp0KCkge1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgIC8vIHR5cGU6PG1haW5UeXBlPiAndW5pdCcsXHJcbiAgICAgIC8vIHN1YmRpc3RyaWN0X2lkOiAyMDZcclxuICAgICAgc3ViZGlzdHJpY3RfaWQ6IHRoaXMuZGF0YS5pZFxyXG4gICAgfVxyXG4gICAgYXBpLmdldENvbW11bml0eURldGFpbCgoZGF0YSkpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgIGNvbnNvbGUubG9nKCfor6bmg4XmlbDmja4nLCByZXMpXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgZGF0YU9iajogcmVzLmRhdGEucmVzdWx0XHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuY2hhbmdlVGl0KHJlcy5kYXRhLnJlc3VsdC5zdWJkaXN0cmljdF9uYW1lKVxyXG4gICAgfSlcclxuICB9LFxyXG4gIC8vIOWKqOaAgeiuvue9rumhtemdouagh+mimFxyXG4gIGNoYW5nZVRpdChnb29kc19uYW1lOmFueSkge1xyXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgdGl0bGU6IGdvb2RzX25hbWU/Z29vZHNfbmFtZTon56S+5Yy6566h55CG6K+m5oOFJ1xyXG4gICAgfSlcclxuICB9LFxyXG4gIGNoYW5nZUluZGljYXRvckRvdHMoKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBpbmRpY2F0b3JEb3RzOiAhdGhpcy5kYXRhLmluZGljYXRvckRvdHNcclxuICAgIH0pXHJcbiAgfSxcclxuICBjaGFuZ2VBdXRvcGxheSgpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGF1dG9wbGF5OiAhdGhpcy5kYXRhLmF1dG9wbGF5XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgLy8g6I635Y+W5L2N572u57uP57qs5bqmXHJcbiAgZ2V0Q29vcmRpbmF0ZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdhZGRyZXNzOicsIHRoaXMuZGF0YS5kYXRhT2JqLmFkZHJlc3MpXHJcbiAgICBsZXQgZGF0YTogc3RyaW5nID0gdGhpcy5kYXRhLmRhdGFPYmouYWRkcmVzcztcclxuICAgIC8vIGxldCBkYXRhOiBzdHJpbmcgPSAn5LiK5rW35b6Q5rGHJztcclxuICAgIGFwaS5nZXRDb29yZGluYXRlTXNnKChkYXRhKSkudGhlbigocmVzOmFueSk9PntcclxuICAgICAgY29uc29sZS5sb2coJ+WdkOagh+aVsOaNricsIHJlcyk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7YWRkcmVzc0RhdGE6IHJlcy5kYXRhLnJlc3VsdH0pXHJcbiAgICAgIHRoaXMuZ2V0QWRkcmVzcygpO1xyXG4gICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ2VycicsIGVycik7XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgLy8g5a+86IiqXHJcbiAgZ2V0QWRkcmVzcygpIHtcclxuICAgIGxldCBhZGRyZXNzT2JqID0gdGhpcy5kYXRhLmFkZHJlc3NEYXRhO1xyXG4gICAgd3guZ2V0TG9jYXRpb24oe1xyXG4gICAgICAvLyB0eXBlOiAnZ2NqMDInLCAvL+i/lOWbnuWPr+S7peeUqOS6jnd4Lm9wZW5Mb2NhdGlvbueahOe7j+e6rOW6pndnczg0XHJcbiAgICAgIHR5cGU6ICd3Z3M4NCcsIC8v6L+U5Zue5Y+v5Lul55So5LqOd3gub3BlbkxvY2F0aW9u55qE57uP57qs5bqmd2dzODRcclxuICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZHJlc3NPYmonLGFkZHJlc3NPYmopXHJcbiAgICAgICAgY29uc3QgbGF0aXR1ZGUgPSBhZGRyZXNzT2JqLmxhdCA/IGFkZHJlc3NPYmoubGF0IDogcmVzLmxhdGl0dWRlXHJcbiAgICAgICAgY29uc3QgbG9uZ2l0dWRlID0gYWRkcmVzc09iai5sbmcgPyBhZGRyZXNzT2JqLmxuZyA6IHJlcy5sb25naXR1ZGVcclxuICAgICAgICB3eC5vcGVuTG9jYXRpb24oe1xyXG4gICAgICAgICAgbGF0aXR1ZGUsXHJcbiAgICAgICAgICBsb25naXR1ZGUsXHJcbiAgICAgICAgICBzY2FsZTogMThcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgfSlcclxuICB9LFxyXG4gIC8vIGludGVydmFsQ2hhbmdlKGUpIHtcclxuICAvLyAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgLy8gICAgIGludGVydmFsOiBlLmRldGFpbC52YWx1ZVxyXG4gIC8vICAgfSlcclxuICAvLyB9LFxyXG4gIC8vIGR1cmF0aW9uQ2hhbmdlKGUpIHtcclxuICAvLyAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgLy8gICAgIGR1cmF0aW9uOiBlLmRldGFpbC52YWx1ZVxyXG4gIC8vICAgfSlcclxuICAvLyB9XHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cclxuICAgKi9cclxuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb246YW55KSB7XHJcbiAgICBsZXQgcHJvZHVjdElkID0gb3B0aW9uLnN1YmRpc3RyaWN0X2lkO1xyXG4gICAgY29uc29sZS5sb2cocHJvZHVjdElkKTtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGlkOnByb2R1Y3RJZFxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxyXG4gICAqL1xyXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2V0RGF0YU9ianQoKTtcclxuICAgIGNvbnNvbGUubG9nKCcxMjM0NScsIHRoaXMuZGF0YS5kYXRhT2JqKVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XHJcbiAgICovXHJcbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xyXG4gICAqL1xyXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxyXG4gICAqL1xyXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICovXHJcbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXHJcbiAgICovXHJcbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcclxuICAgKi9cclxufSkiXX0=