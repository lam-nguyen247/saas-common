<script setup>
import { useTheme } from 'vuetify'
import logo from '@/assets/logo.svg?raw'
import AuthProvider from '@/common/pages/authentication/AuthProvider.vue'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
import { useStore } from 'vuex'
import AuthSuperAdminService from '@/services/super-admin/auth'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'

const { handleSubmit, errors, setErrors, useFieldModel } = useForm()
const [email, password] = useFieldModel(['email', 'password'])
const store = useStore()
const router = useRouter()
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
console.log('super_admin_access_token', !!localStorage.getItem('super_admin_access_token'))

const isPasswordVisible = ref(false)
const errorMessage = ref(null)
const loading = ref(false)

const login = handleSubmit(async values => {
  console.log(values)
  try {
    loading.value = true
    const { data } = await AuthSuperAdminService.login(values)
    if (data.access_token) {
      store.commit('SET_SUPER_ADMIN_USER', data)
      router.push('/super-admin/dashboard')
    }
  } catch (error) {
    console.log(error)
    setErrors(error?.data)
    errorMessage.value = error?.message
  } finally {
    loading.value = false
  }
})
onMounted(() => {
  store.commit('CLEAR_STORE')
})
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
          Super Admin Napa Global
        </VCardTitle>
        <p class="mb-0">Please sign-in to your account and start the adventure</p>
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

              <!-- login button -->
              <VBtn
                class="mt-4"
                block
                :disabled="loading"
                :loading="loading"
                type="submit"
              >
                Login
              </VBtn>
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
.text-error {
  color: #e53935;
}
</style>
