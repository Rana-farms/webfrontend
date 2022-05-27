import API from '@/api'

export const state = () => ({
  isLoggedIn: false,
  user: null,
  token: null,
  role: '',
  nextOfKin: null,
  bank: null,
  wallet: null,
  transactions:null,
  investments:null,
})

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user,
  profile(state) {
    if (state.user)
      return {
        id: state.user.id,
        username: state.user.username,
        fullname: state.user.fullname,
        email: state.user.email,
        phone: state.user.phone,
        address: state.user.address,
        role: state.user.role.name,
        status: state.user.status,
      }
  },
  token: (state) => state.token,
  role: (state) => state.role?.name,
  nextOfKin: (state) => state.nextOfKin,
  bank(state) {
    if (state.bank)
      return {
        bank_id: state.user.bank.bankId,
        account_no: state.user.bank.accountNumber,
        account_name: state.user.bank.accountName,
        bank_name: state.user.bank.bankName,
      }
  },
  investments: (state) => state.investments,
  transactions: (state) => state.transactions,
  wallet: (state) => state.wallet,
  isSuperAdmin: (state) => state.role?.name === 'Super Admin',
  isAdmin: (state) => state.role?.name === 'Admin',
  isInvestor: (state) => state.role?.name === 'Investor',
}

export const mutations = {
  setUser(state, user) {
    state.user = user

    if (user) {
      state.isLoggedIn = true
      state.role = user?.role
      state.nextOfKin = user?.nextOfKin
      state.bank = user?.bank
      state.wallet = user?.wallet
      state.transactions = user?.transactions,
      state.investments = user?.investments

      if (process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify(user, null, 2))
      }
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
  setUser({ commit }, data) {
    commit('setUser', data.data)
    commit('setToken', data.data?.token)
  },

  async fetchDetails({ commit }) {
    try {
      const api = await API.user.fetchDetails()
      commit('setUser', api.data.data)
      return api.data.data
    } catch (err) {
      return err
    }
  },

  logoutUser({ commit }) {
    commit('setUser', null)
    commit('setToken', null)
    commit('setRole', null)
    commit('setLoggedIn', false)
  },
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  setRole({ commit }, role) {
    commit('setRole', role)
  },

  setLoggedIn({ commit }, isLoggedIn = true) {
    commit('setLoggedIn', isLoggedIn)
  },
}
