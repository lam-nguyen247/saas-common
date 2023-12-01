import http from '../../http/super-admin'

class AuthSuperAdminService {
  constructor() {}

  async login(body) {
    return await http.post('/login', body)
  }
  async getMe() {
    return await http.get('/me')
  }
  async update(body) {
    return await http.post('/update', body)
  }
  async changePassword(body) {
    return await http.post('/change-password', body)
  }
}
export default new AuthSuperAdminService()
