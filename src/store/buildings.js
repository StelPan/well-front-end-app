import {loadBuildings, loadBuilding, createBuilding} from "@/services/buildings";

const state = () => ({
    listBuildings: [],
    currentBuilding: {},
});

const actions = {
    async fetchBuildings({commit}, params = {}) {
        const buildings = await loadBuildings(params);
        commit('updateListBuildings', buildings);
    },
    async fetchCreateBuilding({commit}, body = {}) {
        await createBuilding(body);
    },
    async fetchBuilding({commit}, id) {
        const {data: building} = await loadBuilding(id);
        commit('updateCurrentBuilding', building);
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