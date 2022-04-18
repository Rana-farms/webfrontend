<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Deposit History</span>
    <div class="mt-8">
       <v-data-table
        :headers="depositHistoryHeaders"
        :items="depositHistories"
        disable-sort
        disable-pagination
        hide-default-footer
        class="elevation-0"
      >
        <template v-slot:[`item.status`]="{ item }">
          <span
            class="uppercase md:my-6 block"
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
  layout: 'admin',
  data() {
    return {
        depositHistoryHeaders: [
        { text: 'NAME OF INVESTMENT PLAN', value: 'trust' },
        { text: 'NAME OF INVESTOR', value: 'investor' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'DATE', value: 'date' },

        { text: 'STATUS', value: 'status' },
      ],
      depositHistories: [
        {
          trust: 'Agricultural Commodity Trust ',
          date: '12 oct. 2021, 07:29PM',
          investor: 'Jane Doe',
          amount: '₦3,000,000.00',
          status: 'pending',
        },
        {
          trust: 'Agricultural Logistic Trust ',
          date: '12 oct. 2021, 07:29PM',
          investor: 'Jane Doe',
          amount: '₦3,000,000.00',
          status: 'success',
        },
        {
          trust: 'Agricultural Storage Trust ',
          date: '12 oct. 2021, 07:29PM',
          investor: 'Jane Doe',
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
