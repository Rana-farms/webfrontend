<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Investments</span>

    <v-data-table
      :headers="headers"
      disable-sort
      disable-pagination
      hide-default-footer
      :items="data"
      class="elevation-0"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  layout: 'investor',
  data() {
    return {
      headers: [
        {
          text: 'NAME',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'TRUSTEE', value: 'trustee' },
        { text: 'MINIMUM INVESTMENT', value: 'minimum_investment' },
        { text: 'UNIT PRICE', value: 'unit_price' },
        { text: ' LOCK-UP PERIOD', value: 'lock' },
        { text: 'INSURANCE FEE', value: 'fee' },
      ],
      data: [
        {
          name: 'Agricultural Commodity Trust ',
          trustee: 'RANA Farms Limited',
          minimum_investment: '1,000,000 units',
          unit_price: 'NGN 1',
          lock: '1 year',
          fee: '4%',
          link: '',
        },
        {
          name: 'Agricultural Logistics Trust',
          trustee: 'RANA Farms Limited',
          minimum_investment: '500,000 units',
          unit_price: 'NGN 1',
          lock: '2 years',
          fee: '3%',
          link: '',
        },
        {
          name: 'Agricultural Storage Trust',
          trustee: 'RANA Farms Limited',
          minimum_investment: '1,000,000 units',
          unit_price: 'NGN 1',
          lock: '5 years',
          fee: '-',
          link: '',
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
