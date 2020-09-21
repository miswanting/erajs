class Erajs {
    constructor() {
        this.dat = new DataManager()
        this.dis = new DisplayManager()
        this.dis.register(this.dat.getData())
        // this.net = new NetManager('main')
        // this.net.start()
        // this.net.on('recv', (data) => { this.dat.recv(data) })
        // document.addEventListener('send', data => {
        //     this.net.send(data.detail)
        // })
    }
    recv(data) {
        this.dat.recv(data)
    }
}