/**
 * pull→this→push
 * recv→this→send
 * program→ui→page→block→line→inline
 */
const { EventEmitter } = require('events')
module.exports = class DataManager extends EventEmitter {
    #data
    constructor() {
        super()
        this.#data = {}
        document.addEventListener('pull', data => {
            AST.parse(this.data, data.detail)
        })
        this.#data = newElement('program')
        this.#data.data = {
            title: 'Era.js',
            footer: '@Miswanting',
            maxPages: 10,
            lastUi: '',
            ui: 'intro',
            loadingTitle: 'intro',
            loadingText: 'intro',
        }
        this.resetComposeMode()
        this.#data.data.menu = [
            {
                label: '文件',
                submenu: [
                    { label: '新建' },
                    { label: '打开' },
                    {
                        label: '最近打开的文件',
                        submenu: [
                            { label: 'File 1' },
                            { label: 'File 2' },
                            { label: 'File 3' }
                        ]
                    }
                ]
            },
            { label: '编辑' },
            { label: '窗口' },
            { label: '帮助' },
            { label: '+' }
        ]
        this.#data.children = {
            // 下可以呼出上
            console: newElement('console'),
            pause: newElement('pause'),
            game: newElement('game'),
            intro: newElement('intro'),
        }
    }
    getData() {
        return this.#data
    }
    send() {
        let event = new CustomEvent('send', { detail: data })
        document.dispatchEvent(event)
    }
    recv = (data) => {
        AST.parse(this.#data, data)
    }
}

class AST {
    static parse(vm, data) {
        console.log(data);
        if (data.type == 'loaded') {
            vm.data.ui = 'game'
        } else if (data.type) {

        }
    }
    isPageExist(vm) {
        return vm.children.game.children.length != 0
    }
    touchPage(vm) {
        if (!this.isPageExist(vm)) {
            this.addElement(vm, newElement('page'))
        }
    }
    getLastPage(vm) {
        this.touchPage(vm)
        return vm.children.game.children[vm.children.game.children.length - 1]
    }
    isBlockExist(vm) {
        this.touchPage(vm)
        return this.getLastPage(vm).children.game.children.length != 0
    }
    isLastBlockAddible(vm) {
        this.touchPage(vm)
        return this.getLastPage(vm).type != 'divider'
    }
    getLastBlock(vm) {
        this.touchPage(vm)
        let lastPage = this.getLastPage(vm)
        return lastPage.children.game.children[lastPage.children.game.children.length - 1]
    }
    changeComposeMode(vm, type, data = null) {
        if (data == null) {
            data = {}
        }
        data.type = type
        vm.data.composeMode = data
    }
    resetComposeMode(vm) {
        this.changeComposeMode('line')
    }
    touchPageAmount(vm) {
        this.#data.children.splice(0, this.#data.children.length - this.#data.maxPages)
    }
    addElement(vm, el) {
        if (el.type == 'page') {
            if (!el.data) {
                el.data = { key: Math.random().toString() }
            }
        }
        vm.children.game.children.push(el)
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