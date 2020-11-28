import { execFile } from 'child_process'
import { EventEmitter } from 'events'
import { existsSync } from 'fs'
export class ScriptManager extends EventEmitter {
  path: string
  constructor (path: string, timeout: number) {
    super()
    this.path = path
  }

  start () {
    if (existsSync(this.path)) {
      execFile(this.path)
    }
  }
}
