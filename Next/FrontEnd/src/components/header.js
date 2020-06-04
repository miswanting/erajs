const React = require('../../node_modules/react')
const { remote } = require('electron')

module.exports = function Header(props) {
    return (
        React.createElement('div', { className: 'header' },
            React.createElement(
                MenuBar, props
            ),
            React.createElement(
                Title, props
            ),
            React.createElement(
                WindowOperatorBar, props
            )
        )
    )
}
/**
 * 
 * @param {*} props 
 */
function MenuBar(props) {
    return (
        React.createElement('span', { className: 'menu-bar' },
            React.createElement(Menu),
            React.createElement(MenuAdd)
        )
    )
}

function Menu(props) {
    const [show, setShow] = React.useState(false)
    showList = [React.createElement(
        'span',
        {
            className: 'menu-button',
            onClick: () => { setShow(!show) }
        },
        '≡'  // ☰
    )]
    if (show) {
        showList.push(
            React.createElement(
                'div', { className: 'menu-list' }, [
                React.createElement('div', { className: 'menu-item' }, '文件'),
                React.createElement('div', { className: 'menu-item' }, '编辑'),
                React.createElement('div', { className: 'menu-item' }, '窗口'),
                React.createElement('div', { className: 'menu-item' }, '帮助')
            ]
            ))
    }
    return (
        React.createElement('span', { className: 'menu' }, showList)
    )
}

function MenuAdd(props) {
    const [show, setShow] = React.useState(false)
    showList = [React.createElement(
        'span',
        {
            className: 'menu-add-button',
            onClick: () => { setShow(!show) }
        },
        '+'  // ＋
    )]
    if (show) {
        showList.push(
            React.createElement(
                'div', { className: 'menu-list' }, [
                React.createElement('div', { className: 'menu-item' }, '文件'),
                React.createElement('div', { className: 'menu-item' }, '编辑'),
                React.createElement('div', { className: 'menu-item' }, '窗口'),
                React.createElement('div', { className: 'menu-item' }, '帮助')
            ]
            ))
    }
    return (
        React.createElement('span', { className: 'menu' }, showList)
    )
    // return (
    //     React.createElement(
    //         'span',
    //         { className: 'menu-add' },
    //         '+'  // ＋
    //     )
    // )
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
    const click = (type) => {
        // console.log(123);
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
