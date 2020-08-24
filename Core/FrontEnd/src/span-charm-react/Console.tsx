import * as React from 'react'
import { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { Event } from '../managers/DataManager'
export function Console(props: any) {
    // const [data, setData] = useState(props.data);
    // const [style, setStyle] = useState(props.style);
    // let data = [
    //     {
    //         in: "help",
    //         out: [
    //             "Era.js Console",
    //             "Version: 0.2.0"
    //         ]
    //     }, {
    //         in: "echo abc",
    //         out: [
    //             "abc"
    //         ]
    //     }
    // ]
    useEffect(() => {
        let e = document.getElementsByTagName("main")[0]
        e.scrollTop = e.scrollHeight;
    });
    let d_data = props.data.children.map(child => {
        let outs = child.out.map(o => {
            return <div>{o}</div>
        })
        return <div>
            <div style={{ display: "flex" }}>
                <div className="indicator">
                    {/* <FontAwesomeIcon icon={faAngleDoubleRight} /> */}
                </div>
                <div className="in" style={{ flexGrow: 1 }}>
                    {child.in}
                </div>
            </div>
            <div className="out">
                {outs}
            </div>
        </div>
    })
    return (
        <main className="console">
            {d_data}
            <Input onChange={props.data.CMD} />
        </main>
    )
}
export function Input(props: any) {
    // const [data, setData] = useState('');
    const [style, setStyle] = useState(props.style);
    const inputRef = useRef(null);
    function keyDown(e: any) {
        if (e.keyCode === 13) {
            e.preventDefault();
            let bag = {
                type: Event.ConsoleInput,
                data: inputRef.current.innerText
            }
            props.onChange(bag)
            inputRef.current.innerText = ""
        }
    }
    useEffect(() => {
        inputRef.current.focus();
    });
    return (
        <div style={{ display: "flex" }}>
            <div className="indicator">
                {/* <FontAwesomeIcon icon={faAngleDoubleRight} /> */}
            </div>
            <div className="in" ref={inputRef} onKeyDown={keyDown} contentEditable style={{ flexGrow: 1 }}>
                {props.data}
            </div>
        </div>
    )
}