<template lang="html">
  <q-item dark class="timer-history-item">
    <q-item-section>
      <q-item-label :style="{color: color}">{{ name }}</q-item-label>
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

export default Vue.extend({
  name: 'TimerHistoryItem',
  props: {
    name: { type: String, required: true },
    color: { type: String, default: 'red' },
  },
});
</script>

<style lang="scss" scoped>
.timer-history-item {
  margin: 1vh;
  background: black;
  border-radius: 2px;
  margin-top: 0px;
}
</style>
