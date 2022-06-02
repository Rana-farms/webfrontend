<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Withdrawal Requests</span>
    <div class="mt-8">
      <v-data-table
        :headers="withdrawalRequestHeaders"
        :items="withdrawalHistories"
        :loading="isLoadingWithdrawals"
        class="elevation-0"
      >
        <template v-slot:no-data>
          <div
            class="w-full flex items-center justify-center h-60"
            v-if="
              !isLoadingWithdrawals && withdrawalHistories.length == 0 && !errorLoading
            "
          >
            <div class="text-center text-flame">
              <span class="block text-center">No Withdrawal Request!</span>
            </div>
          </div>

          <div
            class="w-full flex items-center justify-center h-60"
            v-if="!isLoadingWithdrawals && errorLoading"
          >
            <div class="text-center text-flame">
              <v-icon size="50" color="primary"
                >mdi-format-list-bulleted-square</v-icon
              >
              <span class="block text-center">Error loading requests...</span>
              <v-btn color="primary" text @click="getAllWithdrawals">
                <v-icon left>mdi-refresh</v-icon> Retry</v-btn
              >
            </div>
          </div>
        </template>

          <template v-slot:loading>
          <div class="w-full flex items-center justify-center h-72">
            <div class="text-center text-flame">
              <v-icon size="40" color="primary"
                >mdi-format-list-bulleted-square</v-icon
              >
              <span class="block mt-2 font-semibold text-center"
                >Loading requests...</span
              >
            </div>
          </div>
        </template>

        <template v-slot:[`item.amount`]="{ item }">
          {{ item.amount | currency }}
        </template>

        <template v-slot:[`item.user.created_at`]="{ item }">
          {{ format(new Date(item.user.created_at), 'MMM do, y ') }}
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <span
            class="uppercase"
            :class="{
              'text-green-500': item.status.toLowerCase() == 'completed',
              'text-yellow-500': item.status.toLowerCase() == 'pending',
              'text-gray-500': item.status.toLowerCase() == 'processing',
              'text-red-500': item.status.toLowerCase() == 'failed',
            }"
            >{{ item.status }}</span
          >
        </template>

        <template v-slot:[`item.id`]="{ item }">
          <v-btn
            :outlined="item.status.toLowerCase() !== 'processing'"
            small
            rounded
            class="md:my-5"
            color="primary"
            elevation="0"
            :to="`/admin/withdrawals/${item.id}`"
          >
            <span v-if="item.status.toLowerCase() === 'pending'">
              Approve
            </span>
            <span v-else> View </span>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  layout: 'admin',
    middleware({ store, redirect }) {
    if(store.getters['user/isSuperAdmin'] !== true) {
      redirect('/dashboard')
    }
  },
  data() {
    return {
      format: format,
      withdrawalRequestHeaders: [
        { text: 'NAME OF INVESTOR', value: 'user.fullname' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'DATE', value: 'user.created_at' },
        { text: 'STATUS', value: 'status' },
        { text: 'ACTIONS', value: 'id' },
      ],
      withdrawalHistories: [],
      isLoadingWithdrawals: true,
      errorLoading: false,
    }
  },
  mounted(){
    this.getAllWithdrawals()
  },
  methods: {
    async getAllWithdrawals() {
        try {
        this.isLoadingWithdrawals = true
        this.errorLoading = false
        const { data } = await this.$API.withdrawal.fetchAllWithdrawals()
        this.withdrawalHistories = data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: 'Error Occured',
          color: 'error',
        })
        this.errorLoading = true
      } finally {
        this.isLoadingWithdrawals = false
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
