<template lang="html">
  <q-item dark class="stats-project-item">
    <q-item-section>
      <q-item-label :style="{color: color}">{{ name }}</q-item-label>
    </q-item-section>

    <q-item-section>
      {{ cleanedTime }}
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

function makeTwoDigit(n: number): string {
  return String(String(n).length < 2 ? `0${n}` : n);
}

function cleanTime(time: number): string {
  const timeInSeconds = time;
  const hours = Math.floor(Math.floor(timeInSeconds / 60) / 60);
  const minutes = Math.floor((timeInSeconds / 60) % 60);
  const seconds = Number(timeInSeconds % 60);

  return `${makeTwoDigit(hours)}:${makeTwoDigit(minutes)}:${makeTwoDigit(seconds)}`;
}

export default Vue.extend({
  name: 'StatsProjectItem',
  props: {
    name: { type: String, required: true },
    color: { type: String, default: 'red' },
    time: { type: Number, default: 0 },
  },
  computed: {
    cleanedTime() {
      return cleanTime(this.time);
    },
  },
});
</script>

<style lang="scss" scoped>
.stats-project-item {
  margin: 1vh;
  background: black;
  border-radius: 2px;
  margin-top: 0px;
}
</style>
