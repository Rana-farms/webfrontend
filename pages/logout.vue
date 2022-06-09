<template>
  <div></div>
</template>

<script>
export default {
  middleware({ store }) {
    //if(store.state.user.isLoggedIn){
    localStorage.removeItem('token')
    window.location.href = '/login'
    // }
  },
}
</script>
