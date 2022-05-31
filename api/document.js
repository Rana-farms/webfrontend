import api from './api'

export default {
  createDocument(payload) {
    return api().post(`/admin/document/`,payload,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },
}
