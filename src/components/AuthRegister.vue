<template lang="html">
  <div class="auth-register">
    <q-form
      @submit="register"
    >
      <q-input
        type="text"
        active-color="secondary"
        v-model="username"
        label="Username"
      />
      <q-input
        type="password"
        active-color="secondary"
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
      console.log('Register');

    }
  }
});
</script>

<style lang="scss" scoped>

#submit-btn {
  width: 100%;
  margin-top: 2vh;
}

</style>
