<script setup>
import RoleService from '@/services/super-admin/role.js'
import PermissionService from '@/services/super-admin/permission.js'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const choosedAddPermissions = ref([])
const withoutPermissions = ref([])
const roleName = ref('')
const validateMessage = reactive({
  name: '',
  permissions: '',
})
const loading = ref(false)

const getWithoutPermissions = async () => {
  try {
    const { data } = await PermissionService.getWithoutRoles({ permissions: [] })
    withoutPermissions.value = data
  } catch (error) {
    toast.error(error?.message)
  }
}

const createRole = async () => {
  validateMessage.name = ''
  validateMessage.permissions = ''
  loading.value = true
  try {
    await RoleService.create({
      permissions: choosedAddPermissions.value,
      name: roleName.value,
      guard_name: 'super-admin',
    })
    router.push('/super-admin/roles')
  } catch (error) {
    const { status, data, message } = error
    if (status === 400) {
      validateMessage.name = data['name'] == undefined ? '' : data['name'][0]
      validateMessage.permissions = data['permissions'] == undefined ? '' : data['permissions'][0]
    } else {
      toast.error(message)
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getWithoutPermissions()
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" md="6">
        <VCard title="Add Role">
          <VCardText>
            <VForm @submit.prevent="createRole">
              <VRow>
                <VCol cols="12">
                  <VRow no-gutters>
                    <!-- 👉 Role Name -->
                    <VCol cols="12" md="3">
                      <label for="roleName">Role Name</label>
                    </VCol>

                    <VCol cols="12" md="9">
                      <VTextField id="roleName" v-model="roleName" placeholder="Role Name" persistent-placeholder
                        :error-messages="validateMessage.name" />
                    </VCol>
                  </VRow>
                </VCol>

                <!-- 👉 submit and reset button -->
                <VCol offset-md="3" cols="12" md="9" class="d-flex gap-4">
                  <VBtn type="submit" :disabled="loading" :loading="loading">
                    Add
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <VCard title="List of unassigned permissions">
          <span v-if="validateMessage.permissions" class="message-field">{{ validateMessage.permissions }}</span>
          <VCardText>
            <VForm @submit.prevent="updatePermissionApi(true)">
              <VRow>
                <VCol cols="12">
                  <VRow no-gutters>
                    <VCol cols="12">
                      <VCheckbox v-for=" permission  in  withoutPermissions " :key="permission.id"
                        :label="permission.name" :value="permission.name" v-model="choosedAddPermissions">
                      </VCheckbox>
                    </VCol>
                  </VRow>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
.permission-count {
  padding: 2px 5px;
  border-radius: 3px;
  border: 1px solid #807f7f;
  background-color: #807f7f;
  color: #fff;
}

.w-px-50 {
  width: 50px !important;
}

.message-field {
  color: red;
  padding: 0px 12px;
}
</style>
