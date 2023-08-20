import PartnerService from "../services/partners";

const state = () => ({
    listPartners: [],
    listPartnerCategories: [],
    currentPartner: {},
});

const actions = {
    async fetchPartners({commit}, params = {}) {
        const partners = await PartnerService.loadPartners(params);
        commit('updateListPartners', partners);
    },
    async fetchPartnerCategories({commit}) {
        const categories = await PartnerService.loadPartnerCategories();
        commit('updateListPartnerCategories', categories);
    },
    async fetchPartner({commit}, id) {
        const partner = await PartnerService.loadPartner(id);
        commit('updateCurrentPartner', partner);
    }
};

const mutations = {
    updateListPartners(state, partners) {
        state.listPartners = partners;
    },
    updateListPartnerCategories(state, categories) {
        state.listPartnerCategories = categories;
    },
    updateCurrentPartner(state, partner) {
        state.currentPartner = partner
    }
};

const getters = {
    getListPartners(state) {
        return state.listPartners;
    },
    getListPartnerCategories(state) {
        return state.listPartnerCategories
    },
    getCurrentPartner(state) {
        return state.currentPartner;
    }
};

export default {state, actions, mutations, getters};