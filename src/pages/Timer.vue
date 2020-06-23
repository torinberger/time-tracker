<template lang="html">
  <q-page class="timer">
    <div class="timer-controller shadow-2">
      <q-btn
        id="timer-controller-btn"
        :icon="mode === 'play' ? 'stop' : 'play_arrow'"
        @click="mode === 'play' ? pauseTimer() : playTimer()"
        color="primary"
      />

      <p id="timer-controller-text">{{ cleanTimer }}</p>
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
          />
        </q-list>
      </div>

      <div class="timer-projects col-6 shadow-2">

      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import TimerHistoryItem from 'components/TimerHistoryItem.vue';

function makeTwoDigit(n: number): string {
  return String(String(n).length < 2 ? `0${n}` : n);
}

function cleanTime(time: number): string {
  const hours = Math.floor(Math.floor(time / 60) / 60);
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Number(time % 60);

  return `${makeTwoDigit(hours)}:${makeTwoDigit(minutes)}:${makeTwoDigit(seconds)}`;
}

export default Vue.extend({
  name: 'Timer',
  components: {
    TimerHistoryItem,
  },
  data() {
    return {
      mode: 'stopped',
      timer: 0,
      history: [
        {
          project: 'Software',
          start: 34583459,
          end: 34583700,
          _id: '32495df8dfj498',
        },
        {
          project: 'Software',
          start: 34583459,
          end: 34583750,
          _id: '32495df8dfj498',
        },
      ],
    };
  },
  created() {
    setInterval(() => {
      if (this.mode === 'play') {
        this.timer += 1;
      }
    }, 1000);
  },
  methods: {
    playTimer() {
      this.mode = this.mode === 'play' ? this.mode = 'stopped' : this.mode = 'play';
    },
    pauseTimer() {
      this.mode = this.mode === 'play' ? this.mode = 'stopped' : this.mode = 'play';
      this.timer = 0;
    },
  },
  computed: {
    cleanTimer(): string {
      return cleanTime(this.timer);
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
}

#timer-controller-btn {
  display: inline-block;
  border-radius: 50%;
  height: 6vh;
  width: 6vh;
  margin: 2vh;
}

#timer-controller-text {
  display: inline-block;
  font-size: 3vh;
  line-height: 10vh;
  vertical-align: top;
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

@media only screen and (max-width: 600px) {
  .timer-history, .timer-projects {
    width: calc(100% - 4vh);
  }

  body, .q-page {
    overflow-y: scroll;
  }
}
</style>
