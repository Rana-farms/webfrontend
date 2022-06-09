<template>
  <div class="page">
    <div class="mb-5 flex justify-between">
      <span class="font-semibold text-2xl">Documents</span>
    </div>

    <div class="flex items-center justify-center h-80" v-if="isLoadingDoc">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>

    <div
      class="flex items-center justify-center h-80"
      v-if="errorLoading && !isLoadingDoc"
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

    <div class="flex gap-8" v-if="documents.length > 0">
      <a
        :href="document.file"
        download
        v-for="(document, index) in documents"
        :key="index"
        target="_blank"
      >
        <div
          class="flex-col p-5 cursor-pointer bg-white shadow rounded-md inline-flex"
          style="max-width: 240px"
        >
          <img class="h-40 block mx-12" src="/images/doc-icon.svg" />
          <span class="block pt-3">{{ document.name }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  layout: 'investor',
  data() {
    return {
      uploadDocDialog: false,
      documents: [],
      isLoadingDoc: false,
      errorLoading: false,
    }
  },
  mounted() {
    this.getAllDocuments()
  },
  methods: {
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
      } finally {
        this.isLoadingDoc = false
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
