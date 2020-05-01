const React = require('../../node_modules/react')
const { remote } = require('electron')

module.exports = function Header(props) {
    return (
        React.createElement('div', { className: 'header' },
            React.createElement(
                MenuBar
            ),
            React.createElement(
                Title, props,
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
            props.title
        )
    )
}
function WindowOperatorBar(props) {
    click = (type) => {
        console.log(123);
        if (type == 'min') {
            remote.getCurrentWindow().unminimize()
        } else if (type == 'max') {
            if (remote.getCurrentWindow().isMaximized()) {
                remote.getCurrentWindow().unmaximize()
            } else {
                remote.getCurrentWindow().maximize()
            }
        } else if (type == 'close') {
            remote.getCurrentWindow().close()
        }
    }
    return (
        React.createElement('span', { className: 'window-operator-bar' },
            React.createElement('span', {
                className: 'min',
                onClick: () => {
                    click('min')
                }
            }, '●'),
            React.createElement('span', {
                className: 'max',
                onClick: () => { click('max') }
            }, '●'),
            React.createElement('span', {
                className: 'close',
                onClick: () => {
                    click('close')
                }
            }, '●')
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
