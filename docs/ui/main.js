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
                        data: this.data.children.main.children[i]
                    }
                }
            ))
        }
        return createElement(
            'main',
            {},
            sections
        )
    }
})
Vue.component('i-section', {
    props: {
        data: Object
    },
    render: function (createElement) {
        let blocks = [];
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
        return createElement('section', {}, blocks)
    }
})