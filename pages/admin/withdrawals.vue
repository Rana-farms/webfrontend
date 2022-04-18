<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Withdrawal Requests</span>
    <div class="mt-8">
      <v-data-table
        :headers="withdrawalRequestHeaders"
        :items="withdrawalHistories"
        disable-sort
        disable-pagination
        hide-default-footer
        class="elevation-0"
      >
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

        <template v-slot:[`item.id`]="{ item }">
          <v-btn class="md:my-5" :disabled="item.status === 'success' || item.status === 'failed'" color="primary" elevation="0">Approve</v-btn>
        </template>
      </v-data-table>
    </div>

  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
       withdrawalRequestHeaders: [
        { text: 'NAME OF INVESTOR', value: 'investor' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'TRANSACTION FEE', value: 'fee' },
        { text: 'STATUS', value: 'status' },
        { text: ' ', value: 'id' },
      ],
      withdrawalHistories: [
        {
          id: 1,
          investor: 'Jane Doe',
          amount: '₦3,000,000.00',
          fee: '₦3,000',
          status: 'pending',
        },
        {
          id: 1,
          investor: 'Jane Doe',
          amount: '₦3,000,000.00',
          fee: '₦3,000',
          status: 'success',
        },
        {
          id: 1,
          investor: 'Jane Doe',
          amount: '₦3,000,000.00',
          fee: '₦3,000',
          status: 'pending',
        },
        {
          id: 1,
          investor: 'Jane Doe',
          amount: '₦3,000,000.00',
          fee: '₦3,000',
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
