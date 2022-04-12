import api from './api'

export default {
  fetchAllInvestments() {
    return api().get('/investments', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  fetchInvestmentById(id) {
    return api().get(`/investment/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },
}
