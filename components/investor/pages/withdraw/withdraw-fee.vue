<template>
  <div class="bg-white p-5 md:px-10 rounded-md shadow-md mt-10 w-full max-w-xl">
    <div>
      <span class="block text-center font-semibold text-xl">Withdraw</span>

      <div class="block mt-10 w-full">
        <v-text-field
          placeholder="Enter amount"
          label="Enter amount"
          v-model="amount"
          type="number"
          class="mb-0 pa-0"
          hide-details="auto"
          outlined
          block
        ></v-text-field>

        <div class="block font-semibold" v-if="transactionFee > 0">
          Transaction fee - {{ transactionFee }} <span> </span>
        </div>

        <v-text-field
          block
          placeholder="Enter password"
          label="Enter password"
          class="mt-5 mb-8 pa-0"
          hide-details="auto"
          outlined
        ></v-text-field>

        <v-btn elevation="0" @click="next" color="primary" block large
          >Withdraw</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: '',
      password: '',
      transactionPercent: 1.5,
    }
  },
  methods: {
    next() {
      this.$emit('fee', {
        amount: this.amount,
        transactionFee: this.transactionFee,
      })
    },
  },
  computed: {
    transactionFee() {
      //calc percentage of amount with transactionPercent

      return (this.transactionPercent / 100) * this.amount
    },

    finalAmount() {
      return this.amount + this.transactionFee
    },
  },
}
</script>

<style></style>
