import AuthAdminService from '../../services/admin/auth'
export default {
  state: {
    user: null,
    isLoggedIn: !!localStorage.getItem('admin_access_token'),
  },
  mutations: {
    SET_ADMIN_USER(state, data) {
      if (data) {
        localStorage.setItem('admin_access_token', data.access_token)
        state.user = data
      }
      state.isLoggedIn = true
    },
    SET_ADMIN_PROFILE(state, data) {
      if (data) {
        state.user = data
      }
    },
    ADMIN_LOG_OUT(state) {
      localStorage.removeItem('admin_access_token')
      state.user = null
      state.isLoggedIn = false
    },
  },
  actions: {
    async profile(commit, payload) {
      const { data } = await AuthAdminService.profile(payload)
      commit('SET_ADMIN_USER', data)
    },
  },
  getters: {
    getUserAdminData: state => state.user,
    isAdmin: state => state.isLoggedIn,
  },
}
