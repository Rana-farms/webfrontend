<template>
  <div class="form">
    <div class="flex flex-col gap-5">
      <v-select
        v-model="data.bank_id"
        ref="bank_id"
        name="Bank Name"
        label="Bank Name"
        :loading="isLoadingBanks"
        outlined
        hide-details="auto"
        :items="banks"
        item-value="id"
        item-text="name"
        :rules="rules.bank_id"
      ></v-select>

      <v-text-field
        v-model="data.account_no"
        ref="account_no"
        name="Account Number"
        label="Account Number"
        type="number"
        outlined
        hide-details="auto"
        :rules="rules.account_no"
      ></v-text-field>

      <v-text-field
        v-model="data.account_name"
        ref="account_name"
        name="Account Name"
        label="Account Name"
        :loading="isResolvingAccount"
        outlined
        disabled
        hide-details="auto"
        :rules="rules.account_name"
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
        @click="REGISTER"
        class="my-3 col-span-10"
        elevation="0"
        large
        >NEXT
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
        bank_id: '',
        account_no: '',
        account_name: '',
      },
      banks: [],
      isLoadingBanks: false,
      isResolvingAccount: false,
      bankLoader: 0,
      rules: {
        bank_id: [
          (v) => !!v || 'Bank name is required',
          //   v => (v && v.length <= 50) || 'Bank name must be less than 50 characters',
        ],
        account_no: [
          (v) => !!v || 'Account number is required',
          (v) => (v && v.length == 10) || 'Account number is invalid',
        ],
        account_name: [
          (v) => !!v || 'Account name is required',
        ],
      },
    }
  },
  mounted() {
    this.getBanks()
  },
  methods: {
    REGISTER() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canMoveOn) {
        this.$emit('input', Object.assign({}, this.value, { ...this.data }))
        this.$emit('move', (this.current += 1))
      }
    },

    async getBanks() {
      try {
        this.bankLoader++
        this.isLoadingBanks = true
        const { data } = await this.$API.bank.fetchBanks()
        this.banks = data.data
      } catch (err) {
        if (this.bankLoader < +4) {
          this.getBanks()
        } else {
          this.$store.dispatch('alert/setAlert', {
            message: 'Reload page',
            color: 'error',
            timeout: 10000,
            top: true,
            right: true,
          })
        }
      } finally {
        this.isLoadingBanks = false
      }
    },

    async fetchAccountDetails() {
      try {
        this.data.account_name = ''
        this.isResolvingAccount = true
        const { data } = await this.$API.bank.resolveAccount({
          bank_id: this.data.bank_id,
          account_no: this.data.account_no,
        })

        this.data.account_name = data.data.account_name
      } catch (err) {
        this.$store.dispatch('alert/setAlert', {
          message: err.msg || 'Something went wrong',
          color: 'error',
          timeout: 10000,
        })
      } finally {
        this.isResolvingAccount = false
      }
    },
  },

  computed: {
    form() {
      return {
        bank_id: this.data.bank_id,
        account_no: this.data.account_no,
        account_name: this.data.account_name,
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

  watch: {
    'data.bank_id'(val) {
      if (val && this.data.account_no.toString().length == 10)
        this.fetchAccountDetails()
    },

    'data.account_no'(val) {
      if (this.data.bank_id && val.toString().length == 10)
        this.fetchAccountDetails()
    },
  },
}
</script>

<style lang="scss" scoped></style>
