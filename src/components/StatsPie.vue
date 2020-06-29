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

import PieChart from './PieChart';

export default Vue.extend({
  name: 'StatsGraph',
  components: {
    PieChart,
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
    };
  },
  mounted() {
    this.chartData = {
      datasets: [{
        data: [10, 20, 30],
        backgroundColor: ['red', 'yellow', 'blue']
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Red',
        'Yellow',
        'Blue'
      ]
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
