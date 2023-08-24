import ServiceCategory from "../services/service-category";
const state = () => ({
   listServiceCategories: [],
   currentServiceCategory: {},
});

const actions = {
    async fetchServiceCategories({commit}) {
        const services = await ServiceCategory.loadServiceCategories();
        commit('updateListServiceCategories', services);
    },
    async fetchServiceCategory({commit}, id) {
        const service = await ServiceCategory.loadServiceCategory(id);
        commit('updateCurrentServiceCategory', service);
    },
    async fetchUpdateServiceCategory({commit}, {id, body}) {
        await ServiceCategory.updateServiceCategory(id, body);
    }
};

const mutations = {
    updateListServiceCategories(state, serviceCategories) {
        state.listServiceCategories = serviceCategories;
    },
    updateCurrentServiceCategory(state, serviceCategory) {
        state.currentServiceCategory = serviceCategory;
    }
};

const getters = {
    getListServiceCategories(state) {
        return state.listServiceCategories;
    },
    getCurrentServiceCategory(state) {
        return state.currentServiceCategory;
    }
};

export default {state, actions, mutations, getters};