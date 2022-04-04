export const state = () => ({
  alert: null
})

export const getters = {
  alert: (state) => state.alert
}

export const mutations = {
  setAlert(state, alert) {
    console.log('set alert...')
    state.alert = null
    console.log(JSON.stringify(alert, null, 2))
    state.alert = alert
  },

  clearAlert(state) {
    state.alert = null
  }
}

export const actions = {
  setAlert({
    commit
  }, alert) {
    commit('setAlert', alert)
  },

  clearAlert({
    commit
  }) {
    commit('clearAlert')
  }
}
