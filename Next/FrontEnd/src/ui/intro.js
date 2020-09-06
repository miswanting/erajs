// const Vue = require('../node_modules/vue/dist/vue')
Vue.component('i-intro', {
    props: {
        data: Object
    },
    template: `<body class='intro'><i-header :data=data></i-header><i-loading-frame :data=data></i-loading-frame></body>`
})
// Vue.component('i-loading-frame', {
//     props: {
//         data: Object
//     },
//     template: `<main class='loading'><div><loading-logo></loading-logo><loading-heading :data=data></loading-heading><loading-text :data=data></loading-text></div></main>`
// })
Vue.component('i-loading-frame', {
    props: {
        data: Object
    },
    template: `<main><div class='loading-banner'><div class='loading-group'><loading-logo></loading-logo><loading-heading :data=data></loading-heading><loading-text :data=data></loading-text></div></div></main>`
})
Vue.component('loading-logo', {
    props: {
        data: Object
    },
    data: function () {
        return {
            eyeMoveRate: { value: 0.0 }
        }
    },
    methods: {
        updateLogo: function (e) {
            e.preventDefault()
            let w = 30, h = 30 // 眼动参数
            let i = document.getElementById('move_eye')
            let j = document.getElementById('move_eye_core')
            let ix = e.clientX / window.innerWidth
            let iy = e.clientY / window.innerHeight
            let tw = w * this.eyeMoveRate.value
            let th = h * this.eyeMoveRate.value
            let x = ix * tw - tw / 2
            let y = iy * th - th / 2
            i.style.transform = "translate(" + x + "px," + y + "px)"
            j.style.transform = "translate(" + x + "px," + y + "px)"
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            document.addEventListener('mousemove', this.updateLogo)
            document.addEventListener('touchmove', this.updateLogo)
            anime({
                targets: this.eyeMoveRate,
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
        })
    },
    beforeDestroy: function () {
        document.removeEventListener('mousemove', this.updateLogo)
        document.addEventListener('touchmove', this.updateLogo)
    },
    render: function (createElement) {
        return createElement(
            'svg',
            {
                width: '300px',
                height: '150px'
            },
            [
                createElement(
                    'g',
                    {
                        style: { transform: 'translate(150px, 75px)scale(0.5,0.5)' }
                    },
                    [
                        createElement(
                            'text',
                            {
                                attrs: {
                                    id: 'txt',
                                    fill: 'var(--default-front)'
                                },
                                style: { textAnchor: 'middle', fontWeight: 'bold', fontSize: '120px', transform: 'translateX(0px)translateY(47px)' }
                            },
                            'Era.js'
                        ),
                        createElement(
                            'rect',
                            {
                                attrs: {
                                    id: 'mask',
                                    x: '-160',
                                    y: '-140',
                                    width: '320px',
                                    height: '280px',
                                    fill: 'var(--default-back)'
                                }
                            }
                        )
                    ]
                ),
                createElement(
                    'g',
                    {
                        attrs: {
                            id: 'icon'
                        },
                        style: { transform: 'translate(150px, 75px)scale(0.5,0.5)' }
                    },
                    [
                        createElement(
                            'g',
                            {
                                attrs: {
                                    id: 'move_eye'
                                }
                            },
                            [
                                createElement(
                                    'g',
                                    {
                                        attrs: {
                                            id: 'move_eye_core',
                                        }
                                    },
                                    [
                                        createElement(
                                            'circle',
                                            {
                                                attrs: {
                                                    id: 'cle',
                                                    r: 50,
                                                    fill: "red"
                                                },
                                                style: { transform: 'scale(0.0)' },
                                            }
                                        )
                                    ]
                                ),
                                createElement(
                                    'polygon',
                                    {
                                        attrs: {
                                            id: 'tri1',
                                            points: "-50,-50 50,-50 -50,50",
                                            fill: 'var(--default-front)'
                                        },
                                        style: { opacity: 0 }
                                    }
                                ),
                                createElement(
                                    'polygon',
                                    {
                                        attrs: {
                                            id: 'tri2',
                                            points: "50,50 50,-50 -50,50",
                                            fill: 'var(--default-front)'
                                        },
                                        style: { opacity: 0 }
                                    }
                                ),
                                createElement(
                                    'polygon',
                                    {
                                        attrs: {
                                            id: 'rect',
                                            points: "-50,-50 50,-50 50,50 -50,50",
                                            fill: 'var(--default-front)'
                                        },
                                        style: { transform: 'scale(0.0)' }
                                    }
                                )
                            ]
                        )
                    ]
                )
            ]
        )
    }
})
Vue.component('loading-heading', {
    props: {
        data: Object
    },
    template: `<div class="loading-heading">{{data.data.loadingTitle}}</div>`
})
Vue.component('loading-text', {
    props: {
        data: Object
    },
    render: function (createElement) {
        lines = this.data.data.loadingText.split('\n')
        let texts = []
        for (let i = 0; i < lines.length; i++) {
            texts.push(createElement('div', { key: i }, lines[i]))
        }
        return createElement('div', { class: 'loading-text' }, texts)
    },
    template: `<div>{{data.data.loadingText}}</div>`
})
