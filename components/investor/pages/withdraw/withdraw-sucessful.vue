<template>
  <div class="bg-white p-5 md:px-10 rounded-md shadow-md mt-10 w-full max-w-md">
    <div>
      <span
        class="w-16 md:w-20 h-16 md:h-20 rounded-full mt-5 mx-auto flex justify-center items-center bg-gray-100"
      >
        <v-icon size="30" color="green">mdi-check</v-icon>
      </span>

      <span class="font-bold block text-center text-xl mt-5 my-2"
        >Withdrawal successful</span
      >

      <span class="text-center block w-4/5 md:w-3/5 mx-auto text-gray-500"
        >Your funds would be credited to your account within 24 hours</span
      >
    </div>

    <div class="flex justify-center">
      <v-btn
        elevation="0"
        style="width: 50%"
        class="mt-10"
        color="primary"
        to="/investor/dashboard"
        large
        >Okay</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
