import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ipcRenderer } from "electron";
// 前端选择
// antd
// import App from "./antd/App";
// sematic-ui-react
import App from "./sematic-ui-react/App";




/**
 * 侦听鼠标点击
 */
document.getElementById('root').addEventListener("mouseup", (e) => {
    console.log('[DEBG]鼠标点击：', e.which);
    let bag = {
        type: 'MOUSE_CLICK',
        from: 'r',
        to: 'b',
        value: e.which
    }
    send(bag)
})

/**
 * 自m接受信息
 */
ipcRenderer.on('bag', (event: any, data: string) => {
    var raw = data.toString()
    // 由main打包并发送的bag不需要解除叠包
    var piece = raw.split('}{')
    for (let i = 0; i < piece.length; i++) {
        if (i != piece.length - 1) {
            piece[i] += '}'
        }
        if (i != 0) {
            piece[i] = '{' + data[i]
        }
    }
    for (let i = 0; i < piece.length; i++) {
        // console.log('[DEBG]接收：', piece[i]); // 生产环境下请注释掉
        let bag: any = JSON.parse(piece[i])
        parseBag(bag)
    }
    // 由main打包并发送的bag不需要解除叠包
    // console.log('[DEBG]接收：', raw); // 生产环境下请注释掉
    // var bag: any = JSON.parse(raw)
    // parseBag(bag)
})

/**
 * 发射信息至m
 * @param bag 
 */
function send(bag: any) {
    console.log('[DEBG]发送：', JSON.stringify(bag)); // 生产环境下请注释掉
    ipcRenderer.send('bag', JSON.stringify(bag))
}

/**
 * 解析接收到的Bag
 * @param bag 
 */
function parseBag(bag: any) {
    if (bag.type == 'connected') {
        console.log('[DEBG]后端已连接！')
        app.isConnected = true
        update()
    } else if (bag.type == 'loaded') {
        console.log('[DONE]后端数据加载完成！')
        app.isLoaded = true
        update()
    } else if (bag.type == 'title') {
        document.title = bag.value
    } else if (bag.type == 't') { // 文本
        if (app.pages.length == 0) { // 确保生成t之前存在Page
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1 // 最后一个Page的index
        if (bag.value == '') { // 最后一个t的值为空：空行
            app.pages[iPage].children.push({ type: 'line', children: [] })
        } else {
            if (app.pages[iPage].children.length == 0) { // 确保生成t之前存在Line
                app.pages[iPage].children.push({ type: 'line', children: [] })
            }
            // 在最后page的line中加t
            let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
            app.pages[iPage].children[iLine].children.push(bag)
        }
        update()
    } else if (bag.type == 'b') { // 按钮
        if (app.pages.length == 0) { // 确保生成b之前存在Page
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1 // 最后一个Page的index
        if (app.pages[iPage].children.length == 0) { // 确保生成b之前存在Line
            app.pages[iPage].children.push({ type: 'line', children: [] })
        }
        // 在最后page的line中加b
        let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
        bag.value.func = send // 向虚拟树中装载发射函数
        app.pages[iPage].children[iLine].children.push(bag)
        update()
    } else if (bag.type == 'h') { // 标题
        if (app.pages.length == 0) { // 确保生成h之前存在Page
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1 // 最后一个Page的index
        if (app.pages[iPage].children.length == 0) { // 确保生成h之前存在Line
            app.pages[iPage].children.push({ type: 'line', children: [] })
        }
        // 在最后page的line中加h
        let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
        app.pages[iPage].children[iLine].children.push(bag)
        update()
    } else if (bag.type == 'progress') { // 进度条
        if (app.pages.length == 0) { // 确保生成progress之前存在Page
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1 // 最后一个Page的index
        if (app.pages[iPage].children.length == 0) { // 确保生成progress之前存在Line
            app.pages[iPage].children.push({ type: 'line', children: [] })
        }
        // 在最后page的line中加progress
        let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
        app.pages[iPage].children[iLine].children.push(bag)
        update()
    } else if (bag.type == 'rate') { // 评分
        if (app.pages.length == 0) { // 确保生成rate之前存在Page
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1 // 最后一个Page的index
        if (app.pages[iPage].children.length == 0) { // 确保生成rate之前存在Line
            app.pages[iPage].children.push({ type: 'line', children: [] })
        }
        // 在最后page的line中加b
        let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
        bag.value.func = send // 向虚拟树中装载发射函数
        app.pages[iPage].children[iLine].children.push(bag)
        update()
    } else if (bag.type == 'radio') { // 单项选择
        if (app.pages.length == 0) { // 确保生成radio之前存在Page
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1 // 最后一个Page的index
        if (app.pages[iPage].children.length == 0) { // 确保生成radio之前存在Line
            app.pages[iPage].children.push({ type: 'line', children: [] })
        }
        // 在最后page的line中加b
        let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
        bag.value.func = send // 向虚拟树中装载发射函数
        app.pages[iPage].children[iLine].children.push(bag)
        update()
    } else if (bag.type == 'input') { // 单项选择
        if (app.pages.length == 0) { // 确保生成input之前存在Page
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1 // 最后一个Page的index
        if (app.pages[iPage].children.length == 0) { // 确保生成input之前存在Line
            app.pages[iPage].children.push({ type: 'line', children: [] })
        }
        // 在最后page的line中加b
        let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
        bag.value.func = send // 向虚拟树中装载发射函数
        app.pages[iPage].children[iLine].children.push(bag)
        update()
    } else if (bag.type == 'divider') { // 分割线
        if (app.pages.length == 0) { // 确保生成divider之前存在Page
            app.pages.push({ type: 'page', children: [] })
        }
        let iPage = app.pages.length - 1 // 最后一个Page的index
        if (app.pages[iPage].children.length == 0) { // 确保生成divider之前存在Line
            app.pages[iPage].children.push({ type: 'line', children: [] })
        }
        // 在最后page的line中加b
        let iLine = app.pages[iPage].children.length - 1 // 最后一个Line的index
        app.pages[iPage].children[iLine].children.push(bag)
        update()
    } else if (bag.type == 'page') { // 页面
        app.pages.push({ type: 'page', children: [] })
        for (let i = 0; i < app.pages.length - 20; i++) { // 超出50页就删除老的
            app.pages.splice(0, 1)
        }
        update()
    } else if (bag.type == 'mode') { // 改变显示模式
        app.mode = bag.value
        update()
    } else if (bag.type == 'clear') { // 清除所有内容
        if (bag.value['last']) {
            app.pages.pop()
        } else {
            app.pages = []
        }
        update()
    }
}
let tmp: any[] = []
let app = {
    isConnected: false,
    isLoaded: false,
    pages: tmp,
    mode: tmp
}
update()
function update() {
    ReactDOM.render(
        <App data={app} />,
        document.getElementById('root')
    )
}