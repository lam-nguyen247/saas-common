<script setup>
import RoleService from '@/services/super-admin/role.js'
import PermissionService from '@/services/super-admin/permission.js'
import { useRoute } from "vue-router"
import { onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const role = ref({})
const route = useRoute()
const toast = useToast()
const roleId = route.params.id
const choosedDeletePermissions = ref([])
const choosedAddPermissions = ref([])
const withoutPermissions = ref([])
const choosedPermissions = ref([])
const validateMessage = reactive({
  add: '',
  delete: '',
})

const getWithoutPermissions = async () => {
  try {
    const { data } = await PermissionService.getWithoutRoles({ permissions: choosedPermissions.value })
    await deselectAllAddPermission()
    withoutPermissions.value = data
  } catch (error) {
    toast.error(error?.message)
  }
}

const updatePermission = async isAddPermission => {
  validateMessage.add = ''
  validateMessage.delete = ''
  try {
    const { message } = await RoleService.update(
      roleId,
      {
        permissions: isAddPermission ? choosedAddPermissions.value : choosedDeletePermissions.value,
        isAddPermission: isAddPermission,
        _method: 'PUT',
      },
    )
    toast.success(message)
    await deselectAllDeletePermission()
    getRoleInfo()
    getWithoutPermissions()
  } catch (error) {
    console.log(error)
    const { status, data, message } = error.response.data
    if (status === 400) {
      if (isAddPermission) {
        validateMessage.add = data['permissions'][0]
      } else {
        validateMessage.delete = data['permissions'][0]
      }
    } else {
      toast.error(message)
    }
  }
}

const getRoleInfo = async () => {
  try {
    const { data } = await RoleService.get(roleId)
    role.value = data
    choosedPermissions.value = data.permissions.map(s => s.id)
    await getWithoutPermissions()
  } catch (error) {
    toast.error(error?.message)
  }
}

const deselectAllDeletePermission = () => {
  choosedDeletePermissions.value = []
}
const deselectAllAddPermission = () => {
  choosedAddPermissions.value = []
}

onMounted(() => {
  getRoleInfo()
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" md="6">
        <VCard :title="'Role : ' + role.name">
          <span v-if="validateMessage.delete" class="message-field">{{ validateMessage.delete }}</span>
          <VCardText>
            <VForm @submit.prevent="updatePermission(false)">
              <VRow>
                <VCol cols="12">
                  <VRow no-gutters>
                    <VCol cols="12">
                      <VCheckbox v-for=" permission  in  role.permissions " :key="permission.id" :label="permission.name"
                        :value="permission.name" v-model="choosedDeletePermissions">
                      </VCheckbox>
                    </VCol>
                  </VRow>
                </VCol>

                <!-- 👉 submit and reset button -->
                <VCol offset-md="3" cols="12" md="9" class="d-flex gap-4">
                  <VBtn type="submit">
                    Delete Choosed
                  </VBtn>
                  <VBtn color="secondary" variant="tonal" type="reset" @click="deselectAllDeletePermission">
                    Deselect all
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <VCard title="List of unassigned permissions">
          <span v-if="validateMessage.add" class="message-field">{{ validateMessage.add }}</span>
          <VCardText>
            <VForm @submit.prevent="updatePermission(true)">
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

                <!-- 👉 submit and reset button -->
                <VCol offset-md="3" cols="12" md="9" class="d-flex gap-4">
                  <VBtn type="submit">
                    Add
                  </VBtn>
                  <VBtn color="secondary" variant="tonal" type="reset" @click="deselectAllAddPermission">
                    Deselect all
                  </VBtn>
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
