import * as Net from "net"
import { EventEmitter } from 'events'

export default class NetManager extends EventEmitter {
    private data;
    constructor() {
        super()
        this.data = {
            back: null,
            server: null
        }
    }
    public init() { // 配置侦听器
        this.data.back = new BackNode()
        this.data.back.on('recv', (bag: any) => {
            this.emit('recv', bag)
        })
    }
    public start() { // 激活管理器
        this.data.back.start()
    }
    public sendBack(bag) { // 向后端发送数据
        this.data.back.send(bag)
    }
    public sendUp(bag) { // 向服务器发送数据

    }
    public close() {
        this.data.back.close()
    }
}
class UpNode extends EventEmitter { // 多人游戏服务器
    constructor() {
        super()
    }
}
class BackNode extends EventEmitter { // 后端
    private data = {
        server: null,
        connection: null,
        connected: false
    }
    public init() {

    }
    public start() {
        this.data.server = Net.createServer(
            (conn) => {
                this.data.connection = conn
                console.log('[FINE]检测到连接请求！')
                this.data.connected = true
                var bag = { 'type': 'connected', 'from': 'm', 'to': 'r' }
                this.emit('recv', bag)
                // sendToRenderer(bag)
                this.data.connection.on('data', (data: Buffer) => {
                    // 分离、解析后转发
                    let bags = data2bag(data)
                    for (let i = 0; i < bags.length; i++) {
                        this.emit('recv', bags[i])
                        // recvFromBack(bags[i])
                    }
                })
                this.data.connection.on('end', () => {
                    console.log('[DEBG]连接断开！')
                })
                this.data.connection.on('error', (err) => {
                    console.log(err);
                    // app.quit()
                })
            }
        )
        this.data.server.on('error', (err) => {
            throw err
        })
        this.data.server.listen(11994, () => {
            console.log('[DEBG]服务器监听11994端口中…');
        });
    }
    public send(bag) { // 向后端发送
        if (this.data.connected) {
            // console.log('[DEBG]发送至后端：', bag) // 生产环境下请注释掉
            this.data.connection.write(JSON.stringify(bag))
        }
    }
    public close() {

    }
}
function data2bag(data: Buffer) {
    let piece = data.toString().split('}{')
    for (let i = 0; i < piece.length; i++) {
        if (i != piece.length - 1) {
            piece[i] += '}'
        }
        if (i != 0) {
            piece[i] = '{' + piece[i]
        }
    }
    let bags = []
    for (let i = 0; i < piece.length; i++) {
        let bag = JSON.parse(piece[i])
        bags.push(bag)
    }
    return bags
}