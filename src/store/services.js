import ServiceService from "../services/services";

const state = () => ({
    listServices: [],
    currentService: {},
});

const actions = {
    async fetchServices({commit}, params = {}) {
        const services = await ServiceService.loadServices(params);
        commit('updateListServices', services);
    },
    async fetchService({commit}, id) {
        const service = await ServiceService.loadService(id);
        commit('updateCurrentService', service);
    }
};

const mutations = {
    updateListServices(state, services) {
        state.listServices = services;
    },
    updateCurrentService(state, service) {
        state.currentService = service;
    }
};

const getters = {
    getListServices(state) {
        return state.listServices;
    },
    getCurrentService(state) {
        return state.currentService;
    }
};

export default {state, actions, mutations, getters};