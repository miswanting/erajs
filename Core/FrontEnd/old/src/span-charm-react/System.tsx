import React, { useState } from "react";
export function System(props: any) {
    return (
        <main className="pause" style={{ height: 100 + '%', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 100 + '%', textAlign: 'center' }}>
                <h1>{props.data.title} 系统菜单</h1>
                <div>回到游戏</div>
                <div>头像编辑器</div>
                <div>地图编辑器</div>
                <div>可视化代码编辑器</div>
                <div>退出游戏</div>
            </div>
        </main>
    )
}