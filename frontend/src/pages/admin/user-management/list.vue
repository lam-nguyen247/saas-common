<script setup>
import { reactive , onMounted } from 'vue'
import UserAdminService from '@/services/admin/users'
import TableUser from './components/TableUser.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const users = ref()
const queryConfig = reactive({page: 1, limit: 10})
const loading = ref(false)

const fetchUsers = async config => {
  loading.value = true
  try {
    const res = await UserAdminService.getListUser(config)
    users.value = res
  } catch (error) {
    toast.error(error?.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers(queryConfig)
})

const handleChanglePage = async page => {
  fetchUsers({page})
}

const handleDeleteP = async id => {
  loading.value = true
  try {
    const { message } = await UserAdminService.deleteUser(id)
    toast.success(message)
    fetchUsers(queryConfig)
  } catch (error) {
    toast.error(error?.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div class="text-center">
        {{ loading ? 'loading....' : '' }}
      </div>
      <TableUser
        :data="users"
        :loading="loading"
        @handle-change-page="handleChanglePage"
        @handle-delete="handleDeleteP"
      />
    </VCol>
  </VRow>
</template>
