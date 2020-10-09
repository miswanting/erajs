class DisplayManager {
    app
    constructor() {
        document.body.addEventListener("mouseup", (e) => {
            console.log('[DEBG]鼠标点击：', e.which);
            let data = {
                type: 'MOUSE_CLICK',
                value: e.which
            }
            // this.app.pull(data)
            // console.log(data);
            store.commit('handleEvent', data)
        })
        document.body.addEventListener("keyup", (e) => {
            console.log('[DEBG]键盘按下：', e.key);
            if (e.key == '`') {
                if (store.state.ui != 'console') {
                    store.state.lastUi = store.state.ui
                    store.state.ui = 'console'
                } else if (store.state.ui == 'console') {
                    store.state.ui = store.state.lastUi
                }
            } else if (e.key == 'Escape') {
                if (store.state.ui == 'main') {
                    store.state.ui = 'pause'
                } else if (store.state.ui == 'pause') {
                    store.state.ui = 'main'
                }
            }
            let data = {
                type: 'KEY_UP',
                value: e.key
            }
            store.commit('handleEvent', data)
            // this.app.pull(data)
        })
    }
    start() {
        const options = {
            store: store,
            template: '<i-program></i-program>'
        }
        window.app = Vue.createApp(options)
        app.use(store)
        components.forEach(component => {
            app.component(component[0], component[1])
        })
        app.mount('#app')
    }
    // register(data) {
    //     window.app = new Vue({
    //         el: '#root',
    //         data: { data: data },
    //         methods: {
    //             pull: function (data) {
    //                 AST.parse(this.$root, data)
    //             },
    //             send: function (data) {
    //                 let event = new CustomEvent('send', { detail: data })
    //                 document.dispatchEvent(event)
    //             }
    //         },
    //         template: '<i-program :data=data></i-program>',
    //     })
    // }
}
// Vue.component('i-program', {
//     props: {
//         data: Object
//     },
//     render: function (createElement) {
//         if (this.data.data.ui == 'console') {
//             return createElement('i-console', {
//                 props: {
//                     data: this.data
//                 }
//             })
//         } else if (this.data.data.ui == 'intro') {
//             return createElement('i-intro', {
//                 props: {
//                     data: this.data
//                 }
//             })
//         } else if (this.data.data.ui == 'pause') {
//             return createElement('i-pause', {
//                 props: {
//                     data: this.data
//                 }
//             })
//         } else if (this.data.data.ui == 'main') {
//             return createElement('i-main', {
//                 props: {
//                     data: this.data
//                 }
//             })
//         }
//     }
// })