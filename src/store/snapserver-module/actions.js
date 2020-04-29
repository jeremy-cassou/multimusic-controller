import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

export async function init({ dispatch }) {
  request.interceptors.response.use(
    (response) => response,
    (error) => dispatch('onServerRequestFailed', error),
  );
  await dispatch('refreshServerState');
}

export async function onServerRequestFailed({ commit }) {
  commit('SET_SERVER_NETWORK_STATUS', false);
}

export async function refreshServerState({ commit }) {
  const { data } = await request.get('/');
  commit('SET_GROUPS', data.groups);
}

export async function addTo({ dispatch }, { groupId, clientId }) {
  await request.put(`/groups/${groupId}/add/${clientId}`);
  await dispatch('refreshServerState');
}

export async function removeFrom({ dispatch }, { groupId, clientId }) {
  await request.put(`/groups/${groupId}/remove/${clientId}`);
  await dispatch('refreshServerState');
}

export async function setVolume({ dispatch }, { clientId, volume }) {
  await request.put(`/clients/${clientId}/volume/${volume}`);
  await dispatch('refreshServerState');
}
