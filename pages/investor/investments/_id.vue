<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Investment</span>

    <div class="bg-white flex p-3 p-md-8 rounded-lg shadow-md mt-10" v-if="investment">
      <div class="flex-1">
        <span class="font-bold text-primary uppercase text-lg"
        >{{ investment.name }}
      </span>
      <span class="block text-gray-400 w-full mt-2 md:w-3/6">{{
        investment.description
      }}</span>

      <div class="grid mt-8 mb-8 md:mb-20 grid-cols-1 md:grid-cols-2">
        <div>
          <span class="font-semibold block">Assets Allocation</span>
          <span class="block">{{ investment.assetAllocation }}</span>

          <span class="font-semibold block mt-1">Minimum Investment</span>
          <span class="block">{{ investment.minimumUnit }}</span>

          <span class="font-semibold block mt-1">Lock-Up Period</span>
          <span class="block">{{ investment.lockUpPeriod }}</span>

          <span class="font-semibold block mt-1">Risk Profile</span>
          <span class="block">{{ investment.riskProfiile }}</span>
        </div>

        <div>
          <span class="font-semibold block">Unit Price</span>
          <span class="block">{{ investment.unitPrice }}</span>

          <span class="font-semibold block mt-1">Profit Sharing Formula</span>
          <span class="block">{{ investment.profitSharingFormula }}</span>

          <span class="font-semibold block mt-1">Insurance Fee</span>
          <span class="block">{{ investment.insuranceFee }}</span>
        </div>
      </div>
      </div>

      <div >
        <v-btn elevation="0" :to="`/investor/investments/invest/?id=${investment.id}`" large color="primary"
          >Invest</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'investor',
  data() {
    return {
      investment: null,
    }
  },
  mounted(){
    this.getInvestment()
  },
  methods: {
    async getInvestment() {
      try {
        const { data } = await this.$API.investment.fetchInvestmentById(this.$route.params.id)
        this.investment = data.data
        this.$store.dispatch('investment/holdInvestment', this.investment)
      } catch (error) {
        this.$router.replace('/investor/investments')
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
