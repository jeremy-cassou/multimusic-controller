import axios from 'axios';

export async function init({ dispatch }) {
  await dispatch('refreshServerState');
}

export async function refreshServerState({ commit }) {
  const { data } = await axios.get('/api');
  commit('SET_GROUPS', data.groups);
}

export async function addTo({ dispatch }, { groupId, clientId }) {
  await axios.put(`/api/groups/${groupId}/add/${clientId}`);
  await dispatch('refreshServerState');
}

export async function removeFrom({ dispatch }, { groupId, clientId }) {
  await axios.put(`/api/groups/${groupId}/remove/${clientId}`);
  await dispatch('refreshServerState');
}

export async function setVolume({ dispatch }, { clientId, volume }) {
  await axios.put(`/api/clients/${clientId}/volume/${volume}`);
  await dispatch('refreshServerState');
}
