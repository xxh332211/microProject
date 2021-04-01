import {mainType} from '../../../service/net.service'
Component({
  properties:{},
  data:{
    current: <'summary'|'analysis'|'map'>'map',
    type:<mainType> 'community',
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