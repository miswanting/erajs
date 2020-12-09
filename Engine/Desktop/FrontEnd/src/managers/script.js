import { EventEmitter } from 'events'
import { existsSync } from 'fs'
import { execFile } from 'child_process'
export class ScriptManager extends EventEmitter {
  constructor (path, timeout) {
    super()
    this.path = path
  }

  start () {
    if (existsSync(this.path)) {
      execFile(this.path)
    }
  }
}
