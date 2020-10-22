window.components.push(['i-intro', {
  render () {
    return [
      Vue.h(app.component('i-header')),
      Vue.h(app.component('i-intro-main'))
    ]
  }
}])
window.components.push(['i-intro-main', {
  render () {
    return Vue.h('main', { class: 'intro' }, [
      Vue.h(app.component('i-sp-canvas')),
      Vue.h('div', { class: 'loading-group' }, [
        Vue.h(app.component('loading-logo')),
        Vue.h(app.component('loading-heading')),
        Vue.h(app.component('loading-text')),
        Vue.h('br')
      ])
    ])
  }
}])
window.components.push(['i-sp-canvas', {
  mounted () {
    const particalCount = 400
    const speedRadiusRate = 1.0
    const vanishRadius = 120
    const particalData = new Map()
    glMatrix.glMatrix.setMatrixArrayType(Array)
    const main = document.querySelector('main')
    let viewportSize = glMatrix.vec2.fromValues(main.clientWidth, main.clientHeight)
    console.log(main.clientWidth)
    let screenCenter = glMatrix.vec2.scale([], viewportSize, 0.5)
    let ScreenRadius = glMatrix.vec2.length(screenCenter)
    // ScreenRadius = 200
    const canvas = document.querySelector('canvas')
    canvas.setAttribute('width', viewportSize[0])
    canvas.setAttribute('height', viewportSize[1])
    // canvas.setAttribute('style', 'height:100%')
    // main.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#333639'
    ctx.fillRect(0, 0, viewportSize[0], viewportSize[1])
    function getRandomColor () {
      let color = ''
      if (Math.random() > 0.1) {
        color = '#999'
      } else if (Math.random() > 0.1) {
        color = '#900'
      } else if (Math.random() > 0.1) {
        color = '#099'
      } else {
        color = '#990'
      }
      return color
    }
    function newPartical () {
      if (Math.random() > 0.5) {
        const array = new Uint32Array(1)
        crypto.getRandomValues(array)
        const birthAngle = Math.random() * Math.PI * 2
        const p = {
          p: glMatrix.vec2.fromValues(
            screenCenter[0] + Math.cos(birthAngle) * ScreenRadius,
            screenCenter[1] + Math.sin(birthAngle) * ScreenRadius
          ),
          s: glMatrix.vec2.random([]),
          a: glMatrix.vec2.random([]),
          r: Math.random() * 1.5 + 0.5,
          c: getRandomColor()
        }
        // console.log(JSON.stringify(p));
        particalData.set(array[0], p)
      }
    }

    function drive (p) {
      // if (p.a > Math.PI) {
      //     p.a = p.a % Math.PI
      // } else if (p.a < - Math.PI) {
      //     p.a = -(-p.a % Math.PI)
      // }
      const targetSpeed = 1
      const sd = glMatrix.vec2.normalize([], p.s)
      const speed = glMatrix.vec2.length(p.s)
      const td = glMatrix.vec2.normalize([], glMatrix.vec2.subtract([], screenCenter, p.p))
      const distance = glMatrix.vec2.length(glMatrix.vec2.subtract([], screenCenter, p.p))
      const will = 1 - (distance - vanishRadius) / ScreenRadius
      const newA = glMatrix.vec2.create()
      // console.log(will);
      if (Math.random() > 1.6 - will) {
        glMatrix.vec2.add(newA, newA, glMatrix.vec2.scale([], glMatrix.vec2.rotate([], sd, [0, 0], Math.PI / 2), glMatrix.vec2.cross([], sd, td)[2] / 4))
      } else {
        glMatrix.vec2.add(newA, newA, glMatrix.vec2.scale([], glMatrix.vec2.rotate([], sd, [0, 0], Math.PI / 2), (Math.random() - 0.5) / 1.5))
      }
      glMatrix.vec2.add(newA, newA, glMatrix.vec2.scale([], sd, (targetSpeed - speed) / 10))
      p.a = newA
      // console.log(speed);
      // glMatrix.vec2.normalize(p.a, glMatrix.vec2.subtract([], screenCenter, p.p))
      glMatrix.vec2.add(p.s, p.s, p.a)
      glMatrix.vec2.add(p.p, p.p, p.s)
      return p
    }
    window.addEventListener('resize', () => {
      viewportSize = glMatrix.vec2.fromValues(main.clientWidth, main.clientHeight)
      canvas.setAttribute('width', viewportSize[0])
      canvas.setAttribute('height', viewportSize[1])
      screenCenter = glMatrix.vec2.scale([], viewportSize, 0.5)
      ScreenRadius = glMatrix.vec2.length(screenCenter)
    })
    function render () {
      ctx.beginPath()
      ctx.fillStyle = '#33363925'
      ctx.fillRect(0, 0, viewportSize[0], viewportSize[1])
      for (let i = 0; i < particalCount - particalData.size; i++) {
        newPartical()
      }
      particalData.forEach((v, k) => {
        if (
          glMatrix.vec2.length(glMatrix.vec2.subtract([], screenCenter, v.p)) < vanishRadius ||
          glMatrix.vec2.length(glMatrix.vec2.subtract([], screenCenter, v.p)) > ScreenRadius + vanishRadius
        ) {
          particalData.delete(k)
        }
        // console.log(v.p);
        v = drive(v)
        ctx.beginPath()
        ctx.fillStyle = v.c
        ctx.arc(v.p[0], v.p[1], v.r, 0, 2 * Math.PI)
        ctx.fill()
        // helper
        // ctx.beginPath();
        // ctx.lineWidth = 1
        // ctx.strokeStyle = '#f00'
        // ctx.moveTo(v.p[0], v.p[1])
        // ctx.lineTo(v.p[0] + v.s[0] * 10, v.p[1] + v.s[1] * 10)
        // ctx.lineTo(v.p[0] + v.s[0] * 10 + v.a[0] * 20, v.p[1] + v.s[1] * 10 + v.a[1] * 20)
        // ctx.stroke()
      })
      window.requestAnimationFrame(render)
    }
    window.requestAnimationFrame(render)
  },
  template: '<canvas id="sp" style="position:absolute"><canvas>'
}])
window.components.push(['loading-heading', {
  mounted () {
    anime({
      targets: '#loading-heading',
      delay: 7000,
      keyframes: [{
        opacity: 1.0,
        duration: 2000
      }]
    })
  },
  render () {
    return Vue.h('div', { id: 'loading-heading' }, this.$store.state.loadingTitle)
  }
}])
window.components.push(['loading-text', {
  mounted () {
    anime({
      targets: '.loading-text',
      delay: 9000,
      keyframes: [{
        opacity: 1.0,
        duration: 2000
      }]
    })
  },
  render () {
    const lines = this.$store.state.loadingText.split('\n')
    const texts = []
    for (let i = 0; i < lines.length; i++) {
      texts.push(Vue.h('div', {}, lines[i]))
    }
    return Vue.h('main', { class: 'loading-text' }, texts)
  }
}])
window.components.push(['loading-logo', {
  data () {
    return { eyeMoveRate: { value: 0.0 } }
  },
  methods: {
    updateLogo (e) {
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
  unmounted () {
    document.removeEventListener('mousemove', this.updateLogo)
    document.removeEventListener('touchmove', this.updateLogo)
  },
  mounted () {
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
      targets: '#logo-text',
      delay: 5000,
      keyframes: [{
        translateX: 100,
        scaleX: [0, 1],
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
    </g>
    <g id="logo-icon" style="transform:translate(150px,75px)scale(0.5,0.5)">
      <g id="icon-eye">
        <g id="eye-pupil">
          <circle id="pupil-core" r=50 fill="#d00" style="transform:scale(0)"></circle>
        </g>
        <polygon id="eye-tri1" points="-50,-50 50,-50 -50,50" fill="var(--default-front)" style="opacity:0"></polygon>
        <polygon id="eye-tri2" points="50,50 50,-50 -50,50" fill="var(--default-front)" style="opacity:0"></polygon>
        <polygon id="eye-rect" points="-50,-50 50,-50 50,50 -50,50" fill="var(--default-front)" style="opacity:0"></polygon>
      </g>
    </g>
  </svg>`
}])
