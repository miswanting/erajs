/**
 * pull→this→push
 * recv→this→send
 * program→ui→page→block→line→inline
 */
module.exports = class DataManager {
    #data
    constructor() {
        this.#data = {}
        document.addEventListener('pull', data => {
            AST.parse(this.data, data.detail)
        })
        document.addEventListener('recv', data => {
            AST.parse(this.data, data.detail)
        })
        this.#data = newElement('program')
        this.#data.data = {
            title: 'Era.js',
            footer: '@Miswanting',
            maxPages: 10,
            ui: 'intro',
        }
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
}

class AST {
    static parse(data, event) { }
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