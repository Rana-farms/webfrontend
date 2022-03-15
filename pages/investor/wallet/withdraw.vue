<template>
  <div class="page">
    <component :is="currentView" />
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
      currentView: 'withdrawSucessful',
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
