<<<<<<< HEAD
<template>
  <div class="page">
    <div class="hero">
      <div
        class="hero__cover flex items-center justify-start p-5 sm:p-10 md:p-20"
      >
        <div>
          <span class="block md:text-left text-white font-bold text-4xl mb-2"
            >About Us</span
          >
          <span class="block md:text-left" style="color: #e2e0ef"
            >We aim to support agriculture with innovative technology.</span
          >
        </div>
      </div>
    </div>

    <!--  -->
    <div class="flex flex-col md:flex-row p-5 md:px-20 gap-5 md:gap-10">
      <img
        class="mt-5 md:t-8 w-full md:hidden lg:block object-cover h-60 rounded-xl md:h-auto md:w-2/5"
        src="/images/pages/about-us/story.png"
        alt=""
      />
      <div class="flex-1">
        <div>
          <span class="font-semibold tracking-widest" style="color: #9d1e23a1"
            >Story of RANA Farms</span
          >
          <span
            class="font-bold text-2xl md:text-3xl lg:text-5xl block text-black"
            >We are RANA Farms
          </span>

          <span class="block my-5 text-light-dark">
            <p>
              Our story began in 2017. Back then we were in primary production
              of paddy with 13 hectares of leased farmland in Gaya LGA, Kano.
              This was the most challenging journey of RANA Farms, which enabled
              us to truly understand the problems faced by smallholder farmers.
            </p>

            <p>
              Today, we are privileged to be an Agricultural Service and
              Investment Company focused on improving the agricultural value
              chain by supporting smallholder farmers and cooperatives, with
              solutions using innovative technologies designed to improve yield
              and profitability.
            </p>

            <p>
              RANA is named after the sun, as a testament of its significance
              and importance to Agriculture. Our logo is sunrise which
              represents the birth of a new age in Africa's Agriculture.
            </p>
          </span>

          <v-btn color="primary" elevation="0" style="border-radius: 8px" large
            >Download company profile
          </v-btn>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="values px-5 mt-12 md:mt-0 md:p-20">
      <span
        class="font-semibold block text-center text-xl mb-2 md:mb-4 tracking-widest"
        style="color: #9d1e23a1"
        >OUR CORE VALUE</span
      >

      <span class="font-bold text-2xl md:text-4xl text-center block text-black"
        >We are RANA Farms
      </span>

      <span class="block text-center mt-3 tracking-wider" style="color: #545454"
        >Our company's <span style="color: #9d1e23">CORE VALUE</span> remains
        the same:</span
      >

      <div class="flex justify-center py-10 flex-wrap gap-10 md:gap-20">
        <div
          class="shadow-md p-6 rounded-lg w-72 md:w-80 inline-flex justify-center items-center"
        >
          <div class="block text-center">
            <div
              class="h-20 w-20 rounded-full bg-primary inline-flex justify-center items-center m-auto"
            >
              <v-icon color="#fff" size="40"
                >mdi-briefcase-variant-outline</v-icon
              >
            </div>
            <span class="block text-center my-2 font-semibold text-2xl"
              >Our vision</span
            >

            <span class="block text-light-dark my-1">
              To de-risk agriculture with technological innovation, while
              ensuring sustainable food security.
            </span>
          </div>
        </div>

        <div
          class="shadow-md p-6 rounded-lg w-72 md:w-80 inline-flex justify-center items-center"
        >
          <div class="block text-center">
            <div
              class="h-20 w-20 rounded-full bg-primary inline-flex justify-center items-center m-auto"
            >
              <v-icon color="#fff" size="40"
                >mdi-briefcase-variant-outline</v-icon
              >
            </div>
            <span class="block text-center my-2 font-semibold text-2xl"
              >Our Mission</span
            >

            <span class="block text-light-dark my-1">
              To accelerate Africa’s food security by providing innovative
              solutions for smallholder farmers and cooperatives through
              agricultural services and agribusiness development.
            </span>
          </div>
        </div>
      </div>
    </div>

    <!--  -->

    <div
      class="flex pillars p-5 mt-4 md:mt-6 lg:mt-12 md:mt-0 md:p-20 flex-col gap-10 lg:flex-row"
    >
      <div class="flex-1 list">
        <span class="font-bold text-3xl block">RANA Farms' Five Pillars</span>
        <span class="block text-light-dark mb-3"
          >Upon this foundation, our vision will excel and our mission will be
          accomplished.</span
        >

        <div
          class="flex gap-3 items-center mb-4"
          v-for="(pillar, index) in pillars"
          :key="index"
        >
          <div
            class="w-12 h-12 hidden md:block rounded-full bg-yellow-400"
          ></div>
          <div class="flex-1">
            <span class="block font-semibold">{{ pillar.title }}</span>
            <span class="text-light-dark">
              {{ pillar.talk }}
            </span>
          </div>
        </div>
      </div>
      <img
        class="w-full image order- object-cover h-60 md:h-96 rounded-xl lg:h-auto md:order-2 lg:w-2/5"
        src="/images/pages/about-us/pillars.png"
        alt=""
      />
    </div>

    <partners />

    <why-choose/>
  </div>
</template>

<script>
import partners from '@/components/views/partners.vue'
import WhyChoose from '~/components/views/why-choose.vue'

export default {
  components: {
    partners,
    WhyChoose,
  },
  data() {
    return {
      pillars: [
        {
          title: 'Analytics',
          talk: 'Decision-making using business analytics tools with 100% of the data collected from the field.',
        },
        {
          title: 'Insurance',
          talk: '$1 Million cover for Goods-in-Transit from NAICOM licensed Insurer.',
        },
        {
          title: 'Liquidity Management ',
          talk: 'Minimum 10% Cash Reserve Ratio in Dollars or Swiss Francs.',
        },
        {
          title: 'Risk Management ',
          talk: 'Maximum Debt-to-Asset Ratio of 1:2 in relation to all assets controlled.',
        },
        {
          title: 'Treasury Management ',
          talk: 'Corporate treasury strategy is to acquire Bitcoin for 100% of long term liabilities.',
        },
      ],
    }
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
    background-image: url('/images/pages/about-us/cover.png');
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

  .pillars {
    .list {
      order: 2;

      @include media-breakpoint-up(md) {
        order: 1;
      }
    }

    .image {
      order: 1;
      @include media-breakpoint-up(md) {
        order: 2;
      }
    }
  }
}
</style>
=======
<template>
  <div class="page">
    <div class="hero">
      <div
        class="hero__cover flex items-center justify-start p-5 sm:p-10 md:p-20"
      >
        <div>
          <span class="block md:text-left text-white font-bold text-4xl mb-2"
            >About Us</span
          >
          <span class="block md:text-left" style="color: #e2e0ef"
            >We aim to support agriculture with innovative technology.</span
          >
        </div>
      </div>
    </div>

    <!--  -->
    <div class="flex flex-col md:flex-row p-5 md:px-20 gap-5 md:gap-10">
      <img
        class="mt-5 md:t-8 w-full md:hidden lg:block object-cover h-60 rounded-xl md:h-auto md:w-2/5"
        src="/images/pages/about-us/story.png"
        alt=""
      />
      <div class="flex-1">
        <div>
          <span class="font-semibold tracking-widest" style="color: #9d1e23a1"
            >Story of RANA Farms</span
          >
          <span
            class="font-bold text-2xl md:text-3xl lg:text-5xl block text-black"
            >We are RANA Farms
          </span>

          <span class="block my-5 text-light-dark">
            <p>
              Our story began in 2017. Back then we were in primary production
              of paddy with 13 hectares of leased farmland in Gaya LGA, Kano.
              This was the most challenging journey of RANA Farms, which enabled
              us to truly understand the problems faced by smallholder farmers.
            </p>

            <p>
              Today, we are privileged to be an Agricultural Service and
              Investment Company focused on improving the agricultural value
              chain by supporting smallholder farmers and cooperatives, with
              solutions using innovative technologies designed to improve yield
              and profitability.
            </p>

            <p>
              RANA is named after the sun, as a testament of its significance
              and importance to Agriculture. Our logo is sunrise which
              represents the birth of a new age in Africa's Agriculture.
            </p>
          </span>

          <v-btn color="primary" elevation="0" style="border-radius: 8px" large
            >Download company profile
          </v-btn>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="values px-5 mt-12 md:mt-0 md:p-20">
      <span
        class="font-semibold block text-center text-xl mb-2 md:mb-4 tracking-widest"
        style="color: #9d1e23a1"
        >OUR CORE VALUE</span
      >

      <span class="font-bold text-2xl md:text-4xl text-center block text-black"
        >We are RANA Farms
      </span>

      <span class="block text-center mt-3 tracking-wider" style="color: #545454"
        >Our company's <span style="color: #9d1e23">CORE VALUE</span> remains
        the same:</span
      >

      <div class="flex justify-center py-10 flex-wrap gap-10 md:gap-20">
        <div
          class="shadow-md p-6 rounded-lg w-72 md:w-80 inline-flex justify-center items-center"
        >
          <div class="block text-center">
            <div
              class="h-20 w-20 rounded-full bg-primary inline-flex justify-center items-center m-auto"
            >
              <v-icon color="#fff" size="40"
                >mdi-briefcase-variant-outline</v-icon
              >
            </div>
            <span class="block text-center my-2 font-semibold text-2xl"
              >Our vision</span
            >

            <span class="block text-light-dark my-1">
              To de-risk agriculture with technological innovation, while
              ensuring sustainable food security.
            </span>
          </div>
        </div>

        <div
          class="shadow-md p-6 rounded-lg w-72 md:w-80 inline-flex justify-center items-center"
        >
          <div class="block text-center">
            <div
              class="h-20 w-20 rounded-full bg-primary inline-flex justify-center items-center m-auto"
            >
              <v-icon color="#fff" size="40"
                >mdi-briefcase-variant-outline</v-icon
              >
            </div>
            <span class="block text-center my-2 font-semibold text-2xl"
              >Our Mission</span
            >

            <span class="block text-light-dark my-1">
              To accelerate Africa’s food security by providing innovative
              solutions for smallholder farmers and cooperatives through
              agricultural services and agribusiness development.
            </span>
          </div>
        </div>
      </div>
    </div>

    <!--  -->

    <div
      class="flex pillars p-5 mt-4 md:mt-6 lg:mt-12 md:mt-0 md:p-20 flex-col gap-10 lg:flex-row"
    >
      <div class="flex-1 list">
        <span class="font-bold text-3xl block">RANA Farms' Five Pillars</span>
        <span class="block text-light-dark mb-3"
          >Upon this foundation, our vision will excel and our mission will be
          accomplished.</span
        >

        <div
          class="flex gap-3 items-center mb-4"
          v-for="(pillar, index) in pillars"
          :key="index"
        >
          <div
            class="w-12 h-12 hidden md:block rounded-full bg-yellow-400"
          ></div>
          <div class="flex-1">
            <span class="block font-semibold">{{ pillar.title }}</span>
            <span class="text-light-dark">
              {{ pillar.talk }}
            </span>
          </div>
        </div>
      </div>
      <img
        class="w-full image order- object-cover h-60 md:h-96 rounded-xl lg:h-auto md:order-2 lg:w-2/5"
        src="/images/pages/about-us/pillars.png"
        alt=""
      />
    </div>

    <partners />

    <why-choose/>
  </div>
</template>

<script>
import partners from '@/components/views/partners.vue'
import WhyChoose from '~/components/views/why-choose.vue'

export default {
  components: {
    partners,
    WhyChoose,
  },
  data() {
    return {
      pillars: [
        {
          title: 'Analytics',
          talk: 'Decision-making using business analytics tools with 100% of the data collected from the field.',
        },
        {
          title: 'Insurance',
          talk: '$1 Million cover for Goods-in-Transit from NAICOM licensed Insurer.',
        },
        {
          title: 'Liquidity Management ',
          talk: 'Minimum 10% Cash Reserve Ratio in Dollars or Swiss Francs.',
        },
        {
          title: 'Risk Management ',
          talk: 'Maximum Debt-to-Asset Ratio of 1:2 in relation to all assets controlled.',
        },
        {
          title: 'Treasury Management ',
          talk: 'Corporate treasury strategy is to acquire Bitcoin for 100% of long term liabilities.',
        },
      ],
    }
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
    background-image: url('/images/pages/about-us/cover.png');
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

  .pillars {
    .list {
      order: 2;

      @include media-breakpoint-up(md) {
        order: 1;
      }
    }

    .image {
      order: 1;
      @include media-breakpoint-up(md) {
        order: 2;
      }
    }
  }
}
</style>
>>>>>>> b1a5db2cf54869e1abeecb331a049e0f59481d5b
