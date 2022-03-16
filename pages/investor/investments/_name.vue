<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Investment</span>

    <div class="bg-white p-8 rounded-lg shadow-md mt-10">
      <span class="font-bold text-primary uppercase text-lg"
        >{{ investment.name }}
      </span>
      <span class="block text-gray-400 w-full mt-2 md:w-3/6">{{
        investment.description
      }}</span>

      <div class="grid mt-8 mb-8 md:mb-20 grid-cols-1 md:grid-cols-2">
        <div>
          <span class="font-semibold block">Assets Allocation</span>
          <span class="block">{{ investment.allocation }}</span>

          <span class="font-semibold block mt-1">Minimum Investment</span>
          <span class="block">{{ investment.minimum_investment }}</span>

          <span class="font-semibold block mt-1">Lock-Up Period</span>
          <span class="block">{{ investment.lock }}</span>
        </div>

        <div>
          <span class="font-semibold block">Unit Price</span>
          <span class="block">{{ investment.unit_price }}</span>

          <span class="font-semibold block mt-1">Profit Sharing Formula</span>
          <span class="block">{{ investment.formula }}</span>

          <span class="font-semibold block mt-1">Insurance Fee</span>
          <span class="block">{{ investment.fee }}</span>
        </div>
      </div>

      <div class="flex justify-end">
        <v-btn elevation="0" large color="primary">Invest</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'investor',
  data() {
    return {
      investment: {
        name: 'Agricultural Commodity Trust ',
        trustee: 'RANA Farms Limited',
        description:
          'This trust is invested in produce aggregation and commodity trading to generate profit for unit holders.',
        slug: 'agricultural-commodity-trust',
        allocation: 'Min. 10% - Cash/Max. 90% - Commodity',
        minimum_investment: '1,000,000 units',
        unit_price: 'NGN 1',
        lock: '1 year',
        formula: '60:40 (Investor:Trustee)',
        fee: '4%',
        link: '',
      },
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
