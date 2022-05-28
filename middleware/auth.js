export default async function ({
  store,
  redirect
}) {
  if (store.state.user.isLoggedIn) {
    redirect('/dashboard');
  }
}
