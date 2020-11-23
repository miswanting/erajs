routes.push({
  path: '/idle',
  component: {
    mounted() {
      anime({
        targets: '.load-title',
        keyframes: [
          { opacity: 0 },
          { opacity: 1, delay: 1500, duration: 2000, easing: 'linear' }
        ]
      })
      anime({
        targets: '.load-text',
        keyframes: [
          { opacity: 0 },
          { opacity: 1, delay: 2500, duration: 2000, easing: 'linear' }
        ]
      })
    },
    render() {
      const loadText = this.$store.state.loadText.split('\n').map((x) => { return Vue.h('div', {}, x) })
      return [
        Vue.h(app.component('frame-header')),
        Vue.h('main', { class: 'idle' }, [
          Vue.h(app.component('splash-canvas')),
          Vue.h('div', { class: 'center-group' }, [
            Vue.h('div', { class: 'engine-name' }, 'Era.js'),
            Vue.h(app.component('engine-icon')),
            Vue.h('div', { class: 'load-title' }, this.$store.state.loadTitle),
            Vue.h('div', { class: 'load-text' }, loadText)
          ])
        ])
      ]
    }
  }
})
components.push(['splash-canvas', {
  mounted() {
    const particalCount = 400
    const vanishRadius = 120
    const particalData = new Map()
    glMatrix.glMatrix.setMatrixArrayType(Array)
    const main = document.querySelector('main')
    let viewportSize = glMatrix.vec2.fromValues(main.clientWidth, main.clientHeight)
    let screenCenter = glMatrix.vec2.scale([], viewportSize, 0.5)
    let ScreenRadius = glMatrix.vec2.length(screenCenter)
    const canvas = document.querySelector('canvas')
    canvas.setAttribute('width', viewportSize[0])
    canvas.setAttribute('height', viewportSize[1])
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#333639'
    ctx.fillRect(0, 0, viewportSize[0], viewportSize[1])
    function getRandomColor() {
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
    function newPartical() {
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
    function drive(p) {
      const targetSpeed = 1
      const sd = glMatrix.vec2.normalize([], p.s)
      const speed = glMatrix.vec2.length(p.s)
      const td = glMatrix.vec2.normalize([], glMatrix.vec2.subtract([], screenCenter, p.p))
      const distance = glMatrix.vec2.length(glMatrix.vec2.subtract([], screenCenter, p.p))
      const will = 1 - (distance - vanishRadius) / ScreenRadius
      const newA = glMatrix.vec2.create()
      if (Math.random() > 1.6 - will) {
        glMatrix.vec2.add(newA, newA, glMatrix.vec2.scale([], glMatrix.vec2.rotate([], sd, [0, 0], Math.PI / 2), glMatrix.vec2.cross([], sd, td)[2] / 4))
      } else {
        glMatrix.vec2.add(newA, newA, glMatrix.vec2.scale([], glMatrix.vec2.rotate([], sd, [0, 0], Math.PI / 2), (Math.random() - 0.5) / 1.5))
      }
      glMatrix.vec2.add(newA, newA, glMatrix.vec2.scale([], sd, (targetSpeed - speed) / 10))
      p.a = newA
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
    function render() {
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
        v = drive(v)
        ctx.beginPath()
        ctx.fillStyle = v.c
        ctx.arc(v.p[0], v.p[1], v.r, 0, 2 * Math.PI)
        ctx.fill()
      })
      window.requestAnimationFrame(render)
    }
    window.requestAnimationFrame(render)
  },
  render() {
    return Vue.h('canvas', { id: 'splash-canvas' })
  }
}])
components.push(['engine-icon', {
  data() { return { eyeMoveRate: { value: 0.0 } } },
  methods: {
    updateLogo(e) {
      e.preventDefault()
      const w = 20; const h = 20 // 眼动参数
      const ix = e.clientX / window.innerWidth
      const iy = e.clientY / window.innerHeight
      const tw = w * this.eyeMoveRate.value
      const th = h * this.eyeMoveRate.value
      const x = ix * tw - tw / 2
      const y = iy * th - th / 2
      const a = document.querySelector('#steering-wheel')
      const b = document.querySelector('#wheel-white')
      const c = document.querySelector('#rod')
      const d = document.querySelector('#eye-black')
      const ee = document.querySelector('#pupil')
      a.setAttribute('cx', x * 0.8)
      a.setAttribute('cy', y * 0.8)
      b.setAttribute('cx', x * 1)
      b.setAttribute('cy', y * 1)
      c.setAttribute('x1', x * 1.2)
      c.setAttribute('x2', x * 1.2)
      c.setAttribute('y1', y * 1.2 - 35)
      c.setAttribute('y2', y * 1.2 + 35)
      d.setAttribute('cx', x * 1.3)
      d.setAttribute('cy', y * 1.3)
      ee.setAttribute('cx', x * 1.4)
      ee.setAttribute('cy', y * 1.4)
    }
  },
  unmounted() {
    document.removeEventListener('mousemove', this.updateLogo)
    document.removeEventListener('touchmove', this.updateLogo)
  },
  mounted() {
    document.addEventListener('mousemove', this.updateLogo)
    document.addEventListener('touchmove', this.updateLogo)
    anime({
      targets: this.eyeMoveRate,
      keyframes: [
        { value: 0, duration: 0, easing: 'linear' },
        { value: 1, delay: 4000, duration: 2000 }
      ]
    })
    anime({
      targets: '#eye-white',
      keyframes: [
        { r: 0, duration: 0, easing: 'linear' },
        { r: 50, delay: 1000, duration: 2000 }
      ]
    })
    anime({
      targets: '#steering-wheel',
      keyframes: [
        { r: 0, duration: 0, easing: 'linear' },
        { r: 40, delay: 1200, duration: 2000 }
      ]
    })
    anime({
      targets: '#wheel-white',
      keyframes: [
        { r: 0, duration: 0, easing: 'linear' },
        { r: 30, delay: 1400, duration: 2000 }
      ]
    })
    anime({
      targets: '#rod',
      keyframes: [
        { y1: 0, y2: 0, duration: 0, easing: 'linear' },
        { y1: -35, y2: 35, delay: 1600, duration: 2000 }
      ]
    })
    anime({
      targets: '#eye-black',
      keyframes: [
        { r: 0, duration: 0, easing: 'linear' },
        { r: 20, delay: 1800, duration: 2000 }
      ]
    })
    anime({
      targets: '#pupil',
      keyframes: [
        { r: 0, duration: 0, easing: 'linear' },
        { r: 10, delay: 2000, duration: 2000 }
      ]
    })
  },
  render() {
    return Vue.h('svg', {
      id: 'engine-icon',
      width: 120,
      height: 120
    }, [
      Vue.h('g', { id: 'icon-text' },
        Vue.h('text', {}, 'Era.js')
      ),
      Vue.h('g', { id: 'icon-icon' }, [
        Vue.h('circle', { id: 'eye-white', r: 50, fill: '#fff' }),
        Vue.h('circle', { id: 'steering-wheel', r: 40, fill: '#000' }),
        Vue.h('circle', { id: 'wheel-white', r: 30, fill: '#fff' }),
        Vue.h('line', { id: 'rod', x1: 0, y1: -35, x2: 0, y2: 35, stroke: '#000', 'stroke-width': 10 }),
        Vue.h('circle', { id: 'eye-black', r: 20, fill: '#000' }),
        Vue.h('circle', { id: 'pupil', r: 10, fill: '#f00' }),
      ])
    ])
  }
}])
