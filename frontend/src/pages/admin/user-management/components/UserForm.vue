<script setup>
import { useField, useForm } from 'vee-validate'
import UserAdminService from '@/services/admin/users'
import { onMounted , watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()

onMounted(() => {
  if (route.params.id) {
    getUser()
  }
})

const toast = useToast()
const loading = ref(false)

const getUser = async () => {
  const { data } = await UserAdminService.getUser(route.params.id)
  setValues({
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    password: undefined,
    address: data.address,
    phone_country_code: data.phone_country_code,
    number_phone: data.number_phone,
    status: data.status.toString() ,
  })
}

const { handleSubmit, setValues, setErrors } = useForm()

const first_name = useField('first_name')
const last_name = useField('last_name')
const email = useField('email')
const password = useField('password')
const address = useField('address')
const phone_country_code = useField('phone_country_code')
const number_phone = useField('number_phone')
const status = useField('status')

const onSubmit = handleSubmit(async values => {
  loading.value = true
  if (!route.params.id) {
    try {
      const { message } = await UserAdminService.createUser({...values, status: '0'})
      toast.success(message || 'Create Success')
    } catch (error) {
      setErrors(error?.errors)
    } finally {
      loading.value = false
    }
  } else {
    try {
      delete values.email  
      if(!values.password) delete values.password
      const { message } = await UserAdminService.updateUser(route.params.id, {...values})
      toast.success(message || 'Update Success')
    } catch (error) {
      console.log(error)
      error?.errors ? setErrors(error?.errors) : toast.error('Error updating')
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <VCard :title="route.params.id ? 'Edit Admin' : 'Create Admin' ">
    <VCardText>
      <form @submit.prevent="onSubmit">
        <VRow>
          <VCol cols="6">
            <VTextField
              v-model="first_name.value.value"
              label="First Name"
              :error-messages="first_name.errorMessage.value"
            />
          </VCol>
          <VCol cols="6">
            <VTextField
              v-model="last_name.value.value"
              label="Last Name"
              type="text"
              :error-messages="last_name.errorMessage.value"
            />
          </VCol>
          <VCol cols="6">
            <VTextField
              v-model="email.value.value"
              label="Email"
              type="email"
              :error-messages="email.errorMessage.value"
              :disabled="route.params.id ? true : false"
            />
          </VCol>
          <VCol cols="6">
            <VTextField
              v-model="password.value.value"
              label="Password"
              type="password"
              :error-messages="password.errorMessage.value"
            />
          </VCol>
          <VCol cols="6">
            <VTextField
              v-model="address.value.value"
              label="Address"
              type="text"
              :error-messages="address.errorMessage.value"
            />
          </VCol>
          <VCol cols="6">
            <VTextField
              v-model="phone_country_code.value.value"
              label="Phone country code"
              type="text"
              :error-messages="phone_country_code.errorMessage.value"
            />
          </VCol>
          <VCol cols="6">
            <VTextField
              v-model="number_phone.value.value"
              label="Number phone"
              type="text"
              :error-messages="number_phone.errorMessage.value"
            />
          </VCol>
          <VCol
            cols="12"
            sm="12"
          >
            <VSelect
              v-model="status.value.value"
              label="Status"
              :items="[ { title: 'active', value: '1' },
                        { title: 'Inactive', value: '0' },]"
              class="select_status"
            />
          </VCol>
          <VCol cols="12">
            <VBtn
              color="primary"
              type="submit"
              class="mt-4"
              :disabled="loading"
              :loading="loading"
            >
              Submit
            </VBtn>
          </VCol>
        </VRow>
      </form>
    </VCardText>
  </VCard>
</template>

<style scoped>
.select_status {
  width: 100px;
}
</style>
