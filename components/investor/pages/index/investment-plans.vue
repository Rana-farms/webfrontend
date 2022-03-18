<template>
  <div class="bg-white p-5 shadow rounded-md">
    <span class="block font-semibold text-xl mb-2">Investments Plans</span>

    <div class="flex mb-1 justify-between font-semibold">
      <span>Agricultural Commodity Trust </span>
      <span>15,000 people</span>
    </div>
    <v-progress-linear value="60" rounded height="8"></v-progress-linear>

    <div class="flex mb-1 mt-8 justify-between font-semibold">
      <span>Agricultural Logistics Trust </span>
      <span>8,000 people</span>
    </div>
    <v-progress-linear value="60" rounded height="8"></v-progress-linear>

    <div class="flex mb-1 mt-8 justify-between font-semibold">
      <span>Agricultural Storage Trust </span>
      <span>10,000 people</span>
    </div>
    <v-progress-linear value="60" rounded height="8"></v-progress-linear>

    <div class="mt-12">
      <span class="font-semibold block mb-2 text-lg"
        >Documentation & record</span
      >
      <div class="flex flex-wrap gap-3">
        <div class="flex flex-col gap-1 w-full md:w-2/5">
          <span class="text-primary block font-semibold">March 2022</span>
          <span class="text-gray-600 block">Monthly Report</span>
          <span class="text-gray-600 block">Order Note</span>
          <span class="text-gray-600 block">Delivery Note</span>

          <span class="text-gray-600 block">Waybill</span>

          <v-btn color="primary" elevation="0">DOWNLOAD</v-btn>
        </div>

        <div class="flex flex-col gap-1" style="width: 45%">
          <span class="text-primary block font-semibold">March 2022</span>
          <span class="text-gray-600 block">Monthly Report</span>
          <span class="text-gray-600 block">Order Note</span>
          <span class="text-gray-600 block">Delivery Note</span>

          <span class="text-gray-600 block">Waybill</span>

          <v-btn color="primary" elevation="0">DOWNLOAD</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style></style>
