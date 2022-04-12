<template>
  <div class="login">
    <div v-if="!isReseting" class="login__form bg-white md:shadow rounded-md">
      <router-link to="/">
        <img class="logo" src="/images/logo.png" alt="" />
      </router-link>
      <span class="block text-center font-bold mt-2 text-3xl"
        >Reset Password!</span
      >
      <span class="text-light-dark block text-center tracking-wider text-lg"
        >Enter your new password!</span
      >
      <div class="flex flex-col mt-5 gap-5">
        <v-text-field
          v-model.trim="data.password"
          ref="password"
          block
          placeholder="Enter new password"
          label=" Password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? ' type' : 'password'"
          @click:append="show1 = !show1"
          hide-details="auto"
          :rules="rules.password"
          outlined
        ></v-text-field>

        <v-text-field
          v-model.trim="data.password_confirmation"
          block
          ref="password_confirmation"
          placeholder="Confirm new password"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? ' type' : 'password'"
          @click:append="show2 = !show2"
          label="Confirm Password"
          :rules="rules.password_confirmation"
          hide-details="auto"
          outlined
        ></v-text-field>
      </div>

      <v-btn
        color="primary"
        @click="RESET_PASSWORD"
        class="my-3"
        elevation="0"
        large
        block
        >RESET</v-btn
      >
    </div>

    <v-progress-circular indeterminate color="primary" v-else />
  </div>
</template>

<script>
export default {
  layout: 'auth',

  data() {
    return {
      isReseting: false,
      data: {
        password: '',
        password_confirmation: '',
        token: this.$route.query.token,
      },
      show1: false,
      show2: false,
      rules: {
        password: [
          (v) => !!v || 'Password is required',
          (v) =>
            (v && v.length >= 6) || 'Password must be at least 6 characters',
        ],
        password_confirmation: [
          (v) => !!v || 'Confirm password is required',
          (v) => v === this.data.password || 'Passwords must match',
        ],
      },
    }
  },

  mounted() {
    if (!this.$route.query.token) {
      this.$router.push('/login')
    }

    // console.log(this.$route.query.token)
  },

  methods: {
  async  RESET_PASSWORD() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canMoveOn) {
        this.isReseting = true
        try {
          const { data } = await this.$API.user.resetPassword(this.data)

          this.$store.dispatch('alert/setAlert', {
            message:
              data?.message || 'New password has been set, you can now login',
            color: 'success',
          })

          this.$router.push('/login')
        } catch (err) {
          this.$store.dispatch('alert/setAlert', {
            message: err.msg,
            color: 'error',
          })
        } finally {
          this.isReseting = false
        }
      }
    },
  },
  computed: {
    form() {
      return {
        password: this.data.password,
        password_confirmation: this.data.password_confirmation,
      }
    },

    canMoveOn() {
      const rules = Object.keys(this.rules)

      return rules
        .map((rule) => {
          return Object.keys(this.rules[rule])
            .map((field, index) => {
              return this.rules[rule][index](this.data[rule])
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
