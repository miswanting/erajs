const React = require('../../node_modules/react')
const Header = require('../components/header')
const Container = require('../components/container')
const Footer = require('../components/footer')
module.exports = function Game(props) {
    return (
        React.createElement(
            'div',
            { className: 'window' },
            React.createElement(Header, props),
            React.createElement(Container, props),
            React.createElement(Footer, props)
        )
    )
}