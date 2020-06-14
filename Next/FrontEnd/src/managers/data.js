const { EventEmitter } = require('events')
module.exports = class DataManager extends EventEmitter {
    #data = null
    constructor() {
        super()
        this.#data = {}
    }
    start() {
        this.#data = newElement('program')
        this.#data.interfaceType = 'intro'
        this.#data.title = 'Era.js'
        this.#data.footer = '@Miswanting'
        this.#data.maxPages = 10
        this.#data.msgList = []
        this.#data.pageIndex = 0
        this.resetComposeMode()
        this.push(this.#data)
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
        this.push(this.#data)
    }
    isPageExist() {
        return this.#data.children.length != 0
    }
    touchPage() {
        if (!this.isPageExist()) {
            this.addElement(newElement('page'))
        }
    }
    getLastPage() {
        this.touchPage()
        return this.#data.children[this.#data.children.length - 1]
    }
    isBlockExist() {
        this.touchPage()
        return this.getLastPage().children.length != 0
    }
    isLastBlockAddible() {
        this.touchPage()
        return this.getLastPage().type != 'divider'
    }
    getLastBlock() {
        this.touchPage()
        let lastPage = this.getLastPage()
        return lastPage.children[lastPage.children.length - 1]
    }
    changeComposeMode(type, data = null) {
        if (data == null) {
            data = {}
        }
        data.type = type
        this.#data.composeMode = data
    }
    resetComposeMode() {
        this.changeComposeMode('line')
    }
    touchPageAmount() {
        this.#data.children.splice(0, this.#data.children.length - this.#data.maxPages)
    }
    parse(data) {
        // console.log(data);
        if (data.type == 'loaded') {
            this.#data.interfaceType = 'game'
        } else if (data.type == 'title') {
            this.#data.title = data.data.text
        } else if (data.type == 'mode') {
            this.#data.composeMode = { type: data.data.type }
            if (this.#data.composeMode.type == 'grid') {
                this.#data.composeMode.column = data.data.arg[0]
            }
        } else {
            this.addElement(data)
        }
    }
    addElement(el) {
        if (el.type == 'page') {
            console.log(el);
            if (!el.data) {
                el.data = { key: this.#data.pageIndex.toString() }
            }
            // el.data.key = this.#data.pageIndex
            this.#data.pageIndex += 1
            this.#data.children.push(newElement('page', el.data, el.style))
            this.touchPageAmount()
            this.resetComposeMode()
        } else if (['line', 'grid', 'divider'].indexOf(el.type) != -1) {
            this.touchPage()
            this.getLastPage().children.push(el)
        } else if (el.type == 'divider') {
            this.touchPage()
            this.getLastPage().children.push(el)
            this.resetComposeMode()
        } else if (el.type == 'pass' && this.#data.composeMode.type == 'line') {
            this.touchPage()
            this.addElement(newElement('line'))
        } else if (['heading', 'text', 'button', 'link', 'pass', 'progress', 'rate', 'check', 'radio', 'input', 'dropdown'].indexOf(el.type) != -1) {
            this.touchPage()
            let lastPage = this.getLastPage()
            // Block Exist?
            if (!this.isBlockExist() || this.getLastBlock().type == 'divider') {
                if (this.#data.composeMode.type == 'line') {
                    this.addElement(newElement('line'))
                } else if (this.#data.composeMode.type == 'grid') {
                    this.addElement(newElement('grid', { column: this.#data.composeMode.column }))
                }
            }
            if (['button', 'link', 'rate', 'check', 'radio', 'input', 'dropdown'].indexOf(el.type) != -1) {
                el.callback = this.cmd
            }
            this.getLastBlock().children.push(el)
        } else if (el.type == 'msg') {
            this.#data.msgList.push(el)
        }
    }
    cmd = (data) => {
        if (data.type == 'pull') {
            this.pull(data.data)
        }
    }
}
/**
 * # 生成抽象元素
 * @param {String} type 元素类型：`program`, `page`, `line`, `grid`, `text`……
 * @param {Object} data 数据
 * @param {Object} style 样式数据
 * @param  {...any} children 子
 */
function newElement(type, data = null, style = null, ...children) {
    let el = {
        type: type,
        data: data,
        style: style,
        children: children
    }
    return el
}