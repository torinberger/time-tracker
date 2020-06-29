
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  data() {
    return {
      gradients: [],
    };
  },
  props: ['chartData'], // chart data to display
  mounted() {
    const { chartData } = this;

    // render chart
    this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
  },
};
