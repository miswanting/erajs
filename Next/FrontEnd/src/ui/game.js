// const { json } = require("d3")

Vue.component('i-game', {
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
        for (let i = 0; i < this.data.children.game.children.length; i++) {
            sections.push(createElement('i-section',
                {
                    key: i,
                    props: {
                        data: this.data.children.game.children[i]
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
Vue.component('i-inline', {
    props: {
        data: Object
    },
    render: function (createElement) {
        let inlineType = null;
        console.log(this.data.type);
        if (this.data.type == 'text') { inlineType = 'i-text' }
        else if (this.data.type == 'button') { inlineType = 'i-button' }
        else { inlineType = 'i-other' }
        return createElement(inlineType, {
            props: {
                data: this.data
            }
        })
    }
})
Vue.component('i-text', {
    props: {
        data: Object
    },
    render: function (createElement) {
        return createElement('span',
            {},
            this.data.data.text
        )
    }
})
Vue.component('i-button', {
    props: {
        data: Object
    },
    methods: {
        click: function () {
            this.$root.callback({
                type: 'pull',
                data: {
                    type: 'BUTTON_CLICK',
                    target: this.data.data.hash
                }
            })
        }
    },
    render: function (createElement) {
        return createElement('span',
            {
                class: 'button',
                on: {
                    click: this.click
                }
            },
            this.data.data.text
        )
    }
})
Vue.component('i-other', {
    props: {
        data: Object
    },
    render: function (createElement) {
        console.log(this.data);
        return createElement('span',
            {},
            JSON.stringify(this.data)
        )
    }
})