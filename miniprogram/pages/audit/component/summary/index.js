"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../../../service/net.service");
Component({
    data: {
        typeString: '',
        sub: '',
        species: [],
        speciesKeys: [],
        speciesAll: {
            community: ['居委', '社区', '新增问题', '累计问题', '整改率'],
            street: ['居委', '新增问题', '累计问题', '整改率'],
            unit: ['单位', '新增问题', '累计问题', '整改率'],
            village: ['村委', '行政村', '新增问题', '累计问题', '整改率']
        },
        speciesKeysAll: {
            community: ['committee_name', 'subdistrict_name', 'today_total', 'total', 'total_persent'],
            street: ['subdistrict_name', 'today_total', 'total', 'total_persent'],
            unit: ['dw_name', 'today_total', 'total', 'total_persent'],
            village: ['committee_name', 'subdistrict_name', 'today_total', 'total', 'total_persent'],
        },
        list: [],
        page: 1,
        size: 10,
        totalpage: 0
    },
    properties: {
        type: {
            type: String,
            value: 'community'
        },
    },
    methods: {
        scrollevent(e) {
            if (this.data.page < this.data.totalpage) {
                let page = this.data.page;
                this.setData({
                    page: ++page
                });
                this.getSummary();
            }
        },
        getSummary() {
            net_service_1.default.getSummary(this.data.type, this.data.page, this.data.size).then((res) => {
                this.setData({
                    list: [...this.data.list, ...res.data.result],
                    totalpage: Math.ceil(res.data.params.total / res.data.params.pageSize)
                });
            });
        },
        init() {
            this.setData({
                sub: net_service_1.default.getDate() + ' ' + '截止'
            });
            let str = '';
            switch (this.data.type) {
                case "community":
                    str = '居委';
                    break;
                case "street":
                    str = '街道';
                    break;
                case "unit":
                    str = '单位';
                    break;
                case "village":
                    str = '行政村';
                    break;
                default:
                    break;
            }
            this.setData({
                species: this.data.speciesAll[this.data.type],
                speciesKeys: this.data.speciesKeysAll[this.data.type],
                typeString: str
            });
            this.getSummary();
        }
    },
    attached() {
        this.init();
    },
    detached() { },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlFQUFpRDtBQUtqRCxTQUFTLENBQUM7SUFDUixJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUUsRUFBRTtRQUNkLEdBQUcsRUFBRSxFQUFFO1FBQ1AsT0FBTyxFQUFPLEVBQUU7UUFDaEIsV0FBVyxFQUFPLEVBQUU7UUFDcEIsVUFBVSxFQUFPO1lBQ2YsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUM5QyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDckMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO1lBQ25DLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7U0FDOUM7UUFDRCxjQUFjLEVBQU87WUFDbkIsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUM7WUFDMUYsTUFBTSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUM7WUFDckUsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDO1lBQzFELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDO1NBQ3pGO1FBQ0QsSUFBSSxFQUFFLEVBQUU7UUFDUixJQUFJLEVBQUUsQ0FBQztRQUNQLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLENBQUM7S0FDYjtJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBUTtZQUNWLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLFdBQVc7U0FDbkI7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLFdBQVcsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsSUFBSSxFQUFFLEVBQUUsSUFBSTtpQkFDYixDQUFDLENBQUE7Z0JBQ0YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO2FBQ2xCO1FBQ0gsQ0FBQztRQUNELFVBQVU7WUFDUixxQkFBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUMvRSxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLElBQUksRUFBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDbEQsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztpQkFDdkUsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsSUFBSTtZQUVGLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsR0FBRyxFQUFFLHFCQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUk7YUFDaEMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1lBQ1osUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDdEIsS0FBSyxXQUFXO29CQUNkLEdBQUcsR0FBRyxJQUFJLENBQUE7b0JBQ1YsTUFBTTtnQkFDUixLQUFLLFFBQVE7b0JBQ1gsR0FBRyxHQUFHLElBQUksQ0FBQTtvQkFDVixNQUFNO2dCQUNSLEtBQUssTUFBTTtvQkFDVCxHQUFHLEdBQUcsSUFBSSxDQUFBO29CQUNWLE1BQU07Z0JBQ1IsS0FBSyxTQUFTO29CQUNaLEdBQUcsR0FBRyxLQUFLLENBQUE7b0JBQ1gsTUFBTTtnQkFDUjtvQkFDRSxNQUFNO2FBQ1Q7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDN0MsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyRCxVQUFVLEVBQUMsR0FBRzthQUNmLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNuQixDQUFDO0tBQ0Y7SUFDRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUNELFFBQVEsS0FBSyxDQUFDO0NBQ2YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlL25ldC5zZXJ2aWNlJ1xyXG50eXBlIHR5cGUgPSB7XHJcbiAgdHlwZTogU3RyaW5nQ29uc3RydWN0b3IsXHJcbiAgdmFsdWU6IFwiY29tbXVuaXR5XCIgfCBcInN0cmVldFwiIHwgXCJ1bml0XCIgfCBcInZpbGxhZ2VcIlxyXG59XHJcbkNvbXBvbmVudCh7XHJcbiAgZGF0YToge1xyXG4gICAgdHlwZVN0cmluZzogJycsXHJcbiAgICBzdWI6ICcnLFxyXG4gICAgc3BlY2llczogPGFueT5bXSxcclxuICAgIHNwZWNpZXNLZXlzOiA8YW55PltdLFxyXG4gICAgc3BlY2llc0FsbDogPGFueT57XHJcbiAgICAgIGNvbW11bml0eTogWyflsYXlp5QnLCAn56S+5Yy6JywgJ+aWsOWinumXrumimCcsICfntK/orqHpl67popgnLCAn5pW05pS5546HJ10sXHJcbiAgICAgIHN0cmVldDogWyflsYXlp5QnLCAn5paw5aKe6Zeu6aKYJywgJ+e0r+iuoemXrumimCcsICfmlbTmlLnnjocnXSxcclxuICAgICAgdW5pdDogWyfljZXkvY0nLCAn5paw5aKe6Zeu6aKYJywgJ+e0r+iuoemXrumimCcsICfmlbTmlLnnjocnXSxcclxuICAgICAgdmlsbGFnZTogWyfmnZHlp5QnLCAn6KGM5pS/5p2RJywgJ+aWsOWinumXrumimCcsICfntK/orqHpl67popgnLCAn5pW05pS5546HJ11cclxuICAgIH0sXHJcbiAgICBzcGVjaWVzS2V5c0FsbDogPGFueT57XHJcbiAgICAgIGNvbW11bml0eTogWydjb21taXR0ZWVfbmFtZScsICdzdWJkaXN0cmljdF9uYW1lJywgJ3RvZGF5X3RvdGFsJywgJ3RvdGFsJywgJ3RvdGFsX3BlcnNlbnQnXSxcclxuICAgICAgc3RyZWV0OiBbJ3N1YmRpc3RyaWN0X25hbWUnLCAndG9kYXlfdG90YWwnLCAndG90YWwnLCAndG90YWxfcGVyc2VudCddLFxyXG4gICAgICB1bml0OiBbJ2R3X25hbWUnLCAndG9kYXlfdG90YWwnLCAndG90YWwnLCAndG90YWxfcGVyc2VudCddLFxyXG4gICAgICB2aWxsYWdlOiBbJ2NvbW1pdHRlZV9uYW1lJywgJ3N1YmRpc3RyaWN0X25hbWUnLCAndG9kYXlfdG90YWwnLCAndG90YWwnLCAndG90YWxfcGVyc2VudCddLFxyXG4gICAgfSxcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgcGFnZTogMSxcclxuICAgIHNpemU6IDEwLFxyXG4gICAgdG90YWxwYWdlOiAwXHJcbiAgfSxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICB0eXBlOiA8dHlwZT57XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdmFsdWU6ICdjb21tdW5pdHknXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgc2Nyb2xsZXZlbnQoZSkge1xyXG4gICAgICBpZiAodGhpcy5kYXRhLnBhZ2UgPCB0aGlzLmRhdGEudG90YWxwYWdlKSB7XHJcbiAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLmRhdGEucGFnZVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBwYWdlOiArK3BhZ2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuZ2V0U3VtbWFyeSgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRTdW1tYXJ5KCkge1xyXG4gICAgICBhcGkuZ2V0U3VtbWFyeSh0aGlzLmRhdGEudHlwZSwgdGhpcy5kYXRhLnBhZ2UsIHRoaXMuZGF0YS5zaXplKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBsaXN0OiA8YW55PlsuLi50aGlzLmRhdGEubGlzdCwgLi4ucmVzLmRhdGEucmVzdWx0XSxcclxuICAgICAgICAgIHRvdGFscGFnZTogTWF0aC5jZWlsKHJlcy5kYXRhLnBhcmFtcy50b3RhbCAvIHJlcy5kYXRhLnBhcmFtcy5wYWdlU2l6ZSlcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGluaXQoKSB7XHJcbiAgICAgIC8vIOiuvuWumuaXtumXtCBcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBzdWI6IGFwaS5nZXREYXRlKCkgKyAnICcgKyAn5oiq5q2iJ1xyXG4gICAgICB9KVxyXG4gICAgICBsZXQgc3RyID0gJydcclxuICAgICAgc3dpdGNoICh0aGlzLmRhdGEudHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJjb21tdW5pdHlcIjpcclxuICAgICAgICAgIHN0ciA9ICflsYXlp5QnXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwic3RyZWV0XCI6XHJcbiAgICAgICAgICBzdHIgPSAn6KGX6YGTJ1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInVuaXRcIjpcclxuICAgICAgICAgIHN0ciA9ICfljZXkvY0nXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwidmlsbGFnZVwiOlxyXG4gICAgICAgICAgc3RyID0gJ+ihjOaUv+adkSdcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIHNwZWNpZXM6IHRoaXMuZGF0YS5zcGVjaWVzQWxsW3RoaXMuZGF0YS50eXBlXSxcclxuICAgICAgICBzcGVjaWVzS2V5czogdGhpcy5kYXRhLnNwZWNpZXNLZXlzQWxsW3RoaXMuZGF0YS50eXBlXSxcclxuICAgICAgICB0eXBlU3RyaW5nOnN0clxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmdldFN1bW1hcnkoKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXR0YWNoZWQoKSB7XHJcbiAgICB0aGlzLmluaXQoKVxyXG4gIH0sXHJcbiAgZGV0YWNoZWQoKSB7IH0sXHJcbn0pIl19