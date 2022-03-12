<template>
  <v-app-bar
    app
    :height="75"
    color="#fff"
    clipped-left
    elevation="0"
  >
    <div class="app-header md:px-10 flex items-center">
      <router-link to="/">
        <img class="app-header__logo" src="/images/logo.png" alt=""
      /></router-link>
      <v-spacer></v-spacer>
      <div class="hidden md:flex">
        <v-hover v-slot="{ hover }">
          <nuxt-link to="/about-us">
            <v-btn
              rounded
              :ripple="false"
              small
              style="font-weight: 600; font-family: Montserrat"
              :color="
                hover || $route.name == 'about-us' ? 'primary' : '#101010'
              "
              text
              >Who we are</v-btn
            >
          </nuxt-link>
        </v-hover>

        <v-hover v-slot="{ hover }">
          <nuxt-link to="/purpose">
            <v-btn
              rounded
              :ripple="false"
              small
              style="font-weight: 600; font-family: Montserrat"
              :color="hover || $route.name == 'purpose' ? 'primary' : '#101010'"
              text
              >what we do</v-btn
            >
          </nuxt-link>
        </v-hover>

        <v-hover v-slot="{ hover }">
          <nuxt-link to="/contact-us">
            <v-btn
              rounded
              :ripple="false"
              small
              style="font-weight: 600; font-family: Montserrat"
              :color="
                hover || $route.name == 'contact-us' ? 'primary' : '#101010'
              "
              text
              >contact us</v-btn
            >
          </nuxt-link>
        </v-hover>
      </div>

      <v-spacer></v-spacer>

      <div class="hidden md:flex">
        <v-btn text small to="/login">Login</v-btn>
        <v-btn small to="/signup" elevation="0" color="primary">Sign up</v-btn>
      </div>

      <span class="inline-flex md:hidden" ref="menu">
        <v-btn @click="showPopup = !showPopup" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </span>
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
