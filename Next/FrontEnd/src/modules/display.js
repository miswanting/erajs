const { EventEmitter } = require('events')

const React = require('../../node_modules/react')
const ReactDOM = require('../../node_modules/react-dom')

const Header = require('../components/header')
module.exports = class DisplayManager extends EventEmitter {
    constructor() {
        super()
    }
    init = () => { }
    start = () => {
        this.update({})
    }
    update = (data) => {
        ReactDOM.render(
            Game(data),
            document.getElementById('root')
        )
    }
}
function Game(props) {
    return (
        React.createElement(
            'div',
            { className: 'window' },
            React.createElement(
                Header,
                { className: 'header' },
            )
            , React.createElement(
                'div',
                { className: 'container' },
            ), React.createElement(
                'div',
                { className: 'footer' },
            )
        )
    )
}