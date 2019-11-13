import React, { useState } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
export function Header(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    function handleItemClick(e, { name }) {

    }
    if (data.isConsole) {
        return (
            <Menu inverted size='mini'>
                <Menu.Item header>
                    Era.js Console
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>-</Menu.Item>
                    <Menu.Item>+</Menu.Item>
                    <Menu.Item>×</Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    } else {
        return (
            <Menu size='mini'>
                <Menu.Item header>
                    Era.js
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
                    <Menu.Item>-</Menu.Item>
                    <Menu.Item>+</Menu.Item>
                    <Menu.Item>×</Menu.Item>
                </Menu.Menu>
            </Menu >
        );
    }
}