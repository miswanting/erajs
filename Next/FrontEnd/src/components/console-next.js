const Vue = require('../node_modules/vue/dist/vue')

Vue.component('i-console', {
    props: {
        data: Object
    },
    template: '<body><console-header></console-header><console-main></console-main></body>'
})

Vue.component('console-header', {
    props: {
        data: Object
    },
    template: '<header></header>'
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