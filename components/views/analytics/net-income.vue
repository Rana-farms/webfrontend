<template>
  <div class="flex items-center shadow-sm rounded-md p-5 bg-white">
    <v-skeleton-loader
      v-if="income == null"
      class="mx-auto"
      type="article"
      width="100%"
      height="100px"
    ></v-skeleton-loader>
    <div v-else>
      <v-icon size="50" color="#FEC00F">mdi-wallet</v-icon>
      <div class="text-sm">
        <span class="text-gray-400 tracking-wider">Net Income</span>
        <span class="block font-semibold text-2xl">{{
          income | currency
        }}</span>
      </div>
      <div class="mt-1 text-sm" v-if="monthlyNetIncome != null">
        <span
          class="inline-flex items-center"
          :class="{
            'text-green-500': parseInt(monthlyNetIncome) > 0,
            'text-red-500': parseInt(monthlyNetIncome) < 0,
          }"
        >
          {{ monthlyNetIncome }}%
          <v-icon color="success" v-if="parseInt(monthlyNetIncome) > 0"
            >mdi-arrow-up-bold</v-icon
          >
          <v-icon color="error" v-if="parseInt(monthlyNetIncome) < 0"
            >mdi-arrow-down-bold</v-icon
          >
        </span>
        <span class="text-gray-400">Profit Rate</span>
      </div>
      <div class="mt-1 inline-flex gap-2 text-sm" v-else>
        <span class="font-semibold"> 0%</span
        ><span class="text-gray-400">Profit Rate</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    income: {
      default: null,
    },
    monthlyNetIncome: {
      default: 0,
    },
  },
}
</script>

<style></style>
