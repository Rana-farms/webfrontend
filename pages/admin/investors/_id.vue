<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">User Profile</span>

    <v-skeleton-loader
      v-if="user == null"
      class="mx-auto"
      type="card"
      width="100%"
      height="160px"
    ></v-skeleton-loader>

    <div
      v-else
      class="flex gap-10 flex-wrap justify-between items-center mt-5 rounded-lg bg-white shadow mx-auto p-10"
    >
      <div>
        <span class="font-semibold text-3xl block">{{ user.fullname }}</span>
        <span class="text-gray-400 block mb-1">{{ user.email }}</span>
        <span
          class="text-green-500 bg-green-100 rounded-lg py-1 px-2"
          v-if="user.isVerified"
          >Verified</span
        >
        <span class="text-yellow-500 bg-yellow-100 rounded-lg py-1 px-2" v-else
          >Pending verification</span
        >
      </div>

      <div v-if="!user.isVerified">
        <v-btn color="primary" :loading="isVerifying" @click="verifyUser"  elevation="0"  rounded>Verify</v-btn>
      </div>

      <div class="p-5 rounded-lg" style="background-color: #9d1e230d">
        <span class="block text-gray-400 text-sm">Total Investment</span>
        <span class="text-primary font-semibold text-lg block">{{
          user.totalInvestment | currency
        }}</span>
      </div>

      <div class="p-5 rounded-lg" style="background-color: #f2faf4">
        <span class="block text-gray-400 text-sm">Total Recieved</span>
        <span class="text-green-500 font-semibold text-lg block">{{
          user.totalReceived | currency
        }}</span>
      </div>

      <div class="p-5 rounded-lg" style="background-color: #ffe8e845">
        <span class="block text-gray-400 text-sm">Current Investment</span>
        <span class="text-yellow-500 font-semibold text-lg block">{{
          user.currentInvestment | currency
        }}</span>
      </div>
    </div>

    <div class="mt-10">
      <span class="font-semibold block text-lg mb-1"
        >Investor's Transaction History</span
      >
      <v-data-table
        :headers="transactionsHeader"
        fixed-header
        :items="(user && user.transactions) || []"
        :loading="user == null"
        class="elevation-0"
      >
        <template v-slot:[`item.dateCreated`]="{ item }">
          <div class="inline-flex gap-1">
            <v-btn
              color="green"
              icon
              v-if="item.transaction_type == 'Investment'"
            >
              <v-icon>mdi-arrow-top-right-thin</v-icon></v-btn
            >
            <v-btn v-else color="red" icon>
              <v-icon>mdi-arrow-bottom-left-thin</v-icon></v-btn
            >
            <span class="text-gray-600">{{
              format(new Date(item.dateCreated), 'MMM do, y ')
            }}</span>
          </div>
        </template>
        <template v-slot:[`item.amount`]="{ item }">
          {{ item.amount | currency }}
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <span
            class="uppercase"
            :class="{
              'text-green-500': item.status.toLowerCase() == 'success',
              'text-yellow-500': item.status.toLowerCase() == 'pending',
              'text-red-500': item.status.toLowerCase() == 'failed',
            }"
            >{{ item.status }}</span
          >
        </template>

        <template v-slot:no-data>
          <div
            class="w-full flex items-center justify-center h-60"
            v-if="user && user.transactions.length == 0"
          >
            <div class="text-center text-flame">
              <span class="block text-center">{{ user.fullname }} has not made any transaction</span>
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
                >Loading transactions...</span
              >
            </div>
          </div>
        </template>
      </v-data-table>
    </div>

    <div class="mt-12">
      <span class="font-semibold block text-xl mb-2"
        >Investor's Investments</span
      >
      <v-data-table
        :headers="investmentsHeaders"
        fixed-header
        disable-sort
        :items="(user && user.investments) || []"
        :loading="user == null"
        class="elevation-0"
      >
        <template v-slot:no-data>
          <div
            class="w-full flex items-center justify-center h-60"
            v-if="user.investments.length == 0"
          >
            <div class="text-center text-flame">
              <span class="block text-center"
                >{{ user.fullname }} has not made any investment</span
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
                >Loading investments...</span
              >
            </div>
          </div>
        </template>

        <template v-slot:[`item.units`]="{ item }">
          {{ Intl.NumberFormat().format(item.units) }}
        </template>

        <template v-slot:[`item.amount`]="{ item }">
          {{ item.amount | currency }}
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <span
            class="uppercase"
            :class="{
              'text-green-500': item.status.toLowerCase() == 'active',
              'text-red-500': item.status.toLowerCase() == 'inactive',
            }"
            >{{ item.status }}</span
          >
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  layout: 'admin',
  data() {
    return {
      format: format,
      investmentsHeaders: [
        {
          text: 'INVESTMENT NAME',
          align: 'start',
          sortable: false,
          value: 'investmentName',
        },
        { text: 'UNITS', value: 'units' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'START DATE', value: 'startDate' },
        { text: 'END DATE', value: 'dueDate' },
        { text: ' STATUS', value: 'status' },
      ],

      transactionsHeader: [
        { text: 'DATE', value: 'dateCreated' },
        { text: 'DESCRIPTION', value: 'transaction_type' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'STATUS', value: 'status' },
      ],

      user: null,
      isVerifying: false,
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        const { data } = await this.$API.user.fetchUserById(
          this.$route.params.id
        )
        this.user = data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      }
    },
      async verifyUser() {
      try {
        this.isVerifying = true
         await this.$API.user.verifyUser(
          this.$route.params.id
        )
        this.$store.dispatch('alert/setAlert', {
          message: 'User verified successfully',
          color: 'success',
        })
        this.user = null
        this.getUser();
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      }finally{
        this.isVerifying = false
      }
    },
  }
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
