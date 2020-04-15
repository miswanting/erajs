const { EventEmitter } = require('events')
module.exports = class DisplayManager extends EventEmitter {
    constructor() {
        super()
        this.data = null
    }
    init = () => { }
    start = () => {
        this.data = this.newElement('program')
        this.data.mode = 'intro'
        this.data.title = 'Era.js'
        this.data.footer = '@Miswanting'
        this.data.maxPages = 10
        this.addElement(this.newElement('text', { text: 'test' }))
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
        this.push(this.data)
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
        if (el.type == 'page') {
            this.data.children.push(el)
            this.data.children.splice(0, this.data.children.length - this.data.maxPages)
        } else if (el.type == 'line') {
            // Page Exist?
            if (this.data.children.length == 0) {
                this.addElement(this.newElement('page'))
            }
            this.data.children[this.data.children.length - 1].children.push(el)
        } else if (['heading', 'text', 'button', 'link'].indexOf(el.type) != -1) {
            // Page Exist?
            if (this.data.children.length == 0) {
                this.addElement(this.newElement('page'))
            }
            let lastPage = this.data.children[this.data.children.length - 1]
            // Block Exist?
            if (lastPage.children == 0) {
                this.addElement(this.newElement('line'))
            }
            let lastBlock = lastPage.children[lastPage.children.length - 1]
            if (['button', 'link'].indexOf(el.type) != -1) {
                // el.callback = this.cmd
            }
            lastBlock.children.push(el)
        }
    }
}