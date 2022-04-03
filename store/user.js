export const state = () => ({
  isLoggedIn: false,
  user: null,
  token: null,
  role: '',
})

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user,
  token: (state) => state.token,
  role: (state) => state.role?.name,
  isSuperAdmin: (state) => state.role?.name === 'superadmin',
  isAdmin: (state) => state.role?.name === 'admin',
  isInvestor: (state) => state.role?.name === 'Investor',
}

export const mutations = {
  setUser(state, user) {
    state.user = user


    if (user) {
      state.isLoggedIn = true
      state.role = user.role
      console.log(JSON.stringify(user, null, 2))

    }
  },

  setToken(state, token) {
    state.token = token
  },

  setRole(state, role) {
    state.role = role
  },

  setLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },
}

export const actions = {
  setUser({
    commit
  }, data) {
    commit('setUser', data.data)
    commit('setToken', data.token)
  },

  logoutUser({
    commit
  }) {
    commit('setUser', null)
    commit('setToken', null)
    commit('setRole', null)
    commit('setLoggedIn', false)
  },
  setToken({
    commit
  }, token) {
    commit('setToken', token)
  },
  setRole({
    commit
  }, role) {
    commit('setRole', role)
  },

  setLoggedIn({
    commit
  }, isLoggedIn = true) {
    commit('setLoggedIn', isLoggedIn)
  },
}
