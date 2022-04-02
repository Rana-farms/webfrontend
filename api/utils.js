import api from './api'

export default {
  fetchBanks() {
    return api().get('/banks')
  }
}
