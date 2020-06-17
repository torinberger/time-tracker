<template>
  <q-item
    clickable
    tag="a"
    :href="link"
    :active="link == currentRoute"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }} {{ currentRoute }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'EssentialLink',
  props: {
    title: { type: String, required: true },
    caption: { type: String, default: '' },
    link: { type: String, default: '#' },
    icon: { type: String, default: '' },
  },
  data() {
    return {
      currentRoute: '/#' + this.$router.currentRoute.path,
    };
  },
  watch: {
    $route(to, from) {
      this.currentRoute = '/#' + this.$router.currentRoute.path;
    }
  }
});
</script>
