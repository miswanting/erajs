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
        // console.log(this.data);
        for (let i = 0; i < this.data.children.game.children.length; i++) {
            console.log(this.data.children.game.children[i]);
            sections.push(createElement('i-section',
                {
                    key: i,
                    data: this.data.children.game.children[i]
                })
            )
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
        return createElement('section')
    }
})

Vue.component('i-line', {
    props: {
        data: Object
    },
    render: function (createElement) {
        return createElement('section')
    }
})