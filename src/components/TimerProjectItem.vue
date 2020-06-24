<template lang="html">
  <q-item class="timer-history-item">
    <q-item-section>
      <q-item-label :style="{color: color}">{{ name }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label align="right">
        <q-icon name="delete" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'TimerHistoryItem',
  props: {
    name: { type: String, required: true },
    color: { type: String, default: 'red' },
  },
});
</script>

<style lang="scss" scoped>
.q-item {
  margin: 1vh;
  margin-top: 0px;
}
</style>
