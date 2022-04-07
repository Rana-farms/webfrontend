<template>
  <v-app>
    <app-header />
    <v-main>
      <Nuxt />
          <notification-alert />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import appHeader from '@/components/views/app-header.vue'
import appFooter from '@/components/views/app-footer.vue'
import NotificationAlert from '~/components/views/notification-alert.vue'

export default {
  name: 'DefaultLayout',
  components: {
    appHeader,
    appFooter,
    NotificationAlert
  },
  data() {
    return {}
  },
  mounted(){
    this.login()
  },

  methods:{
    login(){

    }
  }
}
</script>
