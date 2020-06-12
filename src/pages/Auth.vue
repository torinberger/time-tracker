<template>
  <q-page class="auth">
    <q-card>
      <q-tabs
        v-model="mode"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="mode" animated>
        <q-tab-panel name="login">
          <auth-login />
        </q-tab-panel>

        <q-tab-panel name="register">
          <auth-register />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthLogin from '../components/AuthLogin.vue';
import AuthRegister from '../components/AuthRegister.vue';

export default Vue.extend({
  name: 'Auth',
  components: {
    AuthLogin,
    AuthRegister,
  },
  data() {
    return {
      mode: 'login',
    };
  },
});
</script>
