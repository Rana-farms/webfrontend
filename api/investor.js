import api from './api'

export default {
  fetchAllInvestors() {
    return api().get(`/admin/investors`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  makeWithdrawal(payload) {
    return api().post(`/investor/withdrawal`, payload, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },
}
