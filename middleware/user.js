export default async function ({ store, redirect, route }) {
  //check user logged in browser
  let status = localStorage.getItem('token')

  //user is not yet logged in on live app
  if (!store.state.user.isLoggedIn) {
    if (process.env.NODE_ENV === 'development') {
     // console.log('not yet logged in')
    }

    try {
      //try to call details from server
      if (
        status !== null &&
        route.name !== 'logout' &&
        route.name !== 'verify-email'
      ) {
        await store.dispatch('user/fetchDetails')
      }
    } catch (err) {

      if (err.status == 400) {
        store.dispatch('alert/setAlert', {
          message: err.msg,
          color: 'error',
          timeout: 10000,
          top: true,
          right: true,
        })
        return redirect('/logout')
      }

      if (route.name !== 'error') redirect('/error')
    }
  }
}
