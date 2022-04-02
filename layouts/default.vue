<template>
  <v-app>
    <app-header />
    <v-main>
      <Nuxt />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import appHeader from '@/components/views/app-header.vue'
import appFooter from '@/components/views/app-footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    appHeader,
    appFooter
  },
  data() {
    return {}
  },
  mounted(){
    console.log(process.env.baseURL)
    this.login()
  },

  methods:{
    login(){

    }
  }
}
</script>
