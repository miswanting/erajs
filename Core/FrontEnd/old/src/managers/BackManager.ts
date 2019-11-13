import * as fs from 'fs'
import * as child_process from 'child_process'

import { EventEmitter } from 'events'

export default class BackManager extends EventEmitter {
    public self_name = "Era.js.exe"
    public init() { }
    public start() {
        let files = fs.readdirSync('.')
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (this.self_name != file && file.endsWith('.exe')) {
                setTimeout(this.exec, 4000, file)
                break
            }
        }
    }
    private exec(path) {
        child_process.exec(path);
    }
}