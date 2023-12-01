<script setup>
import AuthService from '@/services/auth'
import Cookie from "js.cookie"
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const store = useStore()
const toast = useToast()

const handleCallback = async () => {
  try {
    const type = Cookie.get('sns')
    const { data } = await AuthService.callbackLoginSNS(type, route.query)
    if (data.access_token) {
      store.commit('SET_USER', data)
      router.push('/dashboard')
    }
  } catch (error) {
    toast.error('Có lỗi xảy ra. Vui lòng thử lại sau!')
    router.push('/login')
  }
}

onMounted(() => {
  handleCallback()
})
</script>

<template>
  <div id="loading-bg">
    <div class="loading-logo">
      <img
        src="/logo.png"
        height="50"
        alt="Logo"
      >
    </div>
    <div class="loading">
      <div class="effect-1 effects" />
      <div class="effect-2 effects" />
      <div class="effect-3 effects" />
    </div>
  </div>
</template>