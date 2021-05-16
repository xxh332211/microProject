import api from '../../service/net.service';
import {mainType} from '../../service/net.service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:<any>{},
    dataPoints:<any>{},
    current: <mainType>'community',
    user:<any>{},
    date:'',
    wxcode: '',
    isShow: false,
    phoneNumber: '',
    show: false
  },
  tap (e:any) {
    this.setData({
      current: e.currentTarget.dataset.type
    })
    this.getMainData();
    console.log(this.data.current);
    this.getData();
  },
  goFeedback () {
    api.setFeedbackType(this.data.current);
    setTimeout(()=>{
      wx.navigateTo({url:'/pages/audit/feedback/feedback'});
    },100)
  },
  // 巡查报告
  goReport() {
    api.setFeedbackType(this.data.current);
    let that = this;
    setTimeout(()=>{
      wx.navigateTo({
        url:'/pages/audit/report/report',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          let data = that.data.current?that.data.current:'community';
          res.eventChannel.emit("currentInfo", data);
        }
      });
    },100)
  },
  getMainData() {
    api.getAnalysisData(this.data.current).then((res:any)=>{
      this.setData({
        mainData : res.data.result[0]
      })
    })
  },
// 总分
  getData() {
    api.getPoints(this.data.current).then((res:any)=>{
      // console.log('总分', res);
      this.setData({
        dataPoints : res.data.result
      })
    })
  },

  userInit(){
    // 2和3为最高权限   4只能看居住区 5只能看个人中心  6只能看单位
    // 1=巡查用户 2=区级用户 3=街道用户 4=居委用户 5=物业用户 6=单位用户
    this.setData({
      user: wx.getStorageSync('user')
    })
    switch (this.data.user.type) {
      case '6':
        this.setData({
          current: 'unit'
        })
        break;
      case '8':
        this.setData({
          current: 'village'
        })
        break;
      case '9':
        this.setData({
          current: 'village'
        })
        break;  
      default:
        break;
    }
  },
  getPhoneNumber: function(e: any) {
    if (e.detail.userInfo) {
      // 用户按了允许授权按钮
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：", e);
      // console.log(e.detail.userInfo);
      // 授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      
      let data = {
        wxcode: this.data.wxcode,
        encryptedData: e.detail.encryptedData,
        offset: e.detail.iv
      }
      console.log(data);
      
      // api.bindPhone(data).then(() => {
      //   console.log('绑定微信手机');
      //   this.setData({
      //     isShow: false
      //   })
      // })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
 },
  handleInputChange(e: any) {
    let _this = this;
    let dataset  = e.currentTarget.dataset;
    let value = e.detail.value;
    let phoneNumber = dataset.phoneNumber;
    _this.data.phoneNumber = value;
    _this.setData({
      phoneNumber: _this.data.phoneNumber
    })
    // this.setData({
    //   [e.currentTarget.dataset.key]: e.detail.value
    // })
  },
  bindPhone() {
    // console.log(this.data.phone);
    // let phone = parseInt(this.data.phone);
    let data = {
      mobile: this.data.phoneNumber
    }
    console.log('mobile', data);
    // return;
    api.iptPhone(data).then(() => {
      // console.log('绑定成功');
      this.setData({
        show:true
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 获取用户信息
    // wx.login({
    //   success: (res) => {
    //     console.log(res.code)
    //     this.setData({
    //       wxcode : res.code
    //     })
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // })
    api.getPhoneNumber().then((res: any) => {
      console.log('是否绑定手机号', res);
      if(res && res.data.code === 200) {
        this.setData({
          isShow: true
        })
        console.log('用户需要授权绑定手机');
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      date:api.getDate()
    })
    this.userInit()
    this.getMainData()
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(opts:any): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  }
})