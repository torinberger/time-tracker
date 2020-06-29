<template lang="html">
  <q-page class="stats">
    <div class="stats-graph-container shadow-2">
      <stats-graph></stats-graph>
    </div>

    <div class="stats-pie-container shadow-2">
      <stats-pie></stats-pie>
    </div>

    <div class="stats-projects-container shadow-2">

    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

import StatsGraph from 'components/StatsGraph.vue';
import StatsPie from 'components/StatsPie.vue';

export default Vue.extend({
  name: 'Stats',
  components: {
    StatsGraph,
    StatsPie,
  },
});
</script>

<style lang="scss" scoped>
.stats {
  display: grid;
  grid-template:
    "a b"
    "c b";
  grid-gap: 2vh;
  padding: 2vh;
  overflow-y: hidden;
}

.stats-graph-container {
  display: inline-grid;
  grid-area: a;
  width: calc(calc(calc(100vw - 299px) / 2) - 2vh);
  height: calc(calc(calc(100vh - 50px) / 2) - 3vh) !important;
  background: white;
  border-radius: 2px;
}

.stats-pie-container {
  display: inline-grid;
  grid-area: c;
  width: calc(calc(calc(100vw - 299px) / 2) - 2vh);
  height: calc(calc(calc(100vh - 50px) / 2) - 3vh) !important;
  background: white;
  border-radius: 2px;
}

.stats-projects-container {
  display: inline-grid;
  width: calc(calc(calc(100vw - 299px) / 2) - 4vh);
  height: calc(calc(100vh - 50px) - 4vh);
  grid-area: b;
  background: white;
  border-radius: 2px;
}

@media only screen and (max-width: 800px) {
  .stats {
    display: grid;
    height: auto;
    grid-template:
      "a"
      "c"
      "b";
    grid-gap: 2vh;
    padding: 2vh;
  }

  .stats-graph-container, .stats-pie-container, .stats-projects-container {
    min-height: 100px;
    width: 100%;
  }
}
</style>
