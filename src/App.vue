<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script >
import { mapActions } from 'vuex';

export default {
  name: 'App',
  async mounted() {
    await this.snapserverInit();
    setInterval(() => this.snapserverInit(), 10000);
  },
  methods: {
    ...mapActions('snapserver', {
      snapserverInit: 'init',
    }),
  },
};
</script>
