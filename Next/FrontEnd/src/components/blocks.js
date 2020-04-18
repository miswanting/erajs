const React = require('../../node_modules/react')
const Inline = require('../components/inlines')
module.exports = function Block(props) {
    let block = null
    // console.log(111, props);

    if (props.type == 'line') {
        block = Line(props)
    } else if (props.type == 'grid') {
        block = Grid(props)
    }
    return (
        block
    )
}

function Line(props) {
    let inlines = []
    for (let i = 0; i < props.children.length; i++) {
        const el = props.children[i];
        if (props.hasOwnProperty('disabled') && props.disabled) {
            el.disabled = true
        }
        inlines.push(Inline(el))
    }
    if (inlines.length == 0) {
        inlines.push(React.createElement('br'))
    }
    return (
        React.createElement(
            'div',
            {
                className: 'line',
                style: props.style
            },
            inlines
        )
    );
}
function Grid(props) {

    let columns = []
    let column = []
    // console.log('!');
    // console.log(props.children.length);
    for (let i = 0; i < props.children.length; i++) {
        const el = props.children[i];
        if (el.type != 'pass') {
            column.push(Inline(el))
        } else {
            if (column.length == 0) {
                column = React.createElement('br')
            }
            columns.push(
                React.createElement(
                    'td',
                    {
                        style: props.style
                    },
                    column
                )
            )
            column = []
        }
    }
    if (column.length == 0) {
        column = React.createElement('br')
    }
    columns.push(
        React.createElement(
            'td',
            {
                style: props.style
            },
            column
        )
    )
    // console.log(columns);
    // console.log(Math.ceil(columns.length / props.data.column));
    let rows = []
    for (let i = 0; i < Math.ceil(columns.length / props.data.column); i++) {
        let row = []
        for (let j = 0; j < props.data.column; j++) {
            if (i * props.data.column + j < columns.length) {
                row.push(columns[i * props.data.column + j])
            } else {
                row.push(React.createElement('tr', { style: props.style }))
            }
        }
        rows.push(
            React.createElement(
                'tr',
                {
                    style: props.style
                },
                row
            )
        )
    }
    // console.log(props, rows);
    return (
        React.createElement(
            'table',
            {
                // data: props.data,
                style: props.style
            },
            React.createElement(
                'tbody',
                {
                    data: props.data,
                    style: props.style
                },
                rows
            )
        )
    );
}