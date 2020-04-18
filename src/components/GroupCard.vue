<template>
  <div class="shadow-2">
    <div class="row items-center q-py-lg q-px-md shadow-1">
      <q-btn
        :disable="clients.length > 1"
        icon="speaker_group"
        class="col-auto"
        size="16px"
        flat
        dense
        @click="showAddTo"
      />
      <div
        class="text-h5 col text-center"
        v-text="groupName"
      />
      <q-btn
        icon="volume_up"
        class="col-auto"
        size="16px"
        flat
        dense
        @click="showVolume"
      />
    </div>

    <div>
      <div
        v-for="slave in slaves"
        :key="slave.id"
        class="q-pa-md row items-center"
      >
        <div
          class="col text-center text-h6"
          v-text="extractClientName(slave)"
        />
        <q-btn
          icon="close"
          class="col-auto"
          size="16px"
          flat
          dense
          @click="() => removeSlave(slave)"
        />
      </div>
    </div>

    <!-- Modals -->
    <group-volume v-model="visibleVolume" :clients="clients" />
    <group-link v-model="visibleLink" :client="master" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import GroupVolume from './GroupVolume';
import GroupLink from './GroupLink';

export default {
  name: 'GroupCard',
  components: {
    GroupVolume,
    GroupLink,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      visibleVolume: false,
      visibleLink: false,
    };
  },
  computed: {
    clients() {
      return this.value.clients;
    },
    master() {
      return this.clients[0];
    },
    slaves() {
      const [, ...slaves] = this.clients;
      return slaves;
    },
    groupName() {
      return this.extractClientName(this.master);
    },
  },
  methods: {
    ...mapActions('snapserver', [
      'removeFrom',
    ]),
    extractClientName(client) {
      return client.config.name || client.host.name;
    },
    showAddTo() {
      this.visibleLink = true;
    },
    showVolume() {
      this.visibleVolume = true;
    },
    removeSlave(slave) {
      this.removeFrom({
        groupId: this.value.id,
        clientId: slave.id,
      });
    },
  },
};
</script>
