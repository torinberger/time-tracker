<template lang="html">
  <div class="auth-login">
    <q-form
      @submit="login"
    >
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
      <q-btn
        id="submit-btn"
        type="submit"
        label="Login"
        color="primary"
      />
    </q-form>
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
  methods: {
    login() {
      console.log('login');
      this.$store.commit('setToken', 'blah');
      this.$router.push({ path: 'timer' });
    },
  },
});
</script>

<style lang="sass" scoped>
#submit-btn
  width: 100%;
  margin-top: 2vh;
</style>
