import ServiceService from "../services/services";

const state = () => ({
    listServices: [],
    currentService: {},
    createService: {},
});

const actions = {
    async fetchServices({commit}, params = {}) {
        const services = await ServiceService.loadServices(params);
        commit('updateListServices', services);
    },
    async fetchService({commit}, id) {
        const {data: service} = await ServiceService.loadService(id);
        commit('updateCurrentService', service);
    },
    async fetchUpdateService({commit}, {id, body}) {
        await ServiceService.updateService(id, body);
    },
    async fetchUploadServicePhoto({commit}, {id, body}) {
        await ServiceService.uploadServicePhoto(id, body);
    },
    async fetchDestroyServicePhoto({commit}, {id, uuid}) {
        await ServiceService.destroyServicePhoto(id, uuid);
        commit('deletePhotoCurrentService');
    },
    async fetchCreateService({commit}, body = {}) {
        const {data: service} = await ServiceService.createService(body);
        commit('updateCreateService', service);
    },
    async fetchCreateServiceCategory({commit}, body = {}) {
        await ServiceService.createServiceCategory(body);
    }
};

const mutations = {
    updateListServices(state, services) {
        state.listServices = services;
    },
    updateCurrentService(state, service) {
        state.currentService = service;
    },
    deletePhotoCurrentService(state, {id, uuid}) {
        state.currentService.photos = state.currentService.photos.filter(photo => photo.uuid !== uuid);
    },
    updateCreateService(state, service) {
        state.createService = service;
    }
};

const getters = {
    getListServices(state) {
        return state.listServices;
    },
    getCurrentService(state) {
        return state.currentService;
    },
    getCreateService(state) {
        return state.createService;
    }
};

export default {state, actions, mutations, getters};