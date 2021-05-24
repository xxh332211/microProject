"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../../service/net.service");
Page({
    data: {
        current: 'all',
        loading: true,
        show: false,
        updata: {
            waste_dry: '',
            waste_wet: '',
            waste_recyclabl: '',
            waste_architecture: '',
            waste_harmful: '',
            departure_time: '选择日期',
            time: '选择时间'
        },
        dataObj: {
            waste_glass: '',
            waste_plastic: '',
            waste_wood: '',
            waste_paper: '',
            waste_electronic: '',
            waste_clothes: '',
            waste_metal: '',
            waste_other: '',
        }
    },
    tap(e) {
        this.setData({
            current: e.currentTarget.dataset.type
        });
    },
    inputform(e) {
        let key = e.currentTarget.dataset.key;
        let updata = this.data.updata;
        updata[key] = e.detail.currentKey || e.detail.value;
        this.setData({
            updata: updata
        });
    },
    inputform2(e) {
        let key = e.currentTarget.dataset.key;
        let dataObj = this.data.dataObj;
        dataObj[key] = e.detail.currentKey || e.detail.value;
        this.setData({
            dataObj: dataObj
        });
    },
    submit() {
        Object.assign(this.data.updata, this.data.dataObj);
        net_service_1.default.newAccount(this.data.updata).then(res => {
            console.log(res);
            this.setData({ show: true });
        });
    },
    onLoad() {
        wx.lin.initValidateForm(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4REFBK0M7QUFDL0MsSUFBSSxDQUFDO0lBSUgsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFnQixLQUFLO1FBQzVCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxNQUFNLEVBQU87WUFDWCxTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsZUFBZSxFQUFFLEVBQUU7WUFDbkIsa0JBQWtCLEVBQUUsRUFBRTtZQUN0QixhQUFhLEVBQUUsRUFBRTtZQUNqQixjQUFjLEVBQUUsTUFBTTtZQUN0QixJQUFJLEVBQUUsTUFBTTtTQUNiO1FBQ0QsT0FBTyxFQUFPO1lBQ1osV0FBVyxFQUFFLEVBQUU7WUFDZixhQUFhLEVBQUUsRUFBRTtZQUNqQixVQUFVLEVBQUUsRUFBRTtZQUNkLFdBQVcsRUFBRSxFQUFFO1lBQ2YsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixhQUFhLEVBQUUsRUFBRTtZQUNqQixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxFQUFFO1NBR2hCO0tBQ0Y7SUFDRCxHQUFHLENBQUUsQ0FBSztRQUNSLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxPQUFPLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSTtTQUN0QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsU0FBUyxDQUFDLENBQU07UUFDZCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDdEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO1FBQ25ELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQTtJQUVKLENBQUM7SUFDRCxVQUFVLENBQUMsQ0FBTTtRQUNmLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN0QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLE9BQU8sRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQTtJQUVKLENBQUM7SUFtQkQsTUFBTTtRQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUduRCxxQkFBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUEsRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQTtJQXVDSixDQUFDO0lBSUQsTUFBTTtRQUNKLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFJL0IsQ0FBQztJQUtELE9BQU87SUFFUCxDQUFDO0lBS0QsTUFBTTtJQUVOLENBQUM7SUFLRCxNQUFNO0lBRU4sQ0FBQztJQUtELFFBQVE7SUFFUixDQUFDO0lBS0QsaUJBQWlCO0lBRWpCLENBQUM7SUFLRCxhQUFhO0lBRWIsQ0FBQztJQUtELGlCQUFpQixDQUFDLElBQVM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDeEIsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlL25ldC5zZXJ2aWNlJztcclxuUGFnZSh7XHJcbiAgLyoqXHJcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXHJcbiAgICovXHJcbiAgZGF0YToge1xyXG4gICAgY3VycmVudDogPCdhbGwnfCdkb25lJz4nYWxsJyxcclxuICAgIGxvYWRpbmc6IHRydWUsXHJcbiAgICBzaG93OiBmYWxzZSxcclxuICAgIHVwZGF0YTogPGFueT57XHJcbiAgICAgIHdhc3RlX2RyeTogJycsXHJcbiAgICAgIHdhc3RlX3dldDogJycsXHJcbiAgICAgIHdhc3RlX3JlY3ljbGFibDogJycsXHJcbiAgICAgIHdhc3RlX2FyY2hpdGVjdHVyZTogJycsXHJcbiAgICAgIHdhc3RlX2hhcm1mdWw6ICcnLFxyXG4gICAgICBkZXBhcnR1cmVfdGltZTogJ+mAieaLqeaXpeacnycsXHJcbiAgICAgIHRpbWU6ICfpgInmi6nml7bpl7QnXHJcbiAgICB9LFxyXG4gICAgZGF0YU9iajogPGFueT57XHJcbiAgICAgIHdhc3RlX2dsYXNzOiAnJyxcclxuICAgICAgd2FzdGVfcGxhc3RpYzogJycsXHJcbiAgICAgIHdhc3RlX3dvb2Q6ICcnLFxyXG4gICAgICB3YXN0ZV9wYXBlcjogJycsXHJcbiAgICAgIHdhc3RlX2VsZWN0cm9uaWM6ICcnLFxyXG4gICAgICB3YXN0ZV9jbG90aGVzOiAnJyxcclxuICAgICAgd2FzdGVfbWV0YWw6ICcnLFxyXG4gICAgICB3YXN0ZV9vdGhlcjogJycsXHJcbiAgICAgIC8vIGRlcGFydHVyZV90aW1lOiAn6YCJ5oup5pel5pyfJyxcclxuICAgICAgLy8gdGltZTogJ+mAieaLqeaXtumXtCdcclxuICAgIH1cclxuICB9LFxyXG4gIHRhcCAoZTphbnkpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGN1cnJlbnQ6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnR5cGVcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaW5wdXRmb3JtKGU6IGFueSkge1xyXG4gICAgbGV0IGtleSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmtleTtcclxuICAgIGxldCB1cGRhdGEgPSB0aGlzLmRhdGEudXBkYXRhXHJcbiAgICB1cGRhdGFba2V5XSA9IGUuZGV0YWlsLmN1cnJlbnRLZXkgfHwgZS5kZXRhaWwudmFsdWVcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHVwZGF0YTogdXBkYXRhXHJcbiAgICB9KVxyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5kYXRhLnVwZGF0YSk7XHJcbiAgfSxcclxuICBpbnB1dGZvcm0yKGU6IGFueSkge1xyXG4gICAgbGV0IGtleSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmtleTtcclxuICAgIGxldCBkYXRhT2JqID0gdGhpcy5kYXRhLmRhdGFPYmpcclxuICAgIGRhdGFPYmpba2V5XSA9IGUuZGV0YWlsLmN1cnJlbnRLZXkgfHwgZS5kZXRhaWwudmFsdWVcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGRhdGFPYmo6IGRhdGFPYmpcclxuICAgIH0pXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmRhdGEuZGF0YU9iaik7XHJcbiAgfSxcclxuICAvLyBjaGVjaygpIHtcclxuICAvLyAgIGxldCBmbGFnID0gdHJ1ZVxyXG4gIC8vICAgT2JqZWN0LmtleXModGhpcy5kYXRhLnVwZGF0YSkuZm9yRWFjaCgoaykgPT4ge1xyXG4gIC8vICAgICBpZiAoIXRoaXMuZGF0YS51cGRhdGFba10pIHtcclxuICAvLyAgICAgICBmbGFnID0gZmFsc2VcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSlcclxuICAvLyAgIHJldHVybiBmbGFnXHJcbiAgLy8gfSxcclxuICAvLyBjaGVjazIoKSB7XHJcbiAgLy8gICBsZXQgZmxhZyA9IHRydWVcclxuICAvLyAgIE9iamVjdC5rZXlzKHRoaXMuZGF0YS5kYXRhT2JqKS5mb3JFYWNoKChrKSA9PiB7XHJcbiAgLy8gICAgIGlmICghdGhpcy5kYXRhLmRhdGFPYmpba10pIHtcclxuICAvLyAgICAgICBmbGFnID0gZmFsc2VcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSlcclxuICAvLyAgIHJldHVybiBmbGFnXHJcbiAgLy8gfSxcclxuICBzdWJtaXQoKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuZGF0YS51cGRhdGEsIHRoaXMuZGF0YS5kYXRhT2JqKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKCfmma7pgJonLCB0aGlzLmRhdGEudXBkYXRhKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKCfnsr7lh4YnLCB0aGlzLmRhdGEuZGF0YU9iaik7XHJcbiAgICBhcGkubmV3QWNjb3VudCh0aGlzLmRhdGEudXBkYXRhKS50aGVuKHJlcz0+e1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICB0aGlzLnNldERhdGEoeyBzaG93OnRydWUgfSk7XHJcbiAgICB9KVxyXG4gICAgLy8gcmV0dXJuXHJcbiAgICAvLyBpZih0aGlzLmRhdGEuY3VycmVudCA9PT0gXCJhbGxcIikge1xyXG4gICAgLy8gICAvLyBpZiAodGhpcy5jaGVjaygpKSB7XHJcbiAgICAvLyAgICAgLy8g55So5oi35bey5o6I5p2D5LiU6KGo5Y2V6aqM6K+B5oiQ5YqfXHJcbiAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLnVwZGF0YSk7XHJcbiAgICAvLyAgICAgLy8gcmV0dXJuO1xyXG4gICAgLy8gICAgIGFwaS5uZXdBY2NvdW50KHRoaXMuZGF0YS51cGRhdGEpLnRoZW4ocmVzPT57XHJcbiAgICAvLyAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAvLyAgICAgICAvLyB3eC5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgLy8gICAgICAgdGhpcy5zZXREYXRhKHsgc2hvdzp0cnVlIH0pXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vICAgICBjb25zb2xlLmxvZygn5ZOI5ZOI5ZOI5ZOIJylcclxuICAgIC8vICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgLy8gICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgLy8gICAvLyAgICAgdGl0bGU6ICfor7flrozlloTooajljZUnLFxyXG4gICAgLy8gICAvLyAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgLy8gICAvLyAgICAgZHVyYXRpb246IDIwMDBcclxuICAgIC8vICAgLy8gICB9KVxyXG4gICAgLy8gICAvLyB9XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICAvLyBpZiAodGhpcy5jaGVjazIoKSkge1xyXG4gICAgLy8gICAgIC8vIOeUqOaIt+W3suaOiOadg+S4lOihqOWNlemqjOivgeaIkOWKn1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5kYXRhT2JqKTtcclxuICAgIC8vICAgICAvLyByZXR1cm47XHJcbiAgICAvLyAgICAgYXBpLm5ld0FjY291bnQyKHRoaXMuZGF0YS5kYXRhT2JqKS50aGVuKHJlcz0+e1xyXG4gICAgLy8gICAgICAgLy8gY29uc29sZS5sb2cocmVzKVxyXG4gICAgLy8gICAgICAgLy8gd3gubmF2aWdhdGVCYWNrKClcclxuICAgIC8vICAgICAgIHRoaXMuc2V0RGF0YSh7IHNob3c6dHJ1ZSB9KVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ+WTiOWTiOWTiOWTiCcpXHJcbiAgICAvLyAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIC8vICAgd3guc2hvd1RvYXN0KHtcclxuICAgIC8vICAgLy8gICAgIHRpdGxlOiAn6K+35a6M5ZaE6KGo5Y2VJyxcclxuICAgIC8vICAgLy8gICAgIGljb246ICdub25lJyxcclxuICAgIC8vICAgLy8gICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAvLyAgIC8vICAgfSlcclxuICAgIC8vICAgLy8gfVxyXG4gICAgLy8gfVxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cclxuICAgKi9cclxuICBvbkxvYWQoKSB7XHJcbiAgICB3eC5saW4uaW5pdFZhbGlkYXRlRm9ybSh0aGlzKVxyXG4gICAgLy8gaWYgKGFwcC5nbG9iYWxEYXRhLnRva2VuKSB7XHJcbiAgICAvLyAgIHd4Lm5hdmlnYXRlVG8oe3VybDonL3BhZ2VzL21haW4vcGF0cm9sL2luZGV4L2luZGV4J30pO1xyXG4gICAgLy8gfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXHJcbiAgICovXHJcbiAgb25SZWFkeSgpIHtcclxuXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcclxuICAgKi9cclxuICBvblNob3coKSB7XHJcblxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXHJcbiAgICovXHJcbiAgb25IaWRlKCkge1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxyXG4gICAqL1xyXG4gIG9uVW5sb2FkKCkge1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAqL1xyXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcclxuICAgKi9cclxuICBvblJlYWNoQm90dG9tKCkge1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcclxuICAgKi9cclxuICBvblNoYXJlQXBwTWVzc2FnZShvcHRzOiBhbnkpOiBXZWNoYXRNaW5pcHJvZ3JhbS5QYWdlLklDdXN0b21TaGFyZUNvbnRlbnQge1xyXG4gICAgY29uc29sZS5sb2cob3B0cy50YXJnZXQpXHJcbiAgICByZXR1cm4ge31cclxuICB9XHJcbn0pIl19