import api from './api'

export default {
  fetchAllTransactions() {
    return api().get(`/admin/transactions`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  }
}
