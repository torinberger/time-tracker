<template lang="html">
  <q-page class="timer">
    <div class="timer-controller shadow-2">
      <q-input
        label="Description"
        type="text"
        v-model="current.description"
      />

      <q-select
        label="Project"
        type="select"
        v-model="current.project"
        :options="projectOptions"
      />

      <div class="">
        <p id="timer-controller-text">{{ cleanTimer }}</p>

        <q-btn
          id="timer-controller-btn"
          :icon="mode === 'play' ? 'stop' : 'play_arrow'"
          @click="mode === 'play' ? pauseTimer() : playTimer()"
          :disabled="current.project.length == 0 || current.description.length == 0"
          color="primary"
        />
      </div>
    </div>

    <div class="row">
      <div class="timer-history col-6 shadow-2">
        <q-list>
          <q-item-label
            header
            class="text-grey-8"
          >
            History
          </q-item-label>

          <timer-history-item
            v-for="item in history"
            :key="item._id"
            v-bind="item"
            v-on:delete-click="deleteHistoryItem(item._id)"
          />
        </q-list>
      </div>

      <div class="timer-projects col-6 shadow-2">
        <q-list>
          <q-item
            class="text-grey-8"
          >
            <q-item-section>
              Projects
            </q-item-section>

            <q-item-section>
              <q-item-label align="right">
                <q-btn round dense flat icon="add" @click="prompt = true" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <timer-project-item
            v-for="item in projects"
            :key="item._id"
            v-bind="item"
            v-on:delete-click="deleteProjectItem(item._id)"
          />
        </q-list>
      </div>
    </div>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-form
          @submit="addProject"
        >
          <q-card-section>
            <div class="text-h6">New Project</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              dense
              label="Name"
              v-model="newProject.name"
              autofocus
            />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-select
              :rules="[ val => val && val.length > 0 || 'Please select something']"
              dense
              label="Color"
              v-model="newProject.color"
              :options="colorOptions"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn type="submit" flat label="Add Project" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import Vue from 'vue';
import TimerHistoryItem from 'components/TimerHistoryItem.vue';
import TimerProjectItem from 'components/TimerProjectItem.vue';
import axios from 'axios';

function makeTwoDigit(n: number): string {
  return String(String(n).length < 2 ? `0${n}` : n);
}

function cleanTime(time: number): string {
  const hours = Math.floor(Math.floor(time / 60) / 60);
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Number(time % 60);

  return `${makeTwoDigit(hours)}:${makeTwoDigit(minutes)}:${makeTwoDigit(seconds)}`;
}

function converToHistoryItem(data) {
  data.end = Number(data.endtime);
  delete data.endtime;
  data.start = Number(data.starttime);
  delete data.startime;
  data._id = String(Math.random());
  return data;
}

export default Vue.extend({
  name: 'Timer',
  components: {
    TimerHistoryItem,
    TimerProjectItem,
  },
  data() {
    return {
      mode: 'stopped',
      prompt: false,
      colorOptions: [
        'red',
        'maroon',
        'blue',
        'lightblue',
        'green',
        'lightgreen',
        'orange',
        'purple',
        'yellow',
      ],
      newProject: {
        name: '',
        color: '',
      },
      current: {
        timer: 0,
        description: '',
        project: '',
        start: 0,
        end: 0,
      },
      history: [
      ],
      projects: [
        {
          _id: String(Math.random()),
          name: 'None',
          color: 'white',
        },
      ],
    };
  },
  created() {
    if (!this.$store.state.username) {
      this.$router.push({ path: 'auth' });
    } else {
      setInterval(() => {
        if (this.mode === 'play') {
          this.current.timer += 1;
        }
      }, 1000);

      this.getTimerHistoryItems();
      this.getProjects();
    }
  },
  methods: {
    playTimer() {
      this.mode = this.mode === 'play' ? this.mode = 'stopped' : this.mode = 'play';
      this.current.start = new Date().getTime();
    },
    pauseTimer() {
      this.mode = this.mode === 'play' ? this.mode = 'stopped' : this.mode = 'play';
      this.current.end = new Date().getTime();

      axios
        .post('http://localhost:3000/addtimerhistoryitem', {
          username: String(this.$store.state.username),
          description: this.current.description,
          project: this.current.project,
          start: this.current.start,
          end: this.current.end,
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((res) => {
          const data = res.data.timerHistoryItem[0];

          this.history.push(converToHistoryItem(data));
        })
        .catch(() => {
          this.$q.notify({
            color: 'black',
            message: 'Error logging time!',
          });
        });

      this.current.description = '';
      this.current.project = '';
      this.current.start = 0;
      this.current.timer = 0;
      this.current.end = 0;
    },
    deleteHistoryItem(id: string): void {
      for (let i = 0; i < this.history.length; i += 1) {
        if (this.history[i]._id === id) {
          const target = this.history[i];

          axios
            .post('http://localhost:3000/deletetimerhistoryitem', {
              username: String(this.$store.state.username),
              start: target.start,
            }, {
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            })
            .then(() => {
              this.getTimerHistoryItems();
            })
            .catch(() => {
              this.$q.notify({
                color: 'black',
                message: 'Error deleting project!',
              });
            });
        }
      }
    },
    deleteProjectItem(id: string): void {
      for (let i = 0; i < this.projects.length; i += 1) {
        if (this.projects[i]._id === id) {
          const target = this.projects[i];

          for (let n = 0; n < this.history.length; n += 1) {
            if (this.history[n].project === target.name) {
              this.deleteHistoryItem(this.history[n]._id)
            }
          }

          axios
            .post('http://localhost:3000/deleteproject', {
              username: String(this.$store.state.username),
              name: target.name,
            }, {
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            })
            .then(() => {
              this.getTimerHistoryItems();
              this.getProjects();
            })
            .catch(() => {
              this.$q.notify({
                color: 'black',
                message: 'Error deleting project!',
              });
            });
        }
      }
    },
    addProject() {
      const { name } = this.newProject;
      const { color } = this.newProject;

      axios
        .post('http://localhost:3000/addproject', {
          username: String(this.$store.state.username),
          name,
          color,
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((res) => {
          const data = res.data.project[0];

          this.projects.push(data);
          this.newProject = { name: '', color: '' };
          this.prompt = false;
        })
        .catch(() => {
          this.$q.notify({
            color: 'black',
            message: 'Project name taken!',
          });
        });
    },
    getTimerHistoryItems() {
      axios
        .post('http://localhost:3000/gettimerhistoryitems', {
          username: String(this.$store.state.username),
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((res) => {
          const data = res.data.historyItems;

          for (let i = 0; i < data.length; i += 1) {
            data[i] = converToHistoryItem(data[i]);
          }

          this.history = data;
        })
        .catch(() => {
          this.$q.notify({
            color: 'black',
            message: 'Error getting timer history!',
          });
        });
    },
    getProjects() {
      axios
        .post('http://localhost:3000/getprojects', {
          username: String(this.$store.state.username),
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((res) => {
          res.data.projects.push({
            name: 'None',
            color: 'white',
          });

          for (let i = 0; i < res.data.projects.length; i++) {
            res.data.projects[i];
            res.data.projects[i]._id = String(Math.random());
          }

          this.projects = res.data.projects;
        })
        .catch(() => {
          this.$q.notify({
            color: 'black',
            message: 'Error getting projects!',
          });
        });
    },
  },
  computed: {
    cleanTimer(): string {
      return cleanTime(this.current.timer);
    },
    projectOptions() {
      const projects = [];
      for (let i = 0; i < this.projects.length; i += 1) {
        projects.push(this.projects[i].name);
      }
      return projects;
    },
  },
});
</script>

<style lang="scss" scoped>
body, .q-page {
  overflow-y: hidden;
}

.timer-controller {
  width: calc(100% - 4vh);
  height: 10vh;
  border-radius: 3px;
  margin: 2vh;
  background: white;
  display: flex;
  align-items: center;

  div {
    margin-left: auto;
    float: right;
    display: flex;
    align-items: center;

    .q-btn {
      display: inline-block;
      border-radius: 50%;
      height: 6vh;
      width: 6vh;
      margin: 2vh;
    }

    p {
      display: inline-block;
      font-size: 2.5vh;
      margin: 0;
    }
  }

  .q-input {
    float: left;
    margin-left: 2vh;
    width: 400px;
    display: inline-block;
  }

  .q-select {
    margin-left: 2vh;
    margin-right: 2vh;
    width: 200px;
    display: inline-block;
  }
}

.q-page > .row {
  width: 100%;
}

.timer-history, .timer-projects {
  width: calc(50% - 3vh);
  height: calc(calc(100vh - 50px) - 16vh);
  border-radius: 3px;
  margin: 2vh;
  margin-right: 0;
  margin-top: 0;
  background: white;
}

@media only screen and (max-width: 800px) {
  .timer-history, .timer-projects {
    width: calc(100% - 4vh);
  }

  body, .q-page {
    overflow-y: scroll;
  }
}
</style>
