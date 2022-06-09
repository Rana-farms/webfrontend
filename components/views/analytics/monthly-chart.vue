<template>
  <div class="block rounded-md shadow-sm bg-white p-5 py-8 flex-1">
    <v-skeleton-loader
      v-if="data == null"
      class="mx-auto"
      type="card"
      width="100%"
      height="350px"
    ></v-skeleton-loader>
    <div v-else>
      <span class="block font-semibold text-xl">Analytics</span>
      <div id="chart">
        <vue-apex-charts
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        ></vue-apex-charts>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: null,
    },
  },
  components: {
    VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: 'Monthly ROI',
          type: 'area',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
        },
        stroke: {
          width: [0],
          curve: 'smooth',
        },
        colors: ['#BE1F2C'],
        plotOptions: {
          bar: {
            columnWidth: '50%',
          },
        },

        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            // stops: [0, 100, 100, 100],
          },
        },
        labels: [],
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'month',
        },
        yaxis: {
          title: {
            text: 'Monthy ROI',
          },
          min: 0,
          labels: {
            formatter: (value) => {
              return this.formatToNaira(Number(value))
            },
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: (y) => {
              if (typeof y !== 'undefined') {
                return this.formatToNaira(Number(y))
              }
              return y
            },
          },
        },
      },
    }
  },
  watch: {
    data: {
      handler: function (newVal) {
        if (newVal) {
          this.series[0].data = newVal.map((item) => Number(item.total))
          this.chartOptions.labels = newVal.map((item) => item.month)
        }
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>

<style></style>
