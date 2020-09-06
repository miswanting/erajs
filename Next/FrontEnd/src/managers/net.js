const { EventEmitter } = require('events')
const { Server } = require('net')
const { BrowserWindow, ipcRenderer, ipcMain } = require('electron')
/** 
 * # NetManager
 */
module.exports = class NetManager extends EventEmitter {
    #type
    #core
    constructor(type) {
        super()
        this.#type = type  // back, main, renderer
        if (this.#type == 'back') { this.#core = new ToBack() }
        else if (this.#type == 'main') { this.#core = new ToMain() }
        else if (this.#type == 'renderer') { this.#core = new ToRenderer() }
        this.#core.on('recv', this.recv)
    }
    start() { this.#core.start() }
    send = (data) => { this.core.send(data) }
    recv = (data) => { this.emit('recv', data) }
}
/**
 * # ToBack
 * Main -> Back
 */
class ToBack extends EventEmitter {
    constructor() {
        super()
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
        this.server.listen(11994, '127.0.0.1')
    }
    send = (data) => {
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
            let data = JSON.parse(pieces[i])
            this.emit('recv', data)
        }
    }
}
/**
 * # ToRenderer
 * Main -> Renderer
 */
class ToRenderer extends EventEmitter {
    constructor() {
        super()
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
        BrowserWindow.getAllWindows()[0].webContents.send('data', data)
    }
    recv = (data) => {
        this.emit('recv', data)
    }
}
/**
 * # ToMain
 * Renderer -> Main
 */
class ToMain extends EventEmitter {
    constructor() {
        super()
        ipcRenderer.on('data', (e, data) => {
            this.recv(data)
        })
    }
    start = () => { }
    send = (data) => {
        ipcRenderer.send('data', JSON.stringify(data))
    }
    recv = (data) => {
        this.emit('recv', data)
    }
}