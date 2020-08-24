// const Vue = require('../node_modules/vue/dist/vue')

Vue.component('i-main', {
    props: {
        data: Object
    },
    template: '<main>{{data}}</main>'
})