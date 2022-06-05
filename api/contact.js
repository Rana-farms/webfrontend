import api from './api'

export default {
  contactUs(payload) {
    return api().post(`/contact-us`, payload)
  },
}
