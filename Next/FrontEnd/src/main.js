const { app } = require('electron')
const WindowManager = require('./modules/window')
const NetManager = require('./modules/net')
class MainManager {
    constructor() { }
    init = () => {
        this.win = new WindowManager()
        this.back = new NetManager('back')
        this.renderer = new NetManager('renderer')
        this.back.init()
        this.renderer.init()
        this.back.on('recv', this.onBackRecv)
        this.renderer.on('recv', this.onRendererRecv)
    }
    start = () => {
        this.win.start()
        this.back.start()
        this.renderer.start()
    }
    onBackRecv = (data) => {
        console.log('MainManager', 'Recv', data);
        this.renderer.send(data)
    }
    onRendererRecv = (data) => {
        this.back.send(data)
    }
}
let main = new MainManager()
main.init()
app.whenReady().then(main.start)
