<template>
  <div>
    <span class="font-semibold text-xl block mb-5" style="color: #211a55"
      >Change password</span
    >
    <div class="mb-10">
      <v-text-field
        block
        placeholder="Enter your old password"
        label="Old Password"
        class="mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>

      <v-text-field
        block
        placeholder="Enter your new password"
        label="New Password"
        type="password"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>

      <v-text-field
        block
        placeholder="Confirm your new password"
        label="Confirm Password"
        type="password"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>


         <div class="flex justify-end">
        <v-btn elevation="0" color="primary" large>Update password</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
