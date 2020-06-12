<template lang="html">
  <div class="auth-login">
    <q-input
      type="text"
      v-model="username"
      label="Username"
    />
    <q-input
      type="password"
      v-model="password"
      label="Password"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AuthLogin',
  data() {
    return {
      username: '',
      password: '',
    };
  },
});
</script>

<style lang="css" scoped>
</style>
