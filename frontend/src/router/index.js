import { createRouter, createWebHistory } from 'vue-router'
import { AdminGuard } from './guards/admin'
import { SuperAdminGuard } from './guards/super-admin'
import { UserGuard } from './guards/user'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/default.vue'),

    beforeEnter: [UserGuard],
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../pages/dashboard.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'account-settings',
        name: 'AccountSettings',
        component: () => import('../pages/account-settings.vue'),
        meta: { title: 'Account settings' },
      },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/blank.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../pages/login.vue'),
        meta: { title: 'Login' },
      },
      {
        path: 'register',
        component: () => import('../pages/register.vue'),
      },
      {
        path: 'login/callback',
        component: () => import('../pages/sns-callback.vue'),
      },
    ],
  },
  {
    path: '/super-admin',
    component: () => import('../layouts/default.vue'),
    beforeEnter: [SuperAdminGuard],
    children: [
      {
        path: '',
        redirect: 'super-admin/dashboard',
      },
      {
        path: 'dashboard',
        component: () => import('../pages/super-admin/dashboard.vue'),
        meta: { title: 'Super Admin Dashboard' },
      },
      {
        path: 'account-settings',
        component: () => import('../pages/super-admin/account-settings.vue'),
        meta: { title: 'Super Admin Account settings' },
      },
      {
        path: 'roles',
        children: [
          {
            path: '',
            name: 'RoleList',
            component: () => import('../views/supper-admin/roles/role-list.vue'),
            meta: { title: 'Role List' },
          },
          {
            path: 'create',
            name: 'RoleCreate',
            component: () => import('../views/supper-admin/roles/role-create.vue'),
            meta: { title: 'Role Create' },
          },
          {
            path: ':id',
            name: 'RoleDetail',
            component: () => import('../views/supper-admin/roles/role-detail.vue'),
            meta: { title: 'Role Detail' },
          },
        ],
      },
      {
        path: 'users',
        children: [
          { path: '', name: 'AdminList', component: () => import('../pages/super-admin/admin-management/list.vue') },
          { path: ':id', name: 'AdminEdit', component: () => import('../pages/super-admin/admin-management/detail.vue') },
          { path: 'create', name: 'AdminCreate', component: () => import('../pages/super-admin/admin-management/detail.vue') },
        ],
      },
    ],
  },
  {
    path: '/super-admin',
    component: () => import('../layouts/blank.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },
      {
        path: 'login',
        name: 'SuperAdminLogin',
        component: () => import('../pages/super-admin/login.vue'),
        meta: { title: 'Super Admin Login' },
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../layouts/default.vue'),
    beforeEnter: [AdminGuard],
    children: [
      {
        path: '',
        redirect: 'admin/dashboard',
      },
      {
        path: 'dashboard',
        component: () => import('../pages/admin/dashboard.vue'),
        meta: { title: 'Super Admin Dashboard' },
      },
      {
        path: 'account-settings',
        component: () => import('../pages/account-settings.vue'),
        meta: { title: 'Admin Account settings' },
      },
      {
        path: 'users',
        children: [
          { path: '', name: 'UserList', component: () => import('../pages/admin/user-management/list.vue') },

          { path: ':id', name: 'UserEdit', component: () => import('../pages/admin/user-management/detail.vue') },
          { path: 'create', name: 'UserCreate', component: () => import('../pages/admin/user-management/detail.vue') },
        ],
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../layouts/blank.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },
      {
        path: 'login',
        name: 'AdminLogin',
        component: () => import('../pages/admin/login.vue'),
        meta: { title: 'Admin Login' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../pages/[...all].vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | SaasCommon` : 'SaasCommon'
  next()
})
export default router
