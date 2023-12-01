import { createStore, createLogger } from 'vuex'
import auth from './auth'
import app from './app'
import authSuperAdmin from './super-admin/auth'
import authAdmin from './admin/auth'
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    auth,
    authSuperAdmin,
    authAdmin,
    app,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
