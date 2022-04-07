<template>
  <v-app id="inspire">
    <investor-sidebar />
    <investor-header />
    <v-main>
      <Nuxt />
    </v-main>
    <notification-alert />
  </v-app>
</template>

<script>
import InvestorHeader from '~/components/investor/investor-header.vue'
import InvestorSidebar from '~/components/investor/investor-sidebar.vue'
import AppFooter from '~/components/views/app-footer.vue'
import NotificationAlert from '~/components/views/notification-alert.vue'
export default {
  components: {
    InvestorHeader,
    InvestorSidebar,
    AppFooter,
    NotificationAlert,
  },
  data() {
    return {
      drawer: true,
    }
  },
}
</script>

<style lang="scss">
#inspire {
  background-color: #f5f6f8;
}
</style>
