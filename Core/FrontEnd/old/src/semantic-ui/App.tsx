import 'semantic-ui-css/semantic.min.css'
import './bias.sass'

import { remote } from 'electron'
import { Dropdown, Menu } from 'semantic-ui-react'
import React, { useState } from 'react';
import { Splash } from "./Splash"
// import { Header } from "./Header";
import { System } from "./System";
import { Console } from "./Console"
import { Game } from "./Game";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTools, faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
// 初始模式：Splash
// 游戏模式：Header + Game
// 终端模式：Header + Console
// 头像模式：Header + Avantar
// 地图模式：Header + Map
// 代码模式：Header + Code

/**
 * 解析抽象组件树(ACT, Abstrac Component Tree)
 * 
 * 根据不同的应用状态管理界面
 * @param props data, style
 */
export default function App(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    let tmp = [
        <Header data={data} style={{}} />,
        <Toast data={data} style={{}} />,
    ]
    if (data.isConsole) {
        tmp.push(<Console data={data} style={{}} />)
    } else if (data.isMenu) { // Splash界面
        tmp.push(<System data={data} style={{}} />)
    } else if (!data.isLoaded) { // Splash界面
        tmp.push(<Splash data={data} style={{}} />)
    } else {
        tmp.push(<Game data={data} style={{}} />)
    }
    return (<>{tmp}</>)
    if (data.isConsole) { // 终端优先级压倒一切
        document.body.style.backgroundColor = "#1b1c1d"
        return (
            <>
                <div>
                    <Header data={data} style={style} />
                </div>
                <div style={{ flexGrow: 1, overflowX: "hidden" }}>
                    <Console data={data} style={style} />
                </div>
            </>
        );
    } else if (!data.isLoaded) { // Splash界面
        document.body.style.backgroundColor = "#fff"
        return (
            <Splash data={data} style={style} />
        );
    } else { // 加载游戏主界面
        document.body.style.backgroundColor = "#fff"
        return (
            <>
                <div>
                    <Header data={data} style={style} />
                </div>
                <div id={'pagelist'} style={{ flexGrow: 1, overflowX: "hidden" }}>
                    <div className={'ui bottom aligned row padded grid'} style={{ height: 100 + '%', display: 'grid' }}>
                        <Game data={data} style={style} />
                    </div>
                </div>
            </>
        );
    }
}
export function Header(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    function toggleDevTools() {
        remote.getCurrentWindow().webContents.openDevTools();
        // if (remote.getCurrentWindow().webContents.isDevToolsOpened) {
        //     remote.getCurrentWindow().webContents.closeDevTools()
        // } else {
        //     remote.getCurrentWindow().webContents.openDevTools();
        // }
    }
    function minWindow() {
        remote.getCurrentWindow().minimize();
    }
    function maxWindow() {
        if (!remote.getCurrentWindow().isMaximized()) {
            remote.getCurrentWindow().maximize();
        } else {
            remote.getCurrentWindow().unmaximize();
        }
    }
    function closeWindow() {
        remote.getCurrentWindow().close();
    }
    let content = <></>
    if (data.isConsole) {
        return (
            <header>
                <nav>
                    <Menu inverted size='mini'>
                        <Menu.Item header>
                            {data.title} Console
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item onClick={toggleDevTools}>
                                <FontAwesomeIcon icon={faTools} />
                            </Menu.Item>
                            <Menu.Item onClick={minWindow}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Menu.Item>
                            <Menu.Item onClick={maxWindow}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Menu.Item>
                            <Menu.Item onClick={closeWindow}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </nav>
            </header>
        )
    } else if (data.isMenu) {
        return (
            <header>
                <nav>
                    <Menu inverted size='mini'>
                        <Menu.Item header>
                            {data.title}
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item onClick={toggleDevTools}>
                                <FontAwesomeIcon icon={faTools} />
                            </Menu.Item>
                            <Menu.Item onClick={minWindow}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Menu.Item>
                            <Menu.Item onClick={maxWindow}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Menu.Item>
                            <Menu.Item onClick={closeWindow}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </nav>
            </header>
        )
    } else if (!data.isLoaded) {
        return (
            <header>
                <nav>
                    <Menu inverted size='mini'>
                        <Menu.Item header>
                            {data.title}
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item onClick={toggleDevTools}>
                                <FontAwesomeIcon icon={faTools} />
                            </Menu.Item>
                            <Menu.Item onClick={minWindow}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Menu.Item>
                            <Menu.Item onClick={maxWindow}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Menu.Item>
                            <Menu.Item onClick={closeWindow}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </nav>
            </header>
        )
    } else {
        return (
            <header>
                <nav>
                    <Menu size='mini'>
                        <Menu.Item header>
                            {data.title}
                        </Menu.Item>
                        <Dropdown item text='游戏'>
                            <Dropdown.Menu>
                                <Dropdown.Item>新建</Dropdown.Item>
                                <Dropdown.Item>打开</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>退出</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown item text='编辑'>
                            <Dropdown.Menu>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown item text='窗口'>
                            <Dropdown.Menu>
                                <Dropdown.Item>游戏</Dropdown.Item>
                                <Dropdown.Item>终端</Dropdown.Item>
                                <Dropdown.Item>地图</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown item text='帮助'>
                            <Dropdown.Menu>
                                <Dropdown.Item>帮助</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>教程</Dropdown.Item>
                                <Dropdown.Item>文档</Dropdown.Item>
                                <Dropdown.Item>API</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>检查更新</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>关于</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Menu position='right'>
                            <Menu.Item onClick={toggleDevTools}>
                                <FontAwesomeIcon icon={faTools} />
                            </Menu.Item>
                            <Menu.Item onClick={minWindow}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Menu.Item>
                            <Menu.Item onClick={maxWindow}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Menu.Item>
                            <Menu.Item onClick={closeWindow}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </nav>
            </header>
        )
    }
}
export function Toast(props: any) {
    return (<></>)
}