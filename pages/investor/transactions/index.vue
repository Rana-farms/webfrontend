<template>
  <div class="page">
    <span class="block font-semibold text-2xl">Profits</span>

    <div
      class="bg-white p-5 py-8 rounded-md shadow-md mt-10 flex justify-center"
    >
      <div v-if="$wallet && $wallet.balance">
        <span class="block text-center text-gray-400">Available Funds</span>
        <span class="font-semibold text-center text-2xl md:text-4xl block">{{
          $wallet.balance | currency
        }}</span>
        <div class=" text-center mt-8">
          <v-btn color="primary" outlined large to="/investor/investments" elevation="0">TRust</v-btn>
          <v-btn
            color="primary"
            dark
            :disabled="$wallet && $wallet.balance == 0"
            large
            elevation="0"
            to="/investor/transactions/withdraw"
            >Withdraw</v-btn
          >
        </div>
      </div>
    </div>

    <div class="mt-10">
      <span class="font-semibold block text-lg mb-1">Transaction History</span>
      <v-data-table
        :headers="headers"
        :items="$transactions"
        class="elevation-0"
      >
        <template v-slot:[`item.dateCreated`]="{ item }">
          <div class="inline-flex gap-1">
            <v-btn
              color="green"
              icon
              v-if="item.transaction_type == 'Investment' || item.transaction_type == 'ROI' || item.transaction_type == 'Redeem Capital Funds'"
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
              'text-green-500':
                item.status.toLowerCase() == 'success',
                'text-gray-500':
                item.status.toLowerCase() == 'processing',
              'text-yellow-500':
                item.status.toLowerCase() == 'pending',
              'text-red-500': item.status.toLowerCase() == 'failed',
            }"
            >{{ item.status }}</span
          >
        </template>

        <template v-slot:no-data>
          <div
            class="w-full flex items-center justify-center h-60"
            v-if="$transactions.length == 0"
          >
            <div class="text-center text-flame">
              <span class="block text-center">No Transaction History</span>
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
  layout: 'investor',
  data() {
    return {
      format: format,
      headers: [
        { text: 'DATE', value: 'dateCreated' },
        { text: 'DESCRIPTION', value: 'transaction_type' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'STATUS', value: 'status' },
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
