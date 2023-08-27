import PartnerService from "../services/partners";

const state = () => ({
    listPartners: [],
    listPartnerCategories: [],
    currentPartner: {},
    currentPartnerCategory: {}
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
    async fetchPartnerCategory({commit}, id) {
        const {data: category} = await PartnerService.loadPartnerCategory(id);
        commit('updateCurrentPartnerCategory', category);
    },
    async fetchUpdatePartnerCategory({commit}, {id, body}) {
        await PartnerService.updatePartnerCategory(id, body);
    },
    async fetchPartner({commit}, id) {
        const partner = await PartnerService.loadPartner(id);
        commit('updateCurrentPartner', partner);
    },
    async fetchUpdatePartner({commit}, {id, body}) {
        await PartnerService.updatePartner(id, body);
    },
    async fetchCreatePartnerCategory({commit}, body) {
        await PartnerService.createPartnerCategory(body);
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
    },
    updateCurrentPartnerCategory(state, category) {
        state.currentPartnerCategory = category;
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
    },
    getCurrentPartnerCategory(state) {
        return state.currentPartnerCategory;
    }
};

export default {state, actions, mutations, getters};