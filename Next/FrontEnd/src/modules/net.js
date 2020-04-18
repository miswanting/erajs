const { EventEmitter } = require('events')
const { Server } = require('net')
const { BrowserWindow, ipcRenderer, ipcMain } = require('electron')
module.exports = class NetManager extends EventEmitter {
    constructor(type) {
        super()
        this.type = type  // back, main, renderer
    }
    init = () => {
        if (this.type == 'back') {
            this.core = new ToBack()
        } else if (this.type == 'main') {
            this.core = new ToMain()
        } else if (this.type == 'renderer') {
            this.core = new ToRenderer()
        }
        this.core.init()
        this.core.on('recv', this.recv)
    }
    start = () => {
        this.core.start()
    }
    send = (data) => {
        // console.log('NetManager', 'Send', data);
        this.core.send(data)
    }
    recv = (data) => {
        // console.log('NetManager', 'Recv', data);
        this.emit('recv', data)
    }
    close = () => { }
}
class ToBack extends EventEmitter {
    constructor() {
        super()
    }
    init = () => {
        this.server = new Server((s) => {
            this.socket = s
            console.log('Connected!');
            this.emit('recv', { type: 'connection' })
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
        console.log('ToBack', "SEND", data);
        if (this.socket) {
            this.socket.write(JSON.stringify(data))
        }
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
        for (let i = 0; i < pieces.length; i++) {
            console.log('ToBack', "RECV", pieces[i]);
            let data = JSON.parse(pieces[i])
            this.emit('recv', data)
        }
    }
    close = () => { }
}
class ToRenderer extends EventEmitter {
    constructor() {
        super()
    }
    init = () => {
        ipcMain.on('data', (e, data) => {
            // Handling Sticky Packages
            console.log(data);
            let pieces = data.toString().split('}{')
            for (let i = 0; i < pieces.length; i++) {
                if (i != pieces.length - 1) {
                    pieces[i] += '}'
                }
                if (i != 0) {
                    pieces[i] = '{' + pieces[i]
                }
            }
            for (let i = 0; i < pieces.length; i++) {

                let data = JSON.parse(pieces[i])
                this.recv(data)
            }

        })
    }
    start = () => { }
    send = (data) => {
        console.log('ToRenderer', "SEND", data);
        BrowserWindow.getAllWindows()[0].webContents.send('data', data)
    }
    recv = (data) => {
        console.log('ToRenderer', "RECV", data);
        this.emit('recv', data)
    }
    close = () => { }
}
class ToMain extends EventEmitter {
    constructor() {
        super()
    }
    init = () => {
        ipcRenderer.on('data', (e, data) => {
            this.recv(data)
        })
    }
    start = () => { }
    send = (data) => {
        console.log('ToMain', "SEND", data);
        ipcRenderer.send('data', JSON.stringify(data))
    }
    recv = (data) => {
        console.log('ToMain', "RECV", data);
        this.emit('recv', data)
    }
    close = () => { }
}