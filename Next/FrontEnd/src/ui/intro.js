const React = require('../../node_modules/react')
const anime = require('../../node_modules/animejs')
const Header = require('../components/header')
module.exports = function Intro(props) {
    return (
        React.createElement('div', {
            className: 'intro',
            style: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }
        },
            React.createElement(Header, props),
            React.createElement(AnimeIntro, props),
        )
    )
}
function AnimeIntro(props) {
    React.useEffect(() => {
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
            // complete: (anim) => {
            //     let bag = {
            //         type: Event.IntroComplete
            //     }
            //     data.CMD(bag)
            //     // const std = React.useContext(STD)
            // }
        })
        anime({
            targets: '#inst-more',
            delay: 12000,
            keyframes: [
                {
                    opacity: 1.0,
                    duration: 2000,
                }
            ],
            // complete: (anim) => {
            //     let bag = {
            //         type: Event.IntroComplete
            //     }
            //     data.CMD(bag)
            //     // const std = React.useContext(STD)
            // }
        })
        return (() => {
            document.removeEventListener("mousemove", moveEye)
            document.removeEventListener('touchmove', moveEye)
        })
    })
    return (
        React.createElement('div',
            {
                style: { height: '100%', display: 'flex', backgroundColor: 'var(--dark)', cursor: 'default' }
            },
            React.createElement('div',
                {
                    style: { alignSelf: 'center', width: '100%', display: 'flex', flexDirection: 'column' }
                },
                React.createElement('div',
                    {
                        style: { alignSelf: 'center' }
                    },
                    React.createElement('svg',
                        {
                            width: '300px',
                            height: '150px'
                        },
                        React.createElement('g',
                            {
                                style: {
                                    transform: 'translate(150px, 75px)scale(0.5,0.5)'
                                }
                            },
                            React.createElement('text',
                                {
                                    id: 'txt',
                                    style: { textAnchor: 'middle', fontWeight: 'bold', fontSize: '120px', transform: 'translateX(0px)translateY(47px)' },
                                    fill: 'var(--light)'
                                },
                                'Era.js'
                            ),
                            React.createElement('rect',
                                {
                                    id: 'mask',
                                    x: '-160',
                                    y: '-140',
                                    width: '320px',
                                    height: '280px',
                                    fill: 'var(--dark)',
                                },

                            ),
                        ),
                        React.createElement('g',
                            {
                                id: 'icon',
                                style: { transform: 'translate(150px, 75px)scale(0.5,0.5)' }
                            },
                            React.createElement('g',
                                {
                                    id: 'move_eye',
                                },
                                React.createElement('g',
                                    {
                                        id: 'move_eye_core',
                                    },
                                    React.createElement('circle',
                                        {
                                            id: 'cle',
                                            style: { transform: 'scale(0.0)' },
                                            r: 50,
                                            fill: "red",
                                        },
                                    ),
                                ),
                                React.createElement('polygon',
                                    {
                                        id: 'tri1',
                                        style: { opacity: 0 },
                                        points: "-50,-50 50,-50 -50,50",
                                        fill: 'var(--light)'
                                    },

                                ),
                                React.createElement('polygon',
                                    {
                                        id: 'tri2',
                                        style: { opacity: 0 },
                                        points: "50,50 50,-50 -50,50",
                                        fill: 'var(--light)'
                                    },

                                ),
                                React.createElement('polygon',
                                    {
                                        id: 'rect',
                                        style: { transform: 'scale(0.0)' },
                                        points: "-50,-50 50,-50 50,50 -50,50",
                                        fill: 'var(--light)'
                                    },

                                )
                            )
                        )
                    ),
                    React.createElement('div',
                        {
                            id: 'inst',
                            style: { color: 'var(--light)', opacity: 0.0, textAlign: 'center' },
                        },

                        'Waiting for Connection...',
                        React.createElement('div',
                            {
                                id: 'inst-more',
                                style: { color: 'var(--light)', opacity: 0.0, textAlign: 'center', fontSize: '0.7rem' },
                            },
                            React.createElement('span', null,
                                'If there is no connection for a long time,',
                            ),
                            React.createElement('br'),
                            React.createElement('span', null,
                                'you may need to manually start the backend.',
                            )
                        )
                    )
                )
            )
        )
    )
}