import DisplayManager from "./Managers/DisplayManager";
import NetManager from "./Managers/NetManager";
export default class Front {
    dm: DisplayManager
    nm: NetManager
    constructor() {
        this.dm = new DisplayManager()
        this.nm = new NetManager()
        this.dm.on('send', this.nm.send)
        this.nm.on('recv', this.dm.recv)
    }
    init() {
        this.dm.init()
        this.nm.init()
    }
    start() {
        this.dm.start()
        this.nm.start()
    }
}
let front = new Front()
front.start()