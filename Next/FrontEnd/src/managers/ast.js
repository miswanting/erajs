class AST {
    static parse(vm, data) {
        console.log('Parse:', data);
        if (data.type == 'connection') {
            vm.data.ui = 'intro'
        } else if (data.type == 'set_loading_title') {
            vm.data.loadingTitle = data.value
        } else if (data.type == 'set_loading_text') {
            vm.data.loadingText = data.value
        } else if (data.type == 'loaded') {
            vm.data.ui = 'main'
        } else if (data.type == 'mode') {
            vm.data.blockMode = { type: data.data.type }
            if (vm.data.blockMode.type == 'grid') {
                vm.data.blockMode.column = data.data.arg[0]
            }
        } else if (data.type == 'pass') {
            if (vm.data.blockMode.type == 'line') {
                this.addBlock(vm)
            } else if (vm.data.blockMode.type == 'grid') {
                this.getLastBlock(vm).children.push(
                    this.newElement('pass')
                )
            }
        } else if ([
            'page',
            'text',
            'button',
            'heading',
            'link',
            'progress',
            'rate',
            'check',
            'radio',
            'input',
            'dropdown'
        ].indexOf(data.type) != -1) {
            this.push(vm, data)
        } else if ([
            'BUTTON_CLICK',
            'LINK_CLICK',
            'RATE_CLICK',
            'CHECK_CHANGE',
            'RADIO_CHANGE',
            'INPUT_CHANGE',
            'DROPDOWN_CHANGE'
        ].indexOf(data.type) != -1) {
            vm.send(data)
        }
        console.log('Final:', vm);
    }
    /**
     * # 生成抽象元素
     * @param {String} type 元素类型：`program`, `page`, `line`, `grid`, `text`……
     * @param {Object} data 数据
     * @param {Object} style 样式数据
     * @param  {...any} children 子
     */
    static newElement(type, data = null, style = null, children = null) {
        if (!data) { data = new Map() }
        if (!style) { style = new Map() }
        if (!children) { children = new Array() }
        let el = {
            type: type,
            data: data,
            style: style,
            children: children
        }
        return el
    }
    static isPageExist(vm) {
        return vm.children.main.children.length != 0
    }
    static touchPage(vm) {
        if (!this.isPageExist(vm)) {
            vm.children.main.children.push(this.newElement('page', el.data, el.style))
        }
    }
    static getLastPage(vm) {
        this.touchPage(vm)
        return vm.children.main.children[vm.children.main.children.length - 1]
    }
    static isBlockExist(vm) {
        return this.getLastPage(vm).children.length != 0
    }
    /**
     * # 当前模式是否与最后的Block一致？
     * @param {*} vm 
     * @returns {boolean} bbb
     */
    static isBlockSame(vm) {
        if (!this.isBlockExist(vm)) {
            return false
        }
        let lastPage = this.getLastPage(vm);
        let lastBlock = lastPage.children[lastPage.children.length - 1]
        let blockMode = vm.data.blockMode
        if (lastBlock.type != blockMode.type) { return false }
        Object.keys(lastBlock.data).forEach(key => {
            if (lastBlock.data[key] != blockMode[key]) {
                return false
            }
        });
        Object.keys(lastBlock.style).forEach(key => {
            if (lastBlock.data[key] != blockMode[key]) {
                return false
            }
        });
        return true
    }
    static getLastBlock(vm) {
        let lastPage = this.getLastPage(vm)
        return lastPage.children[lastPage.children.length - 1]
    }
    static changeBlockMode(vm, type, data = null) {
        if (data == null) {
            data = {}
        }
        data.type = type
        vm.data.blockMode = data
    }
    static resetBlockMode(vm) {
        this.changeBlockMode(vm, 'line')
    }
    static addBlock(vm) {
        let lastPage = this.getLastPage(vm)
        if (vm.data.blockMode.type == 'line') {
            lastPage.children.push(this.newElement(vm.data.blockMode.type))
        } else if (vm.data.blockMode.type == 'grid') {
            lastPage.children.push(this.newElement(vm.data.blockMode.type, { column: vm.data.blockMode.column }))
        }
    }
    static push(vm, el) {
        if (el.type == 'page') {
            vm.children.main.children.push(this.newElement('page', el.data, el.style))
        } else if (['text', 'button', 'heading', 'link', 'progress', 'rate', 'check', 'radio', 'input', 'dropdown'].indexOf(el.type) != -1) {
            if (this.isBlockSame(vm)) {
                this.getLastBlock(vm).children.push(this.newElement(el.type, el.data, el.style))
            } else {
                this.addBlock(vm)
                console.log(vm, el);
                this.getLastBlock(vm).children.push(this.newElement(el.type, el.data, el.style))
            }
        }
    }
}
