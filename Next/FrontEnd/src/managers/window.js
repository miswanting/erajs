const { EventEmitter } = require('events')
const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
module.exports = class WindowManager extends EventEmitter {
    start = () => {
        let win = new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            transparent: true,
            webPreferences: {
                enableRemoteModule: true,
                nodeIntegration: true
            }
        })
        // 加载index.html文件
        win.loadFile('src/index.html')
        if (isDev) {
            const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
            installExtension(VUEJS_DEVTOOLS)
                .then((name) => console.log(`Extension Added!: ${name}`))
                .catch((err) => {
                    console.log('An Error Occurred: ', err)
                    console.log('But PLEASE DO NOT WORRY!')
                    console.log('It`s FINE! It`s NOT IMPORTANT at all!')
                });
            win.webContents.openDevTools()
        }
    }
}