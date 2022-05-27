<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Investment Plans</span>

    <v-data-table
      :headers="headers"
      disable-sort
      disable-pagination
      hide-default-footer
      :items="investments"
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

      <template v-slot:no-data>
        <div
          class="w-full flex items-center justify-center h-60"
          v-if="
            !isLoadingInvestments && investments.length == 0 && !errorLoading
          "
        >
          <div class="text-center text-flame">
            <span class="block text-center">No investment plan</span>
          </div>
        </div>

        <div
          class="w-full flex items-center justify-center h-60"
          v-if="!isLoadingInvestments && errorLoading"
        >
          <div class="text-center text-flame">
            <v-icon size="50" color="primary"
              >mdi-format-list-bulleted-square</v-icon
            >
            <span class="block text-center"
              >Error loading investments plan...</span
            >
            <v-btn color="primary" text @click="getAllInvestments">
              <v-icon left>mdi-refresh</v-icon> Retry</v-btn
            >
          </div>
        </div>
      </template>

      <template v-slot:loading>
        <div class="w-full flex items-center justify-center h-72">
          <div class="text-center text-flame">
            <v-icon size="40" color="primary"
              >mdi-format-list-bulleted-square</v-icon
            >
            <span class="block mt-2 font-semibold text-center"
              >Loading investment plans...</span
            >
          </div>
        </div>
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
      investments: [],
      isLoadingInvestments: false,
      errorLoading: false,
    }
  },
  mounted() {
    this.getAllInvestments()
  },
  methods: {
    async getAllInvestments() {
      this.errorLoading = false
      try {
        this.isLoadingInvestments = true
        const { data } = await this.$API.investment.fetchAllInvestments()
        this.investments = data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
        this.errorLoading = true
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
