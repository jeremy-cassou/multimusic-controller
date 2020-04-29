import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

export async function init({ dispatch, commit }) {
  request.interceptors.response.use(
    (response) => commit('SET_SERVER_NETWORK_STATUS', true) || response,
    (error) => commit('SET_SERVER_NETWORK_STATUS', false) || error,
  );
  await dispatch('refreshServerState');
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
