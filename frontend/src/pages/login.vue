<script setup>
import { useTheme } from 'vuetify'
import logo from '@/assets/logo.svg?raw'
import AuthProvider from '@/common/pages/authentication/AuthProvider.vue'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
import { useStore } from 'vuex'
import AuthService from '@/services/auth'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import Cookie from "js.cookie"

const { handleSubmit, errors, setErrors, useFieldModel } = useForm()
const [email, password] = useFieldModel(['email', 'password'])
const store = useStore()
const router = useRouter()
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
const loading = ref(false)
const errorMessage = ref(null)
const login = handleSubmit(async values => {
  try {
    loading.value = true
    const { data } = await AuthService.login(values)
    if (data.access_token) {
      store.commit('SET_USER', data)
      router.push('/dashboard')
    }
  } catch (error) {
    console.log(error?.errors)
    setErrors(error?.errors)
    errorMessage.value = error?.message
  } finally {
    loading.value = false
  }
})

onMounted(() => {
  store.commit('CLEAR_STORE')
})
const handleLoginSNS = async type => {
  try {
    loading.value = true
    const { redirectUrl } = await AuthService.loginSNS(type)
    Cookie.set('sns', type)
    window.location.href = redirectUrl
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <!-- eslint-disable vue/no-v-html -->
            <div v-html="logo" />
          </div>
        </template>
      </VCardItem>

      <VCardText class="pt-2">
        <VCardTitle class="text-center font-weight-semibold text-2xl text-uppercase">
          Napa Global
        </VCardTitle>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
      </VCardText>

      <VAlert
        v-if="errorMessage"
        color="error"
        variant="tonal"
        class="mb-4"
      >
        <p class="mb-0 text-error text-center">
          {{ errorMessage }}
        </p>
      </VAlert>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="email"
                :error-messages="errors.email"
                label="Email"
                type="email"
                autocomplete="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="password"
                :error-messages="errors.password"
                label="Password"
                autocomplete="current-password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-end flex-wrap mt-1 mb-4">
                <RouterLink
                  class="ms-2 mb-1"
                  to="forgot-password"
                >
                  Forgot Password?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn
                block
                :disabled="loading"
                :loading="loading"
                type="submit"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                to="register"
                class="text-primary ms-2"
              >
                Create an account
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider @type-login-sns="handleLoginSNS($event)" />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@core/scss/pages/page-auth.scss';
</style>
