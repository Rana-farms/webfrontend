<template>
  <div class="page">
    <div
      v-if="step === 1"
      class="bg-white p-5 md:px-10 rounded-md shadow-md mt-10 w-full max-w-xl"
    >
      <div>
        <span class="block text-center font-semibold text-xl"
          >Make Withdrawal</span
        >
        <div class="block mt-10 w-full">
          <v-text-field
            placeholder="Enter amount"
            label="Enter amount"
            v-model="price"
            class="mb-0 pa-0"
            hide-details="auto"
            :hint="`Minimum withdrawal amount is ${formatToNaira(
              this.minimumAmount
            )} and  Maximum Withdrawal amount is ${formatToNaira(
              maximumAmount
            )}`"
            :persistent-hint="!limit"
            outlined
            block
          ></v-text-field>

          <v-text-field
            block
            placeholder="Enter password"
            label="Enter password"
            v-model="form.password"
            type="password"
            class="mt-5 mb-8 pa-0"
            hide-details="auto"
            outlined
          ></v-text-field>

          <v-btn
            elevation="0"
            :loading="isWithdrawing"
            @click="withdraw"
            :disabled="!canWidthdraw"
            color="primary"
            block
            large
            >Proceed</v-btn
          >
        </div>
      </div>
    </div>

    <div
      v-if="step === 2"
      class="bg-white p-5 md:px-10 rounded-md shadow-md mt-10 w-full max-w-md"
    >
      <div>
        <span
          class="w-16 md:w-20 h-16 md:h-20 rounded-full mt-5 mx-auto flex justify-center items-center bg-gray-100"
        >
          <v-icon size="30" color="green">mdi-check</v-icon>
        </span>

        <span class="font-bold block text-center text-xl mt-5 my-2"
          >Withdrawal successful</span
        >

        <span class="text-center block w-4/5 md:w-3/5 mx-auto text-gray-500"
          >Your withdrawal request is been processed</span
        >
      </div>

      <div class="flex justify-center">
        <v-btn
          elevation="0"
          style="width: 50%"
          class="mt-10"
          color="primary"
          @click="home"
          large
          >Okay</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'investor',
  data() {
    return {
      step: 1,
      isWithdrawing: false,
      form: {
        amount: '',
        password: '',
      },
      minimumAmount: 5000,
      maximumAmount: 1000000,
    }
  },
  mounted() {
    this.form.amount = this.minimumAmount
  },
  methods: {
    async withdraw() {
      try {
        this.isWithdrawing = true
        await this.$API.investor.makeWithdrawal(this.form)
        this.$store.dispatch('alert/setAlert', {
          message: 'Withdrawal successful',
          color: 'success',
        })

        await this.$store.dispatch('user/fetchDetails')
        this.step = 2
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isWithdrawing = false
      }
    },
    async home() {
      await this.$store.dispatch('user/fetchDetails')
      this.$router.replace('/dashboard')
    },
  },
  computed: {
    price: {
      get() {
        return this.formatToNaira(Number(this.form.amount))
      },
      set(val) {
        const number = Number(val.toString().replace(/,/g, '').replace('₦', ''))
        if (isNaN(number)) {
          this.form.amount = this.minimumAmount
        } else {
          this.form.amount = number
        }
      },
    },

    canWidthdraw() {
      return (
        this.form.amount > 0 &&
        this.form.password.length > 0 &&
        this.form.amount >= this.minimumAmount &&
        this.form.amount <= this.maximumAmount
      )
    },
    limit() {
      return (
        this.form.amount >= this.minimumAmount &&
        this.form.amount <= this.maximumAmount
      )
    },
  },
  watch: {
    $wallet: {
      handler(val) {
        this.maximumAmount = val.balance
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';

.page {
  min-height: 100%;
  padding: 10px;

  @include media-breakpoint-up(sm) {
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
