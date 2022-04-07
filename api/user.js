import api from './api'

export default {
  login(payload) {
    return api().post('/login', payload)
  },

  register(payload) {
    return api().post('/register', payload)
  },

  fetchDetails(role = 'investor') {
    return api().get(`/${role}/profile`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
  },

  updateDetails(payload,role = 'investor') {
    return api().put(`/${role}/profile`, payload,{
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
