<template>
  <div class="bg-white shadow-sm rounded-md flex items-center p-5">
    <v-skeleton-loader
      v-if="roi == null"
      class="mx-auto"
      type="article"
      width="100%"
      height="100px"
    ></v-skeleton-loader>
    <div v-else>
      <div class="flex items-center">
        <div class="flex-1" v-if="roi != null">
          <span class="block font-semibold text-2xl">{{ roi | currency }}</span>
          <span class="text-sm text-gray-400 tracking-wider">Monthly ROI</span>
        </div>
        <v-icon size="40" color="#6E81DF">mdi-poll</v-icon>
      </div>
      <div class="mt-3 text-sm" v-if="percentageIncrease != null">
        <span class="inline-flex items-center" style="color: #039e00"
          >{{ percentageIncrease }}%
          <v-icon color="#039E00">mdi-arrow-up-bold</v-icon></span
        >
        <span class="text-gray-400">Since Last Month</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roi: {
      default: null,
    },
    percentageIncrease: {
      default: 0,
    },
  },
}
</script>

<style></style>
