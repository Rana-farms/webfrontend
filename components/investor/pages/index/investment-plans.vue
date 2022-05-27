<template>
  <div class="bg-white p-5 shadow rounded-md" v-if="plans != null && plans.length > 0">
    <span class="block font-semibold text-xl mb-2">Investments Plans</span>

   <div v-for="(plan,index) in plans" :key="index">
      <div class="flex mb-1 justify-between font-semibold">
      <span>{{plan.name}} </span>
      <span>{{Intl.NumberFormat().format(plan.unitsBought )}} units</span>
    </div>
    <v-progress-linear :value="(plan.unitsBought / 1000000) * 100" rounded height="8"></v-progress-linear>
   </div>
   
    <!-- <div class="mt-12">
      <span class="font-semibold block mb-2 text-lg"
        >Documentation & record</span
      >
      <div class="flex flex-wrap gap-5">
        <div class="flex flex-col gap-1 w-full md:w-2/5">
          <span class="text-primary block font-semibold">March 2022</span>
          <span class="text-gray-600 block">Monthly Report</span>
          <span class="text-gray-600 block">Order Note</span>
          <span class="text-gray-600 block">Delivery Note</span>

          <span class="text-gray-600 block">Waybill</span>

          <v-btn color="primary" outlined elevation="0">DOWNLOAD</v-btn>
        </div>

        <div class="flex flex-col gap-1" style="width: 45%">
          <span class="text-primary block font-semibold">March 2022</span>
          <span class="text-gray-600 block">Monthly Report</span>
          <span class="text-gray-600 block">Order Note</span>
          <span class="text-gray-600 block">Delivery Note</span>

          <span class="text-gray-600 block">Waybill</span>

          <v-btn color="primary"  outlined elevation="0">DOWNLOAD</v-btn>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props:{
    plans:{
      default:null
    }
  },
  data() {
    return {}
  },
}
</script>

<style></style>
