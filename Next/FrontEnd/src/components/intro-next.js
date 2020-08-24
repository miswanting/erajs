// const Vue = require('../node_modules/vue/dist/vue')

Vue.component('i-intro', {
    props: {
        data: Object
    },
    template: '<body><i-header :data=data></i-header><i-loading :data=data></i-loading></body>'
})
Vue.component('i-loading', {
    props: {
        data: Object
    },
    template: '<div>Loading</div>'
})