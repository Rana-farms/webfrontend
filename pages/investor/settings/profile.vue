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

    <!--  -->

    <span class="block font-semibold mb-3">Next of Kin</span>
    <div class="mb-10">
      <v-text-field
        block
        placeholder="Enter next of kin name"
        v-model="nextOfKin.fullName"
        ref="nextOfKinFullName"
        :rules="nextOfKinRules.nextOfKinFullName"
        label="Name"
        class="mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>

      <v-text-field
        block
        placeholder="Select relationship"
        v-model="nextOfKin.relationship"
        ref="nextOfKinRelationship"
        :rules="nextOfKinRules.nextOfKinRelationship"
        label="Relationship"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>

      <v-text-field
        block
        placeholder="Enter your phone number"
        label="Phone Number"
        v-model="nextOfKin.phone"
        ref="nextOfKinPhone"
        :rules="nextOfKinRules.nextOfKinPhone"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      ></v-text-field>

      <v-text-field
        block
        placeholder="Enter your address"
        label="Residential Address"
        v-model="nextOfKin.address"
        ref="nextOfKinAddress"
        :rules="nextOfKinRules.nextOfKinAddress"
        class="mt-5 mb-8 pa-0"
        hide-details="auto"
        outlined
      />

      <div class="flex justify-end">
        <v-btn
          elevation="0"
          color="primary"
          :loading="nextOfKinUpdating"
          @click="updateNextOfKin"
          large
          :disabled="JSON.stringify(nextOfKin) == JSON.stringify($nextOfKin)"
          >Save Changes</v-btn
        >
      </div>
    </div>
  </di>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      profile: null,
      nextOfKin: null,
      profileRules: {
        fullname: [(v) => !!v || 'Name is required'],
        phone: [(v) => !!v || 'Phone number is required'],
        email: [
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
        address: [(v) => !!v || 'Address is required'],
      },
      profileUpdating: false,
      nextOfKinRules: {
        nextOfKinFullName: [(v) => !!v || 'Name is required'],
        nextOfKinRelationship: [(v) => !!v || 'Relationship is required'],
        nextOfKinPhone: [(v) => !!v || 'Phone number is required'],
        nextOfKinAddress: [(v) => !!v || 'Address is required'],
      },
      nextOfKinUpdating: false,
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

    async updateNextOfKin() {
      Object.keys(this.nextOfKinForm).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canUpdateNextOfKin) {
        try {
          this.nextOfKinUpdating = true
          await this.$API.user.updateNextOfKin({
            fullname: this.nextOfKin.fullName,
            relationship: this.nextOfKin.relationship,
            phone: this.nextOfKin.phone,
            address: this.nextOfKin.address,
          })

          await this.$store.dispatch('user/fetchDetails')
          this.$store.dispatch('alert/setAlert', {
            message: 'Next of Kin updated successfully',
            color: 'success',
          })
        } catch (err) {
          this.$store.dispatch('alert/setAlert', {
            message: err.msg,
            color: 'error',
          })
        } finally {
          this.nextOfKinUpdating = false
        }
      }
    },
  },
  computed: {
    ...mapGetters({ $nextOfKin: 'user/nextOfKin', $profile: 'user/profile' }),
    profile() {
      return {
        fullname: this.user.fullname,
        phone: this.user.phone,
        email: this.user.email,
        address: this.user.address,
      }
    },

    userForm() {
      return {
        fullname: this.profile.fullname,
        phone: this.profile.phone,
        email: this.profile.email,
        address: this.profile.address,
      }
    },

    nextOfKinForm() {
      return {
        nextOfKinFullName: this.nextOfKin.fullName,
        nextOfKinRelationship: this.nextOfKin.relationship,
        nextOfKinPhone: this.nextOfKin.phone,
        nextOfKinAddress: this.nextOfKin.address,
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

    canUpdateNextOfKin() {
      const rules = Object.keys(this.nextOfKinRules)
      return rules
        .map((rule) => {
          return Object.keys(this.nextOfKinRules[rule])
            .map((field, index) => {
              return this.nextOfKinRules[rule][index](this.nextOfKinForm[rule])
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
    $nextOfKin: {
      deep: true,
      handler(val) {
        if (val != null) {
          this.nextOfKin = { ...val }
        }
      },
      immediate: true,
    },
  },
}
</script>

<style></style>
