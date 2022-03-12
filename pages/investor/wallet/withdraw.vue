<template>
  <div class="page">
    <div
      class="bg-white p-5 md:px-10 rounded-md shadow-md mt-10 w-full max-w-xl"
    >
      <div>
        <span class="block text-center font-semibold text-xl">Withdraw</span>

        <div class="block mt-10 w-full">
          <v-text-field
            placeholder="Enter amount"
            label="Enter amount"
            class="mb-0 pa-0"
            hide-details="auto"
            outlined
            block
          ></v-text-field>

          <v-text-field
            block
            placeholder="Enter password"
            label="Enter password"
            class="mt-5 mb-8 pa-0"
            hide-details="auto"
            outlined
          ></v-text-field>

          <v-btn elevation="0" color="primary" block large>Withdraw</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'investor',
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';

.page {
  min-height: 100%;
  padding: 10px;

  @include media-breakpoint-up(sm) {
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
