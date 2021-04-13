"use strict";
App({
    globalData: {
        token: '',
    },
    onLaunch() {
        this.globalData.token = wx.getStorageSync('token') || '';
        let user = wx.getStorageSync('user');
        if (this.globalData.token) {
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
        else {
            wx.redirectTo({ url: '/pages/login/login' });
        }
        wx.login({
            success: () => {
            },
        });
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo;
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        },
                    });
                }
            },
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxHQUFHLENBQWE7SUFDZCxVQUFVLEVBQUU7UUFFVixLQUFLLEVBQUMsRUFBRTtLQUNUO0lBQ0QsUUFBUTtRQUVOLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUUsRUFBRSxDQUFDO1FBQ3ZELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDcEMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUNsQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUMsR0FBRyxFQUFDLHNCQUFzQixFQUFDLENBQUMsQ0FBQzthQUM3QztpQkFBSyxJQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFDO2dCQUN0QixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUMsR0FBRyxFQUFDLDRCQUE0QixFQUFDLENBQUMsQ0FBQzthQUNuRDtpQkFBSTtnQkFDSCxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsQ0FBQzthQUUzQztTQUNGO2FBQUk7WUFDSCxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsQ0FBQTtTQUMxQztRQUVELEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDUCxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBR2QsQ0FBQztTQUNGLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBRXJDLEVBQUUsQ0FBQyxXQUFXLENBQUM7d0JBQ2IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFOzRCQUViLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7NEJBR3ZDLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO2dDQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUE7NkJBQ2hDO3dCQUNILENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAudHNcclxuQXBwPElBcHBPcHRpb24+KHtcclxuICBnbG9iYWxEYXRhOiB7XHJcbiAgICAvLyBhcGlcclxuICAgIHRva2VuOicnLFxyXG4gIH0sXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICAvLyDlsZXnpLrmnKzlnLDlrZjlgqjog73liptcclxuICAgIHRoaXMuZ2xvYmFsRGF0YS50b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpfHwnJztcclxuICAgIGxldCB1c2VyID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXInKVxyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS50b2tlbikge1xyXG4gICAgICBpZiAodXNlci50eXBlID09IDEpIHtcclxuICAgICAgICB3eC5yZWRpcmVjdFRvKHt1cmw6Jy9wYWdlcy9wYXRyb2wvcGF0cm9sJ30pO1xyXG4gICAgICB9ZWxzZSBpZih1c2VyLnR5cGUgPT0gNSl7XHJcbiAgICAgICAgd3gucmVkaXJlY3RUbyh7dXJsOicvcGFnZXMvYWRtaW5Vc2VyL2FkbWluVXNlcid9KTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgd3gucmVkaXJlY3RUbyh7dXJsOicvcGFnZXMvYXVkaXQvYXVkaXQnfSk7XHJcbiAgICAgICAgLy8gd3gucmVkaXJlY3RUbyh7dXJsOicvcGFnZXMvYmlnc2NyZWVuL2FjdGl2aXR5L2FjdGl2aXR5J30pO1xyXG4gICAgICB9XHJcbiAgICB9ZWxzZXtcclxuICAgICAgd3gucmVkaXJlY3RUbyh7dXJsOicvcGFnZXMvbG9naW4vbG9naW4nfSlcclxuICAgIH1cclxuICAgIC8vIOeZu+W9lVxyXG4gICAgd3gubG9naW4oe1xyXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmNvZGUpXHJcbiAgICAgICAgLy8g5Y+R6YCBIHJlcy5jb2RlIOWIsOWQjuWPsOaNouWPliBvcGVuSWQsIHNlc3Npb25LZXksIHVuaW9uSWRcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cclxuICAgIHd4LmdldFNldHRpbmcoe1xyXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcclxuICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7DvvIzkuI3kvJrlvLnmoYZcclxuICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAvLyDlj6/ku6XlsIYgcmVzIOWPkemAgee7meWQjuWPsOino+eggeWHuiB1bmlvbklkXHJcbiAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cclxuICAgICAgICAgICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjayhyZXMpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gIH0sXHJcbn0pIl19