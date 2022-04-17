import Vue from 'vue'
import {mapGetters} from 'vuex'
Vue.mixin({
  computed: {
     ...mapGetters({
      $user: 'user/profile',
      $profile: 'user/profile',
      $isLoggedIn: 'user/isLoggedIn',
      $isAdmin: 'user/isAdmin',
      $isSuperAdmin: 'user/isSuperAdmin',
      $isInvestor: 'user/isInvestor',
      token: 'user/token',
      $bank: 'user/bank',
      $nextOfKin: 'user/nextOfKin',
      $role: 'user/role',
     })
  }
})
