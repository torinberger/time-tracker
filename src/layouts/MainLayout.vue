<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="$q.platform.is.mobile" flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />

        <q-toolbar-title>
          Time Tracker
        </q-toolbar-title>

        <div>v0.1.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      elevated
      class="shadow-2"
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import EssentialLink from 'components/EssentialLink.vue';

export default Vue.extend({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  data() {
    return {
      leftDrawerOpen: true,
      essentialLinks: [
        {
          title: 'Home',
          caption: 'Homepage',
          icon: 'house',
          link: '/#/',
        },
        {
          title: 'Auth',
          caption: 'Login & Register',
          icon: 'lock',
          link: '/#/auth',
        },
        {
          title: 'Timer',
          caption: 'Log Time & See History',
          icon: 'timer',
          link: '/#/timer',
          authNeeded: true,
        },
        {
          title: 'Stats',
          caption: 'Summary & Statistics',
          icon: 'bar_chart',
          link: '/#/stats',
          authNeeded: true,
        },
      ],
    };
  },
});
</script>
