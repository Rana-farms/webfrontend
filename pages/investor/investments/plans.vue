<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Investments</span>

    <v-data-table
      :headers="headers"
      disable-sort
      disable-pagination
      hide-default-footer
      :items="investements"
      :loading="isLoadingInvestments"
      class="elevation-0"
    >
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          rounded
          style="margin: 20px 0px"
          elevation="0"
          small
          color="primary"
          :to="`/investor/investments/${item.id}`"
          >View</v-btn
        >
      </template>
    </v-data-table>
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
        { text: 'MINIMUM INVESTMENT', value: 'minimumUnit' },
        { text: 'UNIT PRICE', value: 'unitPrice' },
        { text: ' LOCK-UP PERIOD', value: 'lockUpPeriod' },
        { text: 'INSURANCE FEE', value: 'insuranceFee' },
        { text: 'ACTION', value: 'action' },
      ],
      investements: [],
      isLoadingInvestments: false,
    }
  },
  mounted() {
    this.getAllInvestments()
  },
  methods: {
    async getAllInvestments() {
      try {
        this.isLoadingInvestments = true
        const { data } = await this.$API.investment.fetchAllInvestments()
        console.log(JSON.stringify(data, null, 2))
        this.investements = data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isLoadingInvestments = false
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
