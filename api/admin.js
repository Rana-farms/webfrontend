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
}
