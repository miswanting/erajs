import { EventEmitter } from 'events'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from "../span-charm-react/App"; // span-charm-react
export enum Event {
    ConsoleInput,
    ConsoleOutput,
    MenuItemClick
}
export enum Window {
    Intro,
    Game,
    AvantarEditor,
    CodeEditor,
    MapEditor,
}
export default class DisplayManager extends EventEmitter {
    private data = {
        title: 'Era.js',
        displayMode: Window.Intro,
        isConnected: false,
        isLoaded: false,
        isConsole: false,
        isMenu: false,
        mode: { mode: 'default' },
        pages: {
            children: []
        }, // 游戏界面
        console: {
            CMD: null,
            children: []
        }, // 终端界面
        map: {}, // 地图界面
        result: {},
        load_text: '',
        avantar_editor: '',
        map_editor: '',
        code_editor: {
            childron: []
        },
        header: {

        },
        CMD: null
    }
    constructor() {
        super()
    }
    public init() {
        this.data.CMD = this.cmd
        this.data.console.CMD = this.cmd
    }
    public start() {
        window.addEventListener("mouseup", (e) => {
            console.log('[DEBG]鼠标点击：', e.which);
            let bag = {
                type: 'MOUSE_CLICK',
                from: 'r',
                to: 'b',
                value: e.which
            }
            this.send(bag)
        })
        window.addEventListener("keydown", (e) => {
            console.log('[DEBG]键盘按下：', e.key);
        })
        window.addEventListener("keyup", (e) => {
            console.log('[DEBG]键盘抬起：', e.key);
            if (!this.data.isConsole && e.key == '`') {
                this.data.isConsole = true
                this.update()
            } else if (this.data.isConsole && e.keyCode == 27) {
                this.data.isConsole = false
                this.update()
            } else if (e.keyCode == 27) {
                this.data.isMenu = !this.data.isMenu
                this.update()
            }
        })
        this.update()
    }
    public cmd = (bag: any) => {
        if (bag.type == Event.ConsoleInput) {
            this.data.console.children.push({
                in: bag.data,
                out: []
            })
            if (bag.data == 'cls') {
                this.data.console.children = []
            }
            this.update()
        } else if (bag.type == Event.MenuItemClick) {
            if (bag.data == "可视化代码") {
                this.data.displayMode = Window.CodeEditor
            }
        }
    }
    public update() { // 刷新前端
        ReactDOM.render(
            <App data={this.data} />,
            document.getElementById('root')
        )
    }
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
}