<template>
  <div class="signup">
    <div v-if="!registering" class="signup__form bg-white md:shadow rounded-md">
      <router-link to="/" v-if="!registering">
        <img class="logo" src="/images/logo.png" alt="" />
      </router-link>
      <span
        v-if="!registering"
        class="block text-center font-bold mt-1 text-2xl"
        >Register Account</span
      >
      <div>
        <span
          class="text-light-dark mb-2 block text-center tracking-wider text-lg"
          >Get your free Rana account now.</span
        >

        <v-progress-linear
          :value="progress"
          color="primary"
        ></v-progress-linear>
        <div class="sm:flex my-2 text-sm hidden justify-between">
          <span :class="{ 'font-semibold': el == 0, 'text-gray-500': el != 0 }"
            >User Details</span
          >
          <span :class="{ 'font-semibold': el == 1, 'text-gray-500': el != 1 }"
            >Next of Kin</span
          >
          <span :class="{ 'font-semibold': el == 2, 'text-gray-500': el != 2 }"
            >Bank details</span
          >
        </div>
      </div>

      <keep-alive>
        <component
          :is="current"
          :current="el"
          @move="current = steps[$event]"
          v-model="form"
          @register="RESGISTER"
        />
      </keep-alive>

      <div class="text-center">
        Already have an account ? <router-link to="/login">Sign in</router-link>
      </div>
    </div>

    <v-progress-circular indeterminate color="primary" v-else />
  </div>
</template>

<script>
import BankDetailsForm from '~/components/views/signup/bank-details-form.vue'
import NextOfKinForm from '~/components/views/signup/next-of-kin-form.vue'
import PasswordForm from '~/components/views/signup/password-form.vue'
import userDetailsForm from '~/components/views/signup/user-details-form.vue'
export default {
  components: {
    user: userDetailsForm,
    kin: NextOfKinForm,
    bank: BankDetailsForm,
    password: PasswordForm,
  },

  layout: 'auth',
  data() {
    return {
      steps: ['user', 'kin', 'bank', 'password'],
      form: {},
      registering: false,
      progress: 0,
      current: 'user',
    }
  },
  methods: {
    async RESGISTER() {
      this.registering = true

      try {
        const { data } = await this.$API.user.register(this.form)
         
                          localStorage.setItem('token', data?.token)

        this.$store.dispatch('user/setUser', data.data)


        this.$store.dispatch('alert/setAlert', {
          message: 'Account created successfully',
          color: 'success',
        })

        this.$router.replace('/verify-email/?email=' + data?.data?.email)
      } catch (err) {
        this.$store.dispatch('alert/setAlert', {
          message: err.msg,
          color: 'error',
        })
      } finally {
        this.registering = false
      }
    },
  },

  computed: {
    el() {
      return this.steps.indexOf(this.current)
    },
  },
  watch: {
    el(el) {
      if (el == 0) {
        this.progress = 0
      } else if (el == 1) {
        this.progress = 33.33333
      } else if (el == 2) {
        this.progress = 33.33333 * 2
      } else if (el == 3) {
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
