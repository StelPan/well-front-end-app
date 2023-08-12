import TariffsService from "../services/tariffs";

const state = () => ({
    listTariffs: [],
});

const actions = {
    async fetchTariffs({commit}, params = {}) {
        const tariffs = await TariffsService.loadTariffs(params);
        commit('updateListTariffs', tariffs);
    }
};

const mutations = {
    updateListTariffs(state, tariffs) {
        state.listTariffs = tariffs;
    }
};

const getters = {
    getListTariffs(state) {
        return state.listTariffs;
    }
};

export default {state, actions, mutations, getters};