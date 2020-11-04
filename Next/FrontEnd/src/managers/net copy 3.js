const { EventEmitter } = require('events')
const { Server } = require('net')
const { BrowserWindow, ipcRenderer, ipcMain } = require('electron')
module.exports = class NetManager extends EventEmitter {
    constructor(type) {
        super()
        this.type = type  // back, main, renderer
        if (this.type == 'back') { this.core = new ToBack() }
        else if (this.type == 'main') { this.core = new ToMain() }
        else if (this.type == 'renderer') { this.core = new ToRenderer() }
        this.core.on('recv', this.recv)
    }
    start() { this.core.start() }
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
            // this.socket.readableLength=4096000
            // this.socket.get
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
        this.tmp = {
            length: 0,
            lengthString: '',
            lastBinary: '',
            nextBinary: ''
        }
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
        const rawData = data.toString()
        console.log(rawData);
        if (!rawData) {
            console.log('Recv None Data!');
        } else {
            while (true) {
                if (this.tmp.length === 0) {
                    for (let i = 0; i < rawData.length; i++) {
                        if (rawData[i] === ':') {
                            this.tmp.length = parseInt(this.tmp.lengthString)
                            this.tmp.lengthString = ''
                            this.tmp.nextBinary += rawData.slice(i + 1)
                            break
                        } else {
                            this.tmp.lengthString += rawData[i]
                        }
                    }
                } else {
                    this.tmp.nextBinary += rawData
                }
                if (this.tmp.nextBinary.length >= this.tmp.length) {
                    const pkg = this.tmp.lastBinary + this.tmp.nextBinary.slice(0, this.tmp.length)
                    console.log(pkg);
                    let data = JSON.parse(pkg)
                    this.emit('recv', data)
                    this.tmp.length = 0
                    this.tmp.lastBinary = ''
                    this.tmp.nextBinary = this.tmp.nextBinary.slice(this.tmp.length)
                } else {
                    this.tmp.lastBinary += this.tmp.nextBinary
                    this.tmp.length -= len(this.tmp.nextBinary)
                    break
                }
            }
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