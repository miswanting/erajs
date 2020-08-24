/**
 * pull→this→push
 * recv→this→send
 */
class DataManager extends EventEmitter {
    data = null
    init = () => {
        // document.addEventListener('cmd', this.cmd)
    }
    start = () => {
        // document.addEventListener('pull', (e) => { })
        // document.addEventListener('recv', (e) => { })
        this.data = this.newElement('program')
        this.data.title = 'Era.js'
        this.data.footer = '@Miswanting'
        this.data.maxPages = 10
        this.update()
    }
    push = (data) => {
        this.emit('push', data)
        // let event = new CustomEvent('push', { detail: data })
        // document.dispatchEvent(event)
    }
    pull = (data) => {
        this.send(data)
    }
    send = (data) => {
        this.emit('send', data)
    }
    recv = (data) => {
        this.addElement(this.newElement(data.type, data.data, data.style))
        this.update()
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
        } else if (['head', 'text', 'button', 'link'].indexOf(el.type) != -1) {
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
                el.callback = this.cmd
            }
            lastBlock.children.push(el)
        }
    }
    cmd = (data) => {
        if (data.type == 'pull') {
            this.pull(data.data)
        }
    }
    update = () => {
        this.push(this.data)
    }
}
