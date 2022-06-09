import api from './api'

export default {
  fetchAllWithdrawals() {
    return api().get(`/admin/withdrawals`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  fetchWithdrawalById(id) {
    return api().get(`/admin/withdrawal/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  approveWithdrawal(id) {
    return api().post(`/admin/approve-withdrawal/${id}`,null, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  paiedMannually(id) {
    return api().post(`/admin/approve-withdrawal-manual/${id}`,null, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  }
}
