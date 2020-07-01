<template lang="html">
  <q-page class="stats">
    <div class="stats-graph-container shadow-2">
      <stats-graph></stats-graph>
    </div>

    <div class="stats-pie-container shadow-2">
      <stats-pie></stats-pie>
    </div>

    <div class="stats-projects-container shadow-2">
      <q-list>
        <q-item
          class="text-grey-8"
        >
          <q-item-section>
            Projects
          </q-item-section>
        </q-item>

        <stats-project-item
          v-for="item in projects"
          :key="item._id"
          v-bind="item"
        />
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

import StatsGraph from 'components/StatsGraph.vue';
import StatsPie from 'components/StatsPie.vue';
import StatsProjectItem from 'components/StatsProjectItem.vue';

import axios from 'axios';

export default Vue.extend({
  name: 'Stats',
  components: {
    StatsGraph,
    StatsPie,
    StatsProjectItem,
  },
  data() {
    return {
      projects: [
        {
          name: 'None',
          color: 'white',
        },
      ],
      timerHistoryItems: [
        {
          description: '',
          project: '',
          starttime: 0,
          endtime: 0,
          appuserusername: 'torin'
        }
      ],
    };
  },
  mounted() {
    axios
      .post('http://localhost:3000/gettimerhistoryitems', {
        username: String(this.$store.state.username),
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => {
        console.log(res);
        const data = res.data.historyItems;

        this.timerHistoryItems = data;
      })
      .catch((err) => {
        console.log(err);
        this.$q.notify({
          color: 'black',
          message: 'Error logging time!',
        });
      });
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
