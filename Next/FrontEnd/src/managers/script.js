const { existsSync } = require('fs')
const { EventEmitter } = require('events')
const { execFile } = require('child_process')
module.exports = class ScriptManager extends EventEmitter {
  start() {
    if (existsSync('Launcher.exe')) {
      execFile('Launcher.exe')
    }
  }
}
