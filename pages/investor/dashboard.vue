<template>
  <div class="page">
    <span class="block font-semibold text-2xl">Dashboard</span>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center py-8 gap-4"
    >
      <investor-monthly-roi
        :roi="metrics.monthlyRoi"
        :percentageIncrease="metrics.percentageSinceLastMonths"
      />
      <investor-net-income :income="metrics.netIncome" />
      <investor-available-funds :funds="metrics.availableFunds" />
      <investor-captial-accoun-bal :balance="metrics.capitalBalance" />
    </div>
    <div class="flex flex-col lg:flex-row gap-4">
      <investor-analytics />

      <div class="lg:w-2/5">
        <investment-plans :plans="metrics.investments" />
      </div>
    </div>
  </div>
</template>

<script>
import InvestorMonthlyRoi from '~/components/investor/pages/index/investor-monthly-roi.vue'
import InvestorNetIncome from '~/components/investor/pages/index/investor-net-income.vue'
import InvestorAvailableFunds from '~/components/investor/pages/index/investor-available-funds.vue'
import InvestorCaptialAccounBal from '~/components/investor/pages/index/investor-captial-accoun-bal.vue'
import InvestorAnalytics from '~/components/investor/pages/index/investor-analytics.vue'
import InvestmentPlans from '~/components/investor/pages/index/investment-plans.vue'

export default {
  layout: 'investor',
  components: {
    InvestorMonthlyRoi,
    InvestorNetIncome,
    InvestorAvailableFunds,
    InvestorCaptialAccounBal,
    InvestorAnalytics,
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
        investments:null
      },
    }
  },
  async mounted() {
    const { data } = await this.$API.investment.fetchMetrics()
    this.metrics = data.data
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
