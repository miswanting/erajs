import { EventEmitter } from 'events'

import WindowManager from './managers/WindowManager'
import NetManager from './managers/NetManager'
import BackManager from './managers/BackManager'

// 前端管理器
export default class FrontManager extends EventEmitter {
    public data = {
        window: null, // 窗口管理器
        net: null, // 网络管理器
        back: null, // 进程管理器
    }
    constructor() {
        super()
        this.data.window = new WindowManager()
        this.data.net = new NetManager()
        this.data.back = new BackManager()
    }
    public init() {
        this.data.window.init()
        this.data.net.init()
        this.data.back.init()
    }
    public start() {
        this.data.window.start()
        this.data.window.on('RECV_FROM_RENDERER', (bag: any) => { // 前端有数据返回
            if (bag.to == 'b') {
                // console.log('[DEBG]转发(B<=R)：', bag) // 生产环境下请注释掉
                this.data.net.sendBack(bag)
                return
            }
        })
        this.data.net.connect('back')
        this.data.net.on('RECV_FROM_BACK', (bag: any) => { // 收到后端消息
            // console.log('[DEBG]自后端接收：', bag) // 生产环境下请注释掉
            if (bag.to == 'r') {
                // console.log('[DEBG]转发(B=>R)：', bag) // 生产环境下请注释掉
                this.data.window.send(bag)
            }
        })
        this.data.net.start()
        this.data.back.start()
    }
}
let front: FrontManager = new FrontManager()
front.init()
front.start()