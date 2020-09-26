// const Vue = require('../node_modules/vue/dist/vue')

Vue.component('i-footer', {
  props: {
    data: Object
  },
  template: '<footer>{{data.data.footer}}</footer>'
})
