/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import { createApp } from 'vue'
import store from './stores'
loadFonts()
const options = {
  // You can set your default options here
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
}
const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(store)
app.use(Toast, options)
app.mount('#app')
