"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../service/net.service");
Page({
    data: {
        mainData: {},
        dataPoints: {},
        current: 'community',
        user: {},
        date: '',
        wxcode: '',
        isShow: false,
        phoneNumber: '',
        show: false
    },
    tap(e) {
        this.setData({
            current: e.currentTarget.dataset.type
        });
        this.getMainData();
        console.log(this.data.current);
        this.getData();
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
    getData() {
        net_service_1.default.getPoints(this.data.current).then((res) => {
            this.setData({
                dataPoints: res.data.result
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
    getPhoneNumber: function (e) {
        if (e.detail.userInfo) {
            console.log("????????????????????????", e);
            let data = {
                wxcode: this.data.wxcode,
                encryptedData: e.detail.encryptedData,
                offset: e.detail.iv
            };
            console.log(data);
        }
        else {
            wx.showModal({
                title: '??????',
                content: '??????????????????????????????????????????????????????????????????????????????!!!',
                showCancel: false,
                confirmText: '????????????',
                success: function (res) {
                    if (res.confirm) {
                        console.log('?????????????????????????????????');
                    }
                }
            });
        }
    },
    handleInputChange(e) {
        let _this = this;
        let dataset = e.currentTarget.dataset;
        let value = e.detail.value;
        let phoneNumber = dataset.phoneNumber;
        _this.data.phoneNumber = value;
        _this.setData({
            phoneNumber: _this.data.phoneNumber
        });
    },
    bindPhone() {
        let data = {
            mobile: this.data.phoneNumber
        };
        console.log('mobile', data);
        net_service_1.default.iptPhone(data).then(() => {
            this.setData({
                show: true
            });
        });
    },
    onLoad() {
        net_service_1.default.getPhoneNumber().then((res) => {
            console.log('?????????????????????', res);
            if (res && res.data.code === 200) {
                this.setData({
                    isShow: true
                });
                console.log('??????????????????????????????');
            }
        });
    },
    onReady() {
    },
    onShow() {
        this.setData({
            date: net_service_1.default.getDate()
        });
        this.userInit();
        this.getMainData();
        this.getData();
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
        return {};
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdWRpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUE0QztBQUc1QyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQU0sRUFBRTtRQUNoQixVQUFVLEVBQU0sRUFBRTtRQUNsQixPQUFPLEVBQVksV0FBVztRQUM5QixJQUFJLEVBQU0sRUFBRTtRQUNaLElBQUksRUFBQyxFQUFFO1FBQ1AsTUFBTSxFQUFFLEVBQUU7UUFDVixNQUFNLEVBQUUsS0FBSztRQUNiLFdBQVcsRUFBRSxFQUFFO1FBQ2YsSUFBSSxFQUFFLEtBQUs7S0FDWjtJQUNELEdBQUcsQ0FBRSxDQUFLO1FBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLE9BQU8sRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1NBQ3RDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFDRCxVQUFVO1FBQ1IscUJBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxVQUFVLENBQUMsR0FBRSxFQUFFO1lBQ2IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFDLEdBQUcsRUFBQyxnQ0FBZ0MsRUFBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1IsQ0FBQztJQUVELFFBQVE7UUFDTixxQkFBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixVQUFVLENBQUMsR0FBRSxFQUFFO1lB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QzNCO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBSUQsT0FBTztJQUVQLENBQUM7SUFLRCxNQUFNO1FBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLElBQUksRUFBQyxxQkFBRyxDQUFDLE9BQU8sRUFBRTtTQUNuQixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDZixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDbEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2hCLENBQUM7SUFLRCxNQUFNO0lBRU4sQ0FBQztJQUtELFFBQVE7SUFFUixDQUFDO0lBS0QsaUJBQWlCO0lBRWpCLENBQUM7SUFLRCxhQUFhO0lBRWIsQ0FBQztJQUtELGlCQUFpQixDQUFDLElBQVE7UUFDeEIsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9zZXJ2aWNlL25ldC5zZXJ2aWNlJztcclxuaW1wb3J0IHttYWluVHlwZX0gZnJvbSAnLi4vLi4vc2VydmljZS9uZXQuc2VydmljZSc7XHJcblxyXG5QYWdlKHtcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXHJcbiAgICovXHJcbiAgZGF0YToge1xyXG4gICAgbWFpbkRhdGE6PGFueT57fSxcclxuICAgIGRhdGFQb2ludHM6PGFueT57fSxcclxuICAgIGN1cnJlbnQ6IDxtYWluVHlwZT4nY29tbXVuaXR5JyxcclxuICAgIHVzZXI6PGFueT57fSxcclxuICAgIGRhdGU6JycsXHJcbiAgICB3eGNvZGU6ICcnLFxyXG4gICAgaXNTaG93OiBmYWxzZSxcclxuICAgIHBob25lTnVtYmVyOiAnJyxcclxuICAgIHNob3c6IGZhbHNlXHJcbiAgfSxcclxuICB0YXAgKGU6YW55KSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBjdXJyZW50OiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50eXBlXHJcbiAgICB9KVxyXG4gICAgdGhpcy5nZXRNYWluRGF0YSgpO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5kYXRhLmN1cnJlbnQpO1xyXG4gICAgdGhpcy5nZXREYXRhKCk7XHJcbiAgfSxcclxuICBnb0ZlZWRiYWNrICgpIHtcclxuICAgIGFwaS5zZXRGZWVkYmFja1R5cGUodGhpcy5kYXRhLmN1cnJlbnQpO1xyXG4gICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHt1cmw6Jy9wYWdlcy9hdWRpdC9mZWVkYmFjay9mZWVkYmFjayd9KTtcclxuICAgIH0sMTAwKVxyXG4gIH0sXHJcbiAgLy8g5beh5p+l5oql5ZGKXHJcbiAgZ29SZXBvcnQoKSB7XHJcbiAgICBhcGkuc2V0RmVlZGJhY2tUeXBlKHRoaXMuZGF0YS5jdXJyZW50KTtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOicvcGFnZXMvYXVkaXQvcmVwb3J0L3JlcG9ydCcsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAvLyDpgJrov4dldmVudENoYW5uZWzlkJHooqvmiZPlvIDpobXpnaLkvKDpgIHmlbDmja5cclxuICAgICAgICAgIGxldCBkYXRhID0gdGhhdC5kYXRhLmN1cnJlbnQ/dGhhdC5kYXRhLmN1cnJlbnQ6J2NvbW11bml0eSc7XHJcbiAgICAgICAgICByZXMuZXZlbnRDaGFubmVsLmVtaXQoXCJjdXJyZW50SW5mb1wiLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSwxMDApXHJcbiAgfSxcclxuICBnZXRNYWluRGF0YSgpIHtcclxuICAgIGFwaS5nZXRBbmFseXNpc0RhdGEodGhpcy5kYXRhLmN1cnJlbnQpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbWFpbkRhdGEgOiByZXMuZGF0YS5yZXN1bHRbMF1cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSxcclxuLy8g5oC75YiGXHJcbiAgZ2V0RGF0YSgpIHtcclxuICAgIGFwaS5nZXRQb2ludHModGhpcy5kYXRhLmN1cnJlbnQpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCfmgLvliIYnLCByZXMpO1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGRhdGFQb2ludHMgOiByZXMuZGF0YS5yZXN1bHRcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgdXNlckluaXQoKXtcclxuICAgIC8vIDLlkowz5Li65pyA6auY5p2D6ZmQICAgNOWPquiDveeci+WxheS9j+WMuiA15Y+q6IO955yL5Liq5Lq65Lit5b+DICA25Y+q6IO955yL5Y2V5L2NXHJcbiAgICAvLyAxPeW3oeafpeeUqOaItyAyPeWMuue6p+eUqOaItyAzPeihl+mBk+eUqOaItyA0PeWxheWnlOeUqOaItyA1PeeJqeS4mueUqOaItyA2PeWNleS9jeeUqOaIt1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgdXNlcjogd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXInKVxyXG4gICAgfSlcclxuICAgIHN3aXRjaCAodGhpcy5kYXRhLnVzZXIudHlwZSkge1xyXG4gICAgICBjYXNlICc2JzpcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgY3VycmVudDogJ3VuaXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnOCc6XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIGN1cnJlbnQ6ICd2aWxsYWdlJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzknOlxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBjdXJyZW50OiAndmlsbGFnZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIGJyZWFrOyAgXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRQaG9uZU51bWJlcjogZnVuY3Rpb24oZTogYW55KSB7XHJcbsKgIMKgIGlmIChlLmRldGFpbC51c2VySW5mbykge1xyXG7CoCDCoCDCoCAvLyDnlKjmiLfmjInkuoblhYHorrjmjojmnYPmjInpkq5cclxuwqAgwqAgwqAgLy8g6I635Y+W5Yiw55So5oi355qE5L+h5oGv5LqG77yM5omT5Y2w5Yiw5o6n5Yi25Y+w5LiK55yL5LiLXHJcbsKgIMKgIMKgIGNvbnNvbGUubG9nKFwi55So5oi355qE5L+h5oGv5aaC5LiL77yaXCIsIGUpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhlLmRldGFpbC51c2VySW5mbyk7XHJcbsKgIMKgIMKgIC8vIOaOiOadg+aIkOWKn+WQjizpgJrov4fmlLnlj5ggaXNIaWRlIOeahOWAvO+8jOiuqeWunueOsOmhtemdouaYvuekuuWHuuadpe+8jOaKiuaOiOadg+mhtemdoumakOiXj+i1t+adpVxyXG4gICAgICBcclxuICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgd3hjb2RlOiB0aGlzLmRhdGEud3hjb2RlLFxyXG4gICAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXHJcbiAgICAgICAgb2Zmc2V0OiBlLmRldGFpbC5pdlxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICBcclxuICAgICAgLy8gYXBpLmJpbmRQaG9uZShkYXRhKS50aGVuKCgpID0+IHtcclxuICAgICAgLy8gICBjb25zb2xlLmxvZygn57uR5a6a5b6u5L+h5omL5py6Jyk7XHJcbiAgICAgIC8vICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgLy8gICAgIGlzU2hvdzogZmFsc2VcclxuICAgICAgLy8gICB9KVxyXG4gICAgICAvLyB9KVxyXG7CoCDCoCB9IGVsc2Uge1xyXG7CoCDCoCDCoCAvL+eUqOaIt+aMieS6huaLkue7neaMiemSrlxyXG7CoCDCoCDCoCB3eC5zaG93TW9kYWwoe1xyXG7CoCDCoCDCoCDCoCB0aXRsZTogJ+itpuWRiicsXHJcbsKgIMKgIMKgIMKgIGNvbnRlbnQ6ICfmgqjngrnlh7vkuobmi5Lnu53mjojmnYPvvIzlsIbml6Dms5Xov5vlhaXlsI/nqIvluo/vvIzor7fmjojmnYPkuYvlkI7lho3ov5vlhaUhISEnLFxyXG7CoCDCoCDCoCDCoCBzaG93Q2FuY2VsOiBmYWxzZSxcclxuwqAgwqAgwqAgwqAgY29uZmlybVRleHQ6ICfov5Tlm57mjojmnYMnLFxyXG7CoCDCoCDCoCDCoCBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuwqAgwqAgwqAgwqAgwqAgLy8g55So5oi35rKh5pyJ5o6I5p2D5oiQ5Yqf77yM5LiN6ZyA6KaB5pS55Y+YIGlzSGlkZSDnmoTlgLxcclxuwqAgwqAgwqAgwqAgwqAgaWYgKHJlcy5jb25maXJtKSB7XHJcbsKgIMKgIMKgIMKgIMKgIMKgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vkuobigJzov5Tlm57mjojmnYPigJ0nKTtcclxuwqAgwqAgwqAgwqAgwqAgfVxyXG7CoCDCoCDCoCDCoCB9XHJcbsKgIMKgIMKgIH0pO1xyXG7CoCDCoCB9XHJcbsKgfSxcclxuICBoYW5kbGVJbnB1dENoYW5nZShlOiBhbnkpIHtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICBsZXQgZGF0YXNldCAgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgIGxldCB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgbGV0IHBob25lTnVtYmVyID0gZGF0YXNldC5waG9uZU51bWJlcjtcclxuICAgIF90aGlzLmRhdGEucGhvbmVOdW1iZXIgPSB2YWx1ZTtcclxuICAgIF90aGlzLnNldERhdGEoe1xyXG4gICAgICBwaG9uZU51bWJlcjogX3RoaXMuZGF0YS5waG9uZU51bWJlclxyXG4gICAgfSlcclxuICAgIC8vIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAvLyAgIFtlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5rZXldOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgLy8gfSlcclxuICB9LFxyXG4gIGJpbmRQaG9uZSgpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5waG9uZSk7XHJcbiAgICAvLyBsZXQgcGhvbmUgPSBwYXJzZUludCh0aGlzLmRhdGEucGhvbmUpO1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgIG1vYmlsZTogdGhpcy5kYXRhLnBob25lTnVtYmVyXHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZygnbW9iaWxlJywgZGF0YSk7XHJcbiAgICAvLyByZXR1cm47XHJcbiAgICBhcGkuaXB0UGhvbmUoZGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCfnu5HlrprmiJDlip8nKTtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBzaG93OnRydWVcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSxcclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxyXG4gICAqL1xyXG4gIG9uTG9hZCAoKSB7XHJcbiAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cclxuICAgIC8vIHd4LmxvZ2luKHtcclxuICAgIC8vICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKVxyXG4gICAgLy8gICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAvLyAgICAgICB3eGNvZGUgOiByZXMuY29kZVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyAgICAgLy8g5Y+R6YCBIHJlcy5jb2RlIOWIsOWQjuWPsOaNouWPliBvcGVuSWQsIHNlc3Npb25LZXksIHVuaW9uSWRcclxuICAgIC8vICAgfSxcclxuICAgIC8vIH0pXHJcbiAgICBhcGkuZ2V0UGhvbmVOdW1iZXIoKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygn5piv5ZCm57uR5a6a5omL5py65Y+3JywgcmVzKTtcclxuICAgICAgaWYocmVzICYmIHJlcy5kYXRhLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBpc1Nob3c6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfpnIDopoHmjojmnYPnu5HlrprmiYvmnLonKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXHJcbiAgICovXHJcbiAgb25SZWFkeSgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XHJcbiAgICovXHJcbiAgb25TaG93KCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgZGF0ZTphcGkuZ2V0RGF0ZSgpXHJcbiAgICB9KVxyXG4gICAgdGhpcy51c2VySW5pdCgpXHJcbiAgICB0aGlzLmdldE1haW5EYXRhKClcclxuICAgIHRoaXMuZ2V0RGF0YSgpXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cclxuICAgKi9cclxuICBvbkhpZGUoKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxyXG4gICAqL1xyXG4gIG9uVW5sb2FkKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgKi9cclxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxyXG4gICAqL1xyXG4gIG9uUmVhY2hCb3R0b20oKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcclxuICAgKi9cclxuICBvblNoYXJlQXBwTWVzc2FnZShvcHRzOmFueSk6IFdlY2hhdE1pbmlwcm9ncmFtLlBhZ2UuSUN1c3RvbVNoYXJlQ29udGVudCB7XHJcbiAgICByZXR1cm4ge31cclxuICB9XHJcbn0pIl19