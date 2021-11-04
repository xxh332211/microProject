"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_service_1 = require("../../../service/net.service");
Page({
    data: {
        current: 'all',
        keyword: '',
        feedbackType: '',
        list: [],
        height: '',
        page: 1,
        total: 0,
        startDate: '',
        endDate: '',
        user: {}
    },
    scroll() {
        let totalPage = Math.ceil(this.data.total / 10);
        if (this.data.page >= totalPage) {
            return;
        }
        this.setData({
            page: this.data.page + 1
        });
        this.getList();
    },
    tap(e) {
        this.setData({
            current: e.currentTarget.dataset.type,
            keyword: '',
            page: 1
        });
        this.getList('reset');
    },
    getList(reset) {
        let data = {
            type: this.data.feedbackType,
            status: this.data.current,
            page: this.data.page,
            name: this.data.keyword,
            begin_create_date: this.data.startDate,
            end_create_date: this.data.endDate
        };
        net_service_1.default.getFeedbackList(data).then((res) => {
            if (reset) {
                this.setData({
                    list: res.data.result,
                    total: res.data.params.total
                });
            }
            else {
                this.setData({
                    list: [...this.data.list, ...res.data.result],
                    total: res.data.params.total
                });
            }
        });
    },
    previewImg(e) {
        let urls = e.currentTarget.dataset.urls;
        let index = e.currentTarget.dataset.index;
        let sources = [];
        urls.forEach((element) => {
            sources.push({ url: element });
        });
        wx.previewMedia({ sources: sources, current: index });
    },
    clear() {
        this.setData({
            keyword: ''
        });
        this.getList('reset');
    },
    search(e) {
        this.setData({
            keyword: e.detail.value
        });
        this.getList('reset');
    },
    goUpfeedback(e) {
        console.log(e);
        wx.setStorageSync('category_id', e.currentTarget.dataset.category_id);
        wx.setStorageSync('defuct_id', e.currentTarget.dataset.defuct_id);
        wx.navigateTo({ url: '/pages/audit/feedback/upFeedback/upFeedback' });
    },
    startChange(e) {
        let startDate = e.detail.currentKey || e.detail.value;
        this.setData({ startDate: startDate });
    },
    endChange(e) {
        let endDate = e.detail.currentKey || e.detail.value;
        this.setData({ endDate: endDate });
    },
    onLoad() {
        wx.setNavigationBarColor({ backgroundColor: '#FF625D', frontColor: '#ffffff' });
    },
    onReady() {
    },
    onShow() {
        this.setData({
            user: wx.getStorageSync('user')
        });
        this.setData({
            feedbackType: wx.getStorageSync('feedbackType')
        });
        this.setData({
            page: 1
        });
        this.getList('reset');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlZGJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmZWVkYmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhEQUErQztBQUUvQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQW1DLEtBQUs7UUFDL0MsT0FBTyxFQUFDLEVBQUU7UUFDVixZQUFZLEVBQVUsRUFBRTtRQUN4QixJQUFJLEVBQU0sRUFBRTtRQUNaLE1BQU0sRUFBQyxFQUFFO1FBQ1QsSUFBSSxFQUFDLENBQUM7UUFDTixLQUFLLEVBQUMsQ0FBQztRQUNQLFNBQVMsRUFBRSxFQUFFO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFDWCxJQUFJLEVBQU0sRUFBRTtLQUNiO0lBQ0QsTUFBTTtRQUNKLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDLENBQUE7UUFDN0MsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDL0IsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLElBQUksRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDO1NBQzFCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNoQixDQUFDO0lBQ0QsR0FBRyxDQUFFLENBQUs7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsT0FBTyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDckMsT0FBTyxFQUFDLEVBQUU7WUFDVixJQUFJLEVBQUUsQ0FBQztTQUNSLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUNELE9BQU8sQ0FBRSxLQUFjO1FBQ3JCLElBQUksSUFBSSxHQUFHO1lBQ1QsSUFBSSxF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QUFTLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBQ0QsU0FBUyxDQUFDLENBQU07UUFDZCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQTtRQUVuRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUlELE1BQU07UUFDSixFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBQyxlQUFlLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsQ0FBQyxDQUFBO0lBQzVFLENBQUM7SUFLRCxPQUFPO0lBRVAsQ0FBQztJQUtELE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsSUFBSSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1NBQ2hDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxZQUFZLEVBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7U0FDL0MsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLElBQUksRUFBQyxDQUFDO1NBQ1AsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBS0QsTUFBTTtJQUVOLENBQUM7SUFLRCxRQUFRO0lBRVIsQ0FBQztJQUtELGlCQUFpQjtJQUVqQixDQUFDO0lBS0QsYUFBYTtJQUViLENBQUM7SUFLRCxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3BCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGkgZnJvbSAnLi4vLi4vLi4vc2VydmljZS9uZXQuc2VydmljZSc7XHJcbmltcG9ydCB7bWFpblR5cGV9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvbmV0LnNlcnZpY2UnXHJcblBhZ2Uoe1xyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cclxuICAgKi9cclxuICBkYXRhOiB7XHJcbiAgICBjdXJyZW50OiA8J2FsbCd8J2RvbmUnfCdwZW5kaW5nJ3wnbm90eWV0Jz4nYWxsJyxcclxuICAgIGtleXdvcmQ6JycsXHJcbiAgICBmZWVkYmFja1R5cGU6IDxzdHJpbmc+JycsXHJcbiAgICBsaXN0Ojxhbnk+W10sXHJcbiAgICBoZWlnaHQ6JycsXHJcbiAgICBwYWdlOjEsXHJcbiAgICB0b3RhbDowLFxyXG4gICAgc3RhcnREYXRlOiAnJyxcclxuICAgIGVuZERhdGU6ICcnLFxyXG4gICAgdXNlcjo8YW55Pnt9XHJcbiAgfSxcclxuICBzY3JvbGwgKCkge1xyXG4gICAgbGV0IHRvdGFsUGFnZSA9IE1hdGguY2VpbCh0aGlzLmRhdGEudG90YWwvMTApXHJcbiAgICBpZiAodGhpcy5kYXRhLnBhZ2UgPj0gdG90YWxQYWdlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHBhZ2UgOiB0aGlzLmRhdGEucGFnZSArIDFcclxuICAgIH0pXHJcbiAgICB0aGlzLmdldExpc3QoKVxyXG4gIH0sXHJcbiAgdGFwIChlOmFueSkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgY3VycmVudDogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudHlwZSxcclxuICAgICAga2V5d29yZDonJyxcclxuICAgICAgcGFnZTogMVxyXG4gICAgfSlcclxuICAgIHRoaXMuZ2V0TGlzdCgncmVzZXQnKVxyXG4gIH0sXHJcbiAgZ2V0TGlzdCAocmVzZXQ/OidyZXNldCcpIHtcclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICB0eXBlOjxtYWluVHlwZT50aGlzLmRhdGEuZmVlZGJhY2tUeXBlLFxyXG4gICAgICBzdGF0dXM6dGhpcy5kYXRhLmN1cnJlbnQsXHJcbiAgICAgIHBhZ2U6dGhpcy5kYXRhLnBhZ2UsXHJcbiAgICAgIG5hbWU6dGhpcy5kYXRhLmtleXdvcmQsXHJcbiAgICAgIGJlZ2luX2NyZWF0ZV9kYXRlOiB0aGlzLmRhdGEuc3RhcnREYXRlLFxyXG4gICAgICBlbmRfY3JlYXRlX2RhdGU6IHRoaXMuZGF0YS5lbmREYXRlXHJcbiAgICB9XHJcbiAgICBhcGkuZ2V0RmVlZGJhY2tMaXN0KGRhdGEpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgIGlmIChyZXNldCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBsaXN0OnJlcy5kYXRhLnJlc3VsdCxcclxuICAgICAgICAgIHRvdGFsOiByZXMuZGF0YS5wYXJhbXMudG90YWxcclxuICAgICAgICB9KVxyXG4gICAgICB9ZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIGxpc3Q6IFsuLi50aGlzLmRhdGEubGlzdCwuLi5yZXMuZGF0YS5yZXN1bHRdLFxyXG4gICAgICAgICAgdG90YWw6IHJlcy5kYXRhLnBhcmFtcy50b3RhbFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgcHJldmlld0ltZyAoZTphbnkpIHtcclxuICAgIGxldCB1cmxzID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJscztcclxuICAgIGxldCBpbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4O1xyXG4gICAgbGV0IHNvdXJjZXMgPSA8YW55PltdXHJcbiAgICB1cmxzLmZvckVhY2goKGVsZW1lbnQ6YW55KSA9PiB7XHJcbiAgICAgIHNvdXJjZXMucHVzaCh7dXJsOiBlbGVtZW50fSlcclxuICAgIH0pO1xyXG4gICAgd3gucHJldmlld01lZGlhKHtzb3VyY2VzOnNvdXJjZXMsY3VycmVudDppbmRleH0pXHJcbiAgfSxcclxuICBjbGVhcigpe1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAga2V5d29yZDonJ1xyXG4gICAgfSlcclxuICAgIHRoaXMuZ2V0TGlzdCgncmVzZXQnKVxyXG4gIH0sXHJcbiAgc2VhcmNoIChlOmFueSkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAga2V5d29yZDplLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICAgIHRoaXMuZ2V0TGlzdCgncmVzZXQnKVxyXG4gIH0sXHJcbiAgZ29VcGZlZWRiYWNrKGU6YW55KXtcclxuICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnY2F0ZWdvcnlfaWQnLGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNhdGVnb3J5X2lkKVxyXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ2RlZnVjdF9pZCcsZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZGVmdWN0X2lkKVxyXG4gICAgd3gubmF2aWdhdGVUbyh7dXJsOicvcGFnZXMvYXVkaXQvZmVlZGJhY2svdXBGZWVkYmFjay91cEZlZWRiYWNrJ30pXHJcbiAgfSxcclxuICBzdGFydENoYW5nZShlOiBhbnkpIHtcclxuICAgIGxldCBzdGFydERhdGUgPSBlLmRldGFpbC5jdXJyZW50S2V5IHx8IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAvLyBjb25zb2xlLmxvZyhzdGFydERhdGUpXHJcbiAgICB0aGlzLnNldERhdGEoe3N0YXJ0RGF0ZTogc3RhcnREYXRlfSlcclxuICB9LFxyXG4gIGVuZENoYW5nZShlOiBhbnkpIHtcclxuICAgIGxldCBlbmREYXRlID0gZS5kZXRhaWwuY3VycmVudEtleSB8fCBlLmRldGFpbC52YWx1ZVxyXG4gICAgLy8gY29uc29sZS5sb2coZW5kRGF0ZSlcclxuICAgIHRoaXMuc2V0RGF0YSh7ZW5kRGF0ZTogZW5kRGF0ZX0pXHJcbiAgfSxcclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxyXG4gICAqL1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJDb2xvcih7YmFja2dyb3VuZENvbG9yOicjRkY2MjVEJyxmcm9udENvbG9yOicjZmZmZmZmJ30pXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcclxuICAgKi9cclxuICBvblJlYWR5KCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcclxuICAgKi9cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICB1c2VyOiB3eC5nZXRTdG9yYWdlU3luYygndXNlcicpXHJcbiAgICB9KVxyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgZmVlZGJhY2tUeXBlOnd4LmdldFN0b3JhZ2VTeW5jKCdmZWVkYmFja1R5cGUnKVxyXG4gICAgfSlcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHBhZ2U6MVxyXG4gICAgfSlcclxuICAgIHRoaXMuZ2V0TGlzdCgncmVzZXQnKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xyXG4gICAqL1xyXG4gIG9uSGlkZSgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XHJcbiAgICovXHJcbiAgb25VbmxvYWQoKSB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAqL1xyXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXHJcbiAgICovXHJcbiAgb25SZWFjaEJvdHRvbSgpIHtcclxuICAgIFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xyXG4gICAqL1xyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKG9wdHMpOiBXZWNoYXRNaW5pcHJvZ3JhbS5QYWdlLklDdXN0b21TaGFyZUNvbnRlbnQge1xyXG4gICAgcmV0dXJuIHt9XHJcbiAgfVxyXG59KSJdfQ==