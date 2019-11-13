import React, { useState } from "react";
export function Splash(props: any) {
    let content = []
    if (props.data.load_text == '') {
        content.push(<div>Connecting...</div>)
    } else {
        content.push(<div>Loading...</div>)
        content.push(<div>{props.data.load_text}</div>)
    }
    return (
        <main className="splash">
            <div>
                <div>{props.data.title}</div>
                {content}
                <div>按[Esc]键打开菜单</div>
                <div>按[`]键打开控制台</div>
            </div>
        </main>
    )
}