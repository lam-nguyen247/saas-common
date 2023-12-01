<script setup>
import { useStore } from 'vuex'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import AuthSuperAdminService from '@/services/super-admin/auth'
const toast = useToast()
const store = useStore()
const profile = computed(() => store.getters.getUserSuperAdminData)
console.log(profile.value)
const { handleSubmit, errors, setErrors, useFieldModel } = useForm({
  initialValues: {
    first_name: profile.value.first_name,
    last_name: profile.value.last_name,
    email: profile.value.email,
    number_phone: profile.value.number_phone,
    address: profile.value.address,
    phone_country_code: profile.value.phone_country_code,
  },
})
const [first_name, last_name, email, number_phone, address, phone_country_code] = useFieldModel([
  'first_name',
  'last_name',
  'email',
  'number_phone',
  'address',
  'phone_country_code',
])

const loading = ref(false)
const onSave = handleSubmit(async values => {
  console.log(values)
  try {
    loading.value = true
    const { data, message } = await AuthSuperAdminService.update(values)
    store.commit('SET_SUPER_ADMIN_PROFILE', data)
    toast.success(message)
  } catch (error) {
    console.log(error)
    setErrors(error?.data)
    errorMessage.value = error?.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Account Details">
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            @submit.prevent="onSave"
            class="mt-6"
          >
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="first_name"
                  :error-messages="errors.first_name"
                  label="First Name"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="last_name"
                  :error-messages="errors.last_name"
                  label="Last Name"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="email"
                  :error-messages="errors.email"
                  label="E-mail"
                  type="email"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="number_phone"
                  :error-messages="errors.number_phone"
                  label="Phone Number"
                />
              </VCol>

              <!-- 👉 Address -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="address"
                  :error-messages="errors.address"
                  label="Address"
                />
              </VCol>

              <!-- 👉 Country -->
              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="phone_country_code"
                  :error-messages="errors.phone_country_code"
                  label="Country"
                  :items="['USA', 'Canada', 'UK', 'India', 'Australia']"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn
                  :disabled="loading"
                  :loading="loading"
                  type="submit"
                  >Save changes</VBtn
                >
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
