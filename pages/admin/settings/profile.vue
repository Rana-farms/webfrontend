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

      <v-select
        block
        placeholder="Select Role"
        label="Role"
        v-model="profile.role"
        ref="role"
        class="mt-3 mb-6 pa-0"
        hide-details="auto"
        :items="roles"
        item-key="name"
        item-text="text"
        :rules="profileRules.role"
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
        { text: 'Investor', value: 'investor' },
        { text: 'Admin', value: 'admin' },
        { text: 'Super Admin', value: 'superadmin' },
      ],

      profileRules: {
        fullname: [(v) => !!v || 'Name is required'],
        phone: [(v) => !!v || 'Phone number is required'],
        email: [
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
        role: [(v) => !!v || 'Role is required'],
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
        role: this.profile.role,
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
