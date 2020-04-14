const { EventEmitter } = require('events')
const { Server } = require('net')
const { BrowserWindow, ipcRenderer } = require('electron')
module.exports = class NetManager extends EventEmitter {
    init = () => { }
    start = () => { }
    send = () => { }
    recv = () => { }
    close = () => { }
}
class ToBack extends EventEmitter {
    init = () => {
        this.server = new Server((s) => {
            this.socket = s
            this.emit('connection')
            this.socket.on('data', (data) => {
                this.recv(data)
            })
            this.socket.on('end', () => { })
        })
    }
    start = () => {
        this.server.listen(11994)
    }
    send = (data) => {
        this.socket.write(data)
    }
    recv = (data) => {
        // Handling Sticky Packages
        let pieces = data.toString().split('}{')
        for (let i = 0; i < pieces.length; i++) {
            if (i != pieces.length - 1) {
                pieces[i] += '}'
            }
            if (i != 0) {
                pieces[i] = '{' + pieces[i]
            }
        }
        for (let i = 0; i < piece.length; i++) {
            console.log('[DEBG]自前端接收：', piece[i]); // 生产环境下请注释掉
            let data = JSON.parse(piece[i])
            this.emit('recv', data)
        }
    }
    close = () => { }
}
class ToRenderer extends EventEmitter {
    init = () => {
        ipcMain.on('data', (e, data) => {
            this.recv(data)
        })
    }
    start = () => { }
    send = (data) => {
        BrowserWindow.getAllWindows()[0].webContents.send('data', data)
    }
    recv = (data) => {
        this.emit('recv', data)
    }
    close = () => { }
}
class ToMain extends EventEmitter {
    init = () => {
        ipcRenderer.on('data', (e, data) => {
            this.recv(data)
        })
    }
    start = () => { }
    send = (data) => {
        ipcRenderer.send('data', data)
    }
    recv = (data) => {
        this.emit('recv', data)
    }
    close = () => { }
}