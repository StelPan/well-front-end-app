import {loadTypeLocations} from "../services/type-locations";

const state = () => ({
   listTypeLocations: []
});

const actions = {
    async fetchTypeLocations({commit}) {
        const typeLocations = await loadTypeLocations();
    }
};

const mutations = {
    updateListTypeLocations(state, typeLocations) {
        state.listTypeLocations = typeLocations;
    }
};

const getters = {
    getListTypeLocations(state) {
        return state.listTypeLocations;
    }
};

export default {state, actions, mutations, getters};