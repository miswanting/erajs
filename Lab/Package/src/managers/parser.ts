export default {
  state: () => ({
    playerID: ''
  }),
  mutations: {
    parse(state, pkg) { }
  },
  actions: {
    parse({ dispatch, commit, state }, pkg) {
      console.log(`Parse: ${JSON.stringify(pkg)}`)
      switch (pkg.type) {
        case 'GetPlayerID':
          dispatch('send', { type: 'ResGetPlayerID', data: state.playerID })
          break
        default:
          commit('parse', pkg)
          break
      }
    },
    send({ commit, state }, pkg) {
      console.log(`Send: ${JSON.stringify(pkg)}`)
      window.net.send(pkg)
    }
  }
}
