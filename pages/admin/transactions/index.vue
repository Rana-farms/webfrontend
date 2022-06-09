<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Transactions History</span>
    <div class="mt-8">
      <v-data-table
        :headers="headers"
        :items="transactions"
        :loading="isLoadingTransactions"
        class="elevation-0"
      >
       <template v-slot:[`item.user.fullname`]="{ item }">
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
            <nuxt-link :to="`/admin/investors/${item.user.id}`" class=" cursor-pointer hover:underline text-gray-600">
              <span class=" text-black">{{
             item.user.fullname
            }}</span>
            </nuxt-link>
          </div>
       </template>

        <template v-slot:[`item.dateCreated`]="{ item }">
            <span class="text-gray-600">{{
              format(new Date(item.dateCreated), 'MMM do, y ')
            }}</span>
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
            v-if="transactions.length == 0"
          >
            <div class="text-center text-flame">
              <span class="block text-center">No Transaction History</span>
            </div>
          </div>

          <div
            class="w-full flex items-center justify-center h-60"
            v-if="!isLoadingTransactions && errorLoading"
          >
            <div class="text-center text-flame">
              <v-icon size="50" color="primary"
                >mdi-format-list-bulleted-square</v-icon
              >
              <span class="block text-center">Error loading requests...</span>
              <v-btn color="primary" text @click="getAllTransactions">
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
                >Loading transactions...</span
              >
            </div>
          </div>
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
      headers: [
          {text:'NAME OF INVESTOR',value:'user.fullname'},
        { text: 'DATE', value: 'dateCreated' },
        { text: 'DESCRIPTION', value: 'transaction_type' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'STATUS', value: 'status' },
      ],
      transactions: [],
      isLoadingTransactions: true,
      errorLoading: false,
    }
  },
  mounted() {
    this.getAllTransactions()
  },
  methods: {
    async getAllTransactions() {
      try {
        this.isLoadingTransactions = true
        this.errorLoading = false
        const { data } = await this.$API.transaction.fetchAllTransactions()
        this.transactions = data.data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: 'Error Occured',
          color: 'error',
        })
        this.errorLoading = true
      } finally {
        this.isLoadingTransactions = false
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
