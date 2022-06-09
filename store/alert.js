export const state = () => ({
  alert: null,
  show:false
})

export const getters = {
  alert(state){
    return state.alert
  },

  show(state){
    return state.show
  }
}

export const mutations = {
  setAlert(state, alert) {
    state.alert = null
    state.alert = alert

    state.show = true
  },

  clearAlert(state) {
    
  },

  resetStatus(state){
    state.show = false
  }
}

export const actions = {
  setAlert({ commit }, alert) {
    commit('setAlert', alert)
  },

  resetStatus({ commit }) {
    commit('resetStatus')
  },
}
