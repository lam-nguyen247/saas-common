import AuthSuperAdminService from '../../services/super-admin/auth'
export default {
  state: {
    user: null,
    isLoggedIn: !!localStorage.getItem('super_admin_access_token'),
  },
  mutations: {
    SET_SUPER_ADMIN_USER(state, data) {
      if (data) {
        localStorage.setItem('super_admin_access_token', data.access_token)
        state.user = data
      }
      state.isLoggedIn = true
    },
    SET_SUPER_ADMIN_PROFILE(state, data) {
      if (data) {
        state.user = data
      }
    },
    SUPER_ADMIN_LOG_OUT(state) {
      localStorage.removeItem('super_admin_access_token')
      state.user = null
      state.isLoggedIn = false
    },
  },
  actions: {
    async profile(commit, payload) {
      const { data } = await AuthSuperAdminService.profile(payload)
      commit('SET_SUPER_ADMIN_USER', data)
    },
  },
  getters: {
    getUserSuperAdminData: state => state.user,
    isSuperAdmin: state => state.isLoggedIn,
  },
}
