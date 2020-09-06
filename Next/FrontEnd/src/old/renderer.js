const DisplayManager = require('./managers/display')
const DataManager = require('./managers/data')
const NetManager = require('./managers/net')
class Erajs {
    init = () => {
        this.dis = new DisplayManager()
        this.dat = new DataManager()
        this.net = new NetManager('main')
        this.dat.on('push', (data) => { this.dis.push(data) })
        this.dis.on('pull', (data) => { this.dat.pull(data) })
        this.dat.on('send', (data) => { this.net.send(data) })
        this.net.on('recv', (data) => { this.dat.recv(data) })
    }
    start = () => {
        this.dis.start()
        this.dat.start()
        this.net.start()
    }
}
let erajs = new Erajs()
erajs.init()
erajs.start()
