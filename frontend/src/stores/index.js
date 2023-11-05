import { createStore, createLogger } from 'vuex'
import client from '../views/client/stores'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    client
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})