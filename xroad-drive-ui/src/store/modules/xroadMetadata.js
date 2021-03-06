import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      providers: [],
      clients: []
    };
  },
  getters: {
    providersForNav(state) {
      return parentName => {
        let providersForNav = [];
        for (let i = 0; i < state.providers.length; i++) {
          providersForNav[i] = {...state.providers[i]};
          providersForNav[i].id = parentName + ':' + state.providers[i].id;
          providersForNav[i].to = { name: parentName, params: { id: state.providers[i].id }};
          providersForNav[i].parent = parentName;
        }
        return providersForNav;
      }
    },
    clientsForNav(state) {
      return parentName => {
        let clientsForNav = [];
        for (let i = 0; i < state.clients.length; i++) {
          clientsForNav[i] = {...state.clients[i]};
          clientsForNav[i].id = parentName + ':' + state.clients[i].id;
          clientsForNav[i].to = { name: parentName, params: { id: state.clients[i].id }};
          clientsForNav[i].parent = parentName;
        }
        return clientsForNav;
      }
    }
  },
  mutations: {
    updateProviders(state, providers) {
      state.providers = providers;
    },
    updateClients(state, clients) {
      state.clients = clients;
    }
  },
  actions: {
    async fetchProviders({ commit }) {
      try {
        const response = await axios.get('/xroad-metadata-proxy/service-providers');
        commit('updateProviders', response.data);
      } catch (error) {
        console.log('Failed to fetch X-Road metadata: ' + error);
      }
    },
    async fetchClients({ commit }) {
      try {
        const response = await axios.get('/xroad-metadata-proxy/service-clients');
        commit('updateClients', response.data);
      } catch (error) {
        console.log('Failed to fetch X-Road metadata: ' + error);
      }
    }
  }
};
