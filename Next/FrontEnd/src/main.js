const { app } = require('electron')
class Main { }
const WindowManager = require('./modules/window')
let win = new WindowManager()
app.whenReady().then(win.createWindow)
