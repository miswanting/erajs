const { EventEmitter } = require('events')
const { Server } = require('net')
const { BrowserWindow, ipcRenderer } = require('electron')
module.exports = class NetManager extends EventEmitter {
    constructor(type) {
        super()
        this.type = type  // back, main, renderer
    }
    init = () => {
        if (this.type = 'back') {
            this.core = new ToBack()
        } else if (this.type = 'main') {
            this.core = new ToMain()
        } else if (this.type = 'renderer') {
            this.core = new ToRenderer()
        }
        this.core.init()
        this.core.on('recv', this.recv)
    }
    start = () => {
        this.core.start()
    }
    send = (data) => {
        this.core.send(data)
    }
    recv = (data) => {
        this.emit('recv', data)
    }
    close = () => { }
}
class ToBack extends EventEmitter {
    init = () => {
        this.server = new Server((s) => {
            this.socket = s
            console.log('Connected!');
            this.socket.on('connection', () => {
                console.log('!');

            })
            this.socket.on('data', (data) => {
                this.recv(data)
            })
            this.socket.on('error', (e) => {
                console.log(e);
            })
            this.socket.on('end', () => {
                console.log('Disconnected!');
            })
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