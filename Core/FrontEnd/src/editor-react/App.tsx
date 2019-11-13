import "./editor.sass"

import React, { useState } from 'react';

export default function App(props: any) {
    return (
        <>
            <Header data={props.data} style={{}} />
            <Editor data={props.data} style={{}} />
        </>
    )
}
function Header(props: any) {
    return (
        <nav>
            <span className="quick">●</span>
            <span className="quick">●</span>
            <span className="title">Editor</span>
            <span className="min">●</span>
            <span className="max">●</span>
            <span className="close">●</span>
        </nav>
    )
}
function Editor(props: any) {
    
    return (
        <main>Editor</main>
    )
}