<template>
  <div class="page">
          <span class="block font-semibold mb-5 text-2xl">User Profile</span>

      {{$route.params.id}}
















          <div class="mt-10">
      <span class="font-semibold block text-lg mb-1">Transaction History</span>
      <v-data-table :headers="headers" :items="desserts" class="elevation-0">
        <template  v-slot:[`item.date`]="{ item }">
          <div class="inline-flex gap-1">
            <v-btn color="green" icon v-if="item.type == 'deposit'">
              <v-icon>mdi-arrow-top-right-thin</v-icon></v-btn
            >
            <v-btn v-else color="red" icon>
              <v-icon>mdi-arrow-bottom-left-thin</v-icon></v-btn
            >
            <span class="text-gray-600">{{ item.date }}</span>
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <span
            class="uppercase"
            :class="{
              'text-green-500': item.status.toLowerCase() == 'success',
              'text-yellow-500': item.status.toLowerCase() == 'pending',
              'text-red-500': item.status.toLowerCase() == 'failed',
            }"
            >{{ item.status }}</span
          >
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
    layout: 'admin',
      data() {
    return {
      headers: [
        { text: 'DATE', value: 'date' },
        { text: 'DESCRIPTION', value: 'description' },
        { text: 'AMOUNT', value: 'amount' },
        { text: 'STATUS', value: 'status' },
      ],
      desserts: [
        {
          date: '12 oct. 2021, 07:29PM',
          description: 'withdraw to bank',
          type: 'withdraw',
          amount: '₦3,000,000.00',
          status: 'pending',
        },
        {
          date: '12 oct. 2021, 07:29PM',
          description: 'Deposit',
          type: 'deposit',

          amount: '₦3,000,000.00',
          status: 'success',
        },
        {
          date: '12 oct. 2021, 07:29PM',
          description: 'withdraw to bank',
          type: 'withdraw',

          amount: '₦3,000,000.00',
          status: 'failed',
        },
      ],
    }
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
