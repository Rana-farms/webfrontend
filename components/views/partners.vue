<template>
  <div class="partners flex-wrap">
    <img src="/images/partners/GTBank.png" alt="GTBank" />
    <img src="/images/partners/WHITEFIELD.png" alt="WHITEFIELD" />
    <img src="/images/partners/afex.png" alt="afex" />
    <img src="/images/partners/tajbank.png" alt="tajbank" />
    <img src="/images/partners/takaful.png" alt="jaiz" />
    <img src="/images/partners/ncx.png" alt="Nigerian Commodity Exchange" />
    <img src="/images/partners/nk.png" alt="NOOR Takaful" />
    <img src="/images/partners/RIFAN.png" alt="RIFAN" />
    <img src="/images/partners/kads.png" alt="KADSTEP Singularity" />

    <img src="/images/partners/st.png" alt="Salam Takaful" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';
.partners {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin: 50px 5px;
  @include media-breakpoint-up(sm) {
    gap: 50px;
    margin: 80px 5px;
  }

  @include media-breakpoint-up(md) {
    gap: 80px;
    margin: 100px 5px;
  }

  img {
    max-width: 50px;
    display: inline-flex;

    @include media-breakpoint-up(md) {
      max-width: 120px;
    }
  }
}
</style>
