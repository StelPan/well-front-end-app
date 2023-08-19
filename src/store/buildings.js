import {loadBuildings, loadBuilding} from "@/services/buildings";

const state = () => ({
    listBuildings: [],
    currentBuilding: {},
});

const actions = {
    async fetchBuildings({commit}) {
        const buildings = await loadBuildings();
        commit('updateListBuildings', buildings);
    }
};

const mutations = {
    updateListBuildings(state, buildings) {
        state.listBuildings = buildings;
    },
    updateCurrentBuilding(state, building) {
        state.currentBuildings = building;
    }
};

const getters = {
    getListBuildings(state) {
        return state.listBuildings;
    },
    getCurrentBuilding(state) {
        return state.currentBuilding;
    }
};

export default {state, actions, mutations, getters};