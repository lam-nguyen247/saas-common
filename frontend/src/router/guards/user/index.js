import AuthSuperAdminService from '../../../services/auth'
import { useToast } from 'vue-toastification'
import { useStore } from 'vuex'

const UserGuard = async (to, from, next) => {
  const store = useStore()
  const toast = useToast()
  try {
    const { data } = await AuthSuperAdminService.getMe()
    store.commit('SET_PROFILE', data)
    next()
  } catch (error) {
    toast.error(error?.message)
    next({ name: SuperAdminLogin })
  }
}

export { UserGuard }
