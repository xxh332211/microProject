const app = getApp();
Component({
  properties: {
    current: { // 是否主页            
      type: String,
      value: '',
    },
    list:{
      type:Array,
      value:[
        {name: '巡查评测',icon:'yemianpeizhi',url:'/pages/audit/audit',key:'audit'},
        {name: '分类时效',icon:'piechart',url:'/pages/classification/classification',key:'classification'},
        {name: '社区管理',icon:'star',url:'/pages/community/community',key:'community'},
        {name: '我的',icon:'wode',url:'/pages/adminUser/adminUser',key:'adminUser'}
      ]
    },
    listAdmin: {
      type:Array,
      value:[
        {name: '巡查评测',icon:'yemianpeizhi',url:'/pages/audit/audit',key:'audit'},
        {name: '分类时效',icon:'piechart',url:'/pages/classification/classification',key:'classification'},
        {name: '社区管理',icon:'star',url:'/pages/community/community',key:'community'},
      ]
    },
    listProperty: {
      type:Array,
      value:[
        {name: '社区管理',icon:'star',url:'/pages/community/community',key:'community'},
        {name: '我的',icon:'wode',url:'/pages/adminUser/adminUser',key:'adminUser'}
      ]
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    
  },
  methods: {
    // 这里是一个自定义方法
    go: (e) =>{
      if(!e.currentTarget.dataset.hi&&e.currentTarget.dataset.url){
        wx.redirectTo({
          url: e.currentTarget.dataset.url
        })
      }
    },
  },
  attached(){
    let user = wx.getStorageSync('user')
    // 2和3为最高权限   4只能看居住区 5只能看个人中心  6只能看单位
    if (user.type==2||user.type==3){
      this.setData({
        list:this.data.listAdmin
      })
    }
    if (user.type ==5) {
      this.setData({
        list:this.data.listProperty
      })
    }
    
  },
  detached(){}
})
