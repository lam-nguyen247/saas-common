<script setup>
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
import logo from '@/assets/logo.svg?raw'
import { VerticalNavLink, VerticalNavSectionTitle } from '@layouts'
import { useTheme } from 'vuetify'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const route = useRoute()
const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})

const isSuperAdmin = computed(() => store.getters.isSuperAdmin)
const isAdmin = computed(() => store.getters.isAdmin)
const isUser = computed(() => store.getters.isUser)

const sidebarBasic = [
  {
    title: 'Dashboard',
    path: 'dashboard',
    icon: 'mdi-home-outline',
  },
  {
    title: 'Account Settings',
    path: 'account-settings',
    icon: 'mdi-account-cog-outline',
  },
]

const sidebarUser = [
  {
    title: 'Dashboard',
    path: 'dashboard',
    icon: 'mdi-home-outline',
  },
  {
    title: 'Account Settings',
    path: 'account-settings',
    icon: 'mdi-account-cog-outline',
  },
]

const sidebarAdmin = [
  {
    title: 'Dashboard',
    path: 'dashboard',
    icon: 'mdi-home-outline',
  },
  {
    title: 'Account Settings',
    path: 'account-settings',
    icon: 'mdi-account-cog-outline',
  },
  {
    title: 'Users List',
    path: 'users',
    icon: 'mdi-account-cog-outline',
  },
]

const sidebarSuperAdmin = [
  ...sidebarAdmin,
  {
    title: 'Role List',
    path: 'roles',
    icon: 'mdi-account-cog-outline',
  },
]

const sidebarMenu = computed(() => {
  if (isSuperAdmin.value) return sidebarSuperAdmin
  if (isAdmin.value) return sidebarAdmin
  if (isUser.value) return sidebarSuperAdmin

  return sidebarBasic
})

const onGoToRoute = pathName => {
  const rootUrl = route.path.split('/')[1]
  if (route.path.split('/').length === 1) {
    router.push(`/${pathName}`)

    return
  }
  if (rootUrl) {
    router.push(`/${rootUrl}/${pathName}`)
  }
}
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
      <!-- eslint-disable vue/no-v-html -->
      <div v-html="logo" />
      <!-- eslint-enable -->
      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">Napa Global</h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <VerticalNavLink
      v-for="(item, index) in sidebarMenu"
      :key="index"
      :item="{
        title: item.title,
        icon: { icon: item.icon },
        active: route.path.split('/').pop() === item.path,
      }"
      @click="onGoToRoute(item.path)"
    />
  </ul>

  <!-- 👉 illustration -->
</template>

<style lang="scss">
// .v-navigation-drawer {
//   height: 100%;

//   .v-navigation-drawer__content {
//     display: flex;
//     flex-direction: column;

//     > ul {
//       flex-grow: 1;
//     }
//   }
// }

.upgrade-banner {
  margin-top: auto;
  // position: absolute;
  // bottom: 13px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
