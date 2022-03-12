<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    width="270"
    clipped
    absolute
    :mini-variant.sync="mini"
    mini-variant-width="80"
    color="#fff"
    class="side-navigation"
  >
    <div class="cat-title" v-if="!mini">
      <!-- <span class="pr-3"
        ><v-icon color="var(--accent-color)">mdi-view-dashboard</v-icon></span
      >
      <span>Categories</span> -->
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    miniSidebar: {
      default: false,
      Type: Boolean,
    },
  },
  data() {
    return {
      drawer: true,
      mini: false,
    }
  },
  mounted() {
    // if (this.$device.isDesktop) {
    //   this.drawer = true;
    //   this.mini = this.miniSidebar;
    //   console.log("is desktop");
    // }
    // this.$bus.$on("show-menu", () => {
    //   this.toggleMini();
    // });
  },
  methods: {
    toggleMini() {
      // if (this.$device.isMobile) {
      //   this.mini = false;
      //   this.drawer = null;
      //   this.drawer = !this.drawer;
      // } else if (this.$device.isTablet) {
      //   this.drawer = true;
      //   this.mini = false;
      // } else if (this.$device.isDesktop) {
      //   // this.drawer = !this.drawer
      //   // this.mini = false
      //   this.drawer = true;
      //   this.mini = !this.mini;
      // } else if (this.$device.isDesktop) {
      //   this.drawer = true;
      //   this.mini = !this.mini;
      // }
      //  alert(this.$vuetify.breakpoint.name);
    },
  },
}
</script>

<style lang="scss" scoped>
.side-navigation {
  width: 16.5vw;
  height: 100%;
  background-color: var(--primary-color);
  padding: 10px;
  z-index: 99999;
}
@media only screen and (min-width: 768px) {
  .cat-title {
    color: var(--accent-color);
    width: 90%;
    margin: auto;
    padding: 10px 15px;
    font-weight: bold;
    border-radius: 8px;
    border: 1px solid var(--accent-color);
    box-shadow: 0px 0px 2px var(--accent-color);
  }
}
</style>
