<template>
  <v-app-bar
    id="app"
    :height="75"
    width="100%"
    color="#fff"
    app
    dense
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
        <a href="https://www.hope.com/" target="_blank"
        ><div class="ml-10 icons8-bitcoin"></div
      ></a>
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

    <div
      class="mobile-popup shadow-md"
      ref="popup"
      :class="{ 'mobile-popup--show': showPopup }"
    >
      <div class="mobile-popup__links">
        <router-link to="/about-us"> Who we are </router-link>
        <router-link to="/purpose"> What we do </router-link>
        <router-link to="/contact-us"> Contact us </router-link>
      </div>
      <div class="grid items-center grid-cols-2 gap-1 mt-2">
        <v-btn text to="/login">Login</v-btn>
        <v-btn large to="/signup" elevation="0" color="primary">Sign up</v-btn>
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
.icons8-bitcoin {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDQ4IDQ4IgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxwYXRoIGZpbGw9IiNmZmMxMDciIGQ9Ik00NCwyNGMwLDExLjA0NC04Ljk1NiwyMC0yMCwyMFM0LDM1LjA0NCw0LDI0UzEyLjk1Niw0LDI0LDRTNDQsMTIuOTU2LDQ0LDI0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmY4ZTEiIGQ9Ik0xNywzNFYxNGg4LjE5OWMyLjQxLDAsNC4yMzQsMC40NjUsNS40OCwxLjM5NXMxLjg2NywyLjI5MywxLjg2Nyw0LjA4NmMwLDAuOTgtMC4yNSwxLjg0NC0wLjc0NiwyLjU5Yy0wLjUsMC43NDYtMS4xOTUsMS4yOTMtMi4wODYsMS42NDFjMS4wMTYsMC4yNTgsMS44MTYsMC43NzMsMi40MDIsMS41NTVDMzIuNzAzLDI2LjA0MywzMywyNi45OTIsMzMsMjguMTIxYzAsMS45MjItMC42MDksMy4zNzktMS44MjgsNC4zNjdTMjguMjE5LDMzLjk4LDI1Ljk2NSwzNEgxN3ogTTIxLDIyaDQuMzYzYzIuMDYzLTAuMDM1LDMuMDk4LTAuODI0LDMuMDk4LTIuNDQ1YzAtMC45MDYtMC4yNjItMS41NTktMC43ODUtMS45NTdTMjYuMzI4LDE3LDI1LjE5OSwxN0gyMVYyMnogTTIxLDI1djZoNC44NDRDMjYuODA1LDMxLDI5LDMwLjUzMSwyOSwyOC4zOTFTMjcuODgzLDI1LjAyNywyNiwyNUgyMXoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmOGUxIiBkPSJNMjAgMTFoM3Y1aC0zVjExek0yNSAxMWgzdjVoLTNWMTF6TTIwIDMyaDN2NWgtM1YzMnpNMjUgMzJoM3Y1aC0zVjMyeiI+PC9wYXRoPjwvc3ZnPg==')
    50% 50% no-repeat;
  background-size: 100%;
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
