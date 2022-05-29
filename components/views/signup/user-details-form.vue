<template>
  <div class="form">
    <div class="flex flex-col gap-5">
      <v-text-field
        v-model="data.fullname"
        ref="fullname"
        name="Name"
        label="Name"
        outlined
        hide-details="auto"
        :rules="rules.fullname"
      ></v-text-field>

      <v-text-field
        v-model="data.phone"
        ref="phone"
        name="Phone number"
        label="Phone number"
        outlined
        hide-details="auto"
        :rules="rules.phone"
      ></v-text-field>

      <v-text-field
        v-model="data.email"
        ref="email"
        name="Email"
        label="Email"
        type="email"
        outlined
        hide-details="auto"
        :rules="rules.email"
      ></v-text-field>

      <v-text-field
        v-model="data.address"
        ref="address"
        name="Address"
        label="Address"
        outlined
        hide-details="auto"
        :rules="rules.address"
      ></v-text-field>
    </div>

    <v-btn
      color="primary"
      @click="NEXT"
      :loading="isCheckingUser"
      class="my-3"
      elevation="0"
      large
      block
      >Next <v-icon right>mdi-chevron-right</v-icon>
    </v-btn>
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
        fullname: '',
        phone: '',
        email: '',
        address: '',
      },
      isCheckingUser: false,
      rules: {
        fullname: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 20 || 'Name must be less than 20 characters',
        ],
        phone: [
          (v) => !!v || 'Phone is required',
          (v) => /^\d{11}$/.test(v) || 'Phone number must be 11 digits',
        ],
        email: [
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
        address: [(v) => !!v || 'Address is required'],
      },
    }
  },
  methods: {
    async NEXT() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canMoveOn) {
        if (await this.checkUserAlreadyExists()) {
          this.$emit('input', Object.assign({}, this.value, { ...this.data }))
          this.$emit('move', (this.current += 1))
        }
      }
    },

    async checkUserAlreadyExists() {
      try {
        this.isCheckingUser = true
        await this.$API.user.checkUser({
          email: this.data.email,
          phone: this.data.phone,
        })

        return true
      } catch (err) {
        this.$store.dispatch('alert/setAlert', {
          message: err.msg,
          color: 'error',
        })

        return false
      } finally {
        this.isCheckingUser = false
      }
    },
  },

  computed: {
    form() {
      return {
        fullname: this.data.fullname,
        phone: this.data.phone,
        email: this.data.email,
        address: this.data.address,
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

<style lang="scss" scoped></style>
