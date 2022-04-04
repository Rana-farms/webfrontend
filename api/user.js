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

  checkUser(payload){
    return api().post('/user-exists',payload)
  }
}
