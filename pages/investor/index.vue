<template>
  <div class="page">
    <span class="block font-semibold text-2xl">Dashboard</span>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center py-8 gap-6"
    >
      <div class="shadow-sm rounded-md  p-8  bg-white">
        <div class="flex items-center">
          <div class=" flex-1">
            <span class="block font-semibold text-2xl">₦120,010</span>
            <span class=" text-sm text-gray-400">Monthly ROI</span>
          </div>
          <v-icon size="50" color="#6E81DF">mdi-poll</v-icon>
        </div>
        <div class="mt-3 text-sm">
         <span class="inline-flex items-center" style="color:#039E00">2.65%  <v-icon color="#039E00">mdi-arrow-up-bold</v-icon></span>
         <span class="  text-gray-400">Since Last Week</span>
        </div>

      </div>
      <div class="shadow-sm rounded-md  bg-white"></div>
      <div class="shadow-sm rounded-md  bg-white"></div>
      <div class="shadow-sm rounded-md  bg-white"></div>
    </div>

    <div class="flex">
      <div class="block rounded-md shadow-sm bg-white p-5 py-8 w-3/5">
        <span class="block font-semibold text-xl">Analytics</span>
          <div id="chart">
        <vue-apex-charts type="line" height="350" :options="chartOptions" :series="series"></vue-apex-charts>
      </div>
      </div>
     
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  layout: 'investor',
  components: {
    VueApexCharts
  },
  data() {
    return {
      
        series: [
          {
            name: 'TEAM A',
            type: 'column',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
          },
          {
            name: 'TEAM B',
            type: 'area',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
          },
          {
            name: 'TEAM C',
            type: 'line',
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
          },
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            stacked: false,
          },
          stroke: {
            width: [0, 2, 5],
            curve: 'smooth',
          },
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
              stops: [0, 100, 100, 100],
            },
          },
          labels: [
            '01/01/2003',
            '02/01/2003',
            '03/01/2003',
            '04/01/2003',
            '05/01/2003',
            '06/01/2003',
            '07/01/2003',
            '08/01/2003',
            '09/01/2003',
            '10/01/2003',
            '11/01/2003',
          ],
          markers: {
            size: 0,
          },
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            title: {
              text: 'Points',
            },
            min: 0,
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== 'undefined') {
                  return y.toFixed(0) + ' points'
                }
                return y
              },
            },
          },
        },
      
    }
  },
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100%;
  padding: 30px;
}
</style>
