export const state = () => ({
  INVESTOR: {
    drawer: false,
  },
})

export const mutations = {
  TOGGLE_INVESTOR_DRAWER(state, to) {
    state.INVESTOR.drawer = to
  },
}
