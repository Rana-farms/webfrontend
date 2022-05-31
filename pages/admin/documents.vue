<template>
  <div class="page">
    <div class="mb-5 flex justify-between">
      <span class="font-semibold text-2xl">Documents</span>
      <v-btn color="primary" elevation="0" @click="initiateUploadDocument"
        >upload document</v-btn
      >
    </div>
    <div class="mt-8">
      <div class="flex gap-8 flex-wrap">
        <div
          v-for="doc in documents"
          :key="doc"
          class="shadow-sm cursor-pointer inline-block text-center rounded-md p-5 bg-white"
        >
          <img class="block mx-auto my-3" src="/images/doc-icon.svg" />
          <span class="mt-1 text-center block">January monthly report</span>
        </div>
      </div>
    </div>

    <!-- Upload Document -->
    <v-dialog
      v-model="uploadDocDialog"
      max-width="500px"
      :persistent="isUploadingDoc"
      transition="dialog-transition"
    >
      <div class="bg-white p-5 rounded-md shadow">
        <div class="flex mb-3 justify-between">
          <span class="font-semibold text-xl">Upload Document</span>
          <v-btn color="#908DAA" icon
            ><v-icon @click="cancelUploadDocument">mdi-close</v-icon></v-btn
          >
        </div>
        <div class="grid gap-5 mt-5 mb-5">
          <v-text-field
            label="Name of Document"
            v-model="form.name"
            outlined
            hide-details="auto"
            placeholder="Name"
          ></v-text-field>

          <v-select
            label="Type of Investment"
            v-model="form.investment_id"
            :items="investments"
            item-text="name"
            item-value="id"
            outlined
            hide-details="auto"
            placeholder="Investment type"
          ></v-select>

          <v-text-field
            label="monthly ROI"
            outlined
            v-model="price"
            hide-details="auto"
            placeholder="Return of investment"
          ></v-text-field>

          <div
            class="w-full h-20 flex justify-center items-center cursor-pointer border-dashed border-2 rounded border-gray-300"
            @click="$refs.upload.click()"
          >
            <div class="text-gray-400">
              <span v-if="!form.formname">Upload file</span>
              <span v-else>{{ form.formname }}</span>
            </div>
          </div>

          <input
            id="cac"
            ref="upload"
            name="cac"
            class="d-none"
            type="file"
            accept="application/pdf, image/png, image/jpg, image/jpeg"
            @change="documentUpload"
          />
        </div>

        <v-btn
          color="primary"
          :disabled="!canContinue"
          elevation="0"
          :loading="isUploadingDoc"
          @click="uploadDocument"
          >Continue</v-btn
        >
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      uploadDocDialog: false,
      form: {
        name: '',
        investment_id: '',
        amount: '',
        file: null,
        formname: null,
      },
      chosenFile: null,
      documents: [],
      investments: [],
      readers: null,
      isUploadingDoc: false,
    }
  },
  mounted() {
    this.getAllInvestments()
  },
  methods: {
    documentUpload(e) {
      const files = e.target.files
      if (files) {
        this.form.formname = files[0].name
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        this.form.file = e.target.result
      }
      if (e.target.files.length > 0) {
        reader.readAsDataURL(e.target.files[0])
      }
    },

    initiateUploadDocument() {
      this.uploadDocDialog = true
    },

    cancelUploadDocument() {
      this.uploadDocDialog = false
    },

    async uploadDocument() {
      try {
        this.isUploadingDoc = true
        await this.createROI()
        await this.$API.document.createDocument({
          name: this.form.name,
          file: this.form.file,
        })

        this.$store.dispatch('alert/setAlert', {
          message: 'Document uploaded successfully',
          color: 'success',
        })
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isUploadingDoc = false
      }
    },
    async createROI() {
      try {
        await this.$API.admin.createROI({
          investment_id: this.form.investment_id,
          amount: this.form.amount,
        })
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      }
    },

    async getAllInvestments() {
      try {
        const { data } = await this.$API.investment.fetchAllInvestments()
        this.investments = data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      }
    },
  },
  computed: {
    price: {
      get() {
        return this.formatToNaira(Number(this.form.amount))
      },
      set(val) {
        const number = Number(val.toString().replace(/,/g, '').replace('₦', ''))
        if (isNaN(number)) {
          this.form.amount = 0
        } else {
          this.form.amount = number
        }
      },
    },
    canContinue() {
      return (
        this.form.name &&
        this.form.investment_id &&
        this.form.amount &&
        this.form.file
      )
    },
  },
  watch: {
    form: {
      handler() {
        // console.log(JSON.stringify(this.form, null, 2))
      },
      deep: true,
      immediate: true,
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
