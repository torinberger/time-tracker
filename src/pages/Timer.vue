<template lang="html">
  <q-page class="timer">
    <div class="timer-controller shadow-2">
      <q-btn
        id="timer-controller-btn"
        :icon="mode === 'play' ? 'play_arrow' : 'pause'"
        @click="mode === 'play' ? playTimer() : pauseTimer()"
        color="primary"
      />{{ timer }} {{ cleanTime }}
    </div>

    <div class="timer-history shadow-2">

    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Timer',
  data() {
    return {
      mode: 'play',
      timer: 0,
    };
  },
  created() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  },
  methods: {
    playTimer() {
      this.mode = this.mode === 'play' ? this.mode = 'pause' : this.mode = 'play';
    },
    pauseTimer() {
      this.mode = this.mode === 'play' ? this.mode = 'pause' : this.mode = 'play';
    }
  },
  computed: {
    cleanTime() {
      let hours = Math.floor(Math.floor(this.timer / 60) / 60);
      let minutes = Math.floor((this.timer / 60) % 60);
      let seconds = this.timer % 60;
      return `${hours}:${minutes}:${seconds}`
    },
  },
});
</script>

<style lang="sass" scoped>
.timer-controller
  width: calc(100vw - 4vh);
  height: 12vh;
  border-radius: 3px;
  margin: 2vh;
  background: white;

#timer-controller-btn
  border-radius: 50%;
  height: 8vh;
  width: 8vh;
  margin: 2vh;

.timer-history
  width: calc(100vw - 4vh);
  height: calc(calc(98vh - 50px) - 16vh);
  border-radius: 3px;
  margin: 2vh;
  background: white;
</style>
