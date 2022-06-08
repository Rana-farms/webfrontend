<template>
  <div class="page">
    <div class="mb-5 flex justify-between">
      <span class="font-semibold text-2xl">Documents</span>
    </div>

    <div>
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
