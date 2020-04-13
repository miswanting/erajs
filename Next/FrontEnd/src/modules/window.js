const { EventEmitter } = require('events')
const { BrowserWindow } = require('electron')
module.exports = class WindowManager extends EventEmitter {
    createWindow = () => {
        let win = new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            transparent: true,
            webPreferences: {
                nodeIntegration: true
            }
        })
        // 加载index.html文件
        win.loadFile('src/index.html')
        // win.webContents.openDevTools()
    }
}