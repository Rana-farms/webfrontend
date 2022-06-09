<template>
  <div class="flex w-full justify-center items-center h-full" >
      <span class=" font-semibold text-primary">Settings</span>
  </div>
</template>

<script>
export default {
    middleware({ redirect }) {
    return redirect('/investor/settings/profile')
  },
}
</script>

<style>

</style>