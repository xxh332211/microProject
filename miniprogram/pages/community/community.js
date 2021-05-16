"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../service/net.service");
Page({
    data: {
        mainData: [],
        pagenum: 1,
        current: 'community',
        user: {}
    },
    tap(e) {
        this.setData({
            current: e.currentTarget.dataset.type
        });
        this.getMainData();
        console.log('tap');
    },
    go(e) {
        wx.navigateTo({ url: e.currentTarget.dataset.url });
    },
    getMainData() {
        let data = {
            type: 'community',
            page: this.data.pagenum,
            pageSize: 10
        };
        net_service_1.default.getCommunityList(data).then((res) => {
            console.log(res);
            var arr1 = this.data.mainData;
            var arr2 = res.data.result;
            arr1 = arr1.concat(arr2);
            this.setData({
                mainData: arr1
            });
        });
    },
    onShow() {
        console.log("onshow");
    },
    onLoad() {
        this.getMainData();
    },
    onReachBottom: function () {
        var that = this;
        var pagenum = that.data.pagenum + 1;
        console.log(that.data.pagenum, 'onReachBottom');
        this.setData({
            pagenum: pagenum,
        });
        this.getMainData();
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbXVuaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQTRDO0FBRzVDLElBQUksQ0FBQztJQUlILElBQUksRUFBRTtRQUNKLFFBQVEsRUFBTSxFQUFFO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO1FBRVYsT0FBTyxFQUFZLFdBQVc7UUFDOUIsSUFBSSxFQUFNLEVBQUU7S0FDYjtJQUNELEdBQUcsQ0FBRSxDQUFLO1FBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLE9BQU8sRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1NBQ3RDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBSztRQUVOLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksSUFBSSxHQUFHO1lBQ1QsSUFBSSxFQUFZLFdBQVc7WUFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUN2QixRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUE7UUFDRCxxQkFBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQU8sRUFBQyxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDOUIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDM0IsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUlELE1BQU07UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFJRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLElBQUksR0FBQyxJQUFJLENBQUM7UUFDZCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Q0FFRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpIGZyb20gJy4uLy4uL3NlcnZpY2UvbmV0LnNlcnZpY2UnO1xyXG5pbXBvcnQge21haW5UeXBlfSBmcm9tICcuLi8uLi9zZXJ2aWNlL25ldC5zZXJ2aWNlJztcclxuXHJcblBhZ2Uoe1xyXG4gIC8qKlxyXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxyXG4gICAqL1xyXG4gIGRhdGE6IHtcclxuICAgIG1haW5EYXRhOjxhbnk+W10sXHJcbiAgICBwYWdlbnVtOiAxLFxyXG4gICAgLy8gc3ViZGlzdHJpY3RfaWQ6IDAsXHJcbiAgICBjdXJyZW50OiA8bWFpblR5cGU+J2NvbW11bml0eScsXHJcbiAgICB1c2VyOjxhbnk+e31cclxuICB9LFxyXG4gIHRhcCAoZTphbnkpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGN1cnJlbnQ6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnR5cGVcclxuICAgIH0pXHJcbiAgICB0aGlzLmdldE1haW5EYXRhKCk7XHJcbiAgICBjb25zb2xlLmxvZygndGFwJyk7XHJcbiAgfSxcclxuICBnbyhlOmFueSl7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmwpXHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHt1cmw6ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsfSlcclxuICB9LFxyXG4gIGdldE1haW5EYXRhKCkge1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgIHR5cGU6PG1haW5UeXBlPiAnY29tbXVuaXR5JyxcclxuICAgICAgcGFnZTogdGhpcy5kYXRhLnBhZ2VudW0sXHJcbiAgICAgIHBhZ2VTaXplOiAxMFxyXG4gICAgfVxyXG4gICAgYXBpLmdldENvbW11bml0eUxpc3QoZGF0YSkudGhlbigocmVzOmFueSk9PntcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgdmFyIGFycjEgPSB0aGlzLmRhdGEubWFpbkRhdGE7IC8v5LuOZGF0YeiOt+WPluW9k+WJjWRhdGFsaXN05pWw57uEXHJcbiAgICAgIHZhciBhcnIyID0gcmVzLmRhdGEucmVzdWx0OyAvL+S7juatpOasoeivt+axgui/lOWbnueahOaVsOaNruS4reiOt+WPluaWsOaVsOe7hFxyXG4gICAgICBhcnIxID0gYXJyMS5jb25jYXQoYXJyMik7IC8v5ZCI5bm25pWw57uEXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbWFpbkRhdGE6IGFycjEgLy/lkIjlubblkI7mm7TmlrBkYXRhbGlzdFxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9LFxyXG4gICAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcclxuICAgKi9cclxuICBvblNob3coKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9uc2hvd1wiKTtcclxuICB9LFxyXG4gICAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cclxuICAgKi9cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLmdldE1haW5EYXRhKClcclxuICB9LFxyXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHsgLy/op6blupXlvIDlp4vkuIvkuIDpobVcclxuICAgIHZhciB0aGF0PXRoaXM7XHJcbiAgICB2YXIgcGFnZW51bSA9IHRoYXQuZGF0YS5wYWdlbnVtICsgMTsgLy/ojrflj5blvZPliY3pobXmlbDlubYrMVxyXG4gICAgY29uc29sZS5sb2codGhhdC5kYXRhLnBhZ2VudW0sICdvblJlYWNoQm90dG9tJyk7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBwYWdlbnVtOiBwYWdlbnVtLCAvL+abtOaWsOW9k+WJjemhteaVsFxyXG4gICAgfSlcclxuICAgIHRoaXMuZ2V0TWFpbkRhdGEoKTsvL+mHjeaWsOiwg+eUqOivt+axguiOt+WPluS4i+S4gOmhteaVsOaNrlxyXG4gIH0sXHJcblxyXG59KSJdfQ==