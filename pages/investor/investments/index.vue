<template>
  <div class="page flex flex-col">
    <div>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <span class="block font-semibold mb-5 text-2xl">My Investments</span>

        <v-btn color="primary" elevation="0" to="/investor/investments/plans"
          >Investment Plans</v-btn
        >
      </div>
    </div>

    <v-data-table
      :headers="headers"
      disable-sort
      disable-pagination
      hide-default-footer
      :items="investments"
      :loading="isLoadingInvestments"
      class="elevation-0"
    >
          <template v-slot:no-data>
        <div
          class="w-full flex items-center justify-center h-60"
          v-if="!isLoadingInvestments && investments.length == 0 && !errorLoading"
        >
          <div class="text-center text-flame">
            <span class="block text-center"
              >You currently have not made any investment</span
            >
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
              >Error loading your investments...</span
            >
            <v-btn color="primary" text @click="getMyInvestments">
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
              >Loading your investments...</span
            >
          </div>
        </div>
      </template>

      <template v-slot:[`item.units`]="{ item }">
        {{ Intl.NumberFormat().format(item.units) }}
      </template>

        <template v-slot:[`item.amount`]="{ item }">
        {{ item.amount | currency }}
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <span
          class="uppercase"
          :class="{
            'text-green-500': item.status.toLowerCase() == 'active',
            'text-red-500': item.status.toLowerCase() == 'inactive',
          }"
          >{{ item.status }}</span
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
          text: 'INVESTMENT NAME',
          align: 'start',
          sortable: false,
          value: 'investmentName',
        },
        { text: 'UNITS', value: 'units' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'START DATE', value: 'startDate' },
        { text: 'END DATE', value: 'dueDate' },
        { text: ' STATUS', value: 'status' },
      ],
      investments: [
  
      ],
      isLoadingInvestments: false,
      errorLoading:false,
    }
  },
  mounted() {
    this.getMyInvestments()
  },
  methods: {
    async getMyInvestments() {
      this.errorLoading = false
      try {
        this.isLoadingInvestments = true
        const { data } = await this.$API.investment.fetchAllUserInvestments()
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
  }
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
