<template>
  <div class="page">
    <div
      class="bg-white p-5 md:px-10 rounded-md shadow-md mt-10 w-full max-w-xl"
    >
      <div>
        <span class="block text-center font-semibold text-xl">Invest</span>
        <div class="block mt-10 w-full">
          <v-text-field
            placeholder="Trust"
            disabled
            label="Trust"
            v-model="trust"
            class="mb-0 pa-0"
            hide-details="auto"
            outlined
            block
          ></v-text-field>

          <v-text-field
            block
            :placeholder="`Enter number of units (Minimum Units: ${minimumUnits} units)`"
            label="Number of units"
            class="mt-5 mb-8 pa-0"
            hide-details="auto"
            v-model="units"
            @blur="validateUnits"
            :min="minimumUnits"
            :hint="`Minimum Unit is ${Intl.NumberFormat().format(
              minimumUnits
            )} and  Maximum Unit is ${Intl.NumberFormat().format(
              maximumUnits
            )}`"
            outlined
          ></v-text-field>

          <v-text-field
            block
            placeholder="Amount"
            label="Amount"
            class="mt-5 mb-8 pa-0"
            hide-details="auto"
            v-model="price"
            outlined
          ></v-text-field>

          <v-btn
            elevation="0"
            :disabled="!canPay"
            :loading="isInvesting"
            @click="payViaPaystack"
            color="primary"
            block
            large
            >Make Payment</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'investor',
  data() {
    return {
      trust: '',
      minimumUnits: null,
      isInvesting: false,
      maximumUnits: null,
      form: {
        investment_id: this.$route.query.id,
        units: null,
        payment_reference: null,
        amount: null,
      },
    }
  },
  mounted() {
    this.scriptLoaded = new Promise((resolve) => {
      this.loadPaystackScript(() => {
        resolve()
      })
    })
  },

  methods: {
    async getInvestment() {
      try {
        const { data } = await this.$API.investment.fetchInvestmentById(
          this.$route.query.id
        )
        this.$store.dispatch('investment/holdInvestment', data.data)
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          color: 'error',
          message: error.msg,
        })
        this.$router.replace('/investor/investments')
      }
    },

    payViaPaystack() {
      this.addNewCardDialog = false

      this.scriptLoaded &&
        this.scriptLoaded.then(() => {
          const paystackOptions = {
            key: process.env.paystack_key,
            email: this.$profile.email,
            amount: this.addKobo(this.form.amount),
            currency: 'NGN',
            // channels: ["card"],

            metadata: {
              investment_id: this.$route.query.id,
              amount: this.price,
              user_id: this.$profile.id,
              units: this.form.units,
            },
            callback: (response) => {
              this.makeInvestment(response)
            },
            onClose: () => {},
          }
          const handler = window.PaystackPop.setup(paystackOptions)

          handler.openIframe()
        })
    },

    async makeInvestment(ref) {
      this.form.payment_reference = ref.reference

      try {
        this.isInvesting = true
        const req = await this.$API.investment.makeInvestment(this.form)
        this.$store.dispatch('alert/setAlert', {
          color: 'success',
          message: req.data.message,
        })

        this.$router.replace('/investor/investments')
      } catch (err) {
        this.$store.dispatch('alert/setAlert', {
          color: 'error',
          message: err.msg,
        })
      } finally {
        this.isInvesting = false
      }
    },

    validateUnits() {
      if (this.form.units < this.minimumUnits) {
        this.form.units = this.minimumUnits
      }
    },
  },

  computed: {
    ...mapGetters({
      investment: 'investment/investment',
    }),

    units: {
      get() {
        if (this.form.units) {
          return this.numberWithCommas(this.form.units)
        }
      },
      set(val) {
        this.form.units = Number(val.toString().replace(/,/g, ''))
      },
    },

    price: {
      get() {
        if (this.investment) {
          this.form.amount =
            Number(this.investment.unitPrice) * Number(this.form.units)
          return this.formatToNaira(
            Number(this.investment.unitPrice) * Number(this.form.units)
          )
        } else return 0
      },
      set(val) {
        const number = Number(val.toString().replace(/,/g, '').replace('₦', ''))
        if (isNaN(number)) {
          this.form.units = this.minimumUnits

          if (this.investment)
            this.form.amount =
              Number(this.investment.unitPrice) * Number(this.form.units)
        } else {
          this.form.amount = number
        }
        this.form.units =
          Number(this.form.amount) / Number(this.investment.unitPrice)
      },
    },

    canPay() {
      if (this.investment) {
        return (
          this.form.units >= this.minimumUnits &&
          this.form.units <= this.maximumUnits &&
          this.form.amount >= Number(this.investment.unitPrice)
        )
      } else {
        return false
      }
    },
  },
  watch: {
    investment: {
      handler(investment) {
        if (!investment) {
          this.getInvestment()
        } else {
          this.minimumUnits = Number(investment.minimumUnit)
          this.maximumUnits = Number(investment.unitsRemaining)
          this.trust = investment.name
          this.form.units = this.minimumUnits
          this.units = this.minimumUnits
        }
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
