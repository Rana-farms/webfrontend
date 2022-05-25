<template>
  <div class="page">
    <div class="flex justify-between">
      <span class="block font-semibold mb-5 text-2xl">Orders</span>
      <v-btn color="primary" elevation="0" @click="initiateOrder"
        >Create Order</v-btn
      >
    </div>
    <div class="mt-8">
      <v-data-table
        :headers="orders"
        :items="orderList"
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
          <v-btn color="#2E42A5" icon @click="viewOrder(item)">
            <v-icon>mdi-eye</v-icon></v-btn
          >
          <v-btn color="#0C9F09" @click="editOrder(item)" icon>
            <v-icon>mdi-pencil-outline</v-icon></v-btn
          >
          <v-btn color="#F42F54" @click="deleteOrder(item)" icon>
            <v-icon>mdi-trash-can-outline</v-icon></v-btn
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
      <div class="bg-white p-5 rounded-md shadow">
        <span class="uppercase pb-2 font-semibold text-xl text-primary block"
          >Order No: #013</span
        >
        <v-divider></v-divider>
        <div class="py-1 mt-6">
          <span class="font-semibold">Status:</span>
          <span
            class="p-2 text-sm rounded capitalize"
            style="color: #039e00; background-color: #019f241a"
            >delivery complete</span
          >
        </div>

        <div class="py-1 mt-2">
          <span class="font-semibold">Weight Delivered :</span>
          <span>15tonnes</span>
        </div>

        <div class="py-1 mt-2">
          <span class="font-semibold">Weight Received :</span>
          <span>14.67tonnes</span>
        </div>

        <div class="py-1 mt-2 mb-3">
          <span class="font-semibold">Weight Loss :</span> <span>25%</span>
        </div>

        <v-divider></v-divider>

        <div class="py-1 mt-6 mb-4">
          <span class="font-semibold">Payment status:</span>
          <span
            class="p-2 text-sm rounded capitalize"
            style="color: #ff8f00; background-color: #ff8f001a"
            >Pending</span
          >
        </div>

        <v-btn color="primary" @click="closeOrderDialog" outlined>Close</v-btn>
      </div>
    </v-dialog>

    <!-- Edit Order -->
    <v-dialog
      v-model="editOrderDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <div class="bg-white p-5 rounded-md shadow">
        <span class="uppercase pb-2 font-semibold text-xl text-primary block"
          >Order No: #013</span
        >
        <v-divider></v-divider>

        <div class="flex mt-5 justify-between">
          <span class="capitalize font-semibold">Order approved</span>
          <v-btn color="#888888" outlined small
            >Success <v-icon right>mdi-check</v-icon></v-btn
          >
        </div>

        <div class="flex mt-5 justify-between">
          <span class="capitalize font-semibold">aggregation initiated</span>
          <v-btn color="#888888" outlined small
            >Success <v-icon right>mdi-check</v-icon></v-btn
          >
        </div>

        <div class="flex mt-5 justify-between">
          <span class="capitalize font-semibold">negotiation </span>
          <v-btn color="#888888" outlined small
            >Success <v-icon right>mdi-check</v-icon></v-btn
          >
        </div>

        <div class="flex mt-5 justify-between">
          <span class="capitalize font-semibold">negotiation completed</span>
          <v-btn color="#888888" outlined small
            >Success <v-icon right>mdi-check</v-icon></v-btn
          >
        </div>

        <div class="flex mt-5 justify-between">
          <span class="capitalize font-semibold">Aggregation completed </span>
          <v-btn color="#888888" outlined small
            >Success <v-icon right>mdi-check</v-icon></v-btn
          >
        </div>

        <div class="flex mt-5 gap-1">
          <span class="capitalize font-semibold">Weight: </span>
          <span>150 Tonnes</span>
        </div>

        <div class="flex mt-5 gap-1">
          <span class="capitalize font-semibold">Aggregated: </span>
        </div>

        <div class="flex mt-5 justify-between">
          <span class="capitalize font-semibold">Loading off produce </span>
          <v-btn color="#888888" outlined small
            >Success <v-icon right>mdi-check</v-icon></v-btn
          >
        </div>

        <div class="flex mt-5 gap-1">
          <span class="capitalize font-semibold">Product enroute to: </span>
          <span>150 Tonnes</span>
        </div>

        <div class="flex mt-5 justify-between">
          <span class="capitalize font-semibold">offloading produce </span>
          <v-btn color="#888888" outlined small
            >Success <v-icon right>mdi-check</v-icon></v-btn
          >
        </div>

        <div class="flex mt-5 justify-between">
          <span class="capitalize font-semibold">delivery complete </span>
          <v-btn color="#888888" outlined small
            >Success <v-icon right>mdi-check</v-icon></v-btn
          >
        </div>

        <div class="flex mt-5 gap-1">
          <span class="capitalize font-semibold">Weight Recieved: </span>
          <span>150 Tonnes</span>
        </div>

        <div class="flex mt-5 gap-1">
          <span class="capitalize font-semibold">Total Weight Loss: </span>
          <span>250kg</span>
        </div>

        <div class="flex mt-5 justify-between">
          <span class="capitalize font-semibold">Awaiting payment </span>
          <v-btn color="#888888" outlined small
            >initiating <v-icon right>mdi-check</v-icon></v-btn
          >
        </div>

        <div class="flex mt-5 justify-between">
          <span class="capitalize font-semibold">Payment Recieved </span>
          <v-btn color="#888888" outlined small
            >Pending <v-icon right>mdi-check</v-icon></v-btn
          >
        </div>

        <div class="flex mt-5 justify-between">
          <span class="capitalize font-semibold">Payment Status </span>
          <v-btn color="#888888" outlined small
            >Pending <v-icon right>mdi-check</v-icon></v-btn
          >
        </div>

        <div class="my-4">
          <v-btn color="primary" elevation="0" @click="saveChanges"
            >Save Changes</v-btn
          >
        </div>
      </div>
    </v-dialog>

    <!-- Delete Oder -->
    <v-dialog
      v-model="deleteOrderDialog"
      max-width="350px"
      transition="dialog-transition"
    >
      <div class="bg-white p-8 rounded-md shadow">
        <span class="font-semibold block text-center text-lg"
          >Do you want to delete this order?</span
        >

        <div class="flex mt-12 justify-between">
          <v-btn elevation="0" @click="cancelDeleteOrder" dark color="#EE1D23"
            >Cancel</v-btn
          >
          <v-btn elevation="0" @click="confirmDeleteOrder" dark color="#27AE60"
            >Delete</v-btn
          >
        </div>
      </div>
    </v-dialog>

    <v-dialog
      v-model="createOderDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <div class="bg-white p-5 rounded-md shadow">
        <div class="flex mb-3 justify-between">
          <span class="font-semibold text-xl">Create Order</span>
          <v-btn color="#908DAA" icon><v-icon>mdi-close</v-icon></v-btn>
        </div>
        <div class="grid gap-5 mt-5 mb-5">
          <v-text-field
            label="Name of Order"
            outlined
            hide-details="auto"
            placeholder="Name"
          ></v-text-field>

          <v-text-field
            label="Weight"
            outlined
            hide-details="auto"
            placeholder="Enter Weight"
          ></v-text-field>

          <v-text-field
            label="Location"
            outlined
            hide-details="auto"
            placeholder="Enter Location"
          ></v-text-field>

          <v-text-field
            label="Aggregated"
            outlined
            hide-details="auto"
          ></v-text-field>

          <v-text-field
            label="Weight Recieved"
            outlined
            hide-details="auto"
          ></v-text-field>

          <v-text-field
            label="Weight Loss"
            outlined
            hide-details="auto"
          ></v-text-field>
        </div>

        <v-btn color="primary" @click="createOrder" elevation="0">Create</v-btn>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      createOderDialog: false,
      viewOrderDialog: false,
      editOrderDialog: false,
      deleteOrderDialog: false,
      orders: [
        { text: 'ORDER NUMBER', value: 'no' },
        { text: 'MONTH', value: 'month' },
        { text: 'STATUS', value: 'status' },
        { text: 'ACTIONS', value: 'action' },
      ],
      orderList: [
        {
          no: 'order#013',
          month: 'february',
          status: 'success',
        },
        {
          no: 'order#013',
          month: 'february',
          status: 'success',
        },
        {
          no: 'order#013',
          month: 'february',
          status: 'success',
        },
      ],
      selectedOrder: null,
    }
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

    editOrder(order) {
      this.editOrderDialog = true
      this.selectedOrder = order
    },

    saveChanges() {
      this.editOrderDialog = false
    },

    deleteOrder(order) {
      this.deleteOrderDialog = true
      this.selectedOrder = order
    },

    cancelDeleteOrder() {
      this.deleteOrderDialog = false
      this.selectedOrder = null
    },

    confirmDeleteOrder() {
      this.deleteOrderDialog = false
      this.selectedOrder = null
    },

    initiateOrder() {
      this.createOderDialog = true
    },

    createOrder() {
      this.createOderDialog = false
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
