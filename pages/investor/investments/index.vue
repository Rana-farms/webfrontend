<template>
  <div class="page flex flex-col">
    <div>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <span class="block font-semibold mb-5 text-2xl">My Investments</span>

        <v-btn color="primary" elevation="0" to="/investor/investments/plans"
          >Investment Plans</v-btn
        >
      </div>
    </div>
    <div
      class="flex-1 flex items-center justify-center"
      v-if="isLoadingInvestments"
    >
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <div class="flex-1 flex items-center justify-center" v-if="investmentFetched && investments.length == 0">
      <div class="max-w-sm text-center">
        <span class="block mb-5 font-semibold text-gray-700"
          >You haven't made any Investments</span
        >
        <v-btn
          color="primary"
          rounded
          to="/investor/investments/plans"
          outlined
        >
          Invest Now <v-icon right>mdi-chevron-right</v-icon></v-btn
        >
      </div>
    </div>


    <div  class="mt-5" v-if="investments.length > 0" >
   <div class="flex h-full grid-cols-2 gap-5  flex-wrap cursor-pointer">
       <div v-ripple="true"  v-for="(investment,index) in investments" :key="index" class="inline-block box-border mx-auto mx-md-0 h-auto bg-white p-6 rounded-lg shadow-md  max-w-sm w-11/12">
         <div class="block mb-2"><span class=" font-bold">Order No: #</span>{{investment.id}}</div>
         <span class="block  font-semibold text-lg text-gray-500">{{investment.investmentName}}</span>
         <div class="block mt-1 font-semibold tracking-wider "><span class=" font-semibold text-gray-500">Amount:</span>{{formatToNaira(Number(investment.amount))}}</div>
        <div class="flex items-end mt-4"> 

          <div class=" inline-block bg-green-100 tracking-wider font-semibold capitalize text-green-700 px-5 py-1 rounded-lg">{{investment.status}}</div>
        </div>
       </div>
   </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'investor',
  data() {
    return {
      investments: [],
      isLoadingInvestments: false,
      investmentFetched: false,
    }
  },
  mounted() {
    this.getMyInvestments()
  },
  methods: {
    async getMyInvestments() {
              this.investmentFetched = false
      try {
        this.isLoadingInvestments = true
        const { data } = await this.$API.investment.fetchAllUserInvestments()
        console.log(JSON.stringify(data, null, 2))
        this.investmentFetched = true
        this.investments = data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isLoadingInvestments = false

        
      }
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
  }
}
</style>
