
components.push(['msg-system', {
  render() {
    const msgList = []
    for (let i = 0; i < this.$store.state.msgs.length; i++) {
      msgList.push(
        Vue.h(app.component('msg-item'), {
          key: this.$store.state.msgs[i].data.hash,
          data: this.$store.state.msgs[i]
        })
      )
    }
    return [
      Vue.h('div', { class: 'message' }, [
        Vue.h('div', { class: 'msg-anchor' }, msgList)
      ])
    ]
  }
}])
components.push(['msg-item', {
  props: { data: Object },
  mounted() {
    anime({
      targets: this.$el,
      translateX: [this.$el.clientWidth, 0],
      duration: 1000,
      easing: 'easeOutQuart',
      complete: (anim) => {
        setTimeout(() => {
          anime({
            targets: this.$el,
            translateX: [0, this.$el.clientWidth],
            duration: 1000,
            easing: 'easeInQuart',
            complete: (anim) => {
              anime({
                targets: this.$el,
                height: '0px',
                padding: '0px',
                margin: '0px',
                duration: 1000,
                easing: 'easeOutQuart',
                complete: (anim) => {
                  this.$store.commit('handleEvent', {
                    type: 'MSG_TIMEOUT',
                    hash: this.data.data.hash
                  })
                }
              })
            }
          })
        }, this.data.data.duration * 1000)
      }
    })
  },
  template: '<div class="msg-item" :style=data.style>{{data.data.text}}</div>'
}])
