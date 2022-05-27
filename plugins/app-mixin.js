import Vue from 'vue'
import {mapGetters} from 'vuex'
Vue.mixin({
  data(){
    return{
      scriptLoaded: null,
    }

  },
  methods:{
    loadPaystackScript(callback) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      document.getElementsByTagName("head")[0].appendChild(script);
      if (script.readyState) {
        // IE
        script.onreadystatechange = () => {
          if (
            script.readyState === "loaded" ||
            script.readyState === "complete"
          ) {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        // Others
        script.onload = () => {
          callback();
        };
      }
    },

  


    formatToNaira(value = 0) {
      const formatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(this.addKobo(value) / 100)
      return formatted
    },

     addKobo(value) {
      let amt = 0
      try {
        amt = parseFloat(value).toFixed(2).toString().split('.')
        amt = amt[0] + '' + (amt[1].toString().length === 1 ? amt[1] + '0' : amt[1])
      } catch (e) {}
      return Number(amt)
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

  },
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
      $wallet: 'user/wallet',
      $transactions: 'user/transactions',
      $investments: 'user/investments',
     })
  }
})
