<template>
  <div>
    <span class="font-semibold text-xl block mb-5" style="color: #211a55"
      >Bank Settings</span
    >
    <div class="mb-10">
        <v-select
        v-model="bank.bank_id"
        ref="bank_id"
        name="Bank Name"
        label="Bank Name"
        :loading="isLoadingBanks"
                class="mt-5 mb-8 pa-0"

        outlined
        hide-details="auto"
        :items="bankList"
        item-value="id"
        item-text="name"
        :rules="rules.bank_id"
      ></v-select>

      <v-text-field
        v-model="bank.account_no"
        ref="account_no"
        name="Account Number"
        label="Account Number"
                class="mt-5 mb-8 pa-0"

        type="number"
        outlined
        hide-details="auto"
        :rules="rules.account_no"
      ></v-text-field>

      <v-text-field
        v-model="bank.account_name"
        ref="account_name"
        name="Account Name"
        label="Account Name"
        :loading="isResolvingAccount"
                class="mt-5 mb-8 pa-0"

        outlined
        disabled
        hide-details="auto"
        :rules="rules.account_name"
      ></v-text-field>

      <div class="flex justify-end">
        <v-btn elevation="0" color="primary" :disabled="JSON.stringify($bank) === JSON.stringify(bank)" large>Save Changes</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
       show: false,
      bank: {
        bank_id: '',
        account_no: '',
        account_name: '',
      },
      bankList: [],
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

    
    },

    async getBanks() {
      try {
        this.bankLoader++
        this.isLoadingBanks = true
        const { data } = await this.$API.bank.fetchBanks()
        this.bankList = data.data
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
        this.bank.account_name = ''
        this.isResolvingAccount = true
        const { data } = await this.$API.bank.resolveAccount({
          bank_id: this.bank.bank_id,
          account_no: this.bank.account_no,
        })

        this.bank.account_name = data.data.account_name
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
        bank_id: this.bank.bank_id,
        account_no: this.bank.account_no,
        account_name: this.bank.account_name,
      }
    },

    canMoveOn() {
      const rules = Object.keys(this.rules)

      return rules
        .map((rule) => {
          return Object.keys(this.rules[rule])
            .map((field, index) => {
              return this.rules[rule][index](this.bank[rule])
            })
            .every((val) => val == true)
        })
        .every((val) => val == true)
    },
  },

  watch: {
    'bank.bank_id'(val) {
      if (val && this.bank.account_no.toString().length == 10)
        this.fetchAccountDetails()
    },

    'bank.account_no'(val) {
      if (this.bank.bank_id && val.toString().length == 10)
        this.fetchAccountDetails()
    },

    $bank:{
      deep:true,
      immediate:true,
      handler(val){
         if (val != null) {
          this.bank = { ...val }
          console.log(JSON.stringify(this.bank, null, 2))
        }
      }
    }
  },
}
</script>

<style></style>
