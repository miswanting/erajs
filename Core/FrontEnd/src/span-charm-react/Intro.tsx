import * as React from 'react'
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom'
import anime from 'animejs/lib/anime.es'
import { Event } from '../Managers/DataManager'
export default function Intro(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    useEffect(() => {
        let eyeMoveRate = { value: 0.0 }
        let moveEye = (e) => {
            e.preventDefault()
            let w = 30, h = 30 // 眼动参数
            let i = document.getElementById('move_eye')
            let j = document.getElementById('move_eye_core')
            let ix = e.clientX / window.innerWidth
            let iy = e.clientY / window.innerHeight
            let tw = w * eyeMoveRate.value
            let th = h * eyeMoveRate.value
            let x = ix * tw - tw / 2
            let y = iy * th - th / 2
            i.style.transform = "translate(" + x + "px," + y + "px)"
            j.style.transform = "translate(" + x + "px," + y + "px)"
        }
        document.addEventListener('mousemove', moveEye)
        document.addEventListener('touchmove', moveEye)
        anime({
            targets: eyeMoveRate,
            value: 1.0,
            delay: 6000,
            duration: 2000,
        })
        anime({
            targets: '#rect',
            keyframes: [
                {
                    scale: 1.0,
                    duration: 1000,
                    delay: 2000,
                },
                {
                    rotate: 45,
                    duration: 1000,
                },
                {
                    opacity: function () { return 0 }
                },
            ],
        })
        anime({
            targets: '#tri1',
            delay: 3000,
            keyframes: [
                {
                    rotate: function () { return 45 },
                    opacity: function () { return 1 },
                    duration: 1000,
                },
                {
                    points: '-70,-70 50,-50 -50,50',
                    translateX: -10,
                    translateY: -10,
                    duration: 1000,
                },
            ],
        })
        anime({
            targets: '#tri2',
            delay: 3000,
            keyframes: [
                {
                    rotate: function () { return 45 },
                    opacity: function () { return 1 },
                    duration: 1000,
                },
                {
                    points: '70,70 50,-50 -50,50',
                    translateX: 10,
                    translateY: 10,
                    duration: 1000,
                },
            ],
        })
        anime({
            targets: '#cle',
            keyframes: [
                {
                    scale: 0.8,
                    duration: 1000,
                    delay: 3000,
                    easing: 'linear'
                }
            ],
        })
        anime({
            targets: '#icon',
            delay: 5000,
            keyframes: [
                {
                    translateX: -150,
                    duration: 1000,
                }
            ],
        })
        anime({
            targets: '#mask',
            delay: 5000,
            keyframes: [
                {
                    translateX: -250,
                    duration: 1000,
                }
            ],
        })
        anime({
            targets: '#txt',
            delay: 5000,
            keyframes: [
                {
                    translateX: 100,
                    duration: 1000,
                }
            ],
        })
        anime({
            targets: '#inst',
            delay: 7000,
            keyframes: [
                {
                    opacity: 1.0,
                    duration: 2000,
                }
            ],
            complete: (anim) => {
                let bag = {
                    type: Event.IntroComplete
                }
                data.CMD(bag)
                // const std = React.useContext(STD)
            }
        })
        return (() => {
            document.removeEventListener("mousemove", moveEye)
            document.removeEventListener('touchmove', moveEye)
        })
    });
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