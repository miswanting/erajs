class NetManager extends EventEmitter {
    constructor() {
        super()
        this.core = {}
    }
    init = () => {
        this.core = new NetCore()
    }
    start = () => {
        this.core.on('connect', (data) => {
            console.log('[INFO]Connected!');
            this.emit('connection', data)
        })
        this.core.on('recv', (data) => {
            console.log('[DEBG]RECV:', data);
            this.emit('recv', data)
        })
        this.core.on('disconnect', (data) => {
            console.log('close');
            
            this.emit('close', data)
        })
        this.core.start()
    }
    send = (data) => {
        console.log('[DEBG]SEND:', data);
        this.core.send(data)
    }
    close = () => {
        this.core.close()
    }
}
class NetCore extends EventEmitter {
    constructor() {
        super()
        this.socket = {}
    }
    start = () => {
        this.socket = io();
        this.socket.on('connect', () => {
            this.emit('connect')
        });
        this.socket.on('data', (data) => {
            this.emit('recv', data)
        });
        this.socket.on('disconnect', () => {
            this.emit('connect')
        });
    }
    send = (data) => {
        this.socket.emit('data', data)
    }
}