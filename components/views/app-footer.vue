<template>
  <div class="footer">
    <div class="sectionx grid grid-cols-12">
      <div class="sectionx__1 col-span-12 lg:col-span-3">
        <div>
          <img src="/images/logo.png" alt="" />
          <span class="call-us">CALL US DIRECTLY</span>
          <a class="phone" href="tel:+234 805 2040 002">+234 805 2040 002</a>
          <a class="email" href="mailto:info@rana.com.ng"
            >info@rana.com.ng</a
          >
        </div>
      </div>

      <div class="sectionx__2 col-span-12 md:col-span-4 lg:col-span-3">
        <span class="title">Company</span>
        <ul>
          <li>
            <router-link to="/about-us" class="text-light-dark"
              >About Us</router-link
            >
          </li>
      

          <li><a href="https://www.hope.com/" target="_blank">Bitcoin</a></li>
        </ul>
      </div>

      <div class="sectionx__3 col-span-12 md:col-span-4 lg:col-span-3">
        <span class="title">Quick links</span>
        <ul>
          
          <li>
            <router-link to="/contact-us" class="text-light-dark"
              >contact us</router-link
            >
          </li>
        </ul>
      </div>

      <div class="sectionx__4 col-span-12 md:col-span-4 lg:col-span-3">
        <span class="title">Our Newsletter</span>
        <span class="subscribe"
          >Subscribe to our newsletter and we will inform you about latest
          updates and offers</span
        >
        <v-text-field
          name="Email Address"
          type="email"
          light
          outlined
          label="Email Address"
          append-icon="mdi-arrow-right"
          hide-details="auto"
          class="mt-5 pa-0 ma-0"
          elevation="0"
        ></v-text-field>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row gap-5 justify-between py-10 items-center"
    >
      <span class="copyright"
        >© {{ new Date().getFullYear() }} Rana Farm Limited. All rights
        reserved.</span
      >

      <div>
        <v-btn icon><v-icon>mdi-facebook</v-icon></v-btn>

        <v-btn icon><v-icon>mdi-instagram</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-twitter</v-icon></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';

.footer {
  width: 100%;
  height: 100px;
  padding: 15px;

  @include media-breakpoint-up(sm) {
    padding: 50px;
  }

  .sectionx {
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
    padding: 20px 0;

    gap: 0;

    &__1 {
      @include media-breakpoint-up(sm) {
        display: flex;
        justify-content: center;
      }

      @include media-breakpoint-up(md) {
        display: flex;
        justify-content: left;
      }

      img {
        display: block;
        margin: 12px 0;
        width: 80px;
        @include media-breakpoint-up(sm) {
          width: 100px;
          margin: 0;
        }
      }

      .call-us {
        color: #888888;
        margin: 0px 0px;
        display: block;

        @include media-breakpoint-up(md) {
          margin: 8px 0px;
        }
      }

      .phone {
        color: #0d0d0d;
        font-size: 18px;
        line-height: 34px;
        @include media-breakpoint-up(md) {
          font-size: 20px;
        }
      }

      .email {
        color: #0d0d0d;
        font-size: 19px;
        line-height: 22.8px;
        display: block;
        margin: 5px 0px;
        @include media-breakpoint-up(md) {
          margin: 10px 0px;
        }
      }
    }

    &__2,
    &__3,
    &__4 {
      margin-top: 20px;
      @include media-breakpoint-up(md) {
        margin-top: 0px;
      }

      .title {
        font-size: 21px;
        font-weight: bold;
        display: block;
        line-height: 22.8px;
        color: #0d0d0d;
        margin-bottom: 10px;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: block;

        li,
        .subscribe {
          font-size: 16px;
          line-height: 22.8px;
          color: #3d3d3d;
          display: block;
          margin-bottom: 10px;
        }
      }
    }
  }

  .copyright {
    font-size: 15px;
    color: #0d0d0d;
  }
}
</style>
