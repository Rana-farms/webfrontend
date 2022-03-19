<template>
  <div class="page">
    <div class="hero">
      <div class="hero__cover">
        <div class="md:text-4xl lg:text-6xl text-2xl lg:text-dark text-white">
          Intelligence in Agricultural service & investment
        </div>
        <div
          class="mt-5 text-white lg:text-light-dark leading-6 md:leading-7 md:text-2xl"
        >
          Employing business analytics to deliver value to our customers across
          the agricultural value chain
        </div>

        <v-btn
          color="primary"
          to="/signup"
          class="mt-10 md:mt-20"
          elevation="0"
          large
          >Get Started</v-btn
        >
      </div>
    </div>

    <div class="md:px-8 bg-white">
      <div
        class="analytics px-5 items-center justify-center pt-5 gap-5 flex flex-wrap items-center"
      >
        <div class="analytics__box">
          <span class="analytics__box--title">1050 tons</span>
          <span class="analytics__box--text"> Grain supplied</span>
        </div>

        <div class="analytics__box">
          <span class="analytics__box--title">498 Trips</span>
          <span class="analytics__box--text"> Agricultural logistics</span>
        </div>

        <div class="analytics__box">
          <span class="analytics__box--title">N250M+</span>
          <span class="analytics__box--text"> Trading Volume</span>
        </div>

        <div class="analytics__box">
          <span class="analytics__box--title">100%+</span>
          <span class="analytics__box--text"> 100%</span>
        </div>
      </div>

      <div
        class="invest flex-col md:flex-row md:text-left px-10 lg:p-14 gap-10 lg:gap-20"
      >
        <img
          class="invest__image"
          src="/images/pages/index/invest.png"
          alt=""
        />
        <div class="invest__box">
          <span
            class="font-bold text-2xl md:text-3xl lg:text-5xl block text-black"
            >Investing in sustainable agriculture
          </span>

          <span class="block my-5 text-light-dark"
            >Helping farmers improve food security, while derisking
            agribusiness.</span
          >

          <v-btn
            color="primary"
            elevation="0"
            to="/signup"
            style="border-radius: 8px"
            large
            >Get started</v-btn
          >
        </div>
      </div>

      <partners />
      <posts />
    </div>
    <!-- <faqs /> -->
  </div>
</template>

<script>
import partners from '@/components/views/partners.vue'
import posts from '@/components/views/posts.vue'
import faqs from '@/components/views/faqs.vue'

export default {
  components: {
    partners,
    posts,
    faqs,
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';
.page {
  min-height: 100vh;
  width: 100%;

  .hero {
    height: 50vh;
    width: 100vw;
    overflow: hidden;
    background-image: url('/images/pages/index/cover.png');
    background-size: cover;
    background-position: center;
    @include media-breakpoint-up(md) {
      height: 70vh;
    }

    @include media-breakpoint-up(lg) {
      height: 75vh;
    }

    &__cover {
      padding: 40px 25px;
      height: 100%;
      width: 100vw;
      background-color: #0d0d0d65;
      text-align: center;

      @include media-breakpoint-up(sm) {
        text-align: left;
        padding: 100px 40px;
      }

      @include media-breakpoint-up(md) {
        background-color: transparent;
        padding: 120px 40px;
      }

      @include media-breakpoint-up(lg) {
        padding: 60px 40px;
      }

      div {
        max-width: 100%;

        @include media-breakpoint-up(sm) {
          max-width: 55%;
        }

        @include media-breakpoint-up(lg) {
          max-width: 50%;
        }
      }
    }
  }

  .analytics {
    text-align: center;

    &__box {
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      display: inline-block;
      min-width: 200px;
      padding: 15px;
      text-align: center;
      margin: 20px auto;

      @include media-breakpoint-up(md) {
        padding: 15px 40px;
        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
      }

      &--title {
        font-weight: 600;
        font-size: 25px;
        color: $primary;
        display: block;

        @include media-breakpoint-up(md) {
          font-weight: 700;
          font-size: 36px;
        }
      }
    }
  }

  .invest {
    display: flex;

    &__image {
      width: 100%;
      height: auto;
      order: 2;

      @include media-breakpoint-up(sm) {
        width: 40%;
        order: 1;
      }
    }
    &__box {
      flex: 1 1 0%;
      order: 1;
      text-align: center;

      @include media-breakpoint-up(sm) {
        order: 2;
        text-align: left;
      }
    }
  }
}
</style>
