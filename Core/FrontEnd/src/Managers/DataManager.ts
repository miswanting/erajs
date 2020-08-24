import { EventEmitter } from 'events'
export default class DataManager extends EventEmitter {
    private data = {
        title: 'Era.js',
        displayMode: Window.Intro,
        isConnected: false,
        isLoaded: false,
        showConsole: false,
        showSystemMenu: false,
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
        header: {},
        CMD: null
    }
    constructor() {
        super()
    }
    init() {
        this.data.CMD = this.cmd
        this.data.console.CMD = this.cmd
    }
    start() {
        this.emit('change', this.data)
    }
    onRecv() { }
    onAct(e) {
        if (!this.data.showConsole && e.key == '`') {
            this.data.showConsole = true
            this.emit('change', this.data)
        } else if (this.data.showConsole && e.keyCode == 27) {
            this.data.showConsole = false
            this.emit('change', this.data)
        } else if (e.keyCode == 27) {
            this.data.showSystemMenu = !this.data.showSystemMenu
            this.emit('change', this.data)
        }
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
            this.emit('change', this.data)
        } else if (bag.type == Event.MenuItemClick) {
            if (bag.data == "可视化代码") {
                this.data.displayMode = Window.CodeEditor
            }
        } else if (bag.type == Event.IntroComplete) {
            let bag = {
                type: 'intro_complete'
            }
            this.emit('send', bag)
            this.data.displayMode = Window.Game
            this.emit('change', this.data)
        }
    }
}


export enum Event {
    ConsoleInput,
    ConsoleOutput,
    MenuItemClick,
    IntroComplete
}
export enum Window {
    Intro,
    Game,
    AvantarEditor,
    CodeEditor,
    MapEditor,
}