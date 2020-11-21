const { createServer } = require('net')
const { BrowserWindow, ipcRenderer, ipcMain } = require('electron')
let manager
onmessage = function (e) {
  const pkg = e.data
  console.log(pkg);
  if (pkg.type === 'init') {
    createToBack()
  } else if (pkg.type === 'send' && manager) {
    manager.send(pkg.data)
  }
}
function createToBack() {
  const debug = false
  const address = ['127.0.0.1', 12020]
  const bufSize = 3
  let conn = null
  const state = {
    length: 0,
    lengthString: '',
    contentArray: new Array()
  }
  manager = {
    send(data) {
      if (conn && !conn.destroyed) {
        const msg = JSON.stringify(data)
        debug ? console.log(`Send: ${msg}`) : null
        const content = new TextEncoder().encode(msg)
        conn.write(new TextEncoder().encode(content.length.toString() + ':' + msg))
      }
    },
    recv(msg) {
      debug ? console.log(`Recv: ${msg}`) : null
      postMessage({ type: 'recv', data: JSON.parse(msg) })
    }
  }
  function handleRecvOnce(buf) {
    if (state.length === 0) {
      for (let i = 0; i < buf.length; i++) {
        const c = new TextDecoder().decode(buf.slice(i, i + 1))
        if (c === ':') {
          state.length = parseInt(state.lengthString)
          state.lengthString = ''
          this.handleRecvOnce(buf.slice(i + 1, buf.length))
          return
        } else {
          state.lengthString += c
        }
      }
    } else if (state.contentArray.length + buf.length < state.length) {
      state.contentArray.push(...Array.from(buf))
    } else {
      const index = state.length - state.contentArray.length
      state.contentArray.push(...Array.from(buf.slice(0, index)))
      const s = new TextDecoder().decode(new Uint8Array(state.contentArray))
      this.recv(s)
      state.length = 0
      state.contentArray = []
      this.handleRecvOnce(buf.slice(index, buf.length))
    }
  }
  manager.server = createServer((conn) => {
    conn = conn
    conn.on('data', handleRecvOnce)
    conn.on('error', (e) => {
      if (e.code === 'ECONNRESET') { console.log('后端断开连接！') }
    })
  })
  manager.server.listen(address[1], address[0])
}