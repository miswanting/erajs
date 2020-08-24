import { EventEmitter } from 'events'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from "../span-charm-react/App"; // span-charm-react
const STD = React.createContext({ cmd: null })
export default class DisplayManager extends EventEmitter {
    constructor() {
        super()
    }
    public init() {
        window.addEventListener("mouseup", (e) => {
            console.log('[DEBG]鼠标点击：', e.which);
            let bag = {
                type: 'MOUSE_CLICK',
                value: e.which
            }
            this.emit('act', bag)
        })
        window.addEventListener("keydown", (e) => {
            console.log('[DEBG]键盘按下：', e.key);
        })
        window.addEventListener("keyup", (e) => {
            console.log('[DEBG]键盘抬起：', e.key);
            let bag = {
                type: 'keyup',
                value: e.which
            }
            this.emit('act', bag)

        })
    }
    public start() { }
    public send(bag: any) {
        let msg = JSON.stringify(bag)
        // console.log('[DEBG]发送：', msg); // 生产环境下请注释掉
        this.emit('send', msg)
    }
    public recv(msg: any) {
        let bag = JSON.parse(msg)
        // console.log('[DEBG]发送：', msg); // 生产环境下请注释掉
        this.parse(bag)
    }
    private parse(bag: any) { }
    onChange(data) {
        ReactDOM.render(
            <STD.Provider value={{ cmd: this.emit }}>
                <App data={data} />
            </STD.Provider >,
            document.getElementById('root')
        )
    }
}