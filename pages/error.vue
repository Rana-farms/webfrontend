<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="text-center">
      <span class="block font-bold text-2xl text-gray-400 mb-2">An Error Occurred</span>
      <v-btn color="primary" @click="$router.go(-1)" x-large text>
        <v-icon left>mdi-refresh</v-icon> Retry
      </v-btn>
      <div class="mt-2">
        <v-btn color="grey" to="/" icon large>
          <v-icon>mdi-home-variant-outline</v-icon></v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
    layout: 'custom-error',
}
</script>

<style></style>
