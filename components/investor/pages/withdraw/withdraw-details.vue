<template>
  <div class="bg-white p-5 md:px-10 rounded-md shadow-md mt-10 w-full max-w-xl">
    <div>
      <span class="block text-center font-semibold text-xl"
        >Transaction Details</span
      >

      <div class="block mt-10 w-full">
        <div class="font-semibold flex justify-between">
          <span class="text-lg">Amount </span>
          <span>₦5,000,000 </span>
        </div>

        <div class="font-semibold mt-5 flex justify-between">
          <span class="text-lg">Transaction fee </span>
          <span>₦5,000,000 </span>
        </div>

        <div class="flex justify-center">
          <v-btn
            elevation="0"
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
export default {}
</script>

<style></style>
