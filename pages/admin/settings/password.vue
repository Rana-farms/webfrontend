<template>
  <div>
    <span class="font-semibold text-xl block mb-5" style="color: #211a55"
      >Change password</span
    >
    <div class="mb-10">
      <v-text-field
        v-model.trim="data.old_password"
        ref="old_password"
        block
        placeholder="Enter old password"
        label="Old Password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        class="mt-5 mb-8 pa-0"
        :type="show1 ? ' type' : 'password'"
        @click:append="show1 = !show1"
        hide-details="auto"
        :rules="rules.password"
        outlined
      ></v-text-field>

      <v-text-field
        v-model.trim="data.password"
        ref="password"
        block
        placeholder="Enter new password"
        label="New password"
        class="mt-5 mb-8 pa-0"
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
        class="mt-5 mb-8 pa-0"
        @click:append="show2 = !show2"
        label="Confirm new password"
        :rules="rules.password_confirmation"
        hide-details="auto"
        outlined
      ></v-text-field>

      <div class="flex justify-end">
        <v-btn
          elevation="0"
          color="primary"
          :disabled="!canMoveOn"
          :loading="isChangingPassword"
          @click="sendPassword"
          large
          >Update password</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChangingPassword: false,
      data: {
        old_password: '',
        password: '',
        password_confirmation: '',
      },
      show1: false,
      show2: false,
      rules: {
        old_password: [(v) => !!v || 'Old password is required'],

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
  methods: {
    async sendPassword() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canMoveOn) {
        try {
          this.isChangingPassword = true
          const req = await this.$API.user.changePassword(this.data)

          this.$store.dispatch('alert/setAlert', {
            message: req.data.message || 'Password changed successfully',
            color: 'success',
          })

          // empty the values in the form

          this.data = {
            old_password: '',
            password: '',
            password_confirmation: '',
          }
        } catch (err) {
          this.$store.dispatch('alert/setAlert', {
            message: err.msg,
            color: 'error',
          })
        } finally {
          this.isChangingPassword = false
        }
      }
    },
  },
  computed: {
    form() {
      return {
        old_password: this.data.old_password,
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

<style></style>
