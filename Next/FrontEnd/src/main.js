const { app } = require('electron')
const WindowManager = require('./modules/window')
const NetManager = require('./modules/net')
class MainManager {
    init = () => {
        this.win = new WindowManager()
        this.back = new NetManager('back')
        this.renderer = new NetManager('renderer')
    }
    start = () => {
        this.win.start()
        this.back.start()
    }
}
let main = new MainManager()
main.init()
app.whenReady().then(main.start)
