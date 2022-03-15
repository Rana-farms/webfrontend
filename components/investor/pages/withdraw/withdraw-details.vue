<template>
  <div class="bg-white p-5 md:px-10 rounded-md shadow-md mt-10 w-full max-w-xl">
    <div>
      <span class="block text-center font-semibold text-xl"
        >Transaction Details</span
      >

      <div class="block mt-10 w-full">
        <div class="font-semibold flex justify-between">
          <span class="text-lg">Amount </span>
          <span>₦{{ details.amount }} </span>
        </div>

        <div class="font-semibold mt-5 flex justify-between">
          <span class="text-lg">Transaction fee </span>
          <span>₦{{ details.transactionFee }} </span>
        </div>

        <div class="flex justify-center">
          <v-btn
            elevation="0"
            @click="proceed"
            style="width: 50%"
            class="mt-10 d-block"
            color="primary"
            large
            >Proceed</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['details'],
  methods: {
    proceed() {
      this.$emit('proceed', {
        amount: this.details.amount,
        transactionFee: this.details.transactionFee,
      })
    },
  },
}
</script>

<style></style>
