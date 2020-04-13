const React = require('../../node_modules/react')
module.exports = function Header(props) {
    return (
        React.createElement(
            'div',
            { className: 'header' },
            React.createElement(
                Menu, { data: { text: '视图' } },
            ), React.createElement(
                Menu, { data: { text: '帮助' } },
            ), React.createElement(
                Title, { data: { text: 'Era.js' } },
            ), React.createElement(
                Min
            ), React.createElement(
                Max
            ), React.createElement(
                Close
            )
        )
    )
}
function Menu(props) {
    return (
        React.createElement(
            'span',
            { className: 'menu' },
            props.data.text
        )
    )
}
function Title(props) {
    return (
        React.createElement(
            'span',
            { className: 'title' },
            props.data.text
        )
    )
}

function Min(props) {
    return (
        React.createElement(
            'span',
            { className: 'min' }
        )
    )
}

function Max(props) {
    return (
        React.createElement(
            'span',
            { className: 'max' }
        )
    )
}

function Close(props) {
    return (
        React.createElement(
            'span',
            { className: 'close' }
        )
    )
}
