<template>
  <div class="flex items-center shadow-sm rounded-md p-5 bg-white">
    <v-skeleton-loader
      v-if="funds == null"
      class="mx-auto"
      type="article"
      width="100%"
      height="100px"
    ></v-skeleton-loader>
    <div v-else>
      <v-icon size="50" color="#039E00">mdi-wallet</v-icon>
      <div class="text-sm">
        <span class="text-gray-400 tracking-wider">Available funds</span>
        <span class="block font-semibold text-2xl">{{ funds | currency }}</span>
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
