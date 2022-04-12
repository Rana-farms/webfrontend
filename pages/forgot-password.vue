<template>
  <div class="login">
    <div
      class="login__form bg-white md:shadow rounded-md"
      v-if="!isSendingLink"
    >
      <router-link to="/">
        <img class="logo" src="/images/logo.png" alt="" />
      </router-link>
      <span class="block text-center font-bold mt-2 text-3xl"
        >Forgot Password!</span
      >
      <span class="text-light-dark block text-center tracking-wider text-lg"
        >Enter the email associated with your account and we will send an email
        with instructions to reset your password.</span
      >

      <div class="mt-4 flex flex-col gap-5">
        <v-text-field
          v-model="data.email"
          ref="email"
          name="Email"
          label="Email"
          outlined
          hide-details="auto"
          :rules="rules.email"
        ></v-text-field>
      </div>

      <v-btn
        color="primary"
        @click="SENDLINK"
        :loading="isSendingLink"
        class="my-3"
        elevation="0"
        large
        block
        >RESET</v-btn
      >

      <div class="text-center text-sm">
        Remembered login details ? <router-link to="/login">login</router-link>
      </div>
    </div>

    <v-progress-circular indeterminate color="primary" v-else />
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      show: false,
      data: {
        email: '',
      },
      rules: {
        email: [(v) => !!v || 'Email is required'],
      },
      isSendingLink: false,
    }
  },
  methods: {
    async SENDLINK() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canLogin) {
        this.isSendingLink = true
        try {
          const { data } = await this.$API.user.forgotPassword({
            email: this.data.email,
            url: window.location.origin,
          })

          this.$store.dispatch('alert/setAlert', {
            message:
              data?.message || 'A reset link has been sent to your email',
            color: 'success',
          })
        } catch (err) {
          this.$store.dispatch('alert/setAlert', {
            message: err.msg,
            color: 'error',
          })
        } finally {
          this.isSendingLink = false
        }
      }
    },
  },

  computed: {
    form() {
      return {
        email: this.data.email,
      }
    },

    canLogin() {
      const rules = Object.keys(this.rules)

      return rules
        .map((rule) => {
          return Object.keys(this.rules[rule])
            .map((field, index) => {
              return this.rules[rule][index](this.form[rule])
            })
            .every((val) => val == true)
        })
        .every((val) => val == true)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';

.login {
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
      padding: 50px;

      height: auto;
      width: 500px;
    }

    .logo {
      display: block;
      margin: auto;

      max-width: 100px;

      @include media-breakpoint-up(sm) {
        max-width: 120px;
      }
    }
  }
}
</style>
