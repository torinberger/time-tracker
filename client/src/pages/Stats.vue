<template lang="html">
  <q-page class="stats">

    <div class="stats-pie-container shadow-2">
      <stats-pie v-if="timerHistoryItems.length > 0" :projects="projects" :timerHistoryItems="timerHistoryItems"></stats-pie>
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
          v-if="projects.length"
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

import StatsPie from 'components/StatsPie.vue';
import StatsProjectItem from 'components/StatsProjectItem.vue';

import axios from 'axios';

export default Vue.extend({
  name: 'Stats',
  components: {
    StatsPie,
    StatsProjectItem,
  },
  data() {
    return {
      projects: [],
      timerHistoryItems: [],
    };
  },
  mounted() {
    axios
      .post('http://localhost:3000/getprojects', {
        username: String(this.$store.state.username),
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => {
        console.log(res);
        const data = res.data.projects;
        data.push({
          name: 'None',
          color: 'white',
        });
        this.projects = data;

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

            for (let i = 0; i < this.projects.length; i++) {
              this.projects[i].time = 0;
              for (let n = 0; n < this.timerHistoryItems.length; n++) {
                if (this.timerHistoryItems[n].project == this.projects[i].name) {
                  this.projects[i].time += Math.ceil((this.timerHistoryItems[n].endtime - this.timerHistoryItems[n].starttime));
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
            this.$q.notify({
              color: 'black',
              message: 'Error logging time!',
            });
          });
      })
      .catch((err) => {
        console.log(err);
        this.$q.notify({
          color: 'black',
          message: 'Error getting projects!',
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
    "a b";
  grid-gap: 2vh;
  padding: 2vh;
  overflow-y: hidden;
}

.stats-pie-container {
  display: inline-grid;
  grid-area: a;
  width: calc(calc(calc(100vw - 299px) / 2) - 2vh);
  height: calc(calc(100vh - 50px) - 4vh) !important;
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
