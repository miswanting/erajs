import React, { useState, useRef, useEffect } from 'react';
import { Container, Segment } from 'semantic-ui-react'
export function Console(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    return (
        <Container>
            <Segment inverted>
                <Input></Input>
                <Output></Output>
            </Segment>
            <Segment inverted>
                <Input></Input>
                <Output></Output>
            </Segment>
            <Segment inverted>
                <Input></Input>
                <Output></Output>
            </Segment>
        </Container>
    )
}
function Input(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    const inputRef = useRef(null);
    function keyDown(e: any) {
        console.log(e.key);
        console.log(e.keyCode);
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }
    useEffect(() => {
        inputRef.current.focus();
    });
    return (
        <div style={{ display: "flex" }}>
            <div className="indicator">></div>
            <div className="in" ref={inputRef} onKeyDown={keyDown} contentEditable style={{ flexGrow: 1 }}></div>
        </div>
    )
}
function Output(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    return (
        <div style={{ display: "flex" }}>
        </div>
    )
}