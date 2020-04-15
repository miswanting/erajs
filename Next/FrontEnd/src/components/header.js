const React = require('../../node_modules/react')

module.exports = function Header(props) {
    return (
        React.createElement('div', { className: 'header' },
            React.createElement(
                MenuBar
            ),
            React.createElement(
                Title, { data: { text: 'Era.js' } },
            ),
            React.createElement(
                WindowOperatorBar
            )
        )
    )
}
function MenuBar(props) {
    return (
        React.createElement('span', { className: 'menu-bar' },
            React.createElement(
                'span',
                { className: 'menu' },
                '≡'  // ☰
            ),
            React.createElement(
                'span',
                { className: 'menu-add' },
                '+'  // ＋
            )
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
function WindowOperatorBar(props) {
    return (
        React.createElement('span', { className: 'window-operator-bar' },
            React.createElement('span', { className: 'min' }, '●'),
            React.createElement('span', { className: 'max' }, '●'),
            React.createElement('span', { className: 'close' }, '●')
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
