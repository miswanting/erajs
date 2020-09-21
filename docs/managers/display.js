class DisplayManager {
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
                if (this.#app.data.data.ui == 'main') {
                    this.#app.data.data.ui = 'pause'
                } else if (this.#app.data.data.ui == 'pause') {
                    this.#app.data.data.ui = 'main'
                }
            }
        })
    }
    register(data) {
        this.#app = new Vue({
            el: '#root',
            data: { data: data },
            methods: {
                pull: function (data) {
                    AST.parse(this.$root, data)
                },
                send: function (data) {
                    let event = new CustomEvent('send', { detail: data })
                    document.dispatchEvent(event)
                }
            },
            template: '<i-homepage :data=data></i-homepage>',
        })
    }
}
Vue.component('i-homepage', {
    props: {
        data: Object
    },
    template: `<body class="website">
    <header>
        <div>Era.js Game Engine</div>
        <div>Doc</div>
        <div>Download</div>
        <div>repo</div>
    </header>
    <main>
        <section class="heading">
            <h1>Era.js</h1>
            <p>Next-Generation Rich-Text Game Engine.</p>
        </section>
        <div class="anchor">
            <i-program :data=data></i-program>
        </div>
        <section class="description">
            <p>test</p>
        </section>
    </main>
    <footer></footer>
</body>`
})
Vue.component('i-program', {
    props: {
        data: Object
    },
    render: function (createElement) {
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
        } else if (this.data.data.ui == 'main') {
            return createElement('i-main', {
                props: {
                    data: this.data
                }
            })
        }
    }
})