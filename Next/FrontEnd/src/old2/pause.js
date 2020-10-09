Vue.component('i-pause', {
  props: {
    data: Object
  },
  template: '<body><i-header></i-header><main><pause-banner></pause-banner></main><i-footer></i-footer></body>'
})
Vue.component('pause-banner', {
  props: {
    data: Object
  },
  template: '<div class="pause-banner"><h1>暂停</h1><div>继续游戏</div><div>游戏设置</div><div>结束游戏</div></div>'
})
