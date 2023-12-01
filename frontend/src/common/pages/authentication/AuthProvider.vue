<script setup>
import { useTheme } from 'vuetify'

const emit = defineEmits(['typeLoginSns'])

const vuetifyTheme = useTheme()
const authProviders = [
  {
    icon: 'mdi-google',
    color: '#db4437',
    colorInDark: '#db4437',
    type: 'google',
  },
]

const redirectSocial = type =>  {
  emit('typeLoginSns', type)
}
</script>


<template>
  <VBtn
    v-for="link in authProviders"
    :key="link.icon"
    :icon="link.icon"
    variant="text"
    :color="vuetifyTheme.global.name.value === 'dark' ? link.colorInDark : link.color"
    @click="redirectSocial(link.type)"
  />
</template>
