class NetManager {
    init = () => {
        this.core = new NetCore()
    }
    start = () => {
        this.core.on('connect', (data) => {
            document.dispatchEvent('connection', data)
        })
        this.core.on('close', (data) => {
            document.dispatchEvent('close', data)
        })
        this.core.on('recv', (data) => {
            document.dispatchEvent('recv', data)
        })
        this.core.start()
    }
    send = (data) => {
        this.core.send(data)
    }
    close = () => {
        this.core.close()
    }
}
class NetCore {
    start = () => {
        this.socket = io();
        socket.on('connect', () => {
            console.log(123);
        });
        socket.on('data', (data) => { });
        socket.on('disconnect', () => { });
    }
}