<template>
  <div class="page">
    <div
      class="bg-white p-5 md:px-10 rounded-md shadow-md mt-10 w-full max-w-xl"
    >
      <div>
        <span class="block text-center font-semibold text-xl">Invest</span>

        <div class="block mt-10 w-full">
          <v-text-field
            placeholder="Trust"
            disabled
            label="Trust"
            v-model="trust"
            class="mb-0 pa-0"
            hide-details="auto"
            outlined
            block
          ></v-text-field>

          <v-text-field
            block
            placeholder="Enter number of units (Minimum Units: 1,000,000 units"
            label="Number of units"
            class="mt-5 mb-8 pa-0"
            hide-details="auto"
            type="number"
            v-model="number_of_units"
            outlined
          ></v-text-field>

          <v-text-field
            block
            placeholder="Amount"
            label="Amount"
            class="mt-5 mb-8 pa-0"
            hide-details="auto"
            type="number"
            v-model="amount"
            outlined
          ></v-text-field>

          <v-btn elevation="0" @click="next" color="primary" block large
            >Make Payment</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'investor',
  data() {
    return {
      trust: this.$route.query.name,
      number_of_units: '',
      amount: '',
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
