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
          <span class="font-semibold">Weight Delivered :</span>
          <span>{{ selectedOrder.weight }}</span>
        </div>

        <div class="py-1 mt-2">
          <span class="font-semibold">Weight Received :</span>
          <span>{{ selectedOrder.weightReceived }}</span>
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
      max-width="400px"
      transition="dialog-transition"
      :persistent="isDeletingOrder"
    >
      <div class="bg-white p-8 rounded-md shadow">
        <span class="font-semibold block text-center text-lg"
          >Are you sure you want to delete this order?</span
        >

        <div class="flex mt-12 justify-between">
          <v-btn
            v-if="!isDeletingOrder"
            elevation="0"
            @click="cancelDeleteOrder"
            dark
            color="#EE1D23"
            >Cancel</v-btn
          >
          <v-btn
            elevation="0"
            @click="confirmDeleteOrder"
            :loading="isDeletingOrder"
            dark
            color="#27AE60"
            >Delete</v-btn
          >
        </div>
      </div>
    </v-dialog>

    <v-dialog
      v-model="createOderDialog"
      max-width="540px"
      :persistent="isCreatingOrder"
      transition="dialog-transition"
    >
      <div class="bg-white p-5 rounded-md shadow">
        <div class="flex mb-3 justify-between">
          <span class="font-semibold text-xl">Create Order</span>
          <v-btn @click="createOderDialog = false" color="#908DAA" icon
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <div class="grid gap-5 mt-5 mb-5">
          <v-text-field
            label="Name of Order"
            v-model="createForm.name"
            ref="name"
            :rules="createFormRules.name"
            outlined
            hide-details="auto"
            placeholder="Name"
          ></v-text-field>

          <v-text-field
            label="Weight"
            outlined
            v-model="createForm.weight"
            ref="weight"
            :rules="createFormRules.weight"
            hide-details="auto"
            placeholder="Enter Weight"
          ></v-text-field>

          <v-text-field
            label="Location"
            outlined
            v-model="createForm.location"
            ref="location"
            :rules="createFormRules.location"
            hide-details="auto"
            placeholder="Enter Location"
          ></v-text-field>

          <v-text-field
            label="Aggregated"
            v-model="createForm.aggregated"
            ref="aggregated"
            :rules="createFormRules.aggregated"
            outlined
            hide-details="auto"
          ></v-text-field>

          <v-text-field
            label="Weight Recieved"
            v-model="createForm.weight_received"
            ref="weight_received"
            :rules="createFormRules.weight_received"
            outlined
            hide-details="auto"
          ></v-text-field>

          <v-text-field
            label="Weight Loss"
            v-model="createForm.weight_loss"
            ref="weight_loss"
            :rules="createFormRules.weight_loss"
            outlined
            hide-details="auto"
          ></v-text-field>
        </div>

        <v-btn
          color="primary"
          @click="createOrder"
          :loading="isCreatingOrder"
          elevation="0"
          >Create</v-btn
        >
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  layout: 'admin',
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
      createForm: {
        name: '',
        weight: '',
        location: '',
        aggregated: '',
        weight_received: '',
        weight_loss: '',
      },
      isCreatingOrder: false,
      isDeletingOrder: false,
      createFormRules: {
        name: [(v) => !!v || 'Field is required'],
        weight: [(v) => !!v || 'Field is required'],
        location: [(v) => !!v || 'Field is required'],
        aggregated: [(v) => !!v || 'Field is required'],
        weight_received: [(v) => !!v || 'Field is required'],
        weight_loss: [(v) => !!v || 'Field is required'],
      },
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

    async confirmDeleteOrder() {
      try {
        this.isDeletingOrder = true
        await this.$API.order.deleteOrder(this.selectedOrder.code)
        this.$store.dispatch('alert/setAlert', {
          message: 'Order Deleted Successfully',
          color: 'success',
        })
        await this.getAllOrders()
        this.deleteOrderDialog = false
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isDeletingOrder = false
      }
    },

    initiateOrder() {
      this.createOderDialog = true
    },

    async createOrder() {
      Object.keys(this.create).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canCreateOrder) {
        try {
          this.isCreatingOrder = true
          await this.$API.order.createOrder(this.createForm)
          this.$store.dispatch('alert/setAlert', {
            message: 'Order created!',
            color: 'success',
          })
          await this.getAllOrders()
          this.createOderDialog = false
        } catch (error) {
          this.$store.dispatch('alert/setAlert', {
            message: error.msg,
            color: 'error',
          })
        } finally {
          this.isCreatingOrder = false
        }
      }
    },

    async getAllOrders() {
      try {
        this.isLoadingOrders = true
        this.errorLoading = false
        const { data } = await this.$API.order.fetchAllOrders('admin')
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

  computed: {
    create() {
      return {
        name: this.createForm.name,
        weight: this.createForm.weight,
        location: this.createForm.location,
        aggregated: this.createForm.aggregated,
        weight_received: this.createForm.weight_received,
        weight_loss: this.createForm.weight_loss,
      }
    },

    canCreateOrder() {
      const rules = Object.keys(this.createFormRules)
      return rules
        .map((rule) => {
          return Object.keys(this.createFormRules[rule])
            .map((field, index) => {
              return this.createFormRules[rule][index](this.create[rule])
            })
            .every((val) => val == true)
        })
        .every((val) => val == true)
    },
  },
  watch: {
    createOderDialog(val) {
      if (!val) {
        Object.keys(this.createForm).map((form) => {
          this.createForm[form] = null
        })
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
