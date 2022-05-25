<template>
  <div
    class="flex items-center shadow-sm rounded-md p-5 bg-white"
    v-if="balance != null"
  >
    <div>
      <v-icon size="50" color="#9D1E23">mdi-wallet</v-icon>
      <div class="text-sm">
        <span class="text-gray-400 tracking-wider"
          >Capital account balance</span
        >
        <span class="block font-semibold text-2xl">{{
          balance | currency
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    balance: {
      default: null,
    },
  },
}
</script>

<style></style>
