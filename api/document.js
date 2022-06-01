import api from './api'

export default {
  createDocument(payload) {
    return api().post(`/admin/document`,payload,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },
  fetchAllDocuments() {
    return api().get(`/documents`,{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  deleteDocument(id){
    return api().delete(`/admin/document/${id}`,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
  },

  updateDocument(payload,id){
    return api().post(`/admin/document/${id}`,payload,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
  }
}
