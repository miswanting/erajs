import DisplayManager from "./Managers/DisplayManager";
import NetManager from "./Managers/NetManager";
export default class Front {
    dm: DisplayManager
    nm: NetManager
    constructor() {
        this.dm = new DisplayManager()
        this.nm = new NetManager()
        let send_func = (pkg: any) => {
            console.log('send:', pkg)
            this.nm.send(pkg)
        }
        let recv_func = (pkg: any) => {
            console.log('recv:', pkg)
            this.dm.recv(pkg)
        }
        this.dm.registerSendFunc(send_func)
        this.nm.registerRecvFunc(recv_func)
    }
    start() {
        this.dm.start()
        this.nm.start()
    }
}
let front = new Front()
front.start()