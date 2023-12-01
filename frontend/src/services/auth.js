import http from '../http/user'

class AuthService {
  constructor() {}

  async login(body) {
    return await http.post('/login', body)
  }

  async register(body) {
    return await http.post('/signup', body)
  }

  async forgot(body) {
    return await http.post('/forgot', body)
  }

  async getMe() {
    return await http.get('/me')
  }

  async loginSNS(type) {
    return await http.get(`/social-auth/${type}`)
  }

  async callbackLoginSNS(type, data) {
    return await http.get(`/social-auth/${type}/callback/`, { params: data })
  }
}
export default new AuthService()
