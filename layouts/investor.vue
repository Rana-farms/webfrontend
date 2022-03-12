<template>
  <v-app id="inspire">
     <investor-sidebar/>
    <investor-header/>

  

    <!-- Sizes your content based upon application components -->
    <v-main>
      <Nuxt />
    </v-main>

    <v-footer       mobile-breakpoint="1024"
 app>
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
