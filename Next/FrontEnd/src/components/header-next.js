// const Vue = require('../node_modules/vue/dist/vue')
const { remote } = require('electron')

Vue.component('i-header', {
    props: {
        data: Object
    },
    template: '<header>{{data}}</header>'
})