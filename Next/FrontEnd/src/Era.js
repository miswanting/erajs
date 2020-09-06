const NetManager = require('./managers/net')
class Erajs {
    constructor() {
        this.dat = new DataManager()
        this.dis = new DisplayManager()
        this.dis.register(this.dat.getData())
        this.net = new NetManager('main')
        this.net.on('recv', (data) => { this.dat.recv(data) })
        document.addEventListener('send', function (data) {
            this.net.send(data)
        })
    }
}
window.onload = () => {
    let erajs = new Erajs()
}