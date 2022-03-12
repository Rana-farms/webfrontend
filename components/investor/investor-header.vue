<template>
  <v-app-bar app :height="60" color="#fff" clipped-left elevation="0">
    <div class="app-header md:px-3 flex items-center">
      <router-link to="/">
        <img class="app-header__logo" src="/images/logo.png" alt=""
      /></router-link>

      <v-app-bar-nav-icon color="primary" @click="toggleInvestorDrawer()" />
      <v-spacer></v-spacer>

      <div class="hidden md:flex gap-5">
        <router-link to="/profile" class="inline-flex gap-1 items-center">
          <span
            class="h-8 w-8 bg-primary rounded-full flex items-center justify-center"
          >
            <v-icon color="#fff">mdi-account</v-icon></span
          >
          <span class="text-gray-500">Overcomer</span>
        </router-link>
        <v-btn color="primary" icon> <v-icon>mdi-bell-outline</v-icon></v-btn>

        <v-btn color="primary" icon> <v-icon>mdi-cog-outline</v-icon></v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        document.addEventListener('click', (event) => {
          try {
            if (
              !this.$refs.popup.contains(event.target) &&
              !this.$refs.menu.contains(event.target)
            ) {
              this.showPopup = false
            }
          } catch (e) {
            this.showPopup = false
          }
        })
      })
    }, 1000)
  },
  watch: {
    $route() {
      this.showPopup = false
    },
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  &__logo {
    width: auto;
    height: 55px;
    margin-right: 20px;
  }
}

.mobile-popup {
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 75px;
  left: 0;
  display: none;
  padding: 10px;

  &--show {
    display: block;
  }

  &__links {
    a {
      display: block;
      padding: 10px;
    }
  }
}
</style>
