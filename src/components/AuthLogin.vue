<template lang="html">
  <div class="auth-login">
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
        label="Login"
        color="secondary"
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
});
</script>

<style lang="css" scoped>

#submit-btn {
  width: 100%;
  margin-top: 2vh;
}

</style>
