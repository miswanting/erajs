// const { remote } = require('electron')

Vue.component('i-header', {
    props: {
        data: Object
    },
    template: '<header><menu-bar :data=data></menu-bar><i-title :data=data></i-title><operator-bar :data=data></operator-bar></header>'
})
Vue.component('menu-bar', {
    props: {
        data: Object
    },
    render: function (createElement) {
        let menus = []
        for (let i = 0; i < this.data.data.menu.length; i++) {
            menus.push(
                createElement('i-menu', {
                    key: i,
                    props: {
                        data: this.data.data.menu[i]
                    }
                })
            )
        }
        return createElement('div', { class: "menu-bar" }, menus)
    }
})
Vue.component('i-menu', {
    props: {
        data: Object
    },
    data: function () {
        return {
            show: false
        }
    },
    methods: {
        click: function () {
            this.show = !this.show
        }
    },
    render: function (createElement) {
        let menuList = null
        if (this.data.hasOwnProperty('submenu')) {
            let submenus = []
            for (let i = 0; i < this.data.submenu.length; i++) {
                submenus.push(
                    createElement('i-menu',
                        {
                            key: i,
                            props: {
                                data: this.data.submenu[i]
                            }
                        },
                    )
                )
            }
            let listStyle = {}
            if (!this.show) {
                listStyle = { display: 'none' }
            }
            menuList = createElement('div', { class: "menu-anchor" },
                [
                    createElement('div', { class: "menu-list", style: listStyle },
                        submenus
                    )
                ]
            )
        }
        return createElement('div', { class: "menu" },
            [
                createElement('div', {
                    class: "menu-button",
                    on: {
                        click: this.click
                    }
                }, this.data.label),
                menuList
            ]
        )
    }
})
Vue.component('i-title', {
    props: {
        data: Object
    },
    template: '<div class="title">{{data.data.title}}</div>'
})
Vue.component('operator-bar', {
    props: {
        data: Object
    },
    data: function () {
        return {
            isMax: false
        }
    },
    methods: {
        min: function () {
            remote.getCurrentWindow().minimize()
        },
        max: function () {
            if (this.isMax) {
                remote.getCurrentWindow().unmaximize()
            } else {
                remote.getCurrentWindow().maximize()
            }
            this.isMax = !this.isMax
        },
        close: function () {
            remote.getCurrentWindow().close()
        }
    },
    template: '<div class="operator-bar"><div class="min" @click="min()">●</div><div class="max" @click="max()">●</div><div class="close" @click="close()">●</div></div>'
})