import AuthSuperAdminService from '../../../services/super-admin/auth'
import { useToast } from 'vue-toastification'
import { useStore } from 'vuex'

const SuperAdminGuard = async (to, from, next) => {
  const store = useStore()
  const toast = useToast()
  try {
    const { data } = await AuthSuperAdminService.getMe()
    store.commit('SET_SUPER_ADMIN_PROFILE', data)
    next()
  } catch (error) {
    toast.error(error?.message)
    next({ name: SuperAdminLogin })
  }
}

export { SuperAdminGuard }
