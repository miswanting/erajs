import { EventEmitter } from 'events'
import { remote, ipcRenderer } from 'electron';
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as d3 from 'd3'
import { Delaunay } from "d3-delaunay"
import SimplexNoise from 'simplex-noise'
// 前端选择
// import App from "../semantic-ui/App"; // sematic-ui-react
// import App from "../semantic-ui-react/App"; // sematic-ui-react
import App from "../span-charm-react/App"; // span-charm-react
import { isNullOrUndefined } from 'util';
// import App from "../editor-react/App"
export enum Event {
    ConsoleInput,
    ConsoleOutput,
    MenuItemClick
}
export enum Window {
    Game,
    AvantarEditor,
    CodeEditor,
    MapEditor,
}
/**
 * 显示管理器
 * 
 * 管理窗口的显示内容，如页面类型等
 */
export default class DisplayManager extends EventEmitter {
    private data = {
        title: 'Era.js',
        displayMode: Window.Game,
        isConnected: false,
        isLoaded: false,
        isConsole: false,
        isMenu: false,
        mode: { mode: 'default' },
        pages: { // 游戏界面
            children: []
        },
        console: { // 终端界面
            CMD: null,
            children: []
        },
        map: { // 地图界面
        },
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
    public init() {
        this.data.CMD = this.cmd
        this.data.console.CMD = this.cmd
    }
    public push(bag: any) {
        // console.log(bag);
        if (bag.type == 'connected') {
            console.log('[DEBG]后端已连接！')
            this.data.isConnected = true
            this.update()
            // this.data.display.update(app)
        } else if (bag.type == 'loaded') {
            console.log('[DONE]后端数据加载完成！')
            this.data.isLoaded = true
            this.update()
            // this.data.display.update(app)
        } else if (bag.type == 'title') {
            document.title = bag.value
            this.data.title = bag.value
            this.update()
        } else if (['connected'].indexOf(bag.type) != -1) { }
        else if ([
            't',
            'b',
            'h',
            'progress',
            'rate',
            'check',
            'radio',
            'input',
            'chart',
            'dropdown'
        ].indexOf(bag.type) != -1) {
            // 确保pages不为空
            if (this.data.pages.children.length == 0) {
                this.data.pages.children.push({ type: 'page', children: [] })
            }
            // 确保page不为空
            let lastPageIndex = this.data.pages.children.length - 1 // 最后一个Page的index
            if (bag.type == 't' && bag.value.text == '' && this.data.mode.mode == 'default') { // 最后一个t的值为空：空行
                this.data.pages.children[lastPageIndex].children.push({ type: 'line', children: [] })
            } else {
                if (this.data.pages.children[lastPageIndex].children.length == 0) {
                    this.data.pages.children[lastPageIndex].children.push({ type: 'line', children: [] })
                }
                // 在最后一个块的末尾加上控件
                let lastBlockIndex = this.data.pages.children[lastPageIndex].children.length - 1 // 最后一个Line的index
                if ([
                    'b',
                    'rate',
                    'check',
                    'radio',
                    'input',
                    'dropdown'
                ].indexOf(bag.type) != -1) {
                    bag.value.func = this.send // 向虚拟树中装载发射函数
                }
                this.data.pages.children[lastPageIndex].children[lastBlockIndex].children.push(bag) // 核心语句
            }
            this.update()
            // this.data.display.update(app)
        }
        else if (bag.type == 'page') { // 页面
            this.data.pages.children.push({ type: 'page', data: bag.value, children: [] })
            for (let i = 0; i < this.data.pages.children.length - 10; i++) { // 超出5页就删除老的
                this.data.pages.children.splice(0, 1)
            }
            this.update()
        } else if (bag.type == 'mode') { // 改变显示模式
            this.data.mode = bag.value
            if (this.data.mode.mode == 'grid') {
                if (this.data.pages.children.length == 0) { // 确保生成dropdown之前存在Page
                    this.data.pages.children.push({ type: 'page', children: [] })
                }
                let iPage = this.data.pages.children.length - 1 // 最后一个Page的index
                this.data.pages.children[iPage].children.push({ type: 'grid', value: bag.value, children: [] })
                this.update()
                // this.data.display.update(app)
            }
        } else if (bag.type == 'divider') { // 改变显示模式
            this.data.mode = { mode: 'default' }
            if (this.data.pages.children.length == 0) { // 确保生成dropdown之前存在Page
                this.data.pages.children.push({ type: 'page', children: [] })
            }
            let iPage = this.data.pages.children.length - 1 // 最后一个Page的index
            this.data.pages.children[iPage].children.push({ type: 'divider', value: bag.value, children: [] })
            this.update()
        } else if (bag.type == 'clear') { // 清除所有内容
            if (bag.value['num'] == 0) {
                this.data.pages.children = []
            } else {
                for (let i = 0; i < bag.value['num']; i++) {
                    this.data.pages.children.pop()
                }
            }
            this.update()
            // this.data.display.update(app)
        } else if (bag.type == 'exit') { // 清除所有内容
            var window = remote.getCurrentWindow();
            window.close();
        } else if (bag.type == 'shake') { // 屏幕抖动
            var window = remote.getCurrentWindow();
            var basePosition: number[] = window.getPosition();
            var time: number = 0
            function shakeOnce() {
                var dx = parseInt((Math.random() * 10).toString())
                var dy = parseInt((Math.random() * 10).toString())
                window.setPosition(basePosition[0] + dx, basePosition[1] + dy)
                time += 1
                if (time >= bag.value.duration) {
                    clearInterval(timer)
                    window.setPosition(basePosition[0], basePosition[1])
                }
            }
            var timer: NodeJS.Timer = setInterval(shakeOnce, 1)
        } else if (bag.type == 'result') { // 控制台返回结果
            this.data.result = bag.value
            this.update()
            // this.data.display.update(app)
        } else if (bag.type == 'load_text') { // 加载文本
            this.data.load_text = bag.value
            this.update()
            // this.data.display.update(app)
        } else if (bag.type == 'avantar_editor') { // 加载文本
            this.data.avantar_editor = bag.value
            this.update()
            // this.data.display.update(app)
        } else if (bag.type == 'map_editor') { // 加载文本
            this.data.map_editor = bag.value
            this.update()
            // this.data.display.update(app)
        } else if (bag.type == 'code_editor') { // 加载文本
            this.data.code_editor = bag.value
            this.update()
            // this.data.display.update(app)
        } else if (bag.type == 'generate_map') { // 加载文本
            const [w, h] = remote.getCurrentWindow().getContentSize()
            var points = []
            function randomPoints(n) {
                for (let i = 0; i < n; i++) {
                    let x = Math.random() * w
                    let y = Math.random() * h
                    points.push([x, y])
                }
            }
            function relaxPoints(n) {
                for (let i = 0; i < n; i++) {
                    const delaunay = Delaunay.from(points);
                    const voronoi = delaunay.voronoi([0, 0, w, h])
                    for (let j = 0; j < points.length; j++) {
                        var cvt: [number, number][] = []
                        for (let k = 0; k < voronoi.cellPolygon(j).length; k++) {
                            var [x, y] = voronoi.cellPolygon(j)[k]
                            cvt.push([x, y])
                        }
                        [points[j][0], points[j][1]] = d3.polygonCentroid(cvt);
                    }
                }
            }
            function generateHeight() {
                var simplex: any = new SimplexNoise()
                const delaunay = Delaunay.from(points);
                var new_points = []
                for (let i = 0; i < delaunay.points.length / 2; i++) {
                    var x = delaunay.points[2 * i]
                    var y = delaunay.points[2 * i + 1]
                    var rate = simplex.noise2D(x * 0.003, y * 0.003)
                    rate = (rate + 1) / 2
                    rate *= rate
                    var height = rate * 10000 - 2000
                    new_points.push([x, y, height])
                }
                return new_points
            }
            function generateMap() {
                var simplex: any = new SimplexNoise()
                const delaunay = Delaunay.from(points);
                var new_points = []
                var node = delaunay.hull
                for (let i = 0; i < delaunay.points.length / 2; i++) {
                    var point = {
                        i: i,
                        x: delaunay.points[2 * i],
                        y: delaunay.points[2 * i + 1],
                        h: 0,
                        n: [],
                    }
                    var rate = simplex.noise2D(point.x * 0.003, point.y * 0.003)
                    rate = (rate + 1) / 2
                    let maxDis = (w + h) / 2
                    let relDis = Math.abs(point.x - w / 2) + Math.abs(point.y - h / 2)
                    let disRate = 100 - (1 - relDis / maxDis) * 99
                    rate = Math.pow(rate, 1 / 10 * disRate)
                    point.h = rate * 10000 - 2000
                    var tmp = delaunay.neighbors(i)
                    while (true) {
                        var n = tmp.next()
                        if (n.done) { break }
                        point.n.push(n.value)
                    }
                    new_points.push(point)
                }
                return new_points
            }

            var generator = new Promise((resolve, reject) => {
                setTimeout(function () {
                    randomPoints(5000)
                    relaxPoints(10)
                    resolve(generateMap())
                }, 100);
            })
            generator.then((value) => {
                let bag = {
                    type: 'MAP_GENERATED',
                    from: 'r',
                    to: 'b',
                    value: value
                }
                this.send(bag)
            })
        }
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
        ipcRenderer.send('bag', msg)
    }
}
