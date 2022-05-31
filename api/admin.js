import api from './api'

export default {
  fetchAllAdmins() {
    return api().get(`/admin/admins`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  manageAdminRole(payload) {
    return api().post(`/admin/manage-role`, payload, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  inviteAdmin(payload) {
    return api().post(`/admin/invite-admin`, payload, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  removeAdmin(payload) {
    return api().post(`/admin/remove-admin`, payload, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },

  createROI(payload) {
    return api().post(`/admin/create-roi`, payload, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
  },
}
