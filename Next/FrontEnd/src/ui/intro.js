window.components.push(['i-intro', {
  render() {
    return [
      Vue.h(app.component('i-header')),
      Vue.h(app.component('i-intro-main'))
    ]
  }
}])
window.components.push(['i-intro-main', {
  render() {
    return Vue.h('main', { class: 'intro' }, [
      Vue.h('div', { class: 'loading-banner' }, [
        Vue.h('div', { class: 'loading-group' }, [
          Vue.h(app.component('loading-logo')),
          Vue.h(app.component('loading-heading')),
          Vue.h(app.component('loading-text')),
          Vue.h('br')
        ])
      ])
    ])
  }
}])
window.components.push(['loading-heading', {
  mounted() {
    anime({
      targets: '#loading-heading',
      delay: 7000,
      keyframes: [{
        opacity: 1.0,
        duration: 2000
      }]
    })
  },
  render() {
    return Vue.h('div', { id: 'loading-heading' }, this.$store.state.loadingTitle)
  }
}])
window.components.push(['loading-text', {
  mounted() {
    anime({
      targets: '.loading-text',
      delay: 9000,
      keyframes: [{
        opacity: 1.0,
        duration: 2000
      }]
    })
  },
  render() {
    let lines = this.$store.state.loadingText.split('\n')
    let texts = []
    for (let i = 0; i < lines.length; i++) {
      texts.push(Vue.h('div', {}, lines[i]))
    }
    return Vue.h('main', { class: 'loading-text' }, texts)
  }
}])
window.components.push(['loading-logo', {
  data() {
    return { eyeMoveRate: { value: 0.0 } }
  },
  methods: {
    updateLogo(e) {
      e.preventDefault()
      const w = 30; const h = 30 // 眼动参数
      const i = document.querySelector('#icon-eye')
      const j = document.querySelector('#eye-pupil')
      const ix = e.clientX / window.innerWidth
      const iy = e.clientY / window.innerHeight
      const tw = w * this.eyeMoveRate.value
      const th = h * this.eyeMoveRate.value
      const x = ix * tw - tw / 2
      const y = iy * th - th / 2
      i.style.transform = 'translate(' + x + 'px,' + y + 'px)'
      j.style.transform = 'translate(' + x + 'px,' + y + 'px)'
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.updateLogo)
    document.addEventListener('touchmove', this.updateLogo)
    anime({
      targets: this.eyeMoveRate,
      value: 1.0,
      delay: 6000,
      duration: 2000
    })
    anime({
      targets: '#eye-rect',
      keyframes: [{
        scale: 1.0,
        duration: 1000,
        delay: 2000
      }, {
        rotate: 45,
        duration: 1000
      }, {
        opacity: function () { return 0 }
      }]
    })
    anime({
      targets: '#eye-tri1',
      delay: 3000,
      keyframes: [{
        rotate: function () { return 45 },
        opacity: function () { return 1 },
        duration: 1000
      }, {
        points: '-70,-70 50,-50 -50,50',
        translateX: -10,
        translateY: -10,
        duration: 1000
      }]
    })
    anime({
      targets: '#eye-tri2',
      delay: 3000,
      keyframes: [{
        rotate: function () { return 45 },
        opacity: function () { return 1 },
        duration: 1000
      }, {
        points: '70,70 50,-50 -50,50',
        translateX: 10,
        translateY: 10,
        duration: 1000
      }]
    })
    anime({
      targets: '#pupil-core',
      keyframes: [{
        scale: 0.8,
        duration: 1000,
        delay: 3000,
        easing: 'linear'
      }]
    })
    anime({
      targets: '#logo-icon',
      delay: 5000,
      keyframes: [{
        translateX: -150,
        duration: 1000
      }]
    })
    anime({
      targets: '#logo-text-mask',
      delay: 5000,
      keyframes: [{
        translateX: -250,
        duration: 1000
      }]
    })
    anime({
      targets: '#logo-text',
      delay: 5000,
      keyframes: [{
        translateX: 100,
        duration: 1000
      }]
    })
    anime({
      targets: '#inst-more',
      delay: 12000,
      keyframes: [{
        opacity: 1.0,
        duration: 2000
      }]
    })
  },
  template: `<svg width="300px" height="150px">
    <g style="transform:translate(150px,75px)scale(0.5,0.5)">
      <text id="logo-text" fill="var(--default-front)" style="text-anchor:middle;font-weight:bold;font-size:120px;transform:translateX(0px)translateY(47px)">Era.js</text>
      <rect id="logo-text-mask" x="-160" y="-140" width="320px" height="280px" fill="var(--default-back)"></rect>
    </g>
    <g id="logo-icon" style="transform:translate(150px,75px)scale(0.5,0.5)">
      <g id="icon-eye">
        <g id="eye-pupil">
          <circle id="pupil-core" r=50 fill="red" style="transform:scale(0)"></circle>
        </g>
        <polygon id="eye-tri1" points="-50,-50 50,-50 -50,50" fill="var(--default-front)" style="opacity:0"></polygon>
        <polygon id="eye-tri2" points="50,50 50,-50 -50,50" fill="var(--default-front)" style="opacity:0"></polygon>
        <polygon id="eye-rect" points="-50,-50 50,-50 50,50 -50,50" fill="var(--default-front)" style="opacity:0"></polygon>
      </g>
    </g>
  </svg>`
}])
