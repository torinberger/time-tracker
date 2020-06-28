<template lang="html">
  <q-page class="stats">
    <div class="stats-graph shadow-2">

    </div>

    <div class="stats-pie shadow-2">

    </div>

    <div class="stats-projects shadow-2">

    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Stats',
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

  .stats-graph, .stats-pie, .stats-projects {
    min-height: 400px;
  }
}

.stats-graph {
  display: inline-grid;
  grid-area: a;
  background: white;
  border-radius: 2px;
}

.stats-pie {
  display: inline-grid;
  grid-area: c;
  background: white;
  border-radius: 2px;
}

.stats-projects {
  display: inline-grid;
  grid-area: b;
  background: white;
  border-radius: 2px;
}
</style>
