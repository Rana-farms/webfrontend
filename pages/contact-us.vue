<template>
  <div class="page">
    <div class="hero">
      <div
        class="hero__cover flex items-center justify-start p-5 sm:p-10 md:p-20"
      >
        <div>
          <span class="block md:text-left text-white font-bold text-4xl mb-2"
            >Contact us</span
          >
          <span class="block md:text-left" style="color: #e2e0ef"
            >We are committed to providing our customers with exceptional
            service.</span
          >
        </div>
      </div>
    </div>

    <div class="p-5 md:p-20 flex flex-col lg:flex-row gap-10">
      <div class="max-w-sm">
        <span class="font-bold text-3xl block">Get in Touch with Us</span>
        <span class="hidden md:block my-2 mb-4 text-gray-500"
          >We are committed to providing our customers with exceptional
          service.</span
        >

        <div class="flex items-center mt-4">
          <v-icon>mdi-map-marker-outline</v-icon>
          <span class="text-dark ml-2">
            <span class="font-semibold block w">Address:</span>
            <span class="text-gray-500 w-64 block"
              >21 Buhari Shopping complex, Hadeija Road, Yankaba, 70213, Kano,
              Nigeria</span
            >
          </span>
        </div>

        <div class="flex items-center mt-3">
          <v-icon>mdi-email-outline</v-icon>
          <span class="text-dark ml-2">
            <span class="font-semibold block w">Email:</span>
            <span class="text-gray-500 w-64 block">info@rana.com.ng</span>
          </span>
        </div>

        <div class="flex items-center mt-3">
          <v-icon>mdi-phone-outline</v-icon>
          <span class="text-dark ml-2">
            <span class="font-semibold block w">Phone:</span>
            <span class="text-gray-500 w-64 block">+234 805 2040 002</span>
          </span>
        </div>
      </div>

      <div class="flex-1 grid grid-cols-12 gap-5">
        <v-text-field
          ref="name"
          name="Name"
          label="Name"
          v-model="data.name"
          :rules="rules.name"
          class="col-span-12 md:col-span-6 p-0 m-0"
          hide-details="auto"
          outlined
        ></v-text-field>

        <v-text-field
          ref="email"
          name="Email"
          label="Email"
          v-model="data.email"
          :rules="rules.email"
          type="email"
          class="col-span-12 md:col-span-6 p-0 m-0"
          hide-details="auto"
          outlined
        ></v-text-field>

        <v-text-field
          name="Phone number"
          ref="phone"
          v-model="data.phone"
          :rules="rules.phone"
          label="Phone number"
          class="col-span-12 p-0 m-0"
          hide-details="auto"
          outlined
        ></v-text-field>

        <v-text-field
          name="Subject"
          label="Subject"
          ref="subject"
          :rules="rules.subject"
          v-model="data.subject"
          class="col-span-12 p-0 m-0"
          hide-details="auto"
          outlined
        ></v-text-field>

        <v-textarea
          name="Write your Message"
          label="Write your Message"
          ref="message"
          v-model="data.message"
          :rules="rules.message"
          class="col-span-12 p-0 m-0"
          hide-details="auto"
          outlined
        >
        </v-textarea>

        <div class="col-span-12">
          <v-btn
            @click="sendMessage"
            color="primary"
            :loading="isSendingMessage"
            large
            elevation="0"
            >Send a message</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        name: '',
        phone: '',
        subject: '',
        email: '',
        message: '',
      },

      rules: {
        name: [(v) => !!v || 'This field is required'],
        phone: [(v) => !!v || 'This field is required'],
        subject: [(v) => !!v || 'This field is required'],
        email: [(v) => !!v || 'This field is required'],
        message: [(v) => !!v || 'This field is required'],
      },
      isSendingMessage: false,
    }
  },

  methods: {
    async sendMessage() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })

      if (this.canMoveOn) {
        try {
          this.isSendingMessage = true
          await this.$API.contact.contactUs(this.data)

          this.$store.dispatch('alert/setAlert', {
            message: 'Message sent successfully',
            color: 'success',
            timeout: 10000,
          })

          this.$router.replace('/')
        } catch (err) {
          this.$store.dispatch('alert/setAlert', {
            message: err.msg || 'Something went wrong',
            color: 'error',
            timeout: 10000,
          })
        } finally {
          this.isSendingMessage = false
        }
      }
    },
  },

  computed: {
    form() {
      return {
        name: this.data.name,
        phone: this.data.phone,
        subject: this.data.subject,
        email: this.data.email,
        message: this.data.message,
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

<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';
.page {
  min-height: 100vh;
  width: 100%;

  .hero {
    height: 40vh;
    background-image: url('/images/pages/contact-us/cover.png');
    background-size: cover;
    background-position: center;

    @include media-breakpoint-up(sm) {
      height: 30vh;
    }

    @include media-breakpoint-up(md) {
      height: 50vh;
    }

    &__cover {
      height: 100%;
      width: 100vw;
      background-color: #0d0d0d65;
    }
  }
}
</style>
