import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import clientRoutes from '../views/client/routes';
import commonRoutes from '~pages'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts([
    ...clientRoutes,
    ...commonRoutes
  ])],
  scrollBehavior() {
    return { top: 0 }
  },
})
export default router
