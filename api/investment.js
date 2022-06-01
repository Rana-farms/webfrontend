import { resolve } from 'path'
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

  confirmMinimumInvestment(payload) {
    return api().post(`/confirm-minimum-unit`, payload, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  makeInvestment(payload) {
    return api().post(`/investor/investment`, payload, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  fetchAllUserInvestments() {
    return api().get(`/investor/investments`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  fetchMetrics(role = 'investor') {
    return api().get(`/${role}/dashboard-metrics`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  fetchROIMetrics(role = 'investor') {
    return api().get(`/${role}/dashboard-graph`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  }
}
