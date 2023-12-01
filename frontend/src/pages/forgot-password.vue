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
const [email] = useFieldModel(['email'])
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const errorMessage = ref(null)
const loading = ref(false)

const submit = handleSubmit(async values => {
  console.log(values)
  try {
    loading.value = true
    const { data } = await AuthService.forgot(values)
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
        <h5 class="text-h5 font-weight-semibold mb-1">Forgot Password?</h5>
        <p class="mb-0">Enter your email and we'll send you instructions to reset your password</p>
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
        <VForm @submit.prevent="submit">
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
            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <!-- login button -->
              <VBtn
                block
                :disabled="loading"
                :loading="loading"
                type="submit"
              >
                Send Reset Link
              </VBtn>
            </VCol>
            <!-- back to login -->
            <VCol cols="12">
              <RouterLink
                class="d-flex align-center justify-center"
                :to="{ name: 'Login' }"
              >
                <VIcon
                  icon="tabler-chevron-left"
                  class="flip-in-rtl"
                />
                <span>Back to login</span>
              </RouterLink>
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
