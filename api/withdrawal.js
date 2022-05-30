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
    return api().post(`/admin/approve-withdrawal/${id}`, payload, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },
}
