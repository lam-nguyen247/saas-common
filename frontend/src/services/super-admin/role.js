import http from '../../http/super-admin'

class RoleService {
  constructor() {}

  async getAll() {
    return await http.get('/roles')
  }

  async delete(id) {
    return await http.delete(`/roles/${id}`)
  }

  async create(body) {
    return await http.post(`/roles`, body)
  }

  async update(id, body) {
    return await http.post(`/roles/${id}`, body)
  }

  async get(id) {
    return await http.get(`/roles/${id}`)
  }
}
export default new RoleService()
