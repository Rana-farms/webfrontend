<template>
  <div class="login">
    <div class="login__form bg-white md:shadow rounded-md" v-if="!isLogining">
      <router-link to="/">
        <img class="logo" src="/images/logo.png" alt="" />
      </router-link>
      <span class="block text-center font-bold mt-2 text-3xl"
        >Welcome Back !</span
      >
      <span class="text-light-dark block text-center tracking-wider text-lg"
        >Sign in to continue to Rana</span
      >

      <div class="mt-4 flex flex-col gap-5">
        <v-text-field
          v-model="form.email"
          ref="email"
          name="Email"
          label="Email"
          outlined
          hide-details="auto"
          :rules="rules.email"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          ref="password"
          name="password"
          label="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          outlined
          hide-details="auto"
          :rules="rules.password"
        ></v-text-field>
      </div>
      <div class="flex justify-end">
        <a href="/forgot-password" class="cursor-pointer border-none"
          >Forgot password ?</a
        >
      </div>

      <v-btn
        color="primary"
        @click="LOGIN"
        :loading="isLogining"
        class="my-3"
        elevation="0"
        large
        block
        >Login</v-btn
      >

      <div class="text-center text-sm">
        Don't have an account ? <router-link to="/signup">Sign up</router-link>
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
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
        password: [
          (v) => !!v || 'Password is required',
          //  (v) => v.length >= 6 || 'Password must be at least 6 characters',
        ],
      },
      isLogining: false,
    }
  },

  methods: {
    async LOGIN() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canLogin) {
        this.isLogining = true
        try {
          const { data } = await this.$API.user.login(this.form)
          localStorage.setItem('token', data?.token)


          const details = await this.$API.user.fetchDetails()
          this.$store.dispatch('user/setUser', details.data)
          this.$router.replace('/dashboard')

        } catch (err) {
          this.$store.dispatch('alert/setAlert', {
            message: err.msg,
            color: 'error',
          })

          if (err.msg == 'Your email address is not verified.') {
            this.$router.replace('/verify-email/?email=' + this.form.email)
          }
        } finally {
          this.isLogining = false
        }
      }
    },
  },

  computed: {
    form() {
      return {
        email: this.form.email,
        password: this.form.password,
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
