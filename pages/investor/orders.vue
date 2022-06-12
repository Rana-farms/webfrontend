<template>
  <div class="page">
    <div class="flex justify-between">
      <span class="block font-semibold mb-5 text-2xl">Orders</span>
    </div>
    <div class="mt-8">
      <v-data-table
        :headers="orders"
        :items="orderList"
        disable-sort
        disable-pagination
        hide-default-footer
        :loading="isLoadingOrders"
        class="elevation-0"
      >
        <template v-slot:no-data>
          <div
            class="w-full flex items-center justify-center h-60"
            v-if="!isLoadingOrders && orderList.length == 0 && !errorLoading"
          >
            <div class="text-center text-flame">
              <span class="block text-center">No order has been created!</span>
            </div>
          </div>

          <div
            class="w-full flex items-center justify-center h-60"
            v-if="!isLoadingOrders && errorLoading"
          >
            <div class="text-center text-flame">
              <v-icon size="50" color="primary"
                >mdi-format-list-bulleted-square</v-icon
              >
              <span class="block text-center">Error loading orders...</span>
              <v-btn color="primary" text @click="getAllOrders">
                <v-icon left>mdi-refresh</v-icon> Retry</v-btn
              >
            </div>
          </div>
        </template>

        <template v-slot:[`item.code`]="{ item }">
          <span class="font-semibold">#{{ item.code }}</span>
        </template>

        <template v-slot:loading>
          <div class="w-full flex items-center justify-center h-72">
            <div class="text-center text-flame">
              <v-icon size="40" color="primary"
                >mdi-format-list-bulleted-square</v-icon
              >
              <span class="block mt-2 font-semibold text-center"
                >Loading orders...</span
              >
            </div>
          </div>
        </template>

        <template v-slot:[`item.dateCreated`]="{ item }">
          {{ format(new Date(item.dateCreated), 'MMM do, y ') }}
        </template>
        <template v-slot:[`item.orderStatus`]="{ item }">
          <span
            class="uppercase md:my-6 block"
            :class="{
              'text-green-500': item.orderStatus.toLowerCase() == 'approved',
              'text-yellow-500': item.orderStatus.toLowerCase() == 'pending',
              'text-red-500': item.orderStatus.toLowerCase() == 'failed',
            }"
            >{{ item.orderStatus }}</span
          >
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <v-btn color="#2E42A5" icon @click="viewOrder(item)">
            <v-icon>mdi-eye</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </div>

    <!-- View Order -->
    <v-dialog
      v-model="viewOrderDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <div v-if="selectedOrder" class="bg-white p-5 rounded-md shadow">
        <span class="uppercase pb-2 font-semibold text-xl text-primary block"
          >Order No: #{{ selectedOrder.code }}</span
        >
        <v-divider></v-divider>
        <div class="py-1 mt-6">
          <span class="font-semibold">Status:</span>
          <span
            class="p-2 text-sm rounded capitalize"
            style="color: #039e00; background-color: #019f241a"
            >{{ selectedOrder.orderStatus }}</span
          >
        </div>

         <div class="py-1 mt-2">
          <span class="font-semibold">Delivery Status :</span>
          <span>{{ selectedOrder.deliveryStatus }} </span>
        </div>

        <div class="py-1 mt-2">
          <span class="font-semibold">Weight Delivered :</span>
          <span
            >{{
              Intl.NumberFormat().format(selectedOrder.weight)
            }}
            Kg</span
          >
        </div>

        <div class="py-1 mt-2">
          <span class="font-semibold">Weight Received :</span>
          <span
            >{{
              Intl.NumberFormat().format(selectedOrder.weightReceived)
            }}
            Kg</span
          >
        </div>

        <div class="py-1 mt-2 mb-3">
          <span class="font-semibold">Weight Loss :</span>
          <span>{{ selectedOrder.weightLoss }}%</span>
        </div>

        <v-divider></v-divider>

        <div class="py-1 mt-6 mb-4">
          <span class="font-semibold">Payment status:</span>
          <span
            class="p-2 text-sm rounded capitalize"
            style="color: #ff8f00; background-color: #ff8f001a"
            >{{ selectedOrder.paymentStatus }}</span
          >
        </div>

        <v-btn color="primary" @click="closeOrderDialog" outlined>Close</v-btn>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  layout: 'investor',
  data() {
    return {
      format: format,
      createOderDialog: false,
      viewOrderDialog: false,
      editOrderDialog: false,
      deleteOrderDialog: false,
      orders: [
        { text: 'ORDER NUMBER', value: 'code' },
        { text: 'LOCATION', value: 'location' },
        { text: 'DATE', value: 'dateCreated' },
        { text: 'STATUS', value: 'orderStatus' },
        { text: 'ACTIONS', value: 'action' },
      ],
      orderList: [],
      isLoadingOrders: false,
      errorLoading: false,
      selectedOrder: null,
    }
  },
  mounted() {
    this.getAllOrders()
  },

  methods: {
    viewOrder(order) {
      this.selectedOrder = order
      this.viewOrderDialog = true
    },

    closeOrderDialog() {
      this.viewOrderDialog = false
      this.selectedOrder = null
    },

    async getAllOrders() {
      try {
        this.isLoadingOrders = true
        this.errorLoading = false
        const { data } = await this.$API.order.fetchAllOrders()
        this.orderList = data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: 'Error Occured',
          color: 'error',
        })
        this.errorLoading = true
      } finally {
        this.isLoadingOrders = false
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
