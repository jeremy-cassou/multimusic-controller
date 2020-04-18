<template>
  <q-dialog
    :value="value"
    position="bottom"
    @input="val => $emit('input', val)"
  >
    <q-card>
      <q-card-section class="q-pa-none">
        <q-list separator>
          <q-item
            class="justify-center text-subtitle1 vertical-middle bg-grey-2"
            style="line-height: 32px"
            v-text="'Lecture depuis'"
          />
          <q-item
            v-for="group in availableGroups"
            :key="group.id"
            clickable
            class="justify-center text-subtitle2 vertical-middle"
            style="line-height: 32px"
            @click="add(group.id)"
            v-text="group.name"
          />
          <q-item
            class="justify-center text-subtitle2 vertical-middle text-negative"
            style="line-height: 32px"
            clickable
            @click="$emit('input', false)"
            v-text="'Annuler'"
          />
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'GroupLink',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    client: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('snapserver', [
      'groups',
    ]),
    availableGroups() {
      return this.groups
        .filter((group) => group.clients[0].id !== this.client.id)
        .map((group) => ({
          id: group.id,
          name: `${this.extractClientName(group.clients[0])}${this.getGroupSuffix(group)}`,
        }));
    },
  },
  methods: {
    ...mapActions('snapserver', [
      'addTo',
    ]),
    extractClientName(client) {
      return client.config.name || client.host.name;
    },
    getGroupSuffix(group) {
      return group.clients.length > 1
        ? ` + ${group.clients.length - 1}`
        : '';
    },
    add(groupId) {
      this.addTo({ groupId, clientId: this.client.id });
    },
  },
};
</script>
