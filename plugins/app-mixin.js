import Vue from 'vue'

Vue.mixin({
  computed: {
    INVESTOR() {
      return this.$store.state.ui.INVESTOR
    },
    USER() {
      return {
        id: '2345rgefrg',
        name: 'John Doe',
        email: 'jande@gmail.com',
      }
    },
  },

  methods: {
    toggleInvestorDrawer(state) {
      if (state === undefined) {
        state = !this.INVESTOR.drawer
      }
      this.$store.commit('ui/TOGGLE_INVESTOR_DRAWER', state)
    },
  },
})
