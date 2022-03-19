<template>
  <div class="page">
    <div class="hero">
      <div
        class="hero__cover flex items-center justify-start p-5 sm:p-10 md:p-20"
      >
        <div>
          <span class="block md:text-left text-white font-bold text-4xl mb-2"
            >What We Do</span
          >
          <span class="block md:text-left" style="color: #e2e0ef"
            >Helping farmers improve food security, while de-risking
            agribusiness.</span
          >
        </div>
      </div>
    </div>

    <div class="services">
      <img
        class="services__image"
        src="/images/pages/purpose/services.png"
        alt=""
      />
      <div class="services__lists">
        <span
          class="tracking-widest text-primary font-semibold text-xl block my-3"
          >SERVICES</span
        >
        <span class="block text-2xl md:text-3xl font-bold"
          >What RANA Farms does</span
        >

        <ul
          class="list-disc mt-3 px-5 text-xl md:text-2xl"
          style="color: #545454"
        >
          <li>Produce Aggregation & Input Supply</li>

          <li>Agricultural Logistics Services</li>

          <li>Asset Management</li>

          <li>Mechanisation</li>

          <li>Consulting Services</li>
        </ul>
      </div>
    </div>

    <div class="investment">
      <div class="services__lists services__lists--two">
        <span class="block text-2xl md:text-3xl font-bold">Investment</span>

        <span class="block text-light-dark mb-4"
          >Sustainable agricultural investments made by RANA Farms over the
          years.</span
        >

        <div class="flex gap-3 items-center mb-4">
          <div
            class="w-12 h-12 hidden md:block rounded-full bg-yellow-400"
          ></div>
          <div class="flex-1">
            <span class="block font-semibold">Farmlands</span>
            <span class="text-light-dark">
              Acquisition of farmlands to lease in exchange for grain.
            </span>
          </div>
        </div>

        <div class="flex gap-3 items-center mb-4">
          <div
            class="w-12 h-12 hidden md:block rounded-full bg-yellow-400"
          ></div>
          <div class="flex-1">
            <span class="block font-semibold">Storage Facilities</span>
            <span class="text-light-dark">
              Acquisition of farmlands to lease in exchange for grain.
            </span>
          </div>
        </div>

        <div class="flex gap-3 items-center mb-4">
          <div
            class="w-12 h-12 hidden md:block rounded-full bg-yellow-400"
          ></div>
          <div class="flex-1">
            <span class="block font-semibold">Primary Production</span>
            <span class="text-light-dark">
              The construction, acquisition and asset management of storage
              facilities.
            </span>
          </div>
        </div>
      </div>

      <img
        class="services__image services__image--two"
        src="/images/pages/purpose/investment.png"
        alt=""
      />
    </div>

    <div class="p-5 p-10">
      <span class="block text-center font-semibold text-3xl text-dark"
        >Trust Investing</span
      >

      <div class="max-w-xl text-center m-auto text-light-dark my-3">
       A trust company is established as a special purpose vehicle (SPV),
       while investors are shareholders of the trust company. 
       Thus, the incorporated entity passes profits directly to investors
       rather than reinvesting in the fund.
      </div>
      <div class="flex justify-center gap-8 mt-10 flex-wrap">
        
           <div class="shadow-md rounded-md p-5 max-w-xs">
          <span class="text-primary block font-semibold text-xl"
            >Agricultural Logistics Trust</span
          >
          <span class="text-gray-500 block my-2"
            >This trust is invested in the logistic of produce to generate
            profit for unit holders.</span
          >

          <ul class="p-0 m-0 list-none">
            <li><b>Assets Allocation:</b> Max. 90% in Vehicle Acquisition</li>
            <li><b>Investment Agreement:</b> Cost-Plus Financing</li>
            <li><b>Minimum Investment:</b> 200,000 Units</li>
            <li><b>Unit Price:</b> $ 0.05</li>
            <li><b>Insurance Fee:</b> 3%</li>
            <li><b>Look-Up Period:</b> 2 Years</li>
            <li><b>Risk Profile:</b> Medium Risk Appetite</li>
          </ul>
        </div>

         <div class="shadow-md rounded-md p-5 max-w-xs">
          <span class="text-primary block font-semibold text-xl"
            >Agricultural Commodity Trust
          </span>
          <span class="text-gray-500 block my-2"
            >This trust is invested in aggregation of produce and commodity trading to generate profit for shareholders.</span
          >

          <ul class="p-0 m-0 list-none">
           <li><b>Assets Allocation:</b> Min. 10% in Cash/Max. 90% in Commodity</li>
            <li><b>Investment Agreement:</b> Profit Sharing</li>
            <li><b>Minimum Investment:</b> 100,000 Units</li>
            <li><b>Unit Price:</b> &#8358; 10.00</li>
            <li><b>Insurance Fee:</b> 4%</li>
            <li><b>Look-Up Period:</b> 1 Year</li>
            <li><b>Risk Profile:</b> Medium Risk Appetite</li>
          </ul>
        </div>
<div class="shadow-md rounded-md p-5 max-w-xs">
          <span class="text-primary block font-semibold text-xl"
            >Agricultural Storage Trust
          </span>
          <span class="text-gray-500 block my-2"
            >This trust is invested in construction or acquisition of storage facilities to generate profit for unit holders.

</span
          >

          <ul class="p-0 m-0 list-none">
            <li>
              <b>Assets Allocation:</b>Max. 90% in Construction or Acquisition
            </li>
            <li><b>Investment Agreement:  </b> Cost-Plus Financing</li>
            <li><b>Minimum Investment:</b> 2,500,000 Units</li>
            <li><b>Unit Price:</b> &#8358;1.00</li>
            <li><b>Look-Up Period:</b> 5 Years</li>
            <li><b>Risk Profile:</b> Low Risk Appetite</li>
          </ul>
        </div>
       
      </div>
    </div>

    <partners />
    <why-choose />
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
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/breakpoints.scss';

ul {
  margin: 0;
  padding: 0;

  b {
    font-weight: 600;
  }

  li {
    margin-bottom: 3px;
  }
}
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

  .services,
  .investment {
    display: flex;
    padding: 20px;
    gap: 20px;
    flex-direction: column;

    @include media-breakpoint-up(sm) {
      flex-direction: row;
      gap: 30px;
      padding: 50px;
    }

    @include media-breakpoint-up(md) {
      gap: 50px;
      padding: 80px;
    }

    &__image {
      width: 100%;
      display: block;
      object-fit: cover;
      border-radius: 25px;

      &--two {
        order: 1;

        @include media-breakpoint-up(sm) {
          order: 2;
        }
      }

      @include media-breakpoint-up(sm) {
        width: 40%;
      }
    }
    &__lists {
      flex: 1 1 0%;

      order: 2;

      @include media-breakpoint-up(sm) {
        order: 1;
      }
    }
  }
}
</style>
