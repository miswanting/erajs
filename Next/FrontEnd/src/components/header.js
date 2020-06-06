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
    const templete = [
        {
            label: '文件',
            submenu: [
                { label: '新建' },
                { label: '打开' },
                {
                    label: '最近打开的文件',
                    submenu: [
                        { label: 'File 1' },
                        { label: 'File 2' },
                        { label: 'File 3' }
                    ]
                }
            ]
        },
        { label: '编辑' },
        { label: '窗口' },
        { label: '帮助' },
        { label: '+' }
    ]
    let menus = []
    for (let i = 0; i < templete.length; i++) {
        const d = templete[i];
        menus.push(React.createElement(MenuItem, d))
    }
    return (React.createElement('div', { className: 'menu-bar' }, menus))
}
function MenuItem(props) {
    const [show, setShow] = React.useState(false)
    click = () => {
        if (props.hasOwnProperty('submenu')) {
            setShow(!show)
        } else {
            // Do
        }
    }
    if (props.hasOwnProperty('submenu')) {
        let container = null
        if (show) {
            let menus = []
            for (let i = 0; i < props.submenu.length; i++) {
                const d = props.submenu[i];
                menus.push(React.createElement(MenuItem, d))
            }
            container = React.createElement(
                'div', { className: 'menu-anchor' },
                React.createElement('div', { className: 'menu-list' }, menus)
            )
        }
        return (
            React.createElement(
                'div',
                { className: 'menu-item has-menu' },
                React.createElement(
                    'div',
                    {
                        className: 'menu-button',
                        onClick: click
                    },
                    props.label
                ),
                container
            )
        )
    } else {
        return (
            React.createElement(
                'div',
                { className: 'menu-item' },
                React.createElement(
                    'div', { className: 'menu-button' }, props.label
                )
            )
        )
    }
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
