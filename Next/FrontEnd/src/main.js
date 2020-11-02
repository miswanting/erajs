const { app } = require('electron')
const WindowManager = require('./managers/window')
const NetManager = require('./managers/net')
const ScriptManager = require('./managers/script')
/**
 * # 主进程管理器 MainManager
 * 提供渲染窗口、前/后端网络模块容器
 */
class MainManager {
  constructor() {
    // 初始化模块
    this.win = new WindowManager()
    this.back = new NetManager('back')
    this.renderer = new NetManager('renderer')
    // 侦听网络管理器事件
    this.back.on('recv', this.onBackRecv)
    this.renderer.on('recv', this.onRendererRecv)
    this.script = new ScriptManager()
    this.script.start()
  }

  start = () => {
    this.win.start()
    this.back.start()
    this.renderer.start()
  }

  onBackRecv = (data) => {
    console.log('MainManager', 'Recv', data)
    this.renderer.send(data)
  }

  onRendererRecv = (data) => {
    console.log('MainManager', 'Send', data)
    this.back.send(data)
  }
}
const main = new MainManager()
app.whenReady().then(main.start)
