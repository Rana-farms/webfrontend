<template>
  <v-app>
    <Nuxt />
    <notification-alert />
  </v-app>
</template>

<script>
import NotificationAlert from '~/components/views/notification-alert.vue'

export default {
  middleware: ['auth'],
  components: {
    NotificationAlert,
  },
}
</script>

<style></style>
