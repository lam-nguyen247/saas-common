import AuthService from '../services/auth'
export default {
  state: {
    user: null,
    isLoggedIn: !!localStorage.getItem('access_token'),
  },
  mutations: {
    SET_USER(state, data) {
      if (data) {
        localStorage.setItem('access_token', data.access_token)
        state.user = data
      }
      state.isLoggedIn = true
    },
    SET_PROFILE(state, data) {
      if (data) {
        state.user = data
      }
    },
    LOG_OUT(state) {
      localStorage.removeItem('access_token')
      state.user = null
      state.isLoggedIn = false
    },
  },
  actions: {
    async profile(commit, payload) {
      const { data } = await AuthService.profile(payload)
      commit('SET_USER', data)
    },
  },
  getters: {
    getUserData: state => state.user,
    isUser: state => state.isLoggedIn,
  },
}
