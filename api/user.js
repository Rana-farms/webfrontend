import api from './api'

export default {
  login(payload) {
    return api().post('/login', payload)
  },

  register(payload) {
    return api().post('/register', payload)
  },

  forgotPassword(payload) {
    return api().post('/forgot-password', payload)
  },

  resetPassword(payload) {
    return api().post('/reset-password', payload)
  },

  fetchDetails() {
    return api().get(`/profile`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
  },

  updateDetails(payload,role = 'investor') {
    return api().put(`/profile`, payload,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
  },

  updateNextOfKin(payload,role = 'investor') {
    return api().post(`/${role}/next-of-kin`, payload,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
  },

  verifyEmail(payload) {
    return api().post('/verify-code', payload)
  },

  resendVerificationCode(payload) {
    return api().post('/resend-verify-code', payload)
  },

  checkUser(payload){
    return api().post('/user-exists',payload)
  },

  changePassword(payload) {
    return api().post(`/change-password`, payload,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
  },
}
