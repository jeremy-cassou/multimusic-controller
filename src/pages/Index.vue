<template>
  <q-page class="column q-ma-md justify-center">
    <group-card
      v-for="group in groups"
      :key="group.id"
      :value="group"
      class="full-width q-my-md col-auto"
    />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

import GroupCard from '../components/GroupCard';

export default {
  name: 'PageIndex',
  components: {
    GroupCard,
  },
  computed: {
    ...mapGetters('snapserver', [
      'groups',
    ]),
  },
};
</script>
