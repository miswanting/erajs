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
    methods: {
        enter: function (el) {
            alert()
        }
    },
    template: '<transition v-on:enter="enter"><div>Loadi111ng</div></transition>'
})