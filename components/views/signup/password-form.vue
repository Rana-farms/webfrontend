<template>
  <div class="form">
    <div class="flex flex-col gap-5">
      <v-text-field
        v-model.trim="data.password"
        ref="password"
        block
        placeholder="Enter password"
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
        placeholder="Confirm password"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? ' type' : 'password'"
        @click:append="show2 = !show2"
        label="Confirm Password"
        :rules="rules.password_confirmation"
        hide-details="auto"
        outlined
      ></v-text-field>
    </div>
    <div class="grid grid-cols-12 items-center">
      <v-btn
        color="primary"
        @click="$emit('move', (current -= 1))"
        class="col-span-2"
        text
        large
      >
        <v-icon>mdi-chevron-left</v-icon></v-btn
      >
      <v-btn
        color="primary"
        @click="sendPassword"
        class="my-3 col-span-10"
        elevation="0"
        large
        >SIGN UP
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0,
    },
    value: {
      type: Object,
      default: '',
    },
  },

  data() {
    return {
      show: false,
      data: {
        password: '',
        password_confirmation: '',
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

  methods: {
    sendPassword() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canMoveOn) {
        this.$emit('input', Object.assign({}, this.value, { ...{password:this.data.password} }))
        this.$emit('register')
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

<style></style>
