<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">All users</span>

    <v-data-table
      :headers="headers"
      disable-sort
      disable-pagination
      hide-default-footer
      :items="users"
      :loading="isLoadingUsers"
      class="elevation-0"
    >
      <template v-slot:[`item.status`]="{ item }">
        <span class="text-green-500" v-if="item.status == 'active'"
          >ACTIVE</span
        >
        <span class="text-red-600" v-else>NON-ACTIVE</span>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          rounded
          outlined
          style="margin: 16px 0px"
          elevation="0"
          small
          color="primary"
          :to="`/admin/users/${item.id}`"
          >View</v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      headers: [
        {
          text: 'NAME OF INVESTOR',
          align: 'start',
          sortable: false,
          value: 'fullname',
        },
        { text: 'PHONE NUMBER', value: 'phone' },
        { text: ' EMAIL', value: 'email' },
        { text: 'INVESTMENT STATUS', value: 'status' },

        { text: 'ACTION', value: 'action' },
      ],
      users: [],
      isLoadingUsers: false,
    }
  },

  mounted() {
    this.getAllUsers()
  },
  methods: {
    getAllUsers() {
      try {
        this.isLoadingUsers = true

        this.users = [
          {
            id: 1,
            fullname: 'John Doe',
            phone: '+234 809-876-5309',
            email: 'johndoe@gmail.com',
            status: 'active',
          },
          {
            id: 2,
            fullname: 'Jane Doe',
            phone: '+234 809-876-5309',
            email: 'janedoe@mail.com',
            status: 'non-active',
          },
          {
            id: 3,
            fullname: 'Williams Dwayne',
            phone: '+234 809-876-5309',
            email: 'dwyne@zmail.com,',
            status: 'active',
          },
        ]
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isLoadingUsers = false
      }
    },
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
