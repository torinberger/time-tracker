<template lang="html">
  <div class="timer-history-item">
    <q-item>
      <q-item-section>
        <q-item-label>{{ project }}</q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label caption>
          {{ cleanedTime }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

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
  name: 'TimerHistoryItem',
  props: {
    project: { type: String, default: '' },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
  },
  computed: {
    cleanedTime() {
      return cleanTime(this.end - this.start);
    },
  },
});
</script>

<style lang="scss" scoped>
.q-item {
  background: lightgrey;
  border-radius: 5px;
  margin: 1vh;
  margin-top: 0px;
}
</style>
