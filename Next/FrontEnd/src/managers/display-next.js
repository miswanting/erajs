// const Vue = require('../../node_modules/vue/dist/vue')
module.exports = class DisplayManager {
    #app
    constructor() {
        document.body.addEventListener("mouseup", (e) => {
            console.log('[DEBG]鼠标点击：', e.which);
            let data = {
                type: 'MOUSE_CLICK',
                value: e.which
            }
        })
        document.body.addEventListener("keyup", (e) => {
            console.log('[DEBG]键盘按下：', e.key);
            if (e.key == '`') {
                if (this.#app.data.data.ui != 'console') {
                    this.#app.data.data.lastUi = this.#app.data.data.ui
                    this.#app.data.data.ui = 'console'
                } else if (this.#app.data.data.ui == 'console') {
                    this.#app.data.data.ui = this.#app.data.data.lastUi
                }
            } else if (e.key == 'Escape') {
                if (this.#app.data.data.ui == 'game') {
                    this.#app.data.data.ui = 'pause'
                } else if (this.#app.data.data.ui == 'pause') {
                    this.#app.data.data.ui = 'game'
                }
            }
        })
    }
    register(data) {
        this.#app = new Vue({
            el: '#root',
            data: { data: data },
            template: '<i-program :data=data></i-program>',
        })
    }
}
Vue.component('i-program', {
    props: {
        data: Object
    },
    render: function (createElement) {
        // console.log(this.data);
        if (this.data.data.ui == 'console') {
            return createElement('i-console', {
                props: {
                    data: this.data
                }
            })
        } else if (this.data.data.ui == 'intro') {
            return createElement('i-intro', {
                props: {
                    data: this.data
                }
            })
        } else if (this.data.data.ui == 'pause') {
            return createElement('i-pause', {
                props: {
                    data: this.data
                }
            })
        } else if (this.data.data.ui == 'game') {
            return createElement('i-game', {
                props: {
                    data: this.data
                }
            })
        }
    }
    // template: '<i-console :data=data></i-console>'
})
Vue.component('i-game', {
    props: {
        data: Object
    },
    template: '<body><i-header :data=data></i-header><i-main :data=data></i-main><i-footer :data=data></i-footer></body>'
})