const { EventEmitter } = require('events')

const React = require('../../node_modules/react')
const ReactDOM = require('../../node_modules/react-dom')

// const Header = require('../components/header')
const Intro = require('../ui/intro')
const Game = require('../ui/game')
module.exports = class DisplayManager extends EventEmitter {
    constructor() {
        super()
    }
    init = () => { }
    start = () => {
        this.update({})
    }
    push = (data) => { this.update(data) }
    pull = (data) => { this.emit('pull', data) }
    update = (data) => {
        let container = null
        if (data.mode == 'intro') {
            container = Intro(data)
        } else if (data.mode == 'game') {
            container = Game(data)
        }
        ReactDOM.render(
            container,
            document.getElementById('root')
        )
    }
}