<template>
  <div class="form">
    <div class="flex flex-col gap-5">
      <v-text-field
        v-model="data.name"
        ref="name"
        name="Name of Trust"
        label="Name of Trust"
        outlined
        hide-details="auto"
        :rules="rules.name"
      ></v-text-field>

      <v-text-field
        v-model="data.amount"
        ref="amount"
        name="Amount"
        label="Amount"
        type="number"
        outlined
        hide-details="auto"
        :rules="rules.amount"
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
        @click="REGISTER"
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
  data() {
    return {
      show: false,
      data: {
        name: '',
        amount: '',
      },
      rules: {
        name: [
          (v) => !!v || 'Name of Trust is required',
          (v) => v.length <= 20 || 'Name must be less than 20 characters',
        ],
        amount: [
          (v) => !!v || 'Amount is required',
          // v => v.length <= 20 || 'Phone must be less than 20 characters',
        ],
      },
    }
  },
  methods: {
    REGISTER() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canMoveOn) {
        this.$emit('complete', this.data)
      }
    },
  },

  computed: {
    form() {
      return {
        name: this.data.name,
        amount: this.data.amount,
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
