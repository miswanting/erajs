import * as Net from "net"
import { app, Menu, ipcMain, BrowserWindow } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
let win: BrowserWindow = null
let conn: Net.Socket = null
// 启动前端
startElectron()
// 启动脚本
// 启动计时器：15s
setInterval(checkTimeOut, 15000)
function startElectron() {
    app.on('ready', () => { // 启动程序
        createWindow()
        // 启动服务器
        startServer()
    })
    app.on('window-all-closed', () => { // 窗口已全关闭
        // 退出程序
        console.log('[DEBG]检测到窗口全部关闭');
        let bag: any = {
            type: 'exit',
            from: 'm',
            to: 'b'
        }
        sendToBack(bag)
        app.quit()
    })
}
function createWindow() {
    win = new BrowserWindow({ width: 1024, height: 768 })
    win.loadFile('src/index.html')
    win.webContents.openDevTools()
    Menu.setApplicationMenu(null)
    win.on('closed', () => {
        win = null
        console.log('[DEBG]检测到窗口关闭');
    })
    // 加载 REACT DEVELOPER TOOLS
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`[DEBG]添加插件：${name}`))
        .catch((err) => console.log('[DEBG]添加插件错误：', err))
}
function startServer() {
    let server = Net.createServer((connection) => {
        conn = connection
        console.log('[FINE]检测到连接请求！')
        var bag = { 'type': 'connected', 'from': 'm', 'to': 'r' }
        sendToRenderer(bag)
        conn.on('end', () => {
            console.log('[DEBG]连接断开！')
        })
        conn.on('data', (data) => {
            // 分离、解析后转发
            let bags = data2bag(data)
            for (let i = 0; i < bags.length; i++) {
                recvFromBack(bags[i])
            }
            // 不分离直接转发（有BUG）
            // console.log('[DEBG]发送至前端：', data.toString())
            // win.webContents.send('bag', data.toString())
            // 分离后直接转发
            // let piece = data.toString().split('}{')
            // for (let i = 0; i < piece.length; i++) {
            //     if (i != piece.length - 1) {
            //         piece[i] += '}'
            //     }
            //     if (i != 0) {
            //         piece[i] = '{' + piece[i]
            //     }
            // }
            // for (let i = 0; i < piece.length; i++) {
            //     console.log('[DEBG]发送至前端：', piece[i]) // 生产环境下请注释掉
            //     win.webContents.send('bag', piece[i])
            // }
        })
        conn.on('error', (err) => {
            console.log(err);

        })
    })
    server.on('error', (err) => {
        throw err
    })
    server.listen(11994, () => {
        console.log('[DEBG]服务器监听11994端口中…');
    });
    ipcMain.on('bag', (event: any, data: String) => {
        let piece = data.toString().split('}{')
        for (let i = 0; i < piece.length; i++) {
            if (i != piece.length - 1) {
                piece[i] += '}'
            }
            if (i != 0) {
                piece[i] = '{' + piece[i]
            }
        }
        for (let i = 0; i < piece.length; i++) {
            console.log('[DEBG]自前端接收：', piece[i]); // 生产环境下请注释掉
            let bag = JSON.parse(piece[i])
            recvFromRenderer(bag)
        }
    })
}
function checkTimeOut() {

}
function sendToBack(bag: any) {
    console.log('[DEBG]发送至后端：', bag) // 生产环境下请注释掉
    conn.write(JSON.stringify(bag))
}
function sendToRenderer(bag: any) {
    console.log('[DEBG]发送至前端：', bag) // 生产环境下请注释掉
    win.webContents.send('bag', JSON.stringify(bag))
}
function recvFromBack(bag: any) {
    console.log('[DEBG]自后端接收：', bag) // 生产环境下请注释掉
    if (bag.to == 'r') {
        console.log('[DEBG]转发(B=>R)：', bag) // 生产环境下请注释掉
        sendToRenderer(bag)
        return
    }
}
function recvFromRenderer(bag: any) {
    if (bag.to == 'b') {
        console.log('[DEBG]转发(B<=R)：', bag) // 生产环境下请注释掉
        sendToBack(bag)
        return
    }
}
function data2bag(data: any) {
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
function bag2data(bag: any): string {
    return JSON.stringify(bag)
}