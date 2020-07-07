<template lang="html">
  <div class="auth-register">
    <q-form
      @submit="register"
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
        label="Register"
        color="primary"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'AuthRegister',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    register() {
      const signup = new Date();

      axios
        .post('http://localhost:3000/signup', {
          username: String(this.username),
          password: String(this.password),
          signup,
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
            message: 'Username taken!',
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
