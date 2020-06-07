const React = require('../../node_modules/react')
const anime = require('../../node_modules/animejs')
const Header = require('../components/header')
const Container = require('../components/container')
const Footer = require('../components/footer')
module.exports = function Game(props) {
    return (
        React.createElement(
            'div',
            { className: 'window' },
            React.createElement(Header, props),
            React.createElement(ToastSystem, props),
            React.createElement(Container, props),
            React.createElement(Footer, props)
        )
    )
}
function ToastSystem(props) {
    return (
        React.createElement(
            'div',
            { className: 'toast-bar' },
            React.createElement(
                'div',
                { className: 'toast-anchor' },
                React.createElement(ToastList)
            )
        )
    )
}
function ToastList(props) {
    return (
        React.createElement(
            'div',
            { className: 'toast-list' },
            [
                React.createElement(ToastItem),
                // React.createElement(ToastItem)
            ]
        )
    )
}
function ToastItem(props) {
    // const [show, setShow] = React.useState(false)
    React.useEffect(() => {
        anime({
            targets: '.toast-item',
            translateX: [150, 0],
            delay: 1000,
            duration: 4000,
            easing: 'easeOutCubic',
            complete: () => {
                anime({
                    targets: '.toast-item',
                    translateX: [0, 150],
                    delay: 1000,
                    duration: 4000,
                    easing: 'easeOutCubic'
                });
            }
        });
    }, [])
    return (
        React.createElement(
            'div',
            { className: 'toast-item' },
            '弹出消息'
        )
    )
}