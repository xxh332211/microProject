const app = getApp();
Component({
  properties: {
    currentIndex: { // 是否主页            
      type: Number,
      value: 0,
    },
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    list:[
      {name: '首页',icon:'shequ',url:'/pages/patrol/patrol'},
      {name: '我的',icon:'wode',url:'/pages/user/user'}
    ]
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
  }
})
