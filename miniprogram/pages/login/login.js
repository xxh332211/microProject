"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../service/net.service");
;
const app = getApp();
Page({
    data: {
        loading: true,
        rules: {
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            username: [
                { required: true, message: '请输入登录账号', trigger: 'blur' },
            ]
        },
        username: '',
        password: '',
        user: {
            username: '',
            password: '',
        }
    },
    inputform(e) {
        let key = e.currentTarget.dataset.key;
        if (key === 'username') {
            this.setData({
                user: {
                    username: e.detail.value,
                    password: this.data.user.password
                }
            });
        }
        else {
            this.setData({
                user: {
                    username: this.data.user.username,
                    password: e.detail.value
                }
            });
        }
    },
    submit(event) {
        console.log(event.detail);
        if (this.data.user.username && this.data.user.password) {
            net_service_1.default.login(event.detail.values.username, event.detail.values.password).then((res) => {
                let token = res.data.result.token;
                let user = res.data.result;
                wx.setStorageSync('token', token);
                wx.setStorageSync('user', user);
                app.globalData.token = token;
                if (user.type == 1) {
                    wx.redirectTo({ url: '/pages/patrol/patrol' });
                }
                else {
                    if (user.type == 1) {
                        wx.redirectTo({ url: '/pages/patrol/patrol' });
                    }
                    else if (user.type == 5) {
                        wx.redirectTo({ url: '/pages/adminUser/adminUser' });
                    }
                    else {
                        wx.redirectTo({ url: '/pages/audit/audit' });
                    }
                }
            });
        }
        else {
            wx.showToast({
                title: '请输入用户名密码',
                icon: 'none',
                duration: 2000
            });
        }
    },
    reset() {
        this.setData({
            user: {
                username: '',
                password: '',
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUE0QztBQUM1QyxDQUFDO0FBQ0QsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDckIsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFDLElBQUk7UUFDWixLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUU7Z0JBQ1IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTthQUd0RDtZQUNELFFBQVEsRUFBRTtnQkFDUixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO2FBQ3hEO1NBQ0Y7UUFDRCxRQUFRLEVBQUUsRUFBRTtRQUNaLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFDO1lBQ0gsUUFBUSxFQUFFLEVBQUU7WUFDWixRQUFRLEVBQUUsRUFBRTtTQUNiO0tBQ0Y7SUFLRCxTQUFTLENBQUUsQ0FBSztRQUVkLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN0QyxJQUFJLEdBQUcsS0FBSyxVQUFVLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxJQUFJLEVBQUM7b0JBQ0gsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztvQkFDeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7aUJBQ2xDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7YUFBSTtZQUNILElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsSUFBSSxFQUFDO29CQUNILFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO29CQUNqQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO2lCQUN6QjthQUNGLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFTO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDekIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBRXBELHFCQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFPLEVBQUMsRUFBRTtnQkFDbkYsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNsQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtnQkFDMUIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ2hDLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFBO2dCQUM5QixHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQzdCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7b0JBQ2xCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBQyxHQUFHLEVBQUMsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO2lCQUM3QztxQkFBSTtvQkFDSCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO3dCQUNsQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUMsR0FBRyxFQUFDLHNCQUFzQixFQUFDLENBQUMsQ0FBQztxQkFDN0M7eUJBQUssSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBQzt3QkFDdEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFDLEdBQUcsRUFBQyw0QkFBNEIsRUFBQyxDQUFDLENBQUM7cUJBQ25EO3lCQUFJO3dCQUNILEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxDQUFDO3FCQUMzQztpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFBO1NBQ0g7YUFBSTtZQUNILEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFDLFVBQVU7Z0JBQ2hCLElBQUksRUFBQyxNQUFNO2dCQUNYLFFBQVEsRUFBQyxJQUFJO2FBQ2QsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBQ0QsS0FBSztRQUNILElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLEVBQUU7Z0JBQ1osUUFBUSxFQUFFLEVBQUU7YUFDYjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFJRCxNQUFNO1FBQ0osRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUkvQixDQUFDO0lBS0QsT0FBTztJQUVQLENBQUM7SUFLRCxNQUFNO0lBRU4sQ0FBQztJQUtELE1BQU07SUFFTixDQUFDO0lBS0QsUUFBUTtJQUVSLENBQUM7SUFLRCxpQkFBaUI7SUFFakIsQ0FBQztJQUtELGFBQWE7SUFFYixDQUFDO0lBS0QsaUJBQWlCLENBQUMsSUFBUTtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN4QixPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpIGZyb20gJy4uLy4uL3NlcnZpY2UvbmV0LnNlcnZpY2UnO1xyXG47XHJcbmNvbnN0IGFwcCA9IGdldEFwcCgpO1xyXG5QYWdlKHtcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXHJcbiAgICovXHJcbiAgZGF0YToge1xyXG4gICAgbG9hZGluZzp0cnVlLFxyXG4gICAgcnVsZXM6IHtcclxuICAgICAgcGFzc3dvcmQ6IFtcclxuICAgICAgICB7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAn6K+36L6T5YWl5a+G56CBJywgdHJpZ2dlcjogJ2JsdXInIH0sXHJcbiAgICAgICAgLy8geyBtaW46IDgsIG1heDogMjAsIG1lc3NhZ2U6ICflr4bnoIHplb/luqblnKg4LTIw5Liq5a2X56ym5LmL6Ze0JywgdHJpZ2dlcjogWydibHVyJywnY2hhbmdlJ10gfSxcclxuICAgICAgICAvLyB7IHBhdHRlcm46ICdeW0EtWmEtejAtOV0rJCcsIG1lc3NhZ2U6ICflr4bnoIHlv4XpobvnlLHmlbDlrZflrZfmr43nu4TmiJAnLHRyaWdnZXI6IFsnYmx1cicsJ2NoYW5nZSddfVxyXG4gICAgICBdLFxyXG4gICAgICB1c2VybmFtZTogW1xyXG4gICAgICAgIHsgcmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICfor7fovpPlhaXnmbvlvZXotKblj7cnLCB0cmlnZ2VyOiAnYmx1cicgfSxcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHVzZXJuYW1lOiAnJyxcclxuICAgIHBhc3N3b3JkOiAnJyxcclxuICAgIHVzZXI6e1xyXG4gICAgICB1c2VybmFtZTogJycsXHJcbiAgICAgIHBhc3N3b3JkOiAnJyxcclxuICAgIH1cclxuICB9LFxyXG4gIC8vIGdldFVzZXJJbmZvIChlOmFueSkge1xyXG4gIC8vICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xyXG4gIC8vICAgLy8gdGhpcy5zdWJtaXQoKTtcclxuICAvLyB9LFxyXG4gIGlucHV0Zm9ybSAoZTphbnkpIHtcclxuICAgIFxyXG4gICAgbGV0IGtleSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmtleTtcclxuICAgIGlmIChrZXkgPT09ICd1c2VybmFtZScpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICB1c2VyOntcclxuICAgICAgICAgIHVzZXJuYW1lOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLmRhdGEudXNlci5wYXNzd29yZFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1lbHNle1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIHVzZXI6e1xyXG4gICAgICAgICAgdXNlcm5hbWU6IHRoaXMuZGF0YS51c2VyLnVzZXJuYW1lLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc3VibWl0KGV2ZW50OmFueSl7XHJcbiAgICBjb25zb2xlLmxvZyhldmVudC5kZXRhaWwpXHJcbiAgICBpZiAodGhpcy5kYXRhLnVzZXIudXNlcm5hbWUmJnRoaXMuZGF0YS51c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgIC8vIOeUqOaIt+W3suaOiOadg+S4lOihqOWNlemqjOivgeaIkOWKn1xyXG4gICAgICBhcGkubG9naW4oZXZlbnQuZGV0YWlsLnZhbHVlcy51c2VybmFtZSxldmVudC5kZXRhaWwudmFsdWVzLnBhc3N3b3JkKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICAgIGxldCB0b2tlbiA9IHJlcy5kYXRhLnJlc3VsdC50b2tlbjtcclxuICAgICAgICBsZXQgdXNlciA9IHJlcy5kYXRhLnJlc3VsdFxyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsdG9rZW4pXHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXInLHVzZXIpXHJcbiAgICAgICAgYXBwLmdsb2JhbERhdGEudG9rZW4gPSB0b2tlbjtcclxuICAgICAgICBpZiAodXNlci50eXBlID09IDEpIHtcclxuICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe3VybDonL3BhZ2VzL3BhdHJvbC9wYXRyb2wnfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBpZiAodXNlci50eXBlID09IDEpIHtcclxuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7dXJsOicvcGFnZXMvcGF0cm9sL3BhdHJvbCd9KTtcclxuICAgICAgICAgIH1lbHNlIGlmKHVzZXIudHlwZSA9PSA1KXtcclxuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7dXJsOicvcGFnZXMvYWRtaW5Vc2VyL2FkbWluVXNlcid9KTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHt1cmw6Jy9wYWdlcy9hdWRpdC9hdWRpdCd9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9ZWxzZXtcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTon6K+36L6T5YWl55So5oi35ZCN5a+G56CBJyxcclxuICAgICAgICBpY29uOidub25lJyxcclxuICAgICAgICBkdXJhdGlvbjoyMDAwXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICByZXNldCAoKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICB1c2VyOiB7XHJcbiAgICAgICAgdXNlcm5hbWU6ICcnLFxyXG4gICAgICAgIHBhc3N3b3JkOiAnJyxcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XHJcbiAgICovXHJcbiAgb25Mb2FkICgpIHtcclxuICAgIHd4Lmxpbi5pbml0VmFsaWRhdGVGb3JtKHRoaXMpXHJcbiAgICAvLyBpZiAoYXBwLmdsb2JhbERhdGEudG9rZW4pIHtcclxuICAgIC8vICAgd3gubmF2aWdhdGVUbyh7dXJsOicvcGFnZXMvbWFpbi9wYXRyb2wvaW5kZXgvaW5kZXgnfSk7XHJcbiAgICAvLyB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcclxuICAgKi9cclxuICBvblJlYWR5KCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcclxuICAgKi9cclxuICBvblNob3coKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xyXG4gICAqL1xyXG4gIG9uSGlkZSgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XHJcbiAgICovXHJcbiAgb25VbmxvYWQoKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAqL1xyXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXHJcbiAgICovXHJcbiAgb25SZWFjaEJvdHRvbSgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xyXG4gICAqL1xyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKG9wdHM6YW55KTogV2VjaGF0TWluaXByb2dyYW0uUGFnZS5JQ3VzdG9tU2hhcmVDb250ZW50IHtcclxuICAgIGNvbnNvbGUubG9nKG9wdHMudGFyZ2V0KVxyXG4gICAgcmV0dXJuIHt9XHJcbiAgfVxyXG59KSJdfQ==