const { app } = require('electron')
const WindowManager = require('./modules/window')
let win = new WindowManager()
app.whenReady().then(win.createWindow)
