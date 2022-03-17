<template>
  <div>
    <span class="font-semibold text-xl block mb-5" style="color: #211a55"
      >Profile Settings</span
    >
    <span class="block font-semibold mb-3">Your personal Information</span>
    <div class="mb-10">
      <v-text-field
        block
        placeholder="Enter your name"
        label="Name"
        class="mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>

      <v-text-field
        block
        placeholder="Enter your phone number"
        label="Phone Number"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>

      <v-text-field
        block
        placeholder="Enter your email"
        label="Email Address"
        type="email"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      />

      <v-text-field
        block
        placeholder="Enter your address"
        label="Residential Address"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      />

      <div class="flex justify-end">
        <v-btn elevation="0" color="primary" large>Save Changes</v-btn>
      </div>
    </div>

    <!--  -->

    <span class="block font-semibold mb-3">Next of Kin</span>
    <div class="mb-10">
      <v-text-field
        block
        placeholder="Enter next of kin name"
        label="Name"
        class="mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>

      <v-select
        block
        placeholder="Select relationship"
        label="Relationship"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-select>

      <v-text-field
        block
        placeholder="Enter your phone number"
        label="Phone Number"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>

      <v-text-field
        block
        placeholder="Enter your address"
        label="Residential Address"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      />

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
