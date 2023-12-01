import http from '../../http/admin'

class AuthAdminAdminService {
  constructor() {}

  async login(body) {
    return await http.post('/auth/login', body)
  }
  async getMe() {
    return await http.get('/auth/me')
  }
}
export default new AuthAdminAdminService()
