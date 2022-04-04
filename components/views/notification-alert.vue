<template>
  <div class="notification" v-if="notification">
    <v-snackbar
      :color="notification.color || 'primary'"
      :timeout="notification.timeout "
      :right="notification.right"
      :left="notification.left"
      :bottom="notification.bottom"
      :top="notification.top"
      v-model="snackbar"
    >
      {{ notification.message }}
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
    ...mapGetters({ alert: 'alert/alert' }),

    notification() {
      return this.alert
    },
  },
  watch: {
    notification(val) {
      if (val) {
        this.snackbar = true

        setTimeout(() => {
          this.snackbar = false
          this.$store.dispatch({ type: 'alert/clear' })
        }, val?.alert || this.timeout)
      }
    },
  },
}
</script>