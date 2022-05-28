import api from './api'

export default {
  fetchAllInvestors() {
    return api().get(`/admin/investors`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  }
}
