<template>
  <div></div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (store.state.user.isLoggedIn) {
      store.getters['user/isAdmin'] || store.getters['user/isSuperAdmin']
        ? redirect('/admin')
        : redirect('/investor')
    }
  },
}
</script>
