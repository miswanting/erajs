const fs = require('fs')
const { EventEmitter } = require('events')
const ChildProcess = require('child_process')
module.exports = class ScriptManager extends EventEmitter {
  start () {
    if (fs.existsSync('Launcher.exe')) {
      ChildProcess.execFile('Launcher.exe')
    }
  }
}
