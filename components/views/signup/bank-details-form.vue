<template>
  <div class="form">
    <div class=" flex flex-col gap-5">
      <v-select
        v-model="data.bank_id"
        ref="bank_id"
        name="Bank Name"
        label="Bank Name"
        outlined
        hide-details="auto"
        :items="banks"
        item-value="code"
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
        outlined
        hide-details="auto"
        :rules="rules.account_name"
      ></v-text-field>
    </div>

    <div class="grid grid-cols-12 items-center">
        <v-btn color="primary" @click="$emit('back')" class=" col-span-2" text large > <v-icon>mdi-chevron-left</v-icon></v-btn>
         <v-btn color="primary" @click="REGISTER" class="my-3 col-span-10" elevation="0" large 
      >NEXT </v-btn
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
        bank_id: '',
        account_no: '',
        account_name: '',
      },
      banks:[],
      rules: {
        bank_id: [
          (v) => !!v || 'Bank name is required',
          //   v => (v && v.length <= 50) || 'Bank name must be less than 50 characters',
        ],
        account_no: [
          (v) => !!v || 'Account number is required',
           v => (v && v.length == 10) || 'Account number is invalid',
        ],
        account_name: [
          (v) => !!v || 'Account name is required',
          //   v => (v && v.length <= 50) || 'Account name must be less than 50 characters',
        ],
      },
    }
  },
  mounted() {
    this.getBanks();
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

    async getBanks() {
      const { data } = await this.$API.utils.fetchBanks();
      this.banks = data.data
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
  watch:{
    banks:{
      deep:true,
      immediate:true,
      handler(val){
        console.log(JSON.stringify(val, null, 2))
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
