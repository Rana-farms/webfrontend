<template>
  <div class="page">
    <div class="mb-5 flex justify-between">
      <span class="font-semibold text-2xl">Documents</span>
      <v-btn color="primary" elevation="0">upload document</v-btn>
    </div>
    <div class="mt-8">
      <div class="flex gap-8 flex-wrap">
        <div
          v-for="doc in 5"
          :key="doc"
          class="shadow-sm cursor-pointer inline-block text-center rounded-md p-5 bg-white"
        >
            <img class="block mx-auto my-3" src="/images/doc-icon.svg"/>
          <span class="mt-1 text-center block ">January monthly report</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';

.page {
  min-height: 100%;
  padding: 10px;

  @include media-breakpoint-up(sm) {
    padding: 30px;
  }
}
</style>
