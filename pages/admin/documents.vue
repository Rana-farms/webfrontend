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
          v-for="doc in 5"
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
            outlined
            hide-details="auto"
            placeholder="Name"
          ></v-text-field>

          <v-select
            label="Type of Document"
            outlined
            hide-details="auto"
            placeholder="Investment type"
          ></v-select>

          <v-text-field
            label="Amount"
            outlined
            hide-details="auto"
            placeholder="Return of investment"
          ></v-text-field>

          <v-file-input
            outlined
            accept="image/*"
            label="Document"
          ></v-file-input>
        </div>

        <v-btn color="primary" elevation="0" @click="uploadDocument"
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
    }
  },
  methods: {
    initiateUploadDocument() {
      this.uploadDocDialog = true
    },

    cancelUploadDocument() {
      this.uploadDocDialog = false
    },

    uploadDocument() {
      this.uploadDocDialog = false
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
