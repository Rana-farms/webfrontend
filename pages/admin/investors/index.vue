<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Investors</span>

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
        <span class="text-red-600" v-else>IN-ACTIVE</span>
      </template>
      <template v-slot:[`item.isVerified`]="{ item }">
        <span class="text-green-500" v-if="item.isVerified"
          >VERIFIED</span
        >
        <span class="text-yellow-400" v-else>UNVERIFIED</span>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          rounded
          outlined
          style="margin: 16px 0px"
          elevation="0"
          small
          color="primary"
          :to="`/admin/investors/${item.id}`"
          >View</v-btn
        >
      </template>



       <template v-slot:no-data>
        <div
          class="w-full flex items-center justify-center h-60"
          v-if="
            !isLoadingUsers && users.length == 0 && !errorLoading
          "
        >
          <div class="text-center text-flame">
            <span class="block text-center">No Investors</span>
          </div>
        </div>

        <div
          class="w-full flex items-center justify-center h-60"
          v-if="!isLoadingUsers && errorLoading"
        >
          <div class="text-center text-flame">
            <v-icon size="50" color="primary"
              >mdi-format-list-bulleted-square</v-icon
            >
            <span class="block text-center"
              >Error loading investors...</span
            >
            <v-btn color="primary" text @click="getAllUsers">
              <v-icon left>mdi-refresh</v-icon> Retry</v-btn
            >
          </div>
        </div>
      </template>

      <template v-slot:loading>
        <div class="w-full flex items-center justify-center h-72">
          <div class="text-center text-flame">
            <v-icon size="40" color="primary"
              >mdi-format-list-bulleted-square</v-icon
            >
            <span class="block mt-2 font-semibold text-center"
              >Loading investors...</span
            >
          </div>
        </div>
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
        { text: ' EMAIL', value: 'email' },
        { text: 'PHONE NUMBER', value: 'phone' },
        { text: 'VERIFICATION', value: 'isVerified' },

        { text: 'INVESTMENT STATUS', value: 'status' },

        { text: 'ACTION', value: 'action' },
      ],
      users: [],
      isLoadingUsers: false,
      errorLoading:false
    }
  },

  mounted() {
    this.getAllUsers()
  },
  methods: {
    async getAllUsers() {
      this.errorLoading = false
      try {
        this.isLoadingUsers = true
        console.log('loading users...')
        const { data } = await this.$API.investor.fetchAllInvestors()
        console.log(JSON.stringify(data, null, 2))
        this.users = data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
        this.errorLoading = true
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
