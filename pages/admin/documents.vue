<template>
  <div class="page">
    <div class="mb-5 flex justify-between">
      <span class="font-semibold text-2xl">Documents</span>
      <v-btn color="primary" elevation="0" @click="initiateUploadDocument"
        >upload document</v-btn
      >
    </div>

    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="documents"
      :loading="isLoadingDoc"
      class="elevation-0" 
    >
    

       <template v-slot:[`item.name`]="{ item }">
       <div class="flex items-center">
         <img class=" h-9 inline-block mr-2 my-2" src="/images/doc-icon.svg" />
          <span class="text-sm">{{ item.name }}</span>
       </div>
      </template>


      <template v-slot:[`item.dateCreated`]="{ item }">
        <span class="text-gray-600">{{
          format(new Date(item.dateCreated), 'MMM do, y ')
        }}</span>
      </template>

      <template v-slot:no-data>
        <div
          class="w-full flex items-center justify-center h-60"
          v-if="!isLoadingDoc && documents.length == 0 && !errorLoading"
        >
          <div class="text-center text-flame">
            <span class="block text-center">No documents</span>
          </div>
        </div>

        <div
          class="w-full flex items-center justify-center h-60"
          v-if="!isLoadingDoc && errorLoading"
        >
          <div class="text-center text-flame">
            <v-icon size="50" color="primary"
              >mdi-format-list-bulleted-square</v-icon
            >
            <span class="block text-center">Error loading documents...</span>
            <v-btn color="primary" text @click="getAllDocuments">
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
              >Loading documents...</span
            >
          </div>
        </div>
      </template>

         <template v-slot:[`item.action`]="{ item }">
          <a :href="item.file" target="_blank">
          <v-btn color="#2E42A5" icon >
            <v-icon>mdi-download</v-icon></v-btn
          >
          </a>
          <v-btn @click="editDOc(item)" color="#0C9F09"  icon>
            <v-icon>mdi-pencil-outline</v-icon></v-btn
          >
          <v-btn  @click="deleteDoc(item)" color="#F42F54" icon>
            <v-icon>mdi-trash-can-outline</v-icon></v-btn
          >
        </template>
    </v-data-table>

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
            accept="application/pdf, application/docx, application/doc, application/xls, application/xlsx, application/txt"
            @change="selectFile"
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


      <!-- Delete Oder -->
    <v-dialog
      v-model="deleteDocDialog"
      max-width="400px"
      transition="dialog-transition"
      :persistent="isDeleteingDoc"
    >
      <div class="bg-white p-8 rounded-md shadow">
        <span class="font-semibold block text-center text-lg"
          >Are you sure you want to delete this document?</span
        >

        <div class="flex mt-12 justify-between">
          <v-btn
            v-if="!isDeleteingDoc"
            elevation="0"
            @click="cancelDeleteDOc"
            dark
            color="#EE1D23"
            >Cancel</v-btn
          >
          <v-btn
            elevation="0"
            @click="confirmDeleteDoc"
            :loading="isDeleteingDoc"
            dark
            color="#27AE60"
            >Delete</v-btn
          >
        </div>
      </div>
    </v-dialog>

      <!-- Delete Oder -->
    <v-dialog
      v-model="editDocDialog"
      max-width="400px"
      transition="dialog-transition"
      :persistent="isEditingDoc"
    >
      <div class="bg-white p-8 rounded-md shadow" v-if="selectedDoc">
        <span class="font-semibold block mb-3 text-center text-lg"
          >Edit Document name?</span
        >

        <v-text-field
        v-model="selectedDoc.name"
          hide-details="auto"
          outlined
          label="Name of Document"
          placeholder="Name of Document"
          id="id"
        ></v-text-field>

        <v-btn color="primary" @click="updateDocument" elevation="0" :disabled="!selectedDoc.name" :loading="isEditingDoc"  class="mt-5">Save Changes</v-btn>
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
      uploadDocDialog: false,
      format: format,
      headers: [
        { text: 'NAME', value: 'name' },
        { text: 'DATE', value: 'dateCreated',  align: 'center' },
        { text: 'CODE', value: 'code', align: 'center' },
        { text: 'ACTION', value: 'action', sortable: false, align: 'center' },
      ],
      form: {
        name: '',
        investment_id: '',
        amount: '',
        file: null,
        formname: null,
      },
      documents: [],
      investments: [],
      readers: null,
      isLoadingDoc:false,
      isUploadingDoc: false,
      errorLoading:false,
      formData: null,
      deleteDocDialog: false,
      isDeleteingDoc: false,
      selectedDoc: null,
      editDocDialog: false,
      isEditingDoc: false,
    }
  },
  mounted() {
    this.getAllDocuments()
    this.getAllInvestments()
  },
  methods: {
    selectFile(event) {
      this.formData = new FormData()
      this.formData.append('file', event.target.files[0])
      this.form.file = event.target.files[0]
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
        this.formData.append('name', this.form.name)
        await this.$API.document.createDocument(this.formData)
        await this.createROI()

        this.$store.dispatch('alert/setAlert', {
          message: 'Document uploaded successfully',
          color: 'success',
        })

        await this.getAllDocuments()
        this.uploadDocDialog = false
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

    
    deleteDoc(doc) {
      this.deleteDocDialog = true
      this.selectedDoc = doc
    },

    cancelDeleteDOc() {
      this.deleteDocDialog = false
      this.selectedDoc = null
    },

     async confirmDeleteDoc() {
      try {
        this.isDeleteingDoc = true
        await this.$API.document.deleteDocument(this.selectedDoc.code)
        this.$store.dispatch('alert/setAlert', {
          message: 'Document Deleted Successfully',
          color: 'success',
        })
        await this.getAllDocuments()
        this.deleteDocDialog = false
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isDeleteingDoc = false
      }
    },

     editDOc(doc) {
      this.editDocDialog = true
      this.selectedDoc = {...doc}
    },

    async updateDocument() {
       try {
        this.isEditingDoc = true
        await this.$API.document.updateDocument({
          name: this.selectedDoc.name,
        }, this.selectedDoc.code)
        this.$store.dispatch('alert/setAlert', {
          message: 'Document Update!',
          color: 'success',
        })
        await this.getAllDocuments()
        this.editDocDialog = false
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
      } finally {
        this.isEditingDoc = false
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

    async getAllDocuments() {
      try {
        this.isLoadingDoc = true
        this.errorLoading = false
        const { data } = await this.$API.document.fetchAllDocuments()
        this.documents = data.data
      } catch (error) {
        this.$store.dispatch('alert/setAlert', {
          message: error.msg,
          color: 'error',
        })
        this.errorLoading = true
      }finally{
        this.isLoadingDoc = false
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
    documents: {
      handler(val) {
       // console.log(JSON.stringify(val, null, 2))
      },
      deep: true,
      immediate: true,
    },

    uploadDocDialog(val) {
      if (!val) {
        this.form.name = ''
        this.form.investment_id = ''
        this.form.amount = ''
        this.form.file = null
        this.form.formname = null
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
