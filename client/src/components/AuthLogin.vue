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
import axios from 'axios';

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
      axios
        .post('http://localhost:3000/login', {
          username: String(this.username),
          password: String(this.password),
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then(() => {
          this.$store.commit('setUsername', this.username);
          this.$router.push({ path: 'timer' });
        })
        .catch(() => {
          this.$q.notify({
            color: 'black',
            message: 'Incorrect username/password!',
          });
        });
    },
  },
});
</script>

<style lang="scss" scoped>
#submit-btn {
  width: 100%;
  margin-top: 2vh;
}
</style>
