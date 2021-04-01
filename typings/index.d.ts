/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    token?:'',
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}