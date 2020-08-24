const DisplayManager = require('./managers/display-next')
const DataManager = require('./managers/data-next')
const NetManager = require('./managers/net-next')
class Erajs {
    constructor() {
        this.dat = new DataManager()
        this.dis = new DisplayManager()
        this.dis.register(this.dat.getData())
        this.net = new NetManager('main')
    }
}
window.onload = () => {
    let erajs = new Erajs()
}