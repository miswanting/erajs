class Erajs {
    init = () => {
        this.dis = new DisplayManager()
        this.dat = new DataManager()
        this.net = new NetManager()
        this.dis.init()
        this.dat.init()
        this.net.init()
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