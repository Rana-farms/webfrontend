<template>
  <div class="notification">
      <v-alert type="success">
      I'm a success alert.
    </v-alert>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.notification{
    z-index: 99999999;
    position: fixed;
    bottom: 25;
    right: 25;

}
</style>