import { EventEmitter } from 'events'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from "../semantic-ui-react/App";

/**
 * 显示管理器
 * 管理窗口的显示内容，如页面类型等
 */
export default class DisplayManager extends EventEmitter {
    private data = {

    }
    /**
     * 显示管理器
     * 管理窗口的显示内容，如页面类型等
     * 
     */
    public init() {

    }
    public push() {

    }
    public update(app) { // 刷新前端
        ReactDOM.render(
            <App data={app} />,
            document.getElementById('root')
        )
    }
    /**
     * name
     */
    public name() {

    }
}
