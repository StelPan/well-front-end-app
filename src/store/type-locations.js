import {loadTypeLocations} from "@/services/type-locations";

const state = () => ({
   listTypeLocations: []
});

const actions = {
    async fetchTypeLocations({commit}) {
        const {data: typeLocations} = await loadTypeLocations();
        commit('updateListTypeLocations', typeLocations);
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