import DisplayManager from "./Managers/DisplayManager";
import NetManager from "./Managers/NetManager";
import DataManager from "./Managers/DataManager";
export default class Front {
    display: DisplayManager
    net: NetManager
    data: DataManager
    constructor() {
        this.data = new DataManager()
        this.display = new DisplayManager()
        this.net = new NetManager()

        this.net.on('recv', this.data.onRecv)
        this.data.on('send', this.net.onSend)
        this.data.on('change', this.display.onChange)
        this.display.on('act', this.data.onAct)
    }
    init() {
        this.data.init()
        this.display.init()
        this.net.init()
    }
    start() {
        this.data.start()
        this.display.start()
        this.net.start()
    }
}
let front = new Front()
front.init()
front.start()