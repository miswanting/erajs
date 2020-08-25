Vue.component('i-main', {
    props: {
        data: Object
    },
    render: function (createElement) {
        let sections = []
        for (let i = 0; i < this.data.children.game.children.length; i++) {
            sections.push(this.data.children.game.children[i])
        }
        return createElement(
            'main',
            {
                data: this.data
            },
            sections
        )
    },
    template: '<main>{{data.children.game}}</main>'
})