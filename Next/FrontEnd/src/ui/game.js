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
        else if (this.data.type == 'heading') { inlineType = 'i-heading' }
        else if (this.data.type == 'link') { inlineType = 'i-link' }
        else if (this.data.type == 'progress') { inlineType = 'i-progress' }
        else if (this.data.type == 'rate') { inlineType = 'i-rate' }
        else if (this.data.type == 'check') { inlineType = 'i-check' }
        else if (this.data.type == 'radio') { inlineType = 'i-radio' }
        else if (this.data.type == 'input') { inlineType = 'i-input' }
        else if (this.data.type == 'dropdown') { inlineType = 'i-dropdown' }
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
            this.$root.pull({
                type: 'BUTTON_CLICK',
                hash: this.data.data.hash
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
Vue.component('i-heading', {
    props: {
        data: Object
    },
    render: function (createElement) {
        return createElement('h' + this.data.data.rank.toString(),
            {},
            this.data.data.text
        )
    }
})
Vue.component('i-link', {
    props: {
        data: Object
    },
    methods: {
        click: function () {
            this.$root.pull({
                type: 'LINK_CLICK',
                hash: this.data.data.hash
            })
        }
    },
    render: function (createElement) {
        return createElement('span',
            {
                class: 'link',
                on: {
                    click: this.click
                }
            },
            this.data.data.text
        )
    }
})
Vue.component('i-progress', {
    props: {
        data: Object
    },
    render: function (createElement) {
        if (!this.data.style[0].hasOwnProperty('width')) {
            this.data.style[0].width = '100px'
        }
        this.data.style[1].width = `${this.data.data.now / this.data.data.max * 100}%`
        return createElement('span', {
            class: 'progress',
            style: this.data.style[0]
        },
            [
                createElement('span', {
                    class: 'bar',
                    style: this.data.style[1]
                },
                    this.data.data.text
                )
            ]
        )
    }
})
Vue.component('i-rate', {
    props: {
        data: Object
    },
    data: function () {
        let falseIcon = '☆';
        let trueIcon = '★';
        if (this.data.style.hasOwnProperty('false_icon')) {
            falseIcon = this.data.style.false_icon;
        }

        if (this.data.style.hasOwnProperty('true_icon')) {
            trueIcon = this.data.style.true_icon;
        }
        return {
            now: this.data.data.now,
            falseIcon: falseIcon,
            trueIcon: trueIcon,
        }
    },
    methods: {
        click: function (i) {
            if (i == this.now) {
                i = 0
            }
            this.$root.pull({
                type: 'RATE_CLICK',
                value: i,
                hash: this.data.data.hash
            })
            this.now = i
        }
    },
    render: function (createElement) {
        rateList = []
        for (let i = 0; i < this.data.data.max; i++) {
            if (i < this.now) {
                rateList.push(
                    createElement('span', {
                        class: 'rate-item',
                        on: {
                            click: () => { this.click(i + 1) }
                        }
                    }, this.trueIcon))
            } else {
                rateList.push(
                    createElement('span', {
                        class: 'rate-item',
                        on: {
                            click: () => { this.click(i + 1) }
                        }
                    }, this.falseIcon))
            }
        }
        return createElement('span', {
            class: 'rate',
            style: this.data.style
        }, rateList)
    }
})
Vue.component('i-check', {
    props: {
        data: Object
    },
    data: function () {
        let falseIcon = '◻';
        let trueIcon = '◼';
        if (this.data.style.hasOwnProperty('false_icon')) {
            falseIcon = this.data.style.false_icon;
        }

        if (this.data.style.hasOwnProperty('true_icon')) {
            trueIcon = this.data.style.true_icon;
        }
        return {
            value: this.data.data.default,
            falseIcon: falseIcon,
            trueIcon: trueIcon,
        }
    },
    methods: {
        click: function () {
            this.$root.pull({
                type: 'CHECK_CHANGE',
                value: !this.value,
                hash: this.data.data.hash
            })
            this.value = !this.value
        }
    },
    render: function (createElement) {
        let valueText = this.value ? this.trueIcon : this.falseIcon
        return createElement('span', {
            class: 'check',
            on: { click: this.click }
        },
            [
                createElement('span', {
                    class: 'check-value'
                }, valueText),
                createElement('span', {
                    class: 'check-text'
                }, this.data.data.text)
            ]
        )
    }
})
Vue.component('i-radio', {
    props: {
        data: Object
    },
    data: function () {
        let falseIcon = '◻';
        let trueIcon = '◼';
        if (this.data.style.hasOwnProperty('false_icon')) {
            falseIcon = this.data.style.false_icon;
        }

        if (this.data.style.hasOwnProperty('true_icon')) {
            trueIcon = this.data.style.true_icon;
        }
        return {
            value: this.data.data.default_index,
            falseIcon: falseIcon,
            trueIcon: trueIcon,
        }
    },
    methods: {
        click: function (i) {
            this.$root.pull({
                type: 'RADIO_CHANGE',
                value: i,
                hash: this.data.data.hash
            })
            this.value = i
        }
    },
    render: function (createElement) {
        let radioList = []
        for (let i = 0; i < this.data.data.text_list.length; i++) {
            let valueText = this.value == i ? this.trueIcon : this.falseIcon
            radioList.push(
                createElement('span', {
                    class: 'radio-item',
                    style: this.data.style,
                    on: {
                        click: () => { this.click(i) }
                    }
                }, [
                    createElement('span', {
                        class: 'radio-value',
                    }, valueText),
                    createElement('span', {
                        class: 'radio-text',
                    }, this.data.data.text_list[i])
                ])
            )
        }
        return createElement('span',
            { class: 'radio' },
            radioList
        )
    }
})
Vue.component('i-input', {
    props: {
        data: Object
    },
    data: function () {
        return {
            value: this.data.data.default
        }
    },
    // watch: {
    //     value: function (v, prev) {
    //         console.log(v, prev);
    //     }
    // },
    // methods: {
    //     change: function () {
    //         this.$root.pull({
    //             type: 'INPUT_CHANGE',
    //             value: e.target.value,
    //             hash: this.data.data.hash
    //         })
    //     }
    // },
    template: `<span class="input">[<editable :data=data :content.sync="value"></editable>]</span>`
})
Vue.component('editable', {
    template: `<span contenteditable="true" @input="$emit('update:content', $event.target.innerText)"></span>`,
    props: ['data', 'content'],
    mounted: function () {
        this.$el.innerText = this.content;
    },
    watch: {
        content: function () {
            this.$root.pull({
                type: 'INPUT_CHANGE',
                value: this.content,
                hash: this.data.data.hash
            })
        }
    }
});
Vue.component('i-dropdown', {
    props: {
        data: Object
    },
    methods: {
        click: function () {
            this.$root.pull({
                type: 'LINK_CLICK',
                hash: this.data.data.hash
            })
        }
    },
    render: function (createElement) {
        return createElement('span',
            {
                class: 'link',
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