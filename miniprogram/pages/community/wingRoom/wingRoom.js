"use strict";
Page({
    data: {
        dataArr: [],
    },
    changeTit(goods_name) {
        wx.setNavigationBarTitle({
            title: goods_name
        });
    },
    onLoad: function (options) {
        console.log('id', options);
        let tit = '';
        if (options.id === "1") {
            tit = '生活垃圾厢房情况';
        }
        else {
            tit = '定时定点投放点位';
        }
        this.changeTit(tit);
        let that = this;
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on("roomInfo", function (data) {
            console.log(data);
            that.setData({
                dataArr: data
            });
        });
    },
    onReady: function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZ1Jvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aW5nUm9vbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFNLEVBQUU7S0FDaEI7SUFHQyxTQUFTLENBQUMsVUFBYztRQUN0QixFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDdkIsS0FBSyxFQUFFLFVBQVU7U0FDbEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUtILE1BQU0sRUFBRSxVQUFVLE9BQVc7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxHQUFHLEdBQU8sRUFBRSxDQUFDO1FBQ2pCLElBQUksT0FBTyxDQUFDLEVBQUUsS0FBSSxHQUFHLEVBQUU7WUFDckIsR0FBRyxHQUFHLFVBQVUsQ0FBQTtTQUNqQjthQUFNO1lBQ0wsR0FBRyxHQUFHLFVBQVUsQ0FBQTtTQUNqQjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRWxELFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVMsSUFBSTtZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsT0FBTyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFLRCxPQUFPLEVBQUU7SUFFVCxDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxRQUFRLEVBQUU7SUFFVixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztJQUtELGFBQWEsRUFBRTtJQUVmLENBQUM7Q0FRRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9jb21tdW5pdHkvd2luZ1Jvb20vd2luZ1Jvb20uanNcclxuUGFnZSh7XHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxyXG4gICAqL1xyXG4gIGRhdGE6IHtcclxuICAgIGRhdGFBcnI6PGFueT5bXSxcclxuICB9LFxyXG5cclxuICAgIC8vIOWKqOaAgeiuvue9rumhtemdouagh+mimFxyXG4gICAgY2hhbmdlVGl0KGdvb2RzX25hbWU6YW55KSB7XHJcbiAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgdGl0bGU6IGdvb2RzX25hbWVcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XHJcbiAgICovXHJcbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9uczphbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKCdpZCcsIG9wdGlvbnMpO1xyXG4gICAgbGV0IHRpdDphbnkgPSAnJztcclxuICAgIGlmIChvcHRpb25zLmlkID09PVwiMVwiKSB7XHJcbiAgICAgIHRpdCA9ICfnlJ/mtLvlnoPlnL7ljqLmiL/mg4XlhrUnXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aXQgPSAn5a6a5pe25a6a54K55oqV5pS+54K55L2NJ1xyXG4gICAgfVxyXG4gICAgdGhpcy5jaGFuZ2VUaXQodGl0KTtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIGNvbnN0IGV2ZW50Q2hhbm5lbCA9IHRoaXMuZ2V0T3BlbmVyRXZlbnRDaGFubmVsKCk7XHJcbiAgICAvLyDnm5HlkKxpbmZv5LqL5Lu277yM6I635Y+W5LiK5LiA6aG16Z2i6YCa6L+HZXZlbnRDaGFubmVs5Lyg6YCB5Yiw5b2T5YmN6aG16Z2i55qE5pWw5o2uXHJcbiAgICBldmVudENoYW5uZWwub24oXCJyb29tSW5mb1wiLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgIGRhdGFBcnI6IGRhdGFcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXHJcbiAgICovXHJcbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxyXG4gICAqL1xyXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xyXG4gICAqL1xyXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxyXG4gICAqL1xyXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICovXHJcbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXHJcbiAgICovXHJcbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcclxuICAgKi9cclxuICAvLyBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAvLyB9XHJcbn0pIl19