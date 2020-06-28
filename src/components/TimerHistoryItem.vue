<template lang="html">
  <q-item dark class="timer-history-item">
    <q-item-section>
      <q-item-label>{{ description }}</q-item-label>
      <q-item-label caption>
        <q-icon name="folder" color="blue"/> {{ project }}
      </q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label>
        {{ cleanedTime }}
      </q-item-label>
      <q-item-label caption>
        {{ getDate(new Date(start*1000)) }} - {{ getTime(new Date(start*1000)) }}
      </q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label align="right">
        <q-btn round dense flat icon="more_vert">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item @click="$emit('delete-click')" clickable v-close-popup>
                <q-item-section>Delete</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-item-label>
    </q-item-section>
  </q-item>
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
    description: { type: String, required: true },
    project: { type: String, default: '' },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
  },
  computed: {
    cleanedTime() {
      return cleanTime(this.end - this.start);
    },
  },
  methods: {
    getDate(day: Date): string {
      return `${day.getFullYear()}/${(day.getMonth() + 1)}/${day.getDate()}`;
    },
    getTime(time: Date): string {
      return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.timer-history-item {
  border-radius: 2px;
  background: black;
  margin: 1vh;
  margin-top: 0px;
}
</style>
