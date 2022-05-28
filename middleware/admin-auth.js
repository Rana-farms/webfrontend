export default async function ({ store, redirect }) {
    //check user logged in as admin
    if (!store.getters['user/isAdmin'] && !store.getters['user/isSuperAdmin']) {
      redirect('/')
    }
  }
  