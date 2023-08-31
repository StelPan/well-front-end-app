import {
    loadBuildings,
    loadBuilding,
    createBuilding,
    destroyBuilding,
    createBuildingLocationPoint,
    updateBuildingLocationPoint,
    updateBuilding,
    changePointTypeLocationPoint,
} from "@/services/buildings";

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
    },
    async fetchUpdateBuilding({commit}, {id, body}) {
        await updateBuilding(id, body)
    },
    async fetchDestroyBuilding({commit}, id) {
        await destroyBuilding(id);
    },
    async fetchCreateBuildingLocationPoint({commit}, {id, body = {}}) {
        await createBuildingLocationPoint(id, body);
    },
    async fetchUpdateBuildingLocationPoint({commit}, {buildingId, pointId, body = {}}){
        await updateBuildingLocationPoint(buildingId, pointId, body);
    },
    async fetchChangePointTypeLocationPoint({commit}, {buildingId, pointId, body}) {
        await changePointTypeLocationPoint(buildingId, pointId, body);
    },
};

const mutations = {
    updateListBuildings(state, buildings) {
        state.listBuildings = buildings;
    },
    updateCurrentBuilding(state, building) {
        state.currentBuilding = building;
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