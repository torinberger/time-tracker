
<template>
  <div class="stats-chart bg-foreground">
    <div class="container bg-foreground">
      <div class="Chart__list">
        <div class="Chart">
          <line-chart
            v-if="chartData.labels.length"
            :styles="{height: 'calc(calc(calc(100vh - 50px) / 2) - 3vh)'}"
            :chartData="chartData"
          ></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import { Vue } from 'vue-property-decorator';

import LineChart from './LineChart.js';

export default Vue.extend({
  name: 'StatsChart',
  components: {
    LineChart,
  },
  props: [
    'projects',
    'timerHistoryItems',
  ],
  data() {
    return {
      chartData: {
        labels: [],
      },
    };
  },
  mounted() {
    this.chartData = {
      labels: ['today', 'tommorrow', 'next'],
      datasets: [
        {
          label: 'Software',
          backgroundColor: 'rgb(0,255,255)',
          borderColor: 'rgb(0,255,255)',
          data: [1, 2, 3],
        }, {
          label: 'Chess',
          backgroundColor: 'rgb(100,100,255)',
          borderColor: 'rgb(100,100,255)',
          data: [3, 2, 1],
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.container, .Chart__list, .Chart {
  width: calc(calc(calc(100vw - 299px) / 2) - 3vh);
  height: calc(calc(calc(100vh - 50px) / 2) - 3vh) !important;
}
.container {
  display: inline-block;
}
.stats-chart {
  width: calc(calc(calc(100vw - 299px) / 2) - 3vh);
  height: calc(calc(calc(100vh - 50px) / 2) - 3vh) !important;
  display: inline-block;
}

@media only screen and (max-width: 768px) {
  .container, .Chart__list, .Chart {
    width: calc(100vw - 4vh);
  }
}
</style>
