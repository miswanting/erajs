// const { json } = require("d3")

Vue.component('i-main', {
    props: {
        data: Object
    },
    template: '<body><i-header :data=data></i-header><i-main :data=data></i-main><i-footer :data=data></i-footer></body>'
})
Vue.component('i-main', {
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
Vue.component('i-block', {
    props: {
        data: Object
    },
    render: function (createElement) {
        let blockType = null;
        if (this.data.type == 'line') { blockType = 'i-line' }
        return createElement(blockType, {
            props: {
                data: this.data
            }
        })
    }
})
Vue.component('i-line', {
    props: {
        data: Object
    },
    render: function (createElement) {
        let inlines = [];
        for (let i = 0; i < this.data.children.length; i++) {
            inlines.push(createElement('i-inline',
                {
                    key: i,
                    props: {
                        data: this.data.children[i]
                    }
                }
            ))
        }
        return createElement('div',
            { class: 'line' },
            inlines
        )
    }
})