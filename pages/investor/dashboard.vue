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
      <monthly-chart :data="roiMetrics" />

      <div class="lg:w-2/5">
        <investment-plans :plans="metrics.investments" />
      </div>
    </div>
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
  layout: 'investor',
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
      roiMetrics: [],
    }
  },
  async mounted() {
    try {
      const { data } = await this.$API.investment.fetchMetrics()
      this.metrics = data.data
    } catch (error) {
      this.$store.dispatch('alert/setAlert', {
        message: error.msg,
        color: 'error',
      })
    }

    try {
      const { data } = await this.$API.investment.fetchROIMetrics()
      this.roiMetrics = data.data
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
