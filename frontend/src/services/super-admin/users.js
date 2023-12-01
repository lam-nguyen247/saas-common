import http from '../../http/super-admin'

const UserSupperAdminService = {
  async getListUser({page = 1, limit = 10}) {
    return await http.get(`list-admin`, { params: { page: page, limit: limit }})
  },
  async getUser(id) {
    return await http.get(`admins/${id}`)
  },
  async createUser(data) {
    return await http.post(`create-admin`, data)
  },

  async delete(id) {
    return await http.delete(`admins/${id}`)
  },

  async updateUser(id, data) {
    return await http.put(`admins/${id}`, data)
  },

  async blockUser(data) {
    return await http.patch(`block-admin`, data)
  },

  async unblockUser(data) {
    return await http.patch(`unblock-admin`, data)
  },

}

export default UserSupperAdminService
