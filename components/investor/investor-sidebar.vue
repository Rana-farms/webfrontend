<template>
  <v-navigation-drawer
    v-model="INVESTOR.drawer"
    app
    width="235"
    clipped
    mobile-breakpoint="1025"
    disable-resize-watcher
    color="#fff"
  >
    
    <div class="block md:hidden">
        <v-list >
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="grey" size="40">mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ USER.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ USER.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

   <div class="mt-5">
        <v-list dense rounded>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" link :to="item.link" :key="i">
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
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 1,
      items: [
        {
          text: 'Dashboard',
          icon: 'mdi-home-variant-outline',
          link: '/investor',
        },
        {
          text: 'Wallet',
          icon: 'mdi-wallet-outline',
          link: '',
        },
        {
          text: 'Investments',
          icon: 'mdi-chart-line',
          link: '',
        },
        {
          text: 'Settings',
          icon: 'mdi-cog-outline',
          link: '',
        },
      ],
    }
  },
  mounted() {
    if (this.$device.isDesktop) {
      this.toggleInvestorDrawer(true)
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
