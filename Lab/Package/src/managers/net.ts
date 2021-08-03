import { EventEmitter } from 'events'
export default class NetManager extends EventEmitter {
  constructor () {
    super()
    this.ws = new WebSocket(window.location.origin.replace('http', 'ws'))
    this.ws.addEventListener('open', () => {
      this.ws.addEventListener('message', (e) => {
        this.emit('recv', JSON.parse(e.data))
      })
    })
  }

  send (data) {
    this.ws.send(JSON.stringify(data))
  }
}

// window.addEventListener('load', function () {
// })
// const w = new Worker(new URL('./workers/net.ts', import.meta.url))
