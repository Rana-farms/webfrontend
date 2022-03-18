<template>
  <div class="page">
    <component :details="details" @fee="collectFee" @proceed="withdraw" :is="currentView" />
  </div>
</template>

<script>
import withdrawFee from '~/components/investor/pages/withdraw/withdraw-fee.vue'
import withdrawDetails from '~/components/investor/pages/withdraw/withdraw-details.vue'
import withdrawSucessful from '~/components/investor/pages/withdraw/withdraw-sucessful.vue'

export default {
  components: {
    withdrawFee: withdrawFee,
    withdrawDetails: withdrawDetails,
    withdrawSucessful: withdrawSucessful,
  },
  layout: 'investor',
  data() {
    return {
      currentView: 'withdrawFee',
      details: {
        amount: 0,
        transactionFee: 0,
      },
    }
  },
  methods: {
    collectFee(data) {
      this.details.amount = data.amount
      this.details.transactionFee = data.transactionFee
      this.currentView = 'withdrawDetails'
    },
    withdraw() {
      this.currentView = 'withdrawSucessful'
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
