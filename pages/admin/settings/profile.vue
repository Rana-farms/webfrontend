<template>
  <di v-if="profile != null">
    <span class="font-semibold text-xl block mb-5" style="color: #211a55"
      >Profile Settings</span
    >
    <span class="block font-semibold mb-5">Your personal Information</span>
    <div class="mb-10">
      <v-text-field
        block
        placeholder="Enter your name"
        ref="fullname"
        v-model="profile.fullname"
        label="Name"
        class="mb-6 pa-0"
        hide-details="auto"
        :rules="profileRules.fullname"
        outlined
      ></v-text-field>

      
      <v-select 
        block
        disabled
        placeholder="Select Role"
        label="Role"
        v-model="profile.role"
        ref="role"
        class="mt-3 mb-6 pa-0"
        hide-details="auto"
        :items="roles"
        item-value="text"
        item-text="text"
        :rules="profileRules.role"
        outlined
      />

      <v-text-field
        block
        placeholder="Enter your phone number"
        label="Phone Number"
        ref="phone"
        v-model="profile.phone"
        class="mt-3 mb-6 pa-0"
        hide-details="auto"
        :rules="profileRules.phone"
        outlined
      ></v-text-field>

      <v-text-field
        block
        placeholder="Enter your email"
        label="Email Address"
        ref="email"
        v-model="profile.email"
        disabled
        type="email"
        class="mt-3 mb-6 pa-0"
        hide-details="auto"
        :rules="profileRules.email"
        outlined
      />

        <v-text-field
        block
        placeholder="Enter your address"
        label="Residential Address"
        v-model="profile.address"
        ref="address"
        class="mt-3 mb-6 pa-0"
        hide-details="auto"
        :rules="profileRules.address"
        outlined
      />


      <div class="flex justify-end">
        <v-btn
          elevation="0"
          :loading="profileUpdating"
          @click="updateUser"
          color="primary"
          large
          :disabled="JSON.stringify(profile) == JSON.stringify($profile)"
          >Save Changes</v-btn
        >
      </div>
    </div>
  </di>
</template>

<script>
export default {
  data() {
    return {
      profile: null,
      roles: [
        { text: 'Admin', value: 'admin' },
        { text: 'Super Admin', value: 'superadmin' },
      ],

      profileRules: {
        fullname: [(v) => !!v || 'Name is required'],
        phone: [(v) => !!v || 'Phone number is required',
          (v) => /^\d{11}$/.test(v) || 'Phone number must be 11 digits'
        ],
        email: [
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
                address: [(v) => !!v || 'Address is required'],

      },
      profileUpdating: false,
    }
  },
  methods: {
    async updateUser() {
      Object.keys(this.userForm).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canUpdateDetails) {
        try {
          this.profileUpdating = true
          await this.$API.user.updateDetails({
            fullname: this.profile.fullname,
            phone: this.profile.phone,
            address: this.profile.address,
           // role: this.roles.find((r) => r.text === this.profile.role).value,
          })

          await this.$store.dispatch('user/fetchDetails')
          this.$store.dispatch('alert/setAlert', {
            message: 'Profile updated successfully',
            color: 'success',
          })
        } catch (error) {
          this.$store.dispatch('alert/setAlert', {
            message: error.msg,
            color: 'error',
          })
        } finally {
          this.profileUpdating = false
        }
      }
    },
  },
  computed: {
    userForm() {
      return {
        fullname: this.profile.fullname,
        phone: this.profile.phone,
        email: this.profile.email,
        address: this.profile.address,
      }
    },

    canUpdateDetails() {
      const rules = Object.keys(this.profileRules)
      return rules
        .map((rule) => {
          return Object.keys(this.profileRules[rule])
            .map((field, index) => {
              return this.profileRules[rule][index](this.userForm[rule])
            })
            .every((val) => val == true)
        })
        .every((val) => val == true)
    },
  },
  watch: {
    $profile: {
      deep: true,
      handler(val) {
        if (val != null) {
          this.profile = { ...val }
        }
      },
      immediate: true,
    },
  },
}
</script>

<style></style>
