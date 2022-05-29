import api from './api'

export default {
  createOrder(payload){
    return api().post(`/admin/order`,payload,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
  },

  updateOrder(payload,code){
    return api().put(`/admin/order/${code}`,payload,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
  },

  deleteOrder(code){
    return api().delete(`/admin/order/${code}`,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
  },

  fetchAllOrders(){
    return api().get(`/orders`,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
  }
}
