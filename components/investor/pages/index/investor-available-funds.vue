<template>
  <div
    class="flex items-center shadow-sm rounded-md p-5 bg-white"
    v-if="funds != null"
  >
    <div>
      <v-icon size="50" color="#039E00">mdi-wallet</v-icon>
      <div class="text-sm">
        <span class="text-gray-400 tracking-wider">Available funds</span>
        <span class="block font-semibold text-2xl">{{ funds | currency }}</span>
        <!-- <span class="font-semibold">{{ profits }}%</span>
        <span class="text-gray-400">Profits</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    funds: {
      default: null,
    },
  },
}
</script>

<style></style>
