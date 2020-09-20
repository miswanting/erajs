Vue.component('i-block', {
    props: {
        data: Object
    },
    render: function (createElement) {
        let blockType = null;
        if (this.data.type == 'line') { blockType = 'i-line' }
        else if (this.data.type == 'grid') { blockType = 'i-grid' }
        else if (this.data.type == 'divider') { blockType = 'i-divider' }
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
Vue.component('i-grid', {
    props: {
        data: Object
    },
    render: function (createElement) {
        let columns = []
        let column = []
        for (let i = 0; i < this.data.children.length; i++) {
            const rawElement = this.data.children[i]
            if (rawElement.type != 'pass') {
                column.push(createElement('i-inline',
                    {
                        key: i,
                        props: {
                            data: rawElement
                        }
                    }
                ))
            } else {
                if (column.length == 0) {
                    column.push(createElement('br'))
                }
                columns.push(createElement('td',
                    {
                        key: i,
                        style: null
                    },
                    column
                ))
                column = []
            }
        }
        if (column.length == 0) {
            column.push(createElement('br'))
        }
        columns.push(createElement('td',
            {
                style: null
            },
            column
        ))
        let rows = []
        for (let i = 0; i < Math.ceil(columns.length / this.data.data.column); i++) {
            let row = []
            for (let j = 0; j < this.data.data.column; j++) {
                if (i * this.data.data.column + j < columns.length) {
                    row.push(columns[i * this.data.data.column + j])
                } else {
                    row.push(createElement('tr',
                        {
                            style: null
                        }
                    ))
                }
            }
            rows.push(createElement('tr',
                {
                    style: null,
                    key: i
                },
                row
            ))
        }
        return createElement('table',
            { style: null },
            [
                createElement('tbody',
                    {
                        style: null
                    },
                    rows
                )
            ]
        )
    }
})
Vue.component('i-divider', {
    props: {
        data: Object
    },
    render: function (createElement) {
        return createElement('div',
            { class: 'divider' },
            [
                createElement('div',
                    { class: 'divider-line' }
                ),
                createElement('div',
                    { class: 'divider-text' },
                    this.data.data.text
                ),
                createElement('div',
                    { class: 'divider-line' }
                )
            ]
        )
    }
})