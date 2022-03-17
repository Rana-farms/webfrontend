<template>
  <div class="page">
    <div
      class="bg-white p-5 rounded-md shadow-md mt-10 w-full md:w-11/12 mx-auto flex flex-col md:flex-row"
    >
      <div class="w-full md:w-1/4">
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, i) in items"
              link
              :to="item.link"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>

      <div class="w-full md:px-20 ">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'investor',
  data() {
    return {
      items: [
        {
          text: 'Profile Settings',
          link: '/investor/settings/profile',
        },
        {
          text: 'Change Password',
          link: '/investor/settings/password',
        },
        {
          text: 'Bank Setting',
          link: '/investor/settings/bank',
        },
        {
          text: 'Help and Support',
          link: '/investor/settings/support',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';

.page {
  min-height: 100%;
  padding: 10px;

  @include media-breakpoint-up(sm) {
    padding: 30px;
  }
}
</style>
