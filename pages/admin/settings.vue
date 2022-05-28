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

      <div class="w-full md:py-4 md:px-16 ">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      items: [
         {
            text:'Profile',
            link:'/admin/settings/profile'
        },
        {
          text: 'Members',
          link: '/admin/settings/members',
        }
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
