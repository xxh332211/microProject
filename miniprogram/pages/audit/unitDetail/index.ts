// pages/audit/unitDetail/index.js
import {mainType} from '../../../service/net.service'
Component({
  properties:{},
  data:{
    current: <'summary'|'analysis'|'total'>'summary',
    type:<mainType> 'unit',
  },
  methods: {
    changeTabs(e:any){
      
      this.setData({
        current:e.detail.cell
      })
    }
  },
  attached() {},
  detached() {},
})
