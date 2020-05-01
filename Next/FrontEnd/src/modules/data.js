const { EventEmitter } = require('events')
module.exports = class DisplayManager extends EventEmitter {
    constructor() {
        super()
        this.data = null
    }
    init = () => { }
    start = () => {
        this.data = this.newElement('program')
        this.data.ui = 'intro'
        this.data.mode = { type: 'line' }
        this.data.title = 'Era.js'
        this.data.footer = '@Miswanting'
        this.data.maxPages = 10
        this.push(this.data)
    }
    push = (data) => {
        this.emit('push', data)
    }
    pull = (data) => {
        this.send(data)
    }
    send = (data) => {
        this.emit('send', data)
    }
    recv = (data) => {
        this.parse(data)
        this.push(this.data)
    }
    parse = (data) => {
        // console.log(data);
        if (data.type == 'loaded') {
            this.data.ui = 'game'
        } else if (data.type == 'title') {
            this.data.title = data.data.text
        } else if (data.type == 'mode') {
            this.data.mode = { type: data.data.type }
            if (this.data.mode.type == 'grid') {
                this.data.mode.column = data.data.arg[0]
            }
        } else {
            this.addElement(data)
        }
    }
    newElement = (type, data = null, style = null, ...children) => {
        let el = {
            type: type,
            data: data,
            style: style,
            children: children
        }
        return el
    }
    addElement = (el) => {
        // console.log(el);
        if (el.type == 'page') {
            this.data.children.push(this.newElement('page', el.data, el.style))
            this.data.children.splice(0, this.data.children.length - this.data.maxPages)
            this.data.mode.type = 'line'
        } else if (el.type == 'line') {
            // Page Exist?
            if (this.data.children.length == 0) {
                this.addElement(this.newElement('page'))
            }
            this.data.children[this.data.children.length - 1].children.push(el)
        } else if (el.type == 'grid') {
            // Page Exist?
            if (this.data.children.length == 0) {
                this.addElement(this.newElement('page'))
            }
            this.data.children[this.data.children.length - 1].children.push(el)
        } else if (el.type == 'divider') {
            if (this.data.children.length == 0) {
                this.addElement(this.newElement('page'))
            }
            this.data.children[this.data.children.length - 1].children.push(el)
            this.data.mode.type = 'line'
        } else if (el.type == 'pass' && this.data.mode.type == 'line') {
            this.addElement(this.newElement('line'))
        } else if (['heading', 'text', 'button', 'link', 'pass', 'progress', 'rate', 'check', 'radio', 'input', 'dropdown'].indexOf(el.type) != -1) {
            // Page Exist?
            if (this.data.children.length == 0) {
                this.addElement(this.newElement('page'))
            }
            let lastPage = this.data.children[this.data.children.length - 1]
            // Block Exist?
            if (lastPage.children.length == 0 || lastPage.children[lastPage.children.length - 1].type == 'divider') {
                if (this.data.mode.type == 'line') {
                    this.addElement(this.newElement('line'))
                } else if (this.data.mode.type == 'grid') {
                    this.addElement(this.newElement('grid', { column: this.data.mode.column }))
                }
            }
            let lastBlock = lastPage.children[lastPage.children.length - 1]
            if (['button', 'link', 'rate', 'check', 'radio', 'input', 'dropdown'].indexOf(el.type) != -1) {
                el.callback = this.cmd
            }
            lastBlock.children.push(el)
        }
        // console.log(JSON.stringify(this.data));
    }
    cmd = (data) => {
        if (data.type == 'pull') {
            this.pull(data.data)
        }
    }
}