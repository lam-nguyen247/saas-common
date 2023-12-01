import http from '../../http/super-admin'

class PermissionService {
  constructor() {}

  async getWithoutRoles(body) {
    return await http.post('/permissions/without', body)
  }
}
export default new PermissionService()
