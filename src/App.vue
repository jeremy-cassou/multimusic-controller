<template>
  <div id="q-app">
    <div v-if="serverNetworkStatus === null" class="full-center text-center">
      Chargement...
    </div>
    <div v-if="serverNetworkStatus === false" class="full-center text-center">
      Impossible de trouver les enceintes.<br>Etes-vous bien connecté au Wi-Fi ?
    </div>
    <router-view v-else />
  </div>
</template>

<script >
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters('snapserver', [
      'serverNetworkStatus',
    ]),
  },
  async mounted() {
    try {
      await this.snapserverInit();
    } finally {
      setInterval(() => this.refreshServerState(), 10000);
    }
  },
  methods: {
    ...mapActions('snapserver', {
      snapserverInit: 'init',
      refreshServerState: 'refreshServerState',
    }),
  },
};
</script>

<style lang="stylus" scoped>
  .full-center
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
</style>
