import api from '../../../../service/net.service'
type type = {
  type: StringConstructor,
  value: "community" | "street" | "unit" | "village"
}
Component({
  data: {
    typeString: '',
    sub: '',
    species: <any>[],
    speciesKeys: <any>[],
    speciesAll: <any>{
      community: ['居委', '社区', '新增问题', '累计问题', '整改率'],
      street: ['居委', '新增问题', '累计问题', '整改率'],
      unit: ['单位', '新增问题', '累计问题', '整改率'],
      village: ['村委', '行政村', '新增问题', '累计问题', '整改率']
    },
    speciesKeysAll: <any>{
      community: ['committee_name', 'subdistrict_name', 'today_total', 'total', 'total_persent'],
      street: ['subdistrict_name', 'today_total', 'total', 'total_persent'],
      unit: ['dw_name', 'today_total', 'total', 'total_persent'],
      village: ['committee_name', 'subdistrict_name', 'today_total', 'total', 'total_persent'],
    },
    list: [],
    page: 1,
    size: 10,
    totalpage: 0
  },
  properties: {
    type: <type>{
      type: String,
      value: 'community'
    },
  },
  methods: {
    scrollevent(e) {
      if (this.data.page < this.data.totalpage) {
        let page = this.data.page
        this.setData({
          page: ++page
        })
        this.getSummary()
      }
    },
    getSummary() {
      api.getSummary(this.data.type, this.data.page, this.data.size).then((res: any) => {
        this.setData({
          list: <any>[...this.data.list, ...res.data.result],
          totalpage: Math.ceil(res.data.params.total / res.data.params.pageSize)
        })
      })
    },
    init() {
      // 设定时间 
      this.setData({
        sub: api.getDate() + ' ' + '截止'
      })
      let str = ''
      switch (this.data.type) {
        case "community":
          str = '居委'
          break;
        case "street":
          str = '街道'
          break;
        case "unit":
          str = '单位'
          break;
        case "village":
          str = '行政村'
          break;
        default:
          break;
      }
      this.setData({
        species: this.data.speciesAll[this.data.type],
        speciesKeys: this.data.speciesKeysAll[this.data.type],
        typeString:str
      })
      this.getSummary()
    }
  },
  attached() {
    this.init()
  },
  detached() { },
})