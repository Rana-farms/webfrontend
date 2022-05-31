<template>
  <div class="alert" v-if="alert">
    <v-snackbar app
      :color="alert.color || 'primary'"
      :timeout="alert.timeout "
      :right="alert.right"
      :left="alert.left"
      :bottom="alert.bottom"
      :top="alert.top"
      v-model="snackbar"
    >
      {{ alert.message }}
    </v-snackbar>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      timeout: 3000,
      snackbar: false,
    }
  },

  computed: {
    ...mapGetters({ alert: 'alert/alert', show:'alert/show' }),
  },
  watch: {
    show(){
      if(this.show && this.alert !== null){
        this.snackbar = true
        this.$store.dispatch('alert/resetStatus');
      }
    }
  },
}
</script>