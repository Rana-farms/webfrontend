<template>
  <div class="page">
    <span class="block font-semibold mb-5 text-2xl">Orders</span>
    <div class="mt-8">
       <v-data-table
        :headers="orders"
        :items="depositHistories"
        disable-sort
        disable-pagination
        hide-default-footer
        class="elevation-0"
      >
        <template v-slot:[`item.status`]="{ item }">
         <span
            class="uppercase md:my-6 block"
            :class="{
              'text-green-500': item.status.toLowerCase() == 'success',
              'text-yellow-500': item.status.toLowerCase() == 'pending',
              'text-red-500': item.status.toLowerCase() == 'failed',
            }"
            >{{ item.status }}</span
          >
        </template>

        <template v-slot:[`item.action`]="{ item }">
           <v-btn color="#2E42A5" icon> <v-icon>mdi-eye</v-icon></v-btn>
             <v-btn color="#0C9F09" icon> <v-icon>mdi-pencil-outline</v-icon></v-btn>
                          <v-btn color="#F42F54" icon> <v-icon>mdi-trash-can-outline</v-icon></v-btn>

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
        orders: [
        { text: 'ORDER NUMBER', value: 'no' },
        { text: 'MONTH', value: 'month' },
        { text: 'STATUS', value: 'status' },
        { text: '', value: 'action' },

       
      ],
      depositHistories: [
        {
          no: 'order#013',
          month: 'february',
          status: 'success',
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
