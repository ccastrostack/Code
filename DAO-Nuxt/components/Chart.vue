<template>
  <div>
    <div
      v-if="daoData.dao.hasOwnProperty('token') === false"
      class="flex flex-col justify-center items-center bg-gray-50 rounded-3xl py-24"
    >
      <svg
        class="h-20 w-20"
        width="142"
        height="142"
        viewBox="0 0 142 142"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 71C11 37.8629 37.8629 11 71 11C104.137 11 131 37.8629 131 71C131 104.137 104.137 131 71 131C37.8629 131 11 104.137 11 71Z"
          fill="#FEF0C7"
        />
        <path
          d="M70.9997 61.001V71.001M70.9997 81.001H71.0247M66.7247 48.151L45.5497 83.501C45.1131 84.2571 44.8821 85.1142 44.8797 85.9873C44.8772 86.8603 45.1034 87.7188 45.5358 88.4773C45.9681 89.2358 46.5915 89.8679 47.344 90.3106C48.0964 90.7534 48.9517 90.9914 49.8247 91.001H92.1747C93.0477 90.9914 93.903 90.7534 94.6554 90.3106C95.4079 89.8679 96.0313 89.2358 96.4636 88.4773C96.896 87.7188 97.1222 86.8603 97.1197 85.9873C97.1173 85.1142 96.8863 84.2571 96.4497 83.501L75.2747 48.151C74.829 47.4163 74.2015 46.8088 73.4527 46.3872C72.7039 45.9656 71.859 45.7441 70.9997 45.7441C70.1403 45.7441 69.2955 45.9656 68.5467 46.3872C67.7979 46.8088 67.1704 47.4163 66.7247 48.151Z"
          stroke="#DC6803"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M71 120.286C43.7803 120.286 21.7143 98.2197 21.7143 71H0.285715C0.285715 110.054 31.9456 141.714 71 141.714V120.286ZM120.286 71C120.286 98.2197 98.2197 120.286 71 120.286V141.714C110.054 141.714 141.714 110.054 141.714 71H120.286ZM71 21.7143C98.2197 21.7143 120.286 43.7803 120.286 71H141.714C141.714 31.9456 110.054 0.285715 71 0.285715V21.7143ZM71 0.285715C31.9456 0.285715 0.285715 31.9456 0.285715 71H21.7143C21.7143 43.7803 43.7803 21.7143 71 21.7143V0.285715Z"
          fill="#FFFAEB"
        />
      </svg>
      <h1 class="pb-4 text-2xl font-medium text-gray-400 mt-4">
        No verified token
      </h1>
      <p class="text-gray-400 text-center m-0">
        If this is your DAO, please contact us to submit your token details.
      </p>
    </div>

    <div v-else-if="daoData.dao?.token && daoData.dao.token?.live">
      <div class="bg-gray-50 rounded-3xl py-4 lg:py-12">
        <div
          class="flex flex-col lg:flex-row justify-between px-4 md:px-14 mb-10"
        >
          <div>
            <p class="text-base text-gray-500 font-normal mr-4 mb-1">
              Unit price
            </p>
            <div v-if="latestData" class="flex items-center">
              <h1 class="text-4xl font-medium align-middle">
                ${{ formatValue(latestData.price) }}
              </h1>
              <span
                class="text-base text-white font-normal px-1 rounded-md ml-2"
                :class="{
                  'bg-success-400': periodChange > 0,
                  'bg-error-500': periodChange < 0,
                }"
              >
                {{ periodChange.toFixed(2) }}%
              </span>
            </div>
          </div>

          <div
            class="flex flex-wrap items-center px-4 sm:px-2 mt-2 lg:mt-0 max-w-fit sm:w-auto rounded-lg bg-gray-100 medium-text-sm h-11"
          >
            <button
              :class="[selectedFilter === '1d' ? ' selected' : 'not-selected']"
              @click="
                selectedFilter = '1d';
                interval = '5m';
              "
            >
              1D
            </button>
            <button
              :class="[selectedFilter === '7d' ? ' selected' : 'not-selected']"
              @click="
                selectedFilter = '7d';
                interval = '30m';
              "
            >
              7D
            </button>
            <button
              :class="[selectedFilter === '1m' ? ' selected' : 'not-selected']"
              @click="
                selectedFilter = '1m';
                interval = '4h';
              "
            >
              1M
            </button>
            <button
              :class="[selectedFilter === '3m' ? ' selected' : 'not-selected']"
              @click="
                selectedFilter = '3m';
                interval = '12h';
              "
            >
              3M
            </button>

            <button
              :class="[selectedFilter === '1y' ? ' selected' : 'not-selected']"
              @click="
                selectedFilter = '1y';
                interval = '30m';
              "
            >
              1Y
            </button>

            <!-- <button
              :class="[
                selectedFilter === 'all' ? ' selected' : 'not-selected',
              ]"
              @click="selectedFilter = 'all'; interval = '1d'"
            >
              ALL
            </button> -->
          </div>
        </div>
        <div v-if="hasData" class="w-full -px-4">
          <LineChart :chart-data="chartData" :options="lineChartOptions" />
        </div>
        <div v-else>
          <img
            src="/error/search-not-found.png"
            alt="search not found"
            class="w-1/3 mx-auto py-20"
          />
          <h1 class="text-xl text-center md:text-2xl text-gray-400">
            Oops! No data
          </h1>
        </div>
      </div>
      <div v-if="latestData" class="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <div class="border border-gray-100 rounded-2xl p-4">
          <div class="flex items-center relative">
            <p class="hidden xl:flex text-xs text-gray-500 absolute right-0">
              24h
            </p>
            <h3 class="text-sm text-gray-500 font-medium mr-4">Market Cap</h3>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="#F2F4F7" />
              <path
                d="M10.7068 10.6668C10.8113 10.3697 11.0175 10.1193 11.289 9.95972C11.5604 9.80018 11.8796 9.74186 12.19 9.79509C12.5003 9.84832 12.7818 10.0097 12.9846 10.2506C13.1874 10.4915 13.2984 10.7963 13.2979 11.1112C13.2979 12.0001 11.9646 12.4446 11.9646 12.4446M12.0001 14.2223H12.0046M16.4446 12.0001C16.4446 14.4547 14.4547 16.4446 12.0001 16.4446C9.54551 16.4446 7.55566 14.4547 7.55566 12.0001C7.55566 9.54551 9.54551 7.55566 12.0001 7.55566C14.4547 7.55566 16.4446 9.54551 16.4446 12.0001Z"
                stroke="#667085"
                stroke-width="1.11333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div
            class="flex flex-col xl:flex-row items-start xl:items-center justify-between mt-3"
          >
            <h1 class="text-lg xl:text-2xl font-semibold">
              ${{ formatValue(latestData.market_cap) }}
            </h1>

            <div>
              <span
                class="xl:text-lg"
                :class="[
                  latestData.price_change_24h < 0
                    ? 'text-error-500'
                    : 'text-success-400',
                ]"
              >
                {{ formatValue(latestData.price_change_24h) }}%
              </span>
            </div>
          </div>
        </div>

        <div class="border border-gray-100 rounded-2xl p-4">
          <div class="flex items-center">
            <h3 class="text-sm text-gray-500 font-medium mr-4">Total Supply</h3>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="#F2F4F7" />
              <path
                d="M10.7068 10.6668C10.8113 10.3697 11.0175 10.1193 11.289 9.95972C11.5604 9.80018 11.8796 9.74186 12.19 9.79509C12.5003 9.84832 12.7818 10.0097 12.9846 10.2506C13.1874 10.4915 13.2984 10.7963 13.2979 11.1112C13.2979 12.0001 11.9646 12.4446 11.9646 12.4446M12.0001 14.2223H12.0046M16.4446 12.0001C16.4446 14.4547 14.4547 16.4446 12.0001 16.4446C9.54551 16.4446 7.55566 14.4547 7.55566 12.0001C7.55566 9.54551 9.54551 7.55566 12.0001 7.55566C14.4547 7.55566 16.4446 9.54551 16.4446 12.0001Z"
                stroke="#667085"
                stroke-width="1.11333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="flex items-center justify-between mt-3">
            <h1 class="text-lg xl:text-2xl font-semibold">
              {{ formatValue(latestData.total_supply) }}
            </h1>
            <div>
              <span
                class="text-lg"
                :class="{
                  'text-success-400': latestData.ticker > 0,
                  'text-error-500': latestData.ticker < 0,
                }"
              >
              </span>
            </div>
          </div>
          <p class="text-xs text-gray-500"></p>
        </div>

        <div class="border border-gray-100 rounded-2xl p-4">
          <div class="flex items-center relative">
            <h3 class="text-sm text-gray-500 font-medium mr-4">Volume</h3>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="#F2F4F7" />
              <path
                d="M10.7068 10.6668C10.8113 10.3697 11.0175 10.1193 11.289 9.95972C11.5604 9.80018 11.8796 9.74186 12.19 9.79509C12.5003 9.84832 12.7818 10.0097 12.9846 10.2506C13.1874 10.4915 13.2984 10.7963 13.2979 11.1112C13.2979 12.0001 11.9646 12.4446 11.9646 12.4446M12.0001 14.2223H12.0046M16.4446 12.0001C16.4446 14.4547 14.4547 16.4446 12.0001 16.4446C9.54551 16.4446 7.55566 14.4547 7.55566 12.0001C7.55566 9.54551 9.54551 7.55566 12.0001 7.55566C14.4547 7.55566 16.4446 9.54551 16.4446 12.0001Z"
                stroke="#667085"
                stroke-width="1.11333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p class="hidden xl:flex text-xs text-gray-500 absolute right-0">
              24h
            </p>
          </div>
          <div
            class="flex flex-col xl:flex-row items-start xl:items-center justify-between mt-3"
          >
            <h1 class="text-lg xl:text-2xl font-semibold">
              ${{ formatValue(latestData.volume) }}
            </h1>
            <div>
              <span
                class="xl:text-lg"
                :class="{
                  'text-success-400': latestData.volume_change_24h > 0,
                  'text-error-500': latestData.volume_change_24h < 0,
                }"
              >
                {{ formatValue(latestData.volume_change_24h) }}%
              </span>
            </div>
          </div>
          <p class="text-xs text-gray-500"></p>
        </div>
      </div>

      <!-- <div class="bg-gray-50 rounded-3xl px-10 py-12 mt-8">
        <h1 class="pb-4 text-2xl font-medium text-gray-900">
          Recent purchases
        </h1>
        <div class="mt-8">
          <div class="grid grid-cols-4 mb-8">
            <h4 class="text-sm text-gray-500">ADDRESS</h4>
            <h4 class="text-sm text-gray-500">PRICE</h4>
            <h4 class="text-sm text-gray-500">QUANTITY</h4>
            <div><h4 class="text-sm text-gray-500">STATUS</h4></div>
          </div>
          <div
            v-for="(purchase, index) in daoData.purchases"
            :key="index"
            class="grid grid-cols-4 mb-5"
          >
            <h3 class="text-base font-medium text-gray-800 mb-1">
              {{ purchase.address }}
            </h3>
            <h3 class="text-base font-medium text-gray-800 mb-1 text-left">
              ${{ purchase.price }}
            </h3>
            <h3 class="text-base font-medium text-gray-800 mb-1 text-left">
              X{{ purchase.quantity }}
            </h3>
            <div>
              <p class="text-success-400 text-right">{{ purchase.status }}</p>
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <div
      v-else
      class="flex flex-col justify-center items-center bg-gray-50 rounded-3xl py-24"
    >
      <svg
        class="h-20 w-20"
        width="142"
        height="142"
        viewBox="0 0 142 142"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 71C11 37.8629 37.8629 11 71 11C104.137 11 131 37.8629 131 71C131 104.137 104.137 131 71 131C37.8629 131 11 104.137 11 71Z"
          fill="#FEF0C7"
        />
        <path
          d="M70.9997 61.001V71.001M70.9997 81.001H71.0247M66.7247 48.151L45.5497 83.501C45.1131 84.2571 44.8821 85.1142 44.8797 85.9873C44.8772 86.8603 45.1034 87.7188 45.5358 88.4773C45.9681 89.2358 46.5915 89.8679 47.344 90.3106C48.0964 90.7534 48.9517 90.9914 49.8247 91.001H92.1747C93.0477 90.9914 93.903 90.7534 94.6554 90.3106C95.4079 89.8679 96.0313 89.2358 96.4636 88.4773C96.896 87.7188 97.1222 86.8603 97.1197 85.9873C97.1173 85.1142 96.8863 84.2571 96.4497 83.501L75.2747 48.151C74.829 47.4163 74.2015 46.8088 73.4527 46.3872C72.7039 45.9656 71.859 45.7441 70.9997 45.7441C70.1403 45.7441 69.2955 45.9656 68.5467 46.3872C67.7979 46.8088 67.1704 47.4163 66.7247 48.151Z"
          stroke="#DC6803"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M71 120.286C43.7803 120.286 21.7143 98.2197 21.7143 71H0.285715C0.285715 110.054 31.9456 141.714 71 141.714V120.286ZM120.286 71C120.286 98.2197 98.2197 120.286 71 120.286V141.714C110.054 141.714 141.714 110.054 141.714 71H120.286ZM71 21.7143C98.2197 21.7143 120.286 43.7803 120.286 71H141.714C141.714 31.9456 110.054 0.285715 71 0.285715V21.7143ZM71 0.285715C31.9456 0.285715 0.285715 31.9456 0.285715 71H21.7143C21.7143 43.7803 43.7803 21.7143 71 21.7143V0.285715Z"
          fill="#FFFAEB"
        />
      </svg>
      <h1 class="text-2xl font-medium text-gray-400 mt-4 pb-2">
        Token Verification Ongoing
      </h1>
      <p class="text-gray-400 text-center m-0">
        We're verifying these token details. Check back soon.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import numeral from 'numeral';
// eslint-disable-next-line import/no-absolute-path
import { DateTime } from 'luxon';
// ../../node_modules/luxon/build/cjs-browser/luxon
Chart.register(...registerables);

export default defineComponent({
  components: { LineChart },
  props: {
    daoData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      selectedFilter: '1d',
      interval: '5m',
      latestData: null,
      hasData: true,
      isInitialLoad: true,
      xAxisLabels: '12',
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Price',
            data: [],
            fill: false,
            borderColor: '#12B76A',
            pointHoverBackgroundColor: '#12B76A',
            pointHoverBorderColor: '#12B76A',
            borderWidth: 3,
            borderRadius: Number.MAX_VALUE,
            pointRadius: 0,
            spanGaps: true,
          },
        ],
      },
      lineChartOptions: {
        interaction: {
          intersect: false,
          mode: 'index',
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: false, // Hide legend
          tooltip: {
            displayColors: false,
            callbacks: {
              label(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(context.parsed.y);
                }
                return label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: this.xAxisLabels,
            },
          },
          y: {
            display: true,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              callback(value) {
                return '$' + value;
              },
            },
          },
        },
      },
      latestChange: [],
    };
  },
  computed: {
    startDate() {
      const defaultDate = DateTime.local()
        .minus({ days: 1 })
        .toFormat('yyyy-MM-dd:HH:mm:ss');
      switch (this.selectedFilter) {
        case '7d':
          return DateTime.local()
            .minus({ days: 7 })
            .toFormat('yyyy-MM-dd:HH:mm:ss');
        case '1m':
          return DateTime.local()
            .minus({ months: 1 })
            .toFormat('yyyy-MM-dd:HH:mm:ss');
        case '3m':
          return DateTime.local()
            .minus({ months: 3 })
            .toFormat('yyyy-MM-dd:HH:mm:ss');
        case '6m':
          return DateTime.local()
            .minus({ months: 6 })
            .toFormat('yyyy-MM-dd:HH:mm:ss');
        case '1y':
          return DateTime.local()
            .minus({ years: 1 })
            .toFormat('yyyy-MM-dd:HH:mm:ss');
        default:
          return defaultDate;
      }
    },
    computeXAxisLabels() {
      switch (this.selectedFilter) {
        case '1d':
          return '12';
        case '7d':
          return '7';
        case '1m':
          return '15';
        case '3m':
          return '15';
        case '1y':
          return '12';
        default:
          return '12';
      }
    },

    computedInterval() {
      switch (this.selectedFilter) {
        case '1d':
          return '5m';
        case '7d':
          return '1h';
        case '1m':
          return '4h';
        case '3m':
          return '1d';
        case '1y':
          return '1d';
        default:
          return '1h';
      }
    },

    computedAxis() {
      switch (this.selectedFilter) {
        case '1d':
          return 12;
        case '7d':
          return 14;
        case '1m':
          return 15;
        case '3m':
          return 15;
        case '1y':
          return 12;
        default:
          return 12;
      }
    },

    // eslint-disable-next-line vue/return-in-computed-property
    periodChange() {
      // Calculate the change over the period
      const startPrice = this.chartData.datasets[0].data[0];
      if (startPrice < this.latestData.price) {
        return (
          ((this.latestData.price - startPrice) / this.latestData.price) * 100
        );
      } else {
        return (this.latestData.price / startPrice) * 100 - 100;
      }
    },
  },

  watch: {
    async selectedFilter() {
      if (this.daoData.dao.token) {
        await this.getHistoricalData();
        await this.getLatestData();
      }
    },
    async daoData() {
      // This loads the data once the async request has returned a Dao
      if (this.daoData.dao.token) {
        await this.getHistoricalData();
        await this.getLatestData();
      }
    },
  },
  methods: {
    dateFormat(timestamp) {
      switch (this.selectedFilter) {
        case '7d':
          return this.dayOfWeek(timestamp);
        case '1m': {
          const day = DateTime.fromISO(timestamp).toFormat('d');
          return day + this.numberSuffix(day);
        }
        case '3m': {
          const day = DateTime.fromISO(timestamp).toFormat('d');
          return this.getMonth(timestamp) + ' ' + day + this.numberSuffix(day);
        }
        case '6m':
          return DateTime.fromISO(timestamp).toFormat('MMM DD');
        case '1y':
          return DateTime.fromISO(timestamp).toFormat('MMMM');
        default:
          return DateTime.fromISO(timestamp).toFormat('t');
      }
    },
    dayOfWeek(timestamp) {
      const d = new Date(timestamp);
      const day = d.getDay();
      if (day === 0) return 'Sun';
      if (day === 1) return 'Mon';
      if (day === 2) return 'Tue';
      if (day === 3) return 'Wed';
      if (day === 4) return 'Thu';
      if (day === 5) return 'Fri';
      if (day === 6) return 'Sat';
      return 'Wrong date format';
    },
    getMonth(timestamp) {
      const d = new Date(timestamp);
      const month = d.getMonth();
      if (month === 0) return 'Jan';
      if (month === 1) return 'Feb';
      if (month === 2) return 'Mar';
      if (month === 3) return 'Apr';
      if (month === 4) return 'May';
      if (month === 5) return 'Jun';
      if (month === 6) return 'Jul';
      if (month === 7) return 'Aug';
      if (month === 8) return 'Sep';
      if (month === 9) return 'Oct';
      if (month === 10) return 'Nov';
      if (month === 11) return 'Dec';
      return 'Wrong date format';
    },
    numberSuffix(n) {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    },
    async getHistoricalData() {
      try {
        const { data } = await axios.get(
          this.$config.apiUrl + 'tokens/financials',
          {
            params: {
              start: this.startDate,
              interval: this.computedInterval,
              token: this.daoData.dao.token.cmcId,
            },
          }
        );
        this.isInitialLoad = false;
        this.hasData = true;
        this.quotes = data;
        this.chartData.datasets[0].data = [];
        this.chartData.labels = [];
        this.quotes.forEach((quote) => {
          this.chartData.datasets[0].data.push(quote.quote.USD.price);
          this.chartData.labels.push(
            this.dateFormat(quote.quote.USD.timestamp)
          );
        });
        this.calculateXAxis();
        this.chartColor();
      } catch (error) {
        if (this.isInitialLoad) {
          switch (this.selectedFilter) {
            case '1d':
              this.selectedFilter = '7d';
              return;
            case '7d':
              this.selectedFilter = '1m';
              return;
            case '1m':
              this.selectedFilter = '3m';
              return;
            case '3m':
              this.selectedFilter = '1y';
              return;
            case '1y':
              this.isInitialLoad = false;
              this.hasData = false;
              console.log(error);
          }
        }
        this.hasData = false;
      }
    },

    async getLatestData() {
      try {
        const { data } = await axios.get(
          this.$config.apiUrl + 'tokens/financials/latest',
          {
            params: {
              token: this.daoData.dao.token.cmcId,
            },
          }
        );

        const latestData = data[this.daoData.dao.token.cmcId];
        this.latestData = {
          price: latestData.quote.USD.price,
          price_change_24h: latestData.quote.USD.percent_change_24h,
          market_cap: latestData.quote.USD.market_cap,
          volume: latestData.quote.USD.volume_24h,
          volume_change_24h: latestData.quote.USD.volume_change_24h,
          total_supply: latestData.total_supply,
        };
        this.chartColor();
      } catch (error) {
        console.error(error);
      }
    },
    formatValue(price) {
      return numeral(price).format(`0,0[.]00`);
    },
    calculateXAxis() {
      this.lineChartOptions.scales.x.ticks.maxTicksLimit =
        this.computeXAxisLabels;
    },

    chartColor() {
      const startPrice = this.chartData.datasets[0].data[0];
      if (startPrice < this.latestData.price) {
        this.chartData.datasets[0].borderColor = '#12B76A';
      } else {
        this.chartData.datasets[0].borderColor = '#FF0000';
      }
    },
  },
});
</script>
<style>
.selected {
  @apply rounded-md bg-white text-black font-medium text-base py-[4px] px-[10px] mr-2;
}

.not-selected {
  @apply text-gray-500 font-medium text-base py-[4px] px-[10px] mr-2;
}
</style>
