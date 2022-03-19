<template>
  <div>
    <span class="font-semibold text-xl block mb-5" style="color: #211a55"
      >Bank Settings</span
    >
    <div class="mb-10">
      <v-select
        block
        placeholder="Select Bank"
        label="Bank Name"
        class="mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-select>

      <v-text-field
        block
        placeholder="Enter your account number"
        label="Account Number"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>

      <v-text-field
        block
        placeholder="Enter your account name"
        label="Account Name"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>

      <div class="flex justify-end">
        <v-btn elevation="0" color="primary" large>Save Changes</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
