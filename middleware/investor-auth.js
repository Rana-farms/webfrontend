export default async function ({ store, redirect }) {
  //check user logged in as investor
  if (!store.getters['user/isInvestor']) {
    redirect('/')
  }
}
