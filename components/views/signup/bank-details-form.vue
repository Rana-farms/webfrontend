<template>
  <div class="form">
    <div class=" flex flex-col gap-5">
      <v-text-field
        v-model="data.bank"
        ref="bank"
        name="Bank Name"
        label="Bank Name"
        outlined
        hide-details="auto"
        :rules="rules.bank"
      ></v-text-field>

      <v-text-field
        v-model="data.number"
        ref="number"
        name="Account Number"
        label="Account Number"
        type="number"
        outlined
        hide-details="auto"
        :rules="rules.number"
      ></v-text-field>

      <v-text-field
        v-model="data.name"
        ref="name"
        name="Account Name"
        label="Account Name"
        outlined
        hide-details="auto"
        :rules="rules.name"
      ></v-text-field>
    </div>

    <div class="grid grid-cols-12 items-center">
        <v-btn color="primary" @click="$emit('back')" class=" col-span-2" text large > <v-icon>mdi-chevron-left</v-icon></v-btn>
         <v-btn color="primary" @click="NEXT" class="my-3 col-span-10" elevation="0" large 
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
        bank: '',
        number: '',
        name: '',
      },
      rules: {
        bank: [
          (v) => !!v || 'Bank name is required',
          //   v => (v && v.length <= 50) || 'Bank name must be less than 50 characters',
        ],
        number: [
          (v) => !!v || 'Account number is required',
          //   v => (v && v.length <= 50) || 'Account number must be less than 50 characters',
        ],
        name: [
          (v) => !!v || 'Account name is required',
          //   v => (v && v.length <= 50) || 'Account name must be less than 50 characters',
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
        bank: this.data.bank,
        number: this.data.number,
        name: this.data.name,
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
