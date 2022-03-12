<template>
  <div class="page">
    <span class="block font-semibold text-2xl">Wallet</span>

    <div
      class="bg-white p-5 py-8 rounded-md shadow-md mt-10 flex justify-center"
    >
      <div>
        <span class="block text-center text-gray-400">Wallet Balance</span>
        <span class="font-semibold text-center text-2xl md:text-4xl block"
          >₦5,040,010.00</span
        >
        <div class="grid grid-cols-2 gap-2 mt-8">
          <v-btn color="primary" large elevation="0">Deposit</v-btn>
          <v-btn color="yellow" dark large elevation="0" to="/investor/wallet/withdraw">Withdraw</v-btn>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <span class="font-semibold block text-lg mb-1">Transaction History</span>
      <v-data-table :headers="headers" :items="desserts" class="elevation-0">
        <template v-slot:item.date="{ item }">
          <div class="inline-flex gap-1">
            <v-btn color="green" icon v-if="item.type == 'deposit'">
              <v-icon>mdi-arrow-top-right-thin</v-icon></v-btn
            >
            <v-btn v-else color="red" icon>
              <v-icon>mdi-arrow-bottom-left-thin</v-icon></v-btn
            >
            <span class="text-gray-600">{{ item.date }}</span>
          </div>
        </template>
        <template v-slot:item.status="{ item }">
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
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'investor',
  data() {
    return {
      headers: [
        { text: 'DATE', value: 'date' },
        { text: 'DESCRIPTION', value: 'description' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'STATUS', value: 'status' },
      ],
      desserts: [
        {
          date: '12 oct. 2021, 07:29PM',
          description: 'withdraw to bank',
          type: 'withdraw',
          amount: '₦3,000,000.00',
          status: 'pending',
        },
        {
          date: '12 oct. 2021, 07:29PM',
          description: 'Deposit',
          type: 'deposit',

          amount: '₦3,000,000.00',
          status: 'success',
        },
        {
          date: '12 oct. 2021, 07:29PM',
          description: 'withdraw to bank',
          type: 'withdraw',

          amount: '₦3,000,000.00',
          status: 'failed',
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
