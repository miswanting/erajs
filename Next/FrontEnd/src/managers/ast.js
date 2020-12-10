class AST {
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
    if (!children) { children = [] }
    const el = {
      type: type,
      data: data,
      style: style,
      children: children
    }
    return el
  }

  static isPageExist(state) {
    return state.main.children.length !== 0
  }

  static touchPage(state) {
    if (!this.isPageExist(state)) {
      state.main.children.push(this.newElement('page'))
    }
  }

  static getLastPage(state) {
    this.touchPage(state)
    return state.main.children[state.main.children.length - 1]
  }

  static isBlockExist(state) {
    return this.getLastPage(state).children.length !== 0
  }

  /**
     * # 当前模式是否与最后的Block一致？
     * @param {*} state
     * @returns {boolean} bbb
     */
  static isBlockSame(state) {
    if (!this.isBlockExist(state)) {
      return false
    }
    const lastPage = this.getLastPage(state)
    const lastBlock = lastPage.children[lastPage.children.length - 1]
    const blockMode = state.blockMode
    if (lastBlock.type !== blockMode.type) { return false }
    Object.keys(lastBlock.data).forEach(key => {
      if (lastBlock.data[key] !== blockMode[key]) {
        return false
      }
    })
    Object.keys(lastBlock.style).forEach(key => {
      if (lastBlock.data[key] !== blockMode[key]) {
        return false
      }
    })
    return true
  }

  static getLastBlock(state) {
    const lastPage = this.getLastPage(state)
    return lastPage.children[lastPage.children.length - 1]
  }

  // static changeBlockMode(vm, type, data = null) {
  //   if (data === null) {
  //     data = {}
  //   }
  //   data.type = type
  //   vm.data.blockMode = data
  // }

  // static resetBlockMode(vm) {
  //   this.changeBlockMode(vm, 'line')
  // }

  static addBlock(state) {
    const lastPage = this.getLastPage(state)
    if (state.blockMode.type === 'line') {
      lastPage.children.push(this.newElement(state.blockMode.type))
    } else if (state.blockMode.type === 'grid') {
      lastPage.children.push(this.newElement(state.blockMode.type, { column: state.blockMode.column, })
      )
    }
  }

  static push(state, pkg) {
    if (pkg.type === 'page') {
      state.main.children.push(this.newElement('page', pkg.data, pkg.style))
      state.main.children.splice(0, state.main.children.length - state.maxPages)
    } else if ([
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
    ].indexOf(pkg.type) !== -1) {
      if (!this.isBlockSame(state)) {
        this.addBlock(state)
      }
      this.getLastBlock(state).children.push(this.newElement(pkg.type, pkg.data, pkg.style))
    } else if (pkg.type === 'divider') {
      this.getLastPage(state).children.push(this.newElement(pkg.type, pkg.data, pkg.style))
    }
  }
}
