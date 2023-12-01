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

const { handleSubmit, errors, setErrors, useFieldModel } = useForm()
const [first_name, last_name, address, number_phone, email, password] = useFieldModel([
  'first_name',
  'last_name',
  'address',
  'number_phone',
  'email',
  'password',
])
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)
const errorMessage = ref(null)
const loading = ref(false)

const register = handleSubmit(async values => {
  console.log(values)
  try {
    loading.value = true
    const { data } = await AuthService.register(values)
    router.push({ name: 'Login' })
  } catch (error) {
    console.log(error)
    setErrors(error?.errors)
    errorMessage.value = error?.message
  } finally {
    loading.value = false
  }
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

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase"> Napa Global </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">Adventure starts here</h5>
        <p class="mb-0">Make your app management easy and fun!</p>
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
        <VForm @submit.prevent="register">
          <VRow>
            <!-- First name -->
            <VCol cols="6">
              <VTextField
                v-model="first_name"
                :error-messages="errors.first_name"
                label="First name"
              />
            </VCol>
            <!-- Last name -->
            <VCol cols="6">
              <VTextField
                v-model="last_name"
                :error-messages="errors.last_name"
                label="Last name"
              />
            </VCol>
            <!-- Address -->
            <VCol cols="12">
              <VTextField
                v-model="address"
                :error-messages="errors.address"
                label="Address"
              />
            </VCol>
            <!-- Phone -->
            <VCol cols="12">
              <VTextField
                v-model="number_phone"
                :error-messages="errors.number_phone"
                label="Phone"
              />
            </VCol>

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

              <VBtn
                class="mt-4"
                block
                :disabled="loading"
                :loading="loading"
                type="submit"
              >
                Sign up
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already have an account?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
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
              <AuthProvider />
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
