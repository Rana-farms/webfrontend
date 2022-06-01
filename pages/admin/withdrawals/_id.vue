<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Withdrawal Request</span>

    <v-skeleton-loader
      v-if="request == null"
      class="mx-auto"
      type="card"
      width="100%"
      height="210px"
    ></v-skeleton-loader>

    <div v-else>
      <div class="bg-white max-w-3xl">
        <div
          class="flex gap-10 flex-wrap items-center justify-between mt-5 rounded-lg shadow mx-auto p-10"
        >
          <div>
            <span class="font-semibold text-2xl block">{{
              request.user.fullname
            }}</span>
            <span class="text-gray-400 block">{{ request.user.email }}</span>
            <span class="text-gray-400 block mb-5">{{
              request.user.phone
            }}</span>
            <v-btn
              color="green"
              dark
              @click="aproveWithdrawalPaystack"
              :loading="isApprovingWithdrawal"
              v-if="request.status.toLowerCase() == 'pending'"
              elevation="0"
              rounded
              >Paystack <v-icon right>mdi-cash</v-icon></v-btn
            >
          </div>

          <div class="p-5 rounded-lg" style="background-color: #f2faf4">
            <span class="block text-gray-400 text-sm">Request Amount</span>
            <span class="text-green-500 font-semibold text-2xl block">{{
              request.amount | currency
            }}</span>
          </div>
          <div class="p-5 rounded-lg" style="background-color: #f2faf4">
            <span class="block text-gray-400 text-sm">Withdrawal status</span>
            <span
              class="uppercase font-semibold text-xl block"
              :class="{
                'text-green-500': request.status.toLowerCase() == 'completed',
                'text-yellow-500': request.status.toLowerCase() == 'pending',
                'text-gray-500': request.status.toLowerCase() == 'processing',
                'text-red-500': request.status.toLowerCase() == 'failed',
              }"
              >{{ request.status }}</span
            >
          </div>
        </div>
      </div>

      <div class="bg-white p-10 mt-5 rounded-lg shadow max-w-3xl">
        <span class="font-bold text-lg block">Bank Details</span>
        <div class="flex justify-between mt-2">
          <span class="font-semibold">Bank Name:</span>
          <span>{{ request.bank.bankName }}</span>
        </div>
        <div class="flex justify-between mt-2">
          <span class="font-semibold">Account Name:</span>
          <span>{{ request.bank.accountName }}</span>
        </div>
        <div class="flex mb-5 justify-between mt-2">
          <span class="font-semibold">Account Number:</span>
          <span>{{ request.bank.accountNumber }}</span>
        </div>
        <v-btn
          color="primary"
          v-if="request.status.toLowerCase() == 'pending'"
          dark
          elevation="0"
          :loading="isApprovingWithdrawal"
          @click="bankPayment"
          rounded
          >Paied Manually <v-icon right>mdi-cash</v-icon></v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  layout: 'admin',
  data() {
    return {
      format: format,
      request: null,
      isApprovingWithdrawal: false,
    }
  },
  mounted() {
    this.getWithdrawal()
  },
  methods: {
    async getWithdrawal() {
      try {
        const { data } = await this.$API.withdrawal.fetchWithdrawalById(
          this.$route.params.id
        )
        this.request = data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      }
    },
    

    async aproveWithdrawalPaystack() {
      try {
        this.isApprovingWithdrawal = true

        await this.$API.withdrawal.approveWithdrawal(
          this.$route.params.id
        )
        this.$store.dispatch('alert/setAlert', {
          message: 'Withdrawal request approved successfully',
          color: 'success',
        })
        this.getWithdrawal()
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isApprovingWithdrawal = false
      }
    },

      async bankPayment() {
      try {
        this.isApprovingWithdrawal = true

        await this.$API.withdrawal.paiedMannually(
          this.$route.params.id
        )
        this.$store.dispatch('alert/setAlert', {
          message: 'Withdrawal request approved successfully',
          color: 'success',
        })
        this.getWithdrawal()
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isApprovingWithdrawal = false
      }
    },
  }
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
