<template>
  <div class="signup">
    <div class="signup__form bg-white md:shadow rounded-md">
      <span class="block text-center font-bold mt-3 text-2xl"
        >Verify your email</span
      >
      <span class="block py-3 text-center font-semibold"
        >Enter code sent to your email ({{ $route.query.email }})</span
      >
      <div class="flex items-center gap-3 mt-md-3">
        <v-otp-input
          ref="otpInput"
          separator=""
          input-classes="otp-input"
          :num-inputs="6"
          :should-auto-focus="true"
          :is-input-num="true"
          @on-complete="verifyEmailCode"
        />

        <v-progress-circular
          v-if="isCheckingEmailCode"
          indeterminate
          color="green"
        ></v-progress-circular>
      </div>
      <v-btn
        @click="resendVerificationCode"
        :loading="resendingVerificationCode"
        text
        style="padding: 10px 0px"
        color="#13B56A"
        >Resend Code</v-btn
      >
    </div>
  </div>
</template>

<script>
import OtpInput from '@bachdgvn/vue-otp-input'
import { mapGetters } from 'vuex'

export default {
  layout: 'auth',
  components: {
    'v-otp-input': OtpInput,
  },
  data() {
    return {
      isCheckingEmailCode: false,
      resendingVerificationCode: false,
    }
  },
  methods: {
    async verifyEmailCode(code) {
      try {
        this.isCheckingEmailCode = true
        const { data } = await this.$API.user.verifyEmail({
          email: this.$route.query.email,
          code: code,
        })

        this.$store.dispatch('alert/setAlert', {
          message: 'Email verified successfully',
          color: 'success',
        })

        if (this.isLoggedIn) {
          this.redirect()
        } else {
          this.$router.replace('/login')
        }
      } catch (err) {
        this.$store.dispatch('alert/setAlert', {
          message: err.msg,
          color: 'error',
        })
      } finally {
        this.isCheckingEmailCode = false
      }
    },

    resendVerificationCode() {
      this.resendingVerificationCode = true
      this.$API.user
        .resendVerificationCode({
          email: this.$route.query.email,
        })
        .then(() => {
          this.$store.dispatch('alert/setAlert', {
            message: 'Code sent successfully',
            color: 'success',
          })
        })
        .catch((err) => {
          this.$store.dispatch('alert/setAlert', {
            message: err.msg,
            color: 'error',
          })
        })
        .finally(() => {
          this.resendingVerificationCode = false
        })
    },

    redirect() {
      if (this.isInvestor) {
        this.$router.replace('/investor')
      } else if (this.isAdmin || this.isSuperAdmin) {
        this.$router.replace('/admin')
      }
    },
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      isAdmin: 'user/isAdmin',
      isSuperAdmin: 'user/isSuperAdmin',
      isInvestor: 'user/isInvestor',
    }),
  },
}
</script>
<style lang="scss">
@import '~assets/scss/breakpoints.scss';

.signup {
  background-color: #fff;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @include media-breakpoint-up(sm) {
    background-color: #e5e5e5;
  }

  &__form {
    padding: 20px;
    width: 100%;
    height: auto;
    max-height: 100vh;
    overflow: auto;

    @include media-breakpoint-up(sm) {
      padding: 20px 40px;

      height: auto;
      width: auto;
      max-width: 550px;
    }
  }

  .otp-input {
    width: 45px;
    height: 45px;
    margin-right: 8px;
    border-radius: 6px;
    font-size: 20px;
    outline-style: none;
    border: 1px solid #92959e;
    text-align: center;
    &.error {
      border: 1px solid red !important;
    }

    @media screen and (min-width: 600px) {
      width: 55px;
      height: 55px;
      margin-right: 15px;
    }
  }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
