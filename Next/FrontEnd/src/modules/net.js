const { EventEmitter } = require('events')
module.exports = class NetManager extends EventEmitter {
    init = () => { }
    start = () => { }
    send = () => { }
    recv = () => { }
    close = () => { }
}
class ToRenderer extends EventEmitter {
    init = () => { }
    start = () => { }
    send = () => { }
    recv = () => { }
    close = () => { }
}
class ToMain extends EventEmitter {
    init = () => { }
    start = () => { }
    send = () => { }
    recv = () => { }
    close = () => { }
}
class ToBack extends EventEmitter {
    init = () => { }
    start = () => { }
    send = () => { }
    recv = () => { }
    close = () => { }
}