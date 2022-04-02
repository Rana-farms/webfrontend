<template>
  <div class="signup">
    <div class="signup__form bg-white md:shadow rounded-md">
      <router-link to="/" v-if="!registering">
        <img class="logo" src="/images/logo.png" alt="" />
      </router-link>
      <span
        v-if="!registering"
        class="block text-center font-bold mt-1 text-2xl"
        >Register Account</span
      >
      <div v-if="!registering">
        <span
          class="text-light-dark mb-2 block text-center tracking-wider text-lg"
          >Get your free Rana account now.</span
        >

        <v-progress-linear
          :value="progress"
          color="primary"
        ></v-progress-linear>
        <div class="sm:flex my-2 text-sm hidden justify-between">
          <span :class="{ 'font-semibold': el == 1, 'text-gray-500': el != 1 }"
            >User Details</span
          >
          <span :class="{ 'font-semibold': el == 2, 'text-gray-500': el != 2 }"
            >Next of Kin</span
          >
          <span :class="{ 'font-semibold': el == 3, 'text-gray-500': el != 3 }"
            >Bank details</span
          >
          <!-- <span :class="{ 'font-semibold': el == 4, 'text-gray-500': el != 4 }"
          >Investment trust</span
        > -->
        </div>
      </div>

      <user-details-form @next="setUpUserDetails" v-if="el == 1" />
      <next-of-kin-form @next="setUpNextOfKin" @back="el -= 1" v-if="el == 2" />
       
      <bank-details-form
        @complete="setUpBankDetails"
        @back="el -= 1"
        v-if="el == 3"
      />
      <password-form  @back="el -= 1"  @complete="setUpPassword" v-if="el == 4" />
      <!-- <investment-trust-form @complete="setUpInvestmentTrust" @back="el -=1"  v-if="el == 4" /> -->

      <div v-if="registering" class="flex text-center justify-center p-10">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>

      <div class="text-center" v-if="!registering">
        Already have an account ? <router-link to="/login">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BankDetailsForm from '~/components/views/signup/bank-details-form.vue'
import InvestmentTrustForm from '~/components/views/signup/investment-trust-form.vue'
import NextOfKinForm from '~/components/views/signup/next-of-kin-form.vue'
import PasswordForm from '~/components/views/signup/password-form.vue'
import userDetailsForm from '~/components/views/signup/user-details-form.vue'
export default {
  components: {
    userDetailsForm,
    NextOfKinForm,
    BankDetailsForm,
    InvestmentTrustForm,
    PasswordForm,
  },
  layout: 'auth',
  data() {
    return {
      el: 3,
      form: {},
      registering: false,
      progress: 0,
    }
  },
  methods: {
    setUpUserDetails(data) {
      this.el++
      this.form = Object.assign({}, this.form, { ...data })
    },

    setUpNextOfKin(data) {
      this.el++
      this.form = Object.assign({}, this.form, { ...data })
    },

    setUpBankDetails(data) {

      if(data.bank_id == '057'){
        data.bank_id = [057][0]
      }else{
        data.bank_id = Number(data.bank_id)
      }

      this.form = Object.assign({}, this.form, {...data  })
      this.el++
    },

    setUpPassword(data){
      this.form = Object.assign({}, this.form, { ...data })
      this.RESGISTER()
    },
  


   async RESGISTER() {
              this.registering = true

      try {
        const registeration = await this.$API.auth.register(this.form)
        console.log(JSON.stringify(registeration, null, 2))
      } catch (err) {
        console.log(JSON.stringify(err, null, 2))
      } finally {
        this.registering = false
      }
    },
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log(JSON.stringify(val, null, 2))
      },
    },
    el(val) {
      if (val == 1) {
        this.progress = 0
      } else if (val == 2) {
        this.progress = 33.33333
      } else if (val == 3) {
        this.progress = 33.33333 * 2
      }else if(val == 4){
        this.progress = 33.33333 * 3
      }

     
    },
  },
}
</script>

<style lang="scss" scoped>
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
      width: 500px;
    }

    .logo {
      display: block;
      margin: auto;

      max-width: 100px;

      @include media-breakpoint-up(sm) {
        max-width: 90px;
      }
    }
  }
}
</style>
