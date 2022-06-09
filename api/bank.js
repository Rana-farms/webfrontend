import api from './api'

export default {
  fetchBanks() {
    return api().get('/banks')
  },

  resolveAccount(payload){
    return api().post(`/resolve-account`,payload)
  },

  updateAccount(payload){
    return api().post(`/investor/update-bank`,payload,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
  }
}
