// const Vue = require('../node_modules/vue/dist/vue')

Vue.component('i-console', {
    props: {
        data: Object
    },
    template: '<body><i-header :data=data></i-header><console-main></console-main></body>'
})
Vue.component('console-main', {
    props: {
        data: Object
    },
    template: '<main><console-input></console-input></main>'
})
Vue.component('console-input', {
    props: {
        data: Object
    },
    template: '<div><span>$></span><span contenteditable></span></div>'
})
Vue.component('console-output', {
    props: {
        data: Object
    },
    template: '<div></div>'
})