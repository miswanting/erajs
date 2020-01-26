import { EventEmitter } from 'events'
// import io = require('socket.io-client')
import * as io from 'socket.io-client'
import * as Cookies from 'js-cookie'
export default class NetManager extends EventEmitter {
    sio = null
    constructor() {
        super()
    }
    init() { }
    start() {
        this.sio = io()
        this.sio.on('connect', this.onConnect)
        this.sio.on('disconnect', this.onDisconnect)
        this.sio.on('data', this.onRecv)
    }
    onConnect = () => {
        // let jar = new cookie.CookieJar()
        // jar.setCookie('sid')
        console.log('Server Connected!');
        console.log('ID: ' + this.sio.id);
    }
    onDisconnect = () => {
        console.log('Server Disconnected!');
    }
    onSend = (data: any) => {
        this.sio.emit('data', data)
    }
    onRecv = (data: any) => {
        this.emit('recv', data)
    }
}