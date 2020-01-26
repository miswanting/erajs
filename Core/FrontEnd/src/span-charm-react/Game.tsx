import * as React from 'react'
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom'
import { Event } from '../Managers/DataManager'
export default function Game(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    return (<>
        <div style={{ height: '100%', display: 'flex' }}>
            <div style={{ alignSelf: 'center', width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ alignSelf: 'center' }}>
                    <svg width='300px' height='150px'>
                        <g style={{ transform: 'translate(150px, 75px)scale(0.5,0.5)' }} >
                            <text id='txt' style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: '120px', transform: 'translateX(0px)translateY(47px)' }} color='black'>Era.js</text>
                            <rect id='mask' x='-160' y='-140' width="320px" height='280px' fill="white"></rect>
                        </g>
                        <g id="icon" style={{ transform: 'translate(150px, 75px)scale(0.5,0.5)' }} >
                            <g id='move_eye'>
                                <g id='move_eye_core'>
                                    <circle id='cle' style={{ transform: 'scale(0.0)' }} r="50" fill="red"></circle>
                                </g>
                                <polygon id='tri1' style={{ opacity: 0 }} points="-50,-50 50,-50 -50,50" fill="black"></polygon>
                                <polygon id='tri2' style={{ opacity: 0 }} points="50,50 50,-50 -50,50" fill="black"></polygon>
                                <polygon id='rect' style={{ transform: 'scale(0.0)' }} points="-50,-50 50,-50 50,50 -50,50" fill="black"></polygon>
                            </g>
                        </g>
                    </svg>
                    <div id='inst' style={{ color: 'darkgray', opacity: 0.0, textAlign: 'center' }}>
                        加载中…
                    </div>
                </div>
            </div>
        </div>
    </>)
}