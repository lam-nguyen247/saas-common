import AuthAdminService from '../../../services/admin/auth'
import { useToast } from 'vue-toastification'
import { useStore } from 'vuex'

const AdminGuard = async (to, from, next) => {
  const store = useStore()
  const toast = useToast()
  try {
    const { data } = await AuthAdminService.getMe()
    store.commit('SET_ADMIN_PROFILE', data)
    next()
  } catch (error) {
    toast.error(error?.message)
    next({ name: AdminLogin })
  }
}

export { AdminGuard }
