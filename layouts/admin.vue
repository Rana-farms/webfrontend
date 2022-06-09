<template>
  <v-app id="inspire">
    <!-- <investor-sidebar /> -->
    <!-- <investor-header /> -->

    <v-navigation-drawer
      v-model="drawer"
      app
      width="235"
      clipped
      mobile-breakpoint="1025"
      disable-resize-watcher
      color="#fff"
    >
      <div class="block md:hidden">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon color="grey" size="40">mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ $profile.fullname }}</v-list-item-title>
              <v-list-item-subtitle>{{ $profile.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <div class="mt-5">
        <v-list dense rounded>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, i) in routes"
              link
              :to="item.link"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar app :height="60" color="#fff" clipped-left elevation="0">
      <div class="app-header md:px-3 flex items-center">
        <router-link to="/">
          <img class="app-header__logo" src="/images/logo.png" alt=""
        /></router-link>

        <div class="hidden md:inline-block">
          <v-app-bar-nav-icon color="primary" @click="drawer = !drawer" />
        </div>
        <v-spacer></v-spacer>
        <div class="md:hidden">
          <v-app-bar-nav-icon color="primary" @click="drawer = !drawer" />
        </div>

        <div class="hidden md:flex gap-5">
          <router-link
            to="/admin/settings/profile"
            class="inline-flex gap-2 items-center"
          >
            <span
              class="h-8 w-8 bg-primary rounded-full flex items-center justify-center"
            >
              <v-icon color="#fff">mdi-account</v-icon></span
            >
            <span class="text-gray-500">{{ $profile.fullname }}</span>
          </router-link>
          <!-- <v-btn color="primary" icon> <v-icon>mdi-bell-outline</v-icon></v-btn> -->
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <notification-alert />
  </v-app>
</template>

<script>
import AppFooter from '~/components/views/app-footer.vue'
import NotificationAlert from '~/components/views/notification-alert.vue'
export default {
  middleware: ['admin-auth'],
  components: {
    AppFooter,
    NotificationAlert,
  },
  data() {
    return {
      drawer: false,
      showPopup: false,
      selectedItem: 1,
      items: [
        {
          text: 'Dashboard',
          icon: 'mdi-home-variant-outline',
          link: '/admin/dashboard',
          permissions: ['Super Admin', 'Admin'],
        },

        {
          text: 'Investors',
          icon: 'mdi-account-multiple-outline',
          link: '/admin/investors',
          permissions: ['Super Admin', 'Admin'],
        },
        {
          text: 'Admins',
          icon: 'mdi-account-multiple-outline',
          link: '/admin/admins',
          permissions: ['Super Admin'],
        },
        {
          text: 'Investments',
          icon: 'mdi-chart-line',
          link: '/admin/investments',
          permissions: ['Super Admin', 'Admin'],
        },
        {
          text: 'Transactions',
          icon: 'mdi-format-list-bulleted',
          link: '/admin/transactions',
          permissions: ['Super Admin', 'Admin'],
        },
        {
          text: 'Withdrawals',
          icon: 'mdi-cash-multiple',
          link: '/admin/withdrawals',
          permissions: ['Super Admin'],
        },
        {
          text: 'Documents',
          icon: 'mdi-file-document-multiple-outline',
          link: '/admin/documents',
          permissions: ['Super Admin', 'Admin'],
        },
        {
          text: 'Orders',
          icon: 'mdi-inbox-outline',
          link: '/admin/orders',
          permissions: ['Super Admin', 'Admin'],
        },
        {
          text: 'Settings',
          icon: 'mdi-cog-outline',
          link: '/admin/settings',
          permissions: ['Super Admin', 'Admin'],
        },
        {
          text: 'Logout',
          icon: 'mdi-logout',
          link: '/logout',
          permissions: ['Super Admin', 'Admin'],
        },
      ],
    }
  },
  mounted() {
    if (this.$device.isDesktop) {
      this.drawer = true
    }

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
  computed: {
    routes() {
      return this.items.filter((item) =>
        item.permissions.includes(this.$profile.role)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
#inspire {
  background-color: #f5f6f8;
}

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
