<script setup>
import { formatDate } from '@/utils/commonFunction'
import { watchEffect, ref } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Number,
    required: false,
    default: 1,
  },
})

const emit = defineEmits(['handleDelete', 'handleChangePage'])

const page = ref(1)


watchEffect(() => {
  console.log('props?.data', props.data)
})

const deleteRecord = id => {
  const conf = confirm('are you sure delete')
  if (!conf) return
  emit('handleDelete', id)
}
</script>

<template>
  <div class="header_table">
    <h2 class="mb-4">
      Admin list
    </h2>
    <RouterLink to="users/create">
      <VBtn> Add </VBtn>
    </RouterLink>
  </div>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          Email
        </th>
        <th class="text-center text-uppercase">
          Address
        </th>
        <th class="text-center text-uppercase">
          Phone
        </th>
        <th class="text-center text-uppercase">
          Updated At
        </th>
        <th class="text-center text-uppercase">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in props.data?.data"
        :key="item.id"
      >
        <td>{{ item.email }}</td>
        <td class="text-center">
          {{ item.address }}
        </td>
        <td class="text-center">
          {{ item.number_phone }}
        </td>
        <td class="text-center">
          {{ formatDate(item.updated_at) }}
        </td>
        <td class="text-center">
          <RouterLink :to="`users/${item.id}`">
            <VBtn
              class="mr-2"
              :disabled="loading ? true : false"
            >
              Edit
            </VBtn>
          </RouterLink>
          <VBtn
            color="error"
            :disabled="loading ? true : false"
            @click="deleteRecord(item.id)"
          >
            Delete
          </VBtn>
        </td>
      </tr>
    </tbody>
  </VTable>
  <!-- todo: handle pagination -->
  <div class="text-center mt-4">
    <VPagination
      v-model="page"
      :length="props.data?.meta.pagination.total_pages"
      :total-visible="5"
      @click="$emit('handleChangePage', page)"
    />
  </div>
</template>

<style scoped>
.header_table {
  display: flex;
  justify-content: space-between;
}
</style>
