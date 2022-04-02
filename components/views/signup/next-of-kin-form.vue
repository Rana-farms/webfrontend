<template>
  <div class="form">
    <div class="flex flex-col gap-5">
      <v-text-field
        v-model="data.next_of_kin_fullname"
        ref="next_of_kin_fullname"
        name="Name"
        label="Name"
        outlined
        hide-details="auto"
        :rules="rules.next_of_kin_fullname"
      ></v-text-field>

      <v-text-field
        v-model="data.next_of_kin_phone"
        ref="next_of_kin_phone"
        name="Phone number"
        label="Phone number"
        outlined
        hide-details="auto"
        :rules="rules.next_of_kin_phone"
      ></v-text-field>

      <v-text-field
        v-model="data.next_of_kin_email"
        ref="next_of_kin_email"
        name="Email"
        label="Email"
        type="email"
        outlined
        hide-details="auto"
        :rules="rules.next_of_kin_email"
      ></v-text-field>

      <v-text-field
        v-model="data.next_of_kin_address"
        ref="next_of_kin_address"
        name="Address"
        label="Address"
        outlined
        hide-details="auto"
        :rules="rules.next_of_kin_address"
      ></v-text-field>
      
      <v-text-field
        v-model="data.relationship"
        ref="relationship"
        name="Relationship"
        label="Relationship"
        outlined
        hide-details="auto"
        :rules="rules.relationship"
      ></v-text-field>
    </div>

    <div class="grid grid-cols-12 items-center">
      <v-btn
        color="primary"
        @click="$emit('back')"
        class="col-span-2"
        text
        large
      >
        <v-icon>mdi-chevron-left</v-icon></v-btn
      >
      <v-btn
        color="primary"
        @click="NEXT"
        class="my-3 col-span-10"
        elevation="0"
        large
        >Next <v-icon right>mdi-chveron-right</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      data: {
        next_of_kin_fullname: '',
        next_of_kin_phone: '',
        next_of_kin_email: '',
        next_of_kin_address: '',
        relationship: '',
      },
      rules: {
        next_of_kin_fullname: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 20 || 'Name must be less than 20 characters',
        ],
        next_of_kin_phone: [
          (v) => !!v || 'Phone is required',
          // v => v.length <= 20 || 'Phone must be less than 20 characters',
        ],
        next_of_kin_email: [
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
        next_of_kin_address: [
          (v) => !!v || 'Address is required',
          //  v => v.length <= 20 || 'Address must be less than 20 characters',
        ],
        relationship:[
          (v) => !!v || 'Relationship is required',
        ]
      },
    }
  },
  methods: {
    NEXT() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canMoveOn) {
        this.$emit('next', this.data)
      }
    },
  },

  computed: {
    form() {
      return {
        next_of_kin_fullname: this.data.next_of_kin_fullname,
        next_of_kin_phone: this.data.next_of_kin_phone,
        next_of_kin_email: this.data.next_of_kin_email,
        next_of_kin_address: this.data.next_of_kin_address,
        relationship: this.data.relationship,
      }
    },

    canMoveOn() {
      const rules = Object.keys(this.rules)

      return rules
        .map((rule) => {
          return Object.keys(this.rules[rule])
            .map((field, index) => {
              return this.rules[rule][index](this.data[rule])
            })
            .every((val) => val == true)
        })
        .every((val) => val == true)
    },
  },
}
</script>

<style lang="scss" scoped></style>
