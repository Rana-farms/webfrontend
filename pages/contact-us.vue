<template>
  <div class="page">
    <div class="hero">
      <div
        class="hero__cover flex items-center justify-start p-5 sm:p-10 md:p-20"
      >
        <div>
          <span class="block md:text-left text-white font-bold text-4xl mb-2"
            >Contact us</span
          >
          <span class="block md:text-left" style="color: #e2e0ef"
            >We are committed to providing our customers with exceptional
            service.</span
          >
        </div>
      </div>
    </div>

    <div class="p-5 md:p-20 flex flex-col lg:flex-row gap-10">
      <div class="max-w-sm">
        <span class="font-bold text-3xl block">Get in Touch with Us</span>
        <span class="hidden md:block my-2 mb-4 text-gray-500"
          >We are committed to providing our customers with exceptional
          service.</span
        >

        <div class="flex items-center mt-4">
          <v-icon>mdi-map-marker-outline</v-icon>
          <span class="text-dark ml-2">
            <span class="font-semibold block w">Address:</span>
            <span class="text-gray-500 w-64 block"
              >2 Adewale Taiwo Olajide Close, off Niyi Okunubi.</span
            >
          </span>
        </div>

        <div class="flex items-center mt-3">
          <v-icon>mdi-email-outline</v-icon>
          <span class="text-dark ml-2">
            <span class="font-semibold block w">Email:</span>
            <span class="text-gray-500 w-64 block">hello@ranafarms.com</span>
          </span>
        </div>

        <div class="flex items-center mt-3">
          <v-icon>mdi-phone-outline</v-icon>
          <span class="text-dark ml-2">
            <span class="font-semibold block w">Phone:</span>
            <span class="text-gray-500 w-64 block">+234 709 5854 795</span>
          </span>
        </div>
      </div>

      <div class="flex-1 grid grid-cols-12 gap-5">
        <v-text-field
          name="Name"
          label="Name"
          class="col-span-12 md:col-span-6 p-0 m-0"
          hide-details="auto"
          outlined
        ></v-text-field>

        <v-text-field
          name="Email"
          label="Email"
          type="email"
          class="col-span-12 md:col-span-6 p-0 m-0"
          hide-details="auto"
          outlined
        ></v-text-field>

        <v-text-field
          name="Phone number"
          label="Phone number"
          class="col-span-12 p-0 m-0"
          hide-details="auto"
          outlined
        ></v-text-field>

        <v-text-field
          name="Subject"
          label="Subject"
          class="col-span-12 p-0 m-0"
          hide-details="auto"
          outlined
        ></v-text-field>

        <v-textarea
          name="Write your Message"
          label="Write your Message"
          class="col-span-12 p-0 m-0"
          hide-details="auto"
          outlined
        >
        </v-textarea>

        <div class="col-span-12">
          <v-btn color="primary" large elevation="0">Send a message</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';
.page {
  min-height: 100vh;
  width: 100%;

  .hero {
    height: 40vh;
    background-image: url('/images/pages/contact-us/cover.png');
    background-size: cover;
    background-position: center;

    @include media-breakpoint-up(sm) {
      height: 30vh;
    }

    @include media-breakpoint-up(md) {
      height: 50vh;
    }

    &__cover {
      height: 100%;
      width: 100vw;
      background-color: #0d0d0d65;
    }
  }
}
</style>
