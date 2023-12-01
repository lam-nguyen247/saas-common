<script setup>
import RoleService from '@/services/super-admin/role.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'

const store = useStore()
const router = useRouter()
const toast = useToast()
const roles = ref([])
const isGetRole = ref(false)
const dialog = ref(false)
const deleteId = ref(false)

const getAllRoles = async () => {
  try {
    const { data } = await RoleService.getAll()
    roles.value = data
  } catch (error) {
    toast.error(error?.message)
  } finally {
    isGetRole.value = true
  }
}

const editAction = id => {
  router.push({
    name: 'RoleDetail',
    params: { id: id },
  })
}

const createAction = () => {
  router.push({
    name: 'RoleCreate',
  })
}

const deleteAction = id => {
  dialog.value = true
  deleteId.value = id
}

const deleteRole = async () => {
  if (!deleteId.value) {
    return
  }
  try {
    const { message } = await RoleService.delete(deleteId.value)
    toast.success(message)
    getAllRoles()
  } catch (error) {
    toast.error(error?.message)
  } finally {
    dialog.value = false
    deleteId.value = false
    isGetRole.value = true
  }
}

onMounted(() => {
  getAllRoles()
})
</script>

<template>
  <div>
    <VCol>
      <h1>Roles Page</h1>
    </VCol>
    <VCol>
      <VBtn prepend-icon="mdi-plus" type="submit" @click="createAction">
        <template v-slot:prepend>
          <VIcon></VIcon>
        </template>
        Add
      </VBtn>
    </VCol>
    <VCol>
      <VRow>
        <!-- basic -->
        <VCol cols="12">
          <VCard>
            <VTable>
              <thead>
                <tr>
                  <th class="text-center text-uppercase w-px-50">
                    No.
                  </th>
                  <th class="text-uppercase">
                    Name
                  </th>
                  <th class="text-center text-uppercase w-px-50">
                    Permission
                  </th>
                  <th class="text-center text-uppercase w-px-150">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody v-if="isGetRole && roles && roles.length > 0">
                <tr v-for="(item, index) in roles" :key="item.id">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td>
                    {{ item.name }}
                  </td>
                  <td class="text-center">
                    <span class="permission-count">{{ item.permissions.length }}</span>
                  </td>
                  <td class="text-center">
                    <VCol cols="auto">
                      <VBtn density="compact" icon="mdi-square-edit-outline" @click="editAction(item.id)"></VBtn>&nbsp;
                      <VBtn density="compact" icon="mdi-delete-forever-outline" @click="deleteAction(item.id)"></VBtn>
                    </VCol>
                  </td>
                </tr>
              </tbody>
              <tbody v-else-if="isGetRole && roles && roles.length === 0">
                <tr>
                  <td colspan="3" class="text-center">Not record</td>
                </tr>
              </tbody>
              <tbody v-else-if="!isGetRole">
                <tr>
                  <td colspan="3" class="text-center">Loading...</td>
                </tr>
              </tbody>
            </VTable>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
    <VDialog v-model="dialog" width="300px">
      <VCard>
        <VCardText>Are you sure?</VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn variant="text" @click="deleteRole">
            OK
          </VBtn>
          <VBtn color="green-darken-1" variant="text" @click="dialog = false">
            Cancel
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
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

.w-px-150 {
  width: 150px !important;
}
</style>
