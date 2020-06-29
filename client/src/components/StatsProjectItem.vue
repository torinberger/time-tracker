<template lang="html">
  <q-item dark class="stats-project-item">
    <q-item-section>
      <q-item-label :style="{color: color}">{{ name }}</q-item-label>
    </q-item-section>

    <q-item-section>
      3:34
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'StatsProjectItem',
  props: {
    name: { type: String, required: true },
    color: { type: String, default: 'red' },
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
