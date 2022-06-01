<template>
  <div class="page">
    <span class="block font-semibold text-2xl">Dashboard</span>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center py-8 gap-4"
    >
      <monthly-roi
        :roi="metrics.monthlyRoi"
        :percentageIncrease="metrics.percentageSinceLastMonths"
      />
      <net-income :income="metrics.netIncome" />
      <available-funds :funds="metrics.availableFunds" />
      <captial-account-balance :balance="metrics.capitalBalance" />
      
    </div>

    <div class="flex flex-col lg:flex-row gap-4">
       <monthly-chart />

      <div class="lg:w-2/5">
         <investment-plans :plans="metrics.investments" />
      </div>
    </div>

    <!-- <div class="mt-10">
      <div class="flex justify-between items-center">
        <span class="font-semibold block text-lg mb-3">Deposit History</span>

        <v-btn color="primary" to="/admin/deposits" text>
          See more<v-icon right>mdi-chevron-right</v-icon></v-btn
        >
      </div>
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
    </div> -->

    <!-- <div class="mt-12">
      <div class="flex justify-between items-center">
        <span class="font-semibold block text-lg mb-3">WIthdrawal Request</span>

        <v-btn color="primary" to="/admin/withdrawals" text>
          See more<v-icon right>mdi-chevron-right</v-icon></v-btn
        >
      </div>
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
          <v-btn
            class="md:my-5"
            :disabled="item.status == 'success' || item.status == 'failed'"
            color="primary"
            elevation="0"
            >Approve</v-btn
          >
        </template>
      </v-data-table>
    </div> -->
  </div>
</template>

<script>
import MonthlyRoi from '~/components/views/analytics/monthly-roi.vue'
import NetIncome from '~/components/views/analytics/net-income.vue'
import AvailableFunds from '~/components/views/analytics/available-funds.vue'
import CaptialAccountBalance from '~/components/views/analytics/capital-account-balance.vue'
import MonthlyChart from '~/components/views/analytics/monthly-chart.vue'
import InvestmentPlans from '~/components/views/analytics/investment-plans.vue'

export default {
  layout: 'admin',
  components: {
   MonthlyRoi,
    NetIncome,
    AvailableFunds,
    CaptialAccountBalance,
    MonthlyChart,
    InvestmentPlans,
  },
  data() {
    return {
      metrics: {
        monthlyRoi: null,
        percentageSinceLastMonths: null,
        netIncome: null,
        availableFunds: null,
        capitalBalance: null,
        investments: null,
      },

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
          status: 'pending',
        },
      ],
    }
  },
  async mounted() {
    try {
      const { data } = await this.$API.investment.fetchMetrics('admin')
      this.metrics = data.data
    } catch (error) {
      this.$store.dispatch('alert/setAlert', {
        message: error.msg,
        color: 'error',
      })
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
