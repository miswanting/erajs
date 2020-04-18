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
        document.getElementById('root').addEventListener("mouseup", (e) => {
            console.log('[DEBG]鼠标点击：', e.which);
            let data = {
                type: 'MOUSE_CLICK',
                value: e.which
            }
            this.pull(data)
        })
        document.getElementById('root').addEventListener("keyup", (e) => {
            console.log('[DEBG]键盘按下：', e.key);
        })
    }
    push = (data) => { this.update(data) }
    pull = (data) => { this.emit('pull', data) }
    update = (data) => {
        let container = null
        if (data.ui == 'intro') {
            container = Intro(data)
        } else if (data.ui == 'game') {
            container = Game(data)
        }
        ReactDOM.render(
            container,
            document.getElementById('root')
        )
    }
}