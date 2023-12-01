import http from '../../http/admin'

const UserAdminService = {
  async getListUser({page = 1, limit = 10}) {
    return await http.get(`users`, { params: { page: page, per_page: limit }})
  },
  async getUser(id) {
    return await http.get(`users/${id}`)
  },
  async createUser(data) {
    return await http.post(`users`, data)
  },
    
  async deleteUser(id) {
    return await http.delete(`users/${id}`)
  },
    
  async updateUser(id, data) {
    return await http.put(`users/${id}`, data)
  },
}

export default UserAdminService
