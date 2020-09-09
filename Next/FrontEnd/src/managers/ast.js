class AST {
    static parse(vm, data) {
        console.log(data);
        if (data.type == 'connection') {
            vm.data.ui = 'intro'
        } else if (data.type == 'set_loading_title') {
            vm.data.loadingTitle = data.value
        } else if (data.type == 'set_loading_text') {
            vm.data.loadingText = data.value
        } else if (data.type == 'loaded') {
            vm.data.ui = 'game'
        } else if (data.type == 'page') {
            this.addElement(vm, data)
        } else if (data.type == 'mode') {
        } else if (data.type == 'text') {
            this.addElement(vm, data)
        } else if (data.type == 'button') {
            this.addElement(vm, data)
        } else if (data.type == 'BUTTON_CLICK') {
            vm.send(data)
        }
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
        return vm.children.game.children.length != 0
    }
    static touchPage(vm) {
        if (!this.isPageExist(vm)) {
            this.addElement(vm, this.newElement('page'))
        }
    }
    static getLastPage(vm) {
        this.touchPage(vm)
        return vm.children.game.children[vm.children.game.children.length - 1]
    }
    static isBlockExist(vm) {
        return this.getLastPage(vm).children.length != 0
    }
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
    static touchBlock(vm) {
        if (!this.isBlockExist(vm)) {
            // this.addElement(vm, this.newElement(vm.data.blockMode.type))
        }
    }
    static isLastBlockAddable(vm) {
        return this.getLastPage(vm).type != 'divider'
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
    // static touchPageAmount(vm) {
    //     vm.data.children.splice(0, vm.data.children.length - vm.data.maxPages)
    // }
    static addBlock(vm) {
        let lastPage = this.getLastPage(vm)
        if (vm.data.blockMode.type == 'line') {
            lastPage.children.push(this.newElement(vm.data.blockMode.type))
        } else if (vm.data.blockMode.type == 'grid') {
            lastPage.children.push(this.newElement(vm.data.blockMode.type, { column: vm.data.blockMode.column }))
        }
    }
    static addInline(vm, data) {
        console.log(this.isBlockSame(vm));
        if (!this.isBlockSame(vm)) {
            this.addBlock(vm)
        }
        let lastBlock = this.getLastBlock(vm)
        lastBlock.children.push(data)
    }
    static addElement(vm, el) {
        if (el.type == 'page') {
            vm.children.game.children.push(this.newElement(el.type, el.data, el.style))
        } else if (el.type == 'text') {
            this.addInline(vm, el)
        } else if (el.type == 'button') {
            this.addInline(vm, el)
        }
    }
}
