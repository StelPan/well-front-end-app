import VendorService from "../services/vendors";

const state = () => ({
    listVendors: [],
    currentVendor: {}
});

const actions = {
    async fetchVendors({commit}, params = {}) {
        const vendors = await VendorService.loadVendors(params);
        commit('updateListVendors', vendors);
    },
    async fetchVendor({commit}, id) {
        const {data: vendor} = await VendorService.loadVendor(id);
        commit('updateCurrentVendor', vendor);
    }
};

const mutations = {
    updateListVendors(state, vendors) {
        state.listVendors = vendors;
    },
    updateCurrentVendor(state, vendor) {
        state.currentVendor = vendor;
    }
};

const getters = {
    getListVendors(state) {
        return state.listVendors;
    },
    getCurrentVendor(state) {
        return state.currentVendor;
    }
};

export default {state, actions, mutations, getters};