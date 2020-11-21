const AppManager = require('./managers/app')
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
    this.app = new AppManager()
    this.win = new WindowManager()
    this.toBack = new NetManager('back')
    this.toRenderer = new NetManager('renderer')
    this.script = new ScriptManager()
    // 设置数据管道
    this.app.once('ready', this.start)
    this.toBack.on('recv', this.onBackRecv)
    this.toRenderer.on('recv', this.onRendererRecv)
  }

  start = () => {
    this.win.start()
    this.toBack.start()
    this.toRenderer.start()
    this.script.start()
  }

  onBackRecv = (data) => {
    console.log('MainManager', 'Recv', data)
    this.toRenderer.send(data)
  }

  onRendererRecv = (data) => {
    console.log('MainManager', 'Send', data)
    this.toBack.send(data)
  }
}
const main = new MainManager()
