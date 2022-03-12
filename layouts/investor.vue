<template>
  <v-app id="inspire">
    <v-navigation-drawer mobile-breakpoint="1024" width="220px" v-model="drawer" app clipped>
      <!-- -->ss
      <div class="h-40 w-full" style="border: 1px solid red"></div>
    </v-navigation-drawer>

    <v-app-bar color="#fff" elevation="0" app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- -->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <Nuxt />
    </v-main>

    <v-footer app>
      footer
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import InvestorHeader from '~/components/investor/investor-header.vue'
import InvestorSidebar from '~/components/investor/investor-sidebar.vue'
export default {
  components: {
    InvestorHeader,
    InvestorSidebar,
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
