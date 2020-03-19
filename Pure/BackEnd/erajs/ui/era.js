class Erajs {
    init = () => {
        this.dis = new DisplayManager()
        this.dat = new DataManager()
        this.net = new NetManager()
        this.dis.init()
        this.dat.init()
        this.net.init()
    }
    start = () => {
        this.dis.start()
        this.dat.start()
        this.net.start()
    }
}