import VendorService from "../services/vendors";

const state = () => ({
    listVendors: [],
});

const actions = {
    async fetchVendors({commit}, params = {}) {
        const vendors = await VendorService.loadVendors();
        commit('updateListVendors', vendors);
    }
};

const mutations = {
    updateListVendors(state, vendors) {
        state.listVendors = vendors;
    }
};

const getters = {
    getListVendors(state) {
        return state.listVendors;
    }
};

export default {state, actions, mutations, getters};