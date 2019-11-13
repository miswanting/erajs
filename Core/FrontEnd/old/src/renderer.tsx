import { EventEmitter } from 'events'
import { ipcRenderer } from "electron";
import DisplayManager from './managers/DisplayManager'
/**
 * 显示管理器
 * 
 * 管理窗口的显示内容，如页面类型等
 */
export default class RendererManager extends EventEmitter {
    private data = {
        display: null
    }
    constructor() {
        super()
        this.data.display = new DisplayManager()
    }
    public init() {
        this.data.display.init()
        ipcRenderer.on('bag', (event: any, data: string) => {
            var raw = data.toString()
            // 由main打包并发送的bag不需要解除叠包
            var piece = raw.split('}{')
            for (let i = 0; i < piece.length; i++) {
                if (i != piece.length - 1) {
                    piece[i] += '}'
                }
                if (i != 0) {
                    piece[i] = '{' + data[i]
                }
            }
            for (let i = 0; i < piece.length; i++) {
                // console.log('[DEBG]接收：', piece[i]); // 生产环境下请注释掉
                let bag: any = JSON.parse(piece[i])
                this.parseBag(bag)
            }
        })
    }
    public start() {
        this.data.display.start()
    }
    public push() {
    }
    public send(bag: Object) {
        // console.log('[DEBG]发送：', JSON.stringify(bag)); // 生产环境下请注释掉
        ipcRenderer.send('bag', JSON.stringify(bag))
    }
    private parseBag(bag: any) {
        this.data.display.push(bag)
    }
}
let renderer = new RendererManager()
renderer.init()
renderer.start()