<template lang="html">
  <div class="stats-pie">
    <div class="container bg-foreground">
      <div class="Chart__list">
        <div class="Chart">
          <pie-chart
            v-if="chartData.labels.length"
            :styles="{height: 'calc(calc(calc(100vh - 50px) / 2) - 4vh)'}"
            :chartData="chartData"
          ></pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

import PieChart from './PieChart.js';

export default Vue.extend({
  name: 'StatsGraph',
  components: {
    PieChart,
  },
  data() {
    return {
      chartData: {
        labels: [],
      },
    };
  },
  props: [
    'projects',
    'timerHistoryItems',
  ],
  created() {
    for (let i = 0; i < this.projects.length; i += 1) {
      const target = this.projects[i];

      target.time = 0;
      for (let n = 0; n < this.timerHistoryItems.length; n += 1) {
        if (this.timerHistoryItems[n].project === target.name) {
          target.time += Math.ceil(
            (this.timerHistoryItems[n].endtime - this.timerHistoryItems[n].starttime) / 1000,
          );
        }
      }
    }

    const chartData = {
      datasets: [{
        data: [],
        backgroundColor: [],
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [],
    };

    for (let i = 0; i < this.projects.length; i += 1) {
      chartData.datasets[0].data.push(this.projects[i].time);
      chartData.datasets[0].backgroundColor.push(this.projects[i].color);
      chartData.labels.push(`${this.projects[i].name} (minutes)`);
    }

    this.chartData = chartData;
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
