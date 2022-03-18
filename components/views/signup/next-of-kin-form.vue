<<<<<<< HEAD
<template>
  <div class="form">
    <div class="flex flex-col gap-5">
      <v-text-field
        v-model="data.name"
        ref="name"
        name="Name"
        label="Name"
        outlined
        hide-details="auto"
        :rules="rules.name"
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

    <div class="grid grid-cols-12 items-center">
      <v-btn
        color="primary"
        @click="$emit('back')"
        class="col-span-2"
        text
        large
      >
        <v-icon>mdi-chevron-left</v-icon></v-btn
      >
      <v-btn
        color="primary"
        @click="NEXT"
        class="my-3 col-span-10"
        elevation="0"
        large
        >Next <v-icon right>mdi-chveron-right</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      data: {
        name: '',
        phone: '',
        email: '',
        address: '',
      },
      rules: {
        name: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 20 || 'Name must be less than 20 characters',
        ],
        phone: [
          (v) => !!v || 'Phone is required',
          // v => v.length <= 20 || 'Phone must be less than 20 characters',
        ],
        email: [
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
        address: [
          (v) => !!v || 'Address is required',
          //  v => v.length <= 20 || 'Address must be less than 20 characters',
        ],
      },
    }
  },
  methods: {
    NEXT() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canMoveOn) {
        this.$emit('next', this.data)
      }
    },
  },

  computed: {
    form() {
      return {
        name: this.data.name,
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
=======
<template>
  <div class="form">
    <div class="flex flex-col gap-5">
      <v-text-field
        v-model="data.name"
        ref="name"
        name="Name"
        label="Name"
        outlined
        hide-details="auto"
        :rules="rules.name"
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

    <div class="grid grid-cols-12 items-center">
      <v-btn
        color="primary"
        @click="$emit('back')"
        class="col-span-2"
        text
        large
      >
        <v-icon>mdi-chevron-left</v-icon></v-btn
      >
      <v-btn
        color="primary"
        @click="NEXT"
        class="my-3 col-span-10"
        elevation="0"
        large
        >Next <v-icon right>mdi-chveron-right</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      data: {
        name: '',
        phone: '',
        email: '',
        address: '',
      },
      rules: {
        name: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 20 || 'Name must be less than 20 characters',
        ],
        phone: [
          (v) => !!v || 'Phone is required',
          // v => v.length <= 20 || 'Phone must be less than 20 characters',
        ],
        email: [
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
        address: [
          (v) => !!v || 'Address is required',
          //  v => v.length <= 20 || 'Address must be less than 20 characters',
        ],
      },
    }
  },
  methods: {
    NEXT() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canMoveOn) {
        this.$emit('next', this.data)
      }
    },
  },

  computed: {
    form() {
      return {
        name: this.data.name,
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
>>>>>>> b1a5db2cf54869e1abeecb331a049e0f59481d5b
