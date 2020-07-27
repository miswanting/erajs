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
    push = (data) => {
        // console.log(data);
        this.update(data)
    }
    pull = (data) => { this.emit('pull', data) }
    update = (data) => {
        let container = null
        if (data.interfaceType == 'intro') {
            container = Intro(data)
        } else if (data.interfaceType == 'game') {
            container = Game(data)
        }
        ReactDOM.render(
            Window(data),
            document.getElementById('root')
        )
    }
}
function Window(props) {
    let container = null
    if (props.interfaceType == 'intro') {
        container = Intro(props)
    } else if (props.interfaceType == 'game') {
        container = Game(props)
    }
    return (
        React.createElement(
            'div',
            { className: 'window' },
            container
        )
    )
}