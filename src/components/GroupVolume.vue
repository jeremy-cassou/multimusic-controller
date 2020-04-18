<template>
  <q-dialog
    v-if="clients.length"
    :value="value"
    position="bottom"
    @input="val => $emit('input', val)"
  >
    <q-card class="q-px-sm q-pb-md">
      <q-card-section>
        <div class="text-h6">Volumes</div>
      </q-card-section>

      <div v-for="client in clients" :key="client.id">
        <q-item-label header v-text="client.config.name || client.host.name" />
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="volume_up" />
          </q-item-section>
          <q-item-section>
            <q-slider
              color="teal"
              :value="client.config.volume.percent"
              :min="0"
              :max="100"
              :step="1"
              @change="val => changeVolume(client.id, val)"
            />
          </q-item-section>
        </q-item>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'GroupVolume',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    clients: {
      type: Array,
      default: () => ([]),
    },
  },
  methods: {
    ...mapActions('snapserver', [
      'setVolume',
    ]),
    changeVolume(clientId, volume) {
      this.setVolume({ clientId, volume });
    },
  },
};
</script>
