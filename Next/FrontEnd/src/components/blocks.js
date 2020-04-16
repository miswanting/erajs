const React = require('../../node_modules/react')
const Inline = require('../components/inlines')
module.exports = function Block(props) {
    let block = null
    console.log(111, props);

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
                className: 'grid',
                data: props.data,
                style: props.style
            },
            inlines
        )
    );
}