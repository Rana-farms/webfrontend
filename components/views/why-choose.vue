<template>
  <div class="why-choose">
    <div class="why-choose__cover p-5 md:p-14 text-white">
      <span class="text-center block text-xl font-semibold my-2 tracking-wider"
        >WHY CHOOSE US</span
      >

      <div
        class="text-center mx-auto mt-6 mb-16 md:mb-24 max-w-3xl text-3xl md:text-4xl font-bold"
      >
        RANA Farms is trusted by industry leaders in Africa
      </div>

      <div
        class="flex flex-wrap justify-center flex-col sm:flex-row gap-8 md:gap-14 mb-10"
      >
        <div class="text-center tracking-wider">
          <span class="block font-semibold text-3xl md:text-4xl mb-2"
            >1050 tons</span
          >
          <span class="block text-gray-100"> Grain supplied</span>
        </div>

        <div class="text-center tracking-wider">
          <span class="block font-semibold text-3xl md:text-4xl mb-2"
            >498 Trips</span
          >
          <span class="block text-gray-100"> Agricultural logistics</span>
        </div>

        <div class="text-center tracking-wider">
          <span class="block font-semibold text-3xl md:text-4xl mb-2"
            >N200M+</span
          >
          <span class="block text-gray-100"> Trading Volume</span>
        </div>

        <div class="text-center tracking-wider">
          <span class="block font-semibold text-3xl md:text-4xl mb-2"
            >100%+</span
          >
          <span class="block text-gray-100"> Sales Growth</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.why-choose {
  background-image: url('/images/why-choose.jpg');
  background-size: cover;
  background-position: center;

  &__cover {
    height: 100%;
    width: 100vw;
    background-color: #0d0d0d80;
  }
}
</style>
