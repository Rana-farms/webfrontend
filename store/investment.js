export const state = () => ({
  investment: null,
})


export const getters = {
    investment(state) {
        return state.investment
    },
}

export const mutations = {
  SET_INVESTMENT(state, investment) {
    state.investment = investment
  },
}

export const actions = {
  holdInvestment({ commit }, investment) {
    commit('SET_INVESTMENT', investment)
  },
}
