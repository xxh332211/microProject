"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../../service/net.service");
Page({
    data: {
        patrolType: 'new',
        record: {
            type: 'community',
            committee_id: 0,
            subdistrict_id: 0
        },
        totalPoint: 0,
        committee: [],
        community: [],
        penalties: [],
        position: '闵行区 梅陇镇',
        keyword: '',
        showSearchList: false,
        searchList: [],
        s_committee: {
            address: "",
            committee_id: "0",
            contacts: "    ",
            contacts_mobile: "     ",
            create_time: "",
            del_flag: "1",
            name: "请选择居委",
            type: "1",
        },
        s_community: {
            committee_id: "",
            name: "请选择小区",
            subdistrict_id: ""
        },
    },
    selectSearch(e) {
        let selected = e.currentTarget.dataset.item;
        console.log(selected);
        net_service_1.default.getCommitte([selected.committee_id]).then((res) => {
            this.setData({
                s_community: selected,
                s_committee: res.data.result[0],
                showSearchList: false,
                searchList: [],
                keyword: ''
            });
            this.getPenalties();
        });
    },
    beginSearch() {
        this.setData({
            showSearchList: true,
        });
        console.log(this.data.searchList);
    },
    cancleSearch() {
        this.setData({
            showSearchList: false,
            searchList: []
        });
    },
    search(e) {
        console.log(e);
        net_service_1.default.searchComunity(e.detail.value).then((res) => {
            console.log(res);
            this.setData({
                searchList: res.data.result
            });
        });
    },
    getPenalties() {
        net_service_1.default.getComunityPenalties(this.data.s_community.subdistrict_id).then((res) => {
            this.setData({
                penalties: res.data.result
            });
            this.calPoint();
        });
    },
    selectCommunity(e) {
        if (this.data.community.length < 1 || this.data.patrolType === 'record') {
            return;
        }
        const index = e.detail.value;
        this.setData({
            s_community: this.data.community[index]
        });
        this.getPenalties();
    },
    selectComunitee(e) {
        if (this.data.patrolType === 'record') {
            return;
        }
        const index = e.detail.value;
        this.setData({
            s_committee: this.data.committee[index],
            s_community: {
                committee_id: "",
                name: "请选择小区",
                subdistrict_id: ""
            }
        });
        this.setData({
            s_community: { committee_id: '', name: '请选择小区', subdistrict_id: '' },
            penalties: []
        });
        net_service_1.default.getComunity([this.data.s_committee.committee_id]).then((res) => {
            this.setData({
                community: res.data.result
            });
            if (this.data.community.length < 2) {
                this.setData({
                    s_community: this.data.community[0]
                });
                this.getPenalties();
            }
        });
    },
    scoring(e) {
        net_service_1.default.saveCurrentPenalties({
            type: "community",
            committee: this.data.committee,
            community: this.data.community,
            s_committee: this.data.s_committee,
            s_community: this.data.s_community,
            penalties: this.data.penalties
        }).then((res) => {
            if (res) {
                wx.setStorageSync('scoring_index', e.currentTarget.dataset.index);
                wx.navigateTo({ url: '/pages/patrol/community/scroring/scroring' });
            }
        });
    },
    remakeData() {
        let data = this.data.penalties;
        let newData = {
            point: this.data.totalPoint,
            subdistrict_id: this.data.s_community.subdistrict_id,
            content: []
        };
        data.forEach((element_1) => {
            let data_1 = {
                id: element_1.id,
                deduct_points: element_1.deduct_points,
                desc: element_1.desc,
                image_url: element_1.image_url,
                detail: []
            };
            element_1.detail.forEach((element_2) => {
                let data_2 = {
                    id: element_2.id,
                    deduct_points: element_2.deduct_points,
                    desc: element_2.desc,
                    image_url: element_2.image_url,
                    detail: []
                };
                element_2.detail.forEach((element_3) => {
                    let data_3 = {
                        id: element_3.id,
                        deduct_points: element_3.deduct_points,
                        desc: element_3.desc,
                        image_url: element_3.image_url,
                    };
                    data_2.detail.push(data_3);
                });
                data_1.detail.push(data_2);
            });
            newData.content.push(data_1);
        });
        return newData;
    },
    upDecut(e) {
        let _data = this.remakeData();
        net_service_1.default.upDecutComunity(_data).then((res) => {
            if (res.data.code === 200) {
                wx.showToast({
                    title: '提交打分成功',
                    icon: 'success',
                    duration: 2000
                }).then((res) => {
                    setTimeout(() => { wx.navigateBack(); }, 2000);
                });
            }
        });
    },
    calPoint() {
        if (this.data.penalties.length < 1) {
            return;
        }
        let total = 0;
        let dedcut = 0;
        this.data.penalties.forEach((ele) => {
            total = ele.point / 1 + total;
            dedcut = ele.deduct_points / 1 + dedcut;
        });
        total = total - dedcut;
        this.setData({
            totalPoint: total
        });
    },
    newPatrolInit() {
        net_service_1.default.getCurrentPenalties('community').then((res) => {
            if (res) {
                this.setData(res);
                this.calPoint();
            }
            else {
                net_service_1.default.getCommitte().then((res) => {
                    this.setData({
                        committee: res.data.result
                    });
                });
            }
        });
    },
    historyInit() {
        this.setData({
            record: wx.getStorageSync('recordData')
        });
        net_service_1.default.getCurrentPenalties('community').then((res) => {
            if (res) {
                this.setData(res);
                this.calPoint();
            }
            else {
                net_service_1.default.getCommitte([this.data.record.committee_id]).then((res) => {
                    this.setData({
                        s_committee: res.data.result[0]
                    });
                });
                net_service_1.default.getComunity([this.data.record.committee_id + ''], this.data.record.subdistrict_id).then((res) => {
                    this.setData({
                        s_community: res.data.result[0]
                    });
                    this.getPenalties();
                });
            }
        });
    },
    onLoad() {
    },
    onReady() {
    },
    onShow() {
        this.setData({
            patrolType: wx.getStorageSync('patrolType')
        });
        if (this.data.patrolType === "new") {
            this.newPatrolInit();
        }
        else {
            this.historyInit();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbXVuaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOERBQ0M7QUFDRCxJQUFJLENBQUM7SUFJSCxJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUMsS0FBSztRQUNoQixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsV0FBVztZQUNqQixZQUFZLEVBQUMsQ0FBQztZQUNkLGNBQWMsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsVUFBVSxFQUFDLENBQUM7UUFDWixTQUFTLEVBQU0sRUFBRTtRQUNqQixTQUFTLEVBQU0sRUFBRTtRQUNqQixTQUFTLEVBQU0sRUFBRTtRQUNqQixRQUFRLEVBQUMsU0FBUztRQUNsQixPQUFPLEVBQUMsRUFBRTtRQUNWLGNBQWMsRUFBQyxLQUFLO1FBQ3BCLFVBQVUsRUFBTSxFQUFFO1FBQ2xCLFdBQVcsRUFBQztZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsWUFBWSxFQUFFLEdBQUc7WUFDakIsUUFBUSxFQUFFLE1BQU07WUFDaEIsZUFBZSxFQUFFLE9BQU87WUFDeEIsV0FBVyxFQUFFLEVBQUU7WUFDZixRQUFRLEVBQUUsR0FBRztZQUNiLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLEdBQUc7U0FDVjtRQUNELFdBQVcsRUFBQztZQUNWLFlBQVksRUFBRSxFQUFFO1lBQ2hCLElBQUksRUFBRSxPQUFPO1lBQ2IsY0FBYyxFQUFFLEVBQUU7U0FDbkI7S0FDRjtJQUNELFlBQVksQ0FBRSxDQUFLO1FBQ2pCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3JCLHFCQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBTyxFQUFDLEVBQUU7WUFD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RUgsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1NBQ25CO0lBQ0gsQ0FBQztJQUtELE1BQU07SUFFTixDQUFDO0lBS0QsUUFBUTtJQUVSLENBQUM7SUFLRCxpQkFBaUI7SUFFakIsQ0FBQztJQUtELGFBQWE7SUFFYixDQUFDO0lBS0QsaUJBQWlCLENBQUMsSUFBUTtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN4QixPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpIGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvbmV0LnNlcnZpY2UnXHJcbjtcclxuUGFnZSh7XHJcbiAgLyoqXHJcbiAgICog6aG16Z2i55qE5Yid5aeL5pWwXHJcbiAgICovXHJcbiAgZGF0YToge1xyXG4gICAgcGF0cm9sVHlwZTonbmV3JyxcclxuICAgIHJlY29yZDoge1xyXG4gICAgICB0eXBlOiAnY29tbXVuaXR5JyxcclxuICAgICAgY29tbWl0dGVlX2lkOjAsXHJcbiAgICAgIHN1YmRpc3RyaWN0X2lkOiAwXHJcbiAgICB9LFxyXG4gICAgdG90YWxQb2ludDowLFxyXG4gICAgY29tbWl0dGVlOjxhbnk+W10sLy/lsYXlp5TliJfooahcclxuICAgIGNvbW11bml0eTo8YW55PltdLC8v5bCP5Yy65YiX6KGoXHJcbiAgICBwZW5hbHRpZXM6PGFueT5bXSwvL+aJo+WIhumhueebrlxyXG4gICAgcG9zaXRpb246J+mXteihjOWMuiDmooXpmYfplYcnLFxyXG4gICAga2V5d29yZDonJyxcclxuICAgIHNob3dTZWFyY2hMaXN0OmZhbHNlLFxyXG4gICAgc2VhcmNoTGlzdDo8YW55PltdLFxyXG4gICAgc19jb21taXR0ZWU6e1xyXG4gICAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgICBjb21taXR0ZWVfaWQ6IFwiMFwiLFxyXG4gICAgICBjb250YWN0czogXCIgICAgXCIsXHJcbiAgICAgIGNvbnRhY3RzX21vYmlsZTogXCIgICAgIFwiLFxyXG4gICAgICBjcmVhdGVfdGltZTogXCJcIixcclxuICAgICAgZGVsX2ZsYWc6IFwiMVwiLFxyXG4gICAgICBuYW1lOiBcIuivt+mAieaLqeWxheWnlFwiLFxyXG4gICAgICB0eXBlOiBcIjFcIixcclxuICAgIH0sLy/pgInkuK3lsYXlp5RcclxuICAgIHNfY29tbXVuaXR5OntcclxuICAgICAgY29tbWl0dGVlX2lkOiBcIlwiLFxyXG4gICAgICBuYW1lOiBcIuivt+mAieaLqeWwj+WMulwiLFxyXG4gICAgICBzdWJkaXN0cmljdF9pZDogXCJcIlxyXG4gICAgfSwvL+mAieS4reWwj+WMulxyXG4gIH0sXHJcbiAgc2VsZWN0U2VhcmNoIChlOmFueSkge1xyXG4gICAgbGV0IHNlbGVjdGVkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxyXG4gICAgY29uc29sZS5sb2coc2VsZWN0ZWQpXHJcbiAgICBhcGkuZ2V0Q29tbWl0dGUoW3NlbGVjdGVkLmNvbW1pdHRlZV9pZF0pLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgc19jb21tdW5pdHk6c2VsZWN0ZWQsXHJcbiAgICAgICAgc19jb21taXR0ZWU6cmVzLmRhdGEucmVzdWx0WzBdLFxyXG4gICAgICAgIHNob3dTZWFyY2hMaXN0OmZhbHNlLFxyXG4gICAgICAgIHNlYXJjaExpc3Q6W10sXHJcbiAgICAgICAga2V5d29yZDonJ1xyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmdldFBlbmFsdGllcygpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgYmVnaW5TZWFyY2ggKCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgc2hvd1NlYXJjaExpc3Q6dHJ1ZSxcclxuICAgIH0pXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEuc2VhcmNoTGlzdClcclxuICB9LFxyXG4gIGNhbmNsZVNlYXJjaCAoKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBzaG93U2VhcmNoTGlzdDpmYWxzZSxcclxuICAgICAgc2VhcmNoTGlzdDpbXVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHNlYXJjaCAoZTphbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgYXBpLnNlYXJjaENvbXVuaXR5KGUuZGV0YWlsLnZhbHVlKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgc2VhcmNoTGlzdDpyZXMuZGF0YS5yZXN1bHRcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSxcclxuICBnZXRQZW5hbHRpZXMgKCkge1xyXG4gICAgYXBpLmdldENvbXVuaXR5UGVuYWx0aWVzKHRoaXMuZGF0YS5zX2NvbW11bml0eS5zdWJkaXN0cmljdF9pZCkudGhlbigocmVzOmFueSk9PntcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBwZW5hbHRpZXM6cmVzLmRhdGEucmVzdWx0XHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuY2FsUG9pbnQoKTtcclxuICAgIH0pXHJcbiAgfSxcclxuICBzZWxlY3RDb21tdW5pdHkgKGU6YW55KSB7XHJcbiAgICBpZiAodGhpcy5kYXRhLmNvbW11bml0eS5sZW5ndGg8MXx8dGhpcy5kYXRhLnBhdHJvbFR5cGUgPT09ICdyZWNvcmQnKXtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBpbmRleCA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgc19jb21tdW5pdHk6dGhpcy5kYXRhLmNvbW11bml0eVtpbmRleF1cclxuICAgIH0pXHJcbiAgICB0aGlzLmdldFBlbmFsdGllcygpO1xyXG4gIH0sXHJcbiAgc2VsZWN0Q29tdW5pdGVlIChlOmFueSkge1xyXG4gICAgaWYgKHRoaXMuZGF0YS5wYXRyb2xUeXBlID09PSAncmVjb3JkJykge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IGluZGV4ID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBzX2NvbW1pdHRlZTp0aGlzLmRhdGEuY29tbWl0dGVlW2luZGV4XSxcclxuICAgICAgc19jb21tdW5pdHk6e1xyXG4gICAgICAgIGNvbW1pdHRlZV9pZDogXCJcIixcclxuICAgICAgICBuYW1lOiBcIuivt+mAieaLqeWwj+WMulwiLFxyXG4gICAgICAgIHN1YmRpc3RyaWN0X2lkOiBcIlwiXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBzX2NvbW11bml0eTp7Y29tbWl0dGVlX2lkOicnLG5hbWU6J+ivt+mAieaLqeWwj+WMuicsc3ViZGlzdHJpY3RfaWQ6Jyd9LFxyXG4gICAgICBwZW5hbHRpZXM6W11cclxuICAgIH0pXHJcbiAgICBhcGkuZ2V0Q29tdW5pdHkoW3RoaXMuZGF0YS5zX2NvbW1pdHRlZS5jb21taXR0ZWVfaWRdKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGNvbW11bml0eTpyZXMuZGF0YS5yZXN1bHRcclxuICAgICAgfSlcclxuICAgICAgaWYgKHRoaXMuZGF0YS5jb21tdW5pdHkubGVuZ3RoPDIpe1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBzX2NvbW11bml0eTp0aGlzLmRhdGEuY29tbXVuaXR5WzBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmdldFBlbmFsdGllcygpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc2NvcmluZyAoZTphbnkpIHtcclxuICAgIGFwaS5zYXZlQ3VycmVudFBlbmFsdGllcyh7XHJcbiAgICAgIHR5cGU6XCJjb21tdW5pdHlcIixcclxuICAgICAgY29tbWl0dGVlOnRoaXMuZGF0YS5jb21taXR0ZWUsXHJcbiAgICAgIGNvbW11bml0eTp0aGlzLmRhdGEuY29tbXVuaXR5LFxyXG4gICAgICBzX2NvbW1pdHRlZTp0aGlzLmRhdGEuc19jb21taXR0ZWUsXHJcbiAgICAgIHNfY29tbXVuaXR5OnRoaXMuZGF0YS5zX2NvbW11bml0eSxcclxuICAgICAgcGVuYWx0aWVzOnRoaXMuZGF0YS5wZW5hbHRpZXNcclxuICAgIH0pLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc2NvcmluZ19pbmRleCcsZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgpXHJcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7dXJsOicvcGFnZXMvcGF0cm9sL2NvbW11bml0eS9zY3JvcmluZy9zY3JvcmluZyd9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgfSxcclxuICByZW1ha2VEYXRhICgpIHtcclxuICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLnBlbmFsdGllc1xyXG4gICAgbGV0IG5ld0RhdGEgPSB7XHJcbiAgICAgIHBvaW50OnRoaXMuZGF0YS50b3RhbFBvaW50LCBcclxuICAgICAgc3ViZGlzdHJpY3RfaWQ6dGhpcy5kYXRhLnNfY29tbXVuaXR5LnN1YmRpc3RyaWN0X2lkLFxyXG4gICAgICBjb250ZW50OiA8YW55PltdXHJcbiAgICB9XHJcbiAgICBkYXRhLmZvckVhY2goKGVsZW1lbnRfMTphbnkpID0+IHtcclxuICAgICAgbGV0IGRhdGFfMSA9IHtcclxuICAgICAgICBpZDplbGVtZW50XzEuaWQsXHJcbiAgICAgICAgZGVkdWN0X3BvaW50czplbGVtZW50XzEuZGVkdWN0X3BvaW50cyxcclxuICAgICAgICBkZXNjOmVsZW1lbnRfMS5kZXNjLFxyXG4gICAgICAgIGltYWdlX3VybDplbGVtZW50XzEuaW1hZ2VfdXJsLFxyXG4gICAgICAgIGRldGFpbDo8YW55PltdXHJcbiAgICAgIH1cclxuICAgICAgZWxlbWVudF8xLmRldGFpbC5mb3JFYWNoKChlbGVtZW50XzI6YW55KSA9PiB7XHJcbiAgICAgICAgbGV0IGRhdGFfMiA9IHtcclxuICAgICAgICAgIGlkOmVsZW1lbnRfMi5pZCxcclxuICAgICAgICAgIGRlZHVjdF9wb2ludHM6ZWxlbWVudF8yLmRlZHVjdF9wb2ludHMsXHJcbiAgICAgICAgICBkZXNjOmVsZW1lbnRfMi5kZXNjLFxyXG4gICAgICAgICAgaW1hZ2VfdXJsOmVsZW1lbnRfMi5pbWFnZV91cmwsXHJcbiAgICAgICAgICBkZXRhaWw6PGFueT5bXVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbGVtZW50XzIuZGV0YWlsLmZvckVhY2goKGVsZW1lbnRfMzphbnkpID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhXzMgPSB7XHJcbiAgICAgICAgICAgIGlkOmVsZW1lbnRfMy5pZCxcclxuICAgICAgICAgICAgZGVkdWN0X3BvaW50czplbGVtZW50XzMuZGVkdWN0X3BvaW50cyxcclxuICAgICAgICAgICAgZGVzYzplbGVtZW50XzMuZGVzYyxcclxuICAgICAgICAgICAgaW1hZ2VfdXJsOmVsZW1lbnRfMy5pbWFnZV91cmwsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkYXRhXzIuZGV0YWlsLnB1c2goZGF0YV8zKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkYXRhXzEuZGV0YWlsLnB1c2goZGF0YV8yKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG5ld0RhdGEuY29udGVudC5wdXNoKFxyXG4gICAgICAgIGRhdGFfMVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuZXdEYXRhXHJcbiAgfSxcclxuICB1cERlY3V0IChlOmFueSl7XHJcbiAgICBsZXQgX2RhdGEgPSB0aGlzLnJlbWFrZURhdGEoKVxyXG4gICAgYXBpLnVwRGVjdXRDb211bml0eShfZGF0YSkudGhlbigocmVzOmFueSk9PntcclxuICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTon5o+Q5Lqk5omT5YiG5oiQ5YqfJyxcclxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKT0+e3d4Lm5hdmlnYXRlQmFjaygpfSwyMDAwKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBcclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxyXG4gICAqL1xyXG4gIGNhbFBvaW50ICgpIHtcclxuICAgIGlmICh0aGlzLmRhdGEucGVuYWx0aWVzLmxlbmd0aDwxKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgbGV0IHRvdGFsID0gMFxyXG4gICAgbGV0IGRlZGN1dCA9IDBcclxuICAgIHRoaXMuZGF0YS5wZW5hbHRpZXMuZm9yRWFjaCgoZWxlOmFueSkgPT4ge1xyXG4gICAgICB0b3RhbCA9IGVsZS5wb2ludC8xK3RvdGFsXHJcbiAgICAgIGRlZGN1dCA9IGVsZS5kZWR1Y3RfcG9pbnRzLzErZGVkY3V0XHJcbiAgICB9KTtcclxuICAgIHRvdGFsID0gdG90YWwgLSBkZWRjdXRcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHRvdGFsUG9pbnQ6dG90YWxcclxuICAgIH0pXHJcbiAgfSxcclxuICBuZXdQYXRyb2xJbml0ICgpIHtcclxuICAgIGFwaS5nZXRDdXJyZW50UGVuYWx0aWVzKCdjb21tdW5pdHknKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHJlcyk7XHJcbiAgICAgICAgdGhpcy5jYWxQb2ludCgpO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICAvLyDmsqHmnInnvJPlrZjmlbDmja5cclxuICAgICAgICBhcGkuZ2V0Q29tbWl0dGUoKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgY29tbWl0dGVlOiAgcmVzLmRhdGEucmVzdWx0XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBoaXN0b3J5SW5pdCAoKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICByZWNvcmQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdyZWNvcmREYXRhJylcclxuICAgIH0pXHJcbiAgICBhcGkuZ2V0Q3VycmVudFBlbmFsdGllcygnY29tbXVuaXR5JykudGhlbigocmVzOmFueSk9PntcclxuICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YShyZXMpO1xyXG4gICAgICAgIHRoaXMuY2FsUG9pbnQoKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8g5rKh5pyJ57yT5a2Y5pWw5o2uXHJcbiAgICAgICAgYXBpLmdldENvbW1pdHRlKFt0aGlzLmRhdGEucmVjb3JkLmNvbW1pdHRlZV9pZF0pLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBzX2NvbW1pdHRlZTogIHJlcy5kYXRhLnJlc3VsdFswXVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGFwaS5nZXRDb211bml0eShbdGhpcy5kYXRhLnJlY29yZC5jb21taXR0ZWVfaWQrJyddLHRoaXMuZGF0YS5yZWNvcmQuc3ViZGlzdHJpY3RfaWQpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBzX2NvbW11bml0eTogIHJlcy5kYXRhLnJlc3VsdFswXVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHRoaXMuZ2V0UGVuYWx0aWVzKClcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgXHJcbiAgfSxcclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxyXG4gICAqL1xyXG4gIG9uUmVhZHkoKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxyXG4gICAqL1xyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHBhdHJvbFR5cGU6d3guZ2V0U3RvcmFnZVN5bmMoJ3BhdHJvbFR5cGUnKVxyXG4gICAgfSlcclxuICAgIGlmICh0aGlzLmRhdGEucGF0cm9sVHlwZT09PVwibmV3XCIpIHtcclxuICAgICAgdGhpcy5uZXdQYXRyb2xJbml0KClcclxuICAgIH1lbHNle1xyXG4gICAgICAvLyDku47kuKrkurrkuK3lv4PnrYnnm7TmjqXov5vlhaXmn6XnnIvnmoRcclxuICAgICAgdGhpcy5oaXN0b3J5SW5pdCgpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cclxuICAgKi9cclxuICBvbkhpZGUoKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxyXG4gICAqL1xyXG4gIG9uVW5sb2FkKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgKi9cclxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxyXG4gICAqL1xyXG4gIG9uUmVhY2hCb3R0b20oKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcclxuICAgKi9cclxuICBvblNoYXJlQXBwTWVzc2FnZShvcHRzOmFueSk6IFdlY2hhdE1pbmlwcm9ncmFtLlBhZ2UuSUN1c3RvbVNoYXJlQ29udGVudCB7XHJcbiAgICBjb25zb2xlLmxvZyhvcHRzLnRhcmdldClcclxuICAgIHJldHVybiB7fVxyXG4gIH1cclxufSkiXX0=