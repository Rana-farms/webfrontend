import axios from 'axios'
//import store from '@/store'
export default () => {
  const api = axios.create({
    baseURL: process.env.baseURL
  })
  api.interceptors.response.use((response) => response, (error) => {
    let error_message = null
    try {
      if (error.response.status === 401) {
        if (process.env.NODE_ENV === 'development')
          console.log("you are unauthorized...401");
        //  store.dispatch('auth/LogoutUser')
      } else if (error.response.status === 400) {
        if (process.env.NODE_ENV === 'development')
          console.log("it's a bad request...400");
      } else if (error.response.status === 404) {
        if (process.env.NODE_ENV === 'development')
          console.log("it was not found...404");
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify(error.response, null, 2))
      }

      //console.log(JSON.stringify(error, null, 2))



      error_message = {
        msg: error.response.data.msg != undefined ? error.response.data.msg : error.response.data.message != undefined ? error.response.data.message : error.response.data.errors != undefined ? error.response.data.errors[0].msg : 'Unknown Error',
        status: error.response.status != undefined ? error.response.status : null
      }
    } catch (err) {
      error_message = {
        msg: 'An error occurred',
        status: null
      }
    } finally {
      return Promise.reject(error_message);

    }
  })
  return api
}
