// const { json } = require("d3")

Vue.component('i-main', {
    props: {
        data: Object
    },
    template: '<body class="main"><i-header :data=data></i-header><i-container :data=data></i-container><i-footer :data=data></i-footer></body>'
})
Vue.component('i-container', {
    props: {
        data: Object
    },
    render: function (createElement) {
        let sections = []
        for (let i = 0; i < this.data.children.main.children.length; i++) {
            sections.push(createElement('i-section',
                {
                    key: i,
                    props: {
                        data: this.data.children.main.children[i],
                        disabled: i < this.data.children.main.children.length - 1 ? true : false
                    },
                }
            ))
        }
        return createElement(
            'main',
            {
                class: {
                    'span-charm': true
                }
            },
            sections
        )
    }
})
Vue.component('i-section', {
    props: {
        data: Object,
        disabled: Boolean
    },
    render: function (createElement) {
        let blocks = [createElement('i-disable-mask')];
        for (let i = 0; i < this.data.children.length; i++) {
            blocks.push(createElement('i-block',
                {
                    key: i,
                    props: {
                        data: this.data.children[i]
                    }
                }
            ))
        }
        return createElement('section', {
            class: {
                disabled: this.disabled
            }
        }, blocks)
    }
})
Vue.component('i-disable-mask', {
    template: `<div class="disable-mask"><div>`
})