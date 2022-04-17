import api from './api'

export default {
  fetchBanks() {
    return api().get('/banks')
  },

  resolveAccount(payload){
    return api().post(`/resolve-account`,payload)
  }
}
