import TariffsService from "../services/tariffs";

const state = () => ({
    listTariffs: [],
    currentTariff: {},
});

const actions = {
    async fetchTariffs({commit}, params = {}) {
        const tariffs = await TariffsService.loadTariffs(params);
        commit('updateListTariffs', tariffs);
    },
    async fetchTariff({commit}, id) {
        const {data: tariff} = await TariffsService.loadTariff(id);
        commit('updateCurrentTariff', tariff)
    },
    async fetchUpdateTariff({commit}, {id, body}) {
        const update = await TariffsService.editTariff(id, body);
    },
    async fetchCreateTariff({commit}, body) {
        await TariffsService.createTariff(body);
    },
    async fetchDestroyTariff({commit}, id) {
        // await TariffsService.
    }
};

const mutations = {
    updateListTariffs(state, tariffs) {
        state.listTariffs = tariffs;
    },
    updateCurrentTariff(state, tariff) {
        state.currentTariff = tariff;
    }
};

const getters = {
    getListTariffs(state) {
        return state.listTariffs;
    },
    getCurrentTariff(state) {
        return state.currentTariff;
    }
};

export default {state, actions, mutations, getters};