import CounterpartyService from "../services/counterparties";

const state = () => ({
    counterpartiesList: [],
    currentCounterparty: {},
    createCounterparty: {},
});

const actions = {
    async fetchCounterparties({commit}) {
        const counterparties = await CounterpartyService.loadCounterparties();
        commit('updateCounterpartiesList', counterparties);
    },
    async fetchCounterparty({commit}, id) {
        const {data: counterparty} = await CounterpartyService.loadCounterparty(id);
        commit('updateCurrentCounterparty', counterparty);
    },
    async fetchCreateCounterparty({commit}, body = {}) {
        const {data} = await CounterpartyService.createCounterparty(body);
        commit('updateCreateCounterparty', data);
    },
    async fetchUploadCounterpartyPhoto({commit}, {id, data}) {
        await CounterpartyService.uploadCounterpartyPhoto(id, data);
    }
};

const mutations = {
    updateCounterpartiesList(state, counterparties) {
        state.counterpartiesList = counterparties;
    },
    updateCurrentCounterparty(state, counterparty) {
        state.currentCounterparty = counterparty;
    },
    updateCreateCounterparty(state, counterparty) {
        state.createCounterparty = counterparty;
    }
};

const getters = {
    getCounterpartiesList(state) {
        return state.counterpartiesList;
    },
    getCurrentCounterparty(state) {
        return state.currentCounterparty;
    },
    getCreateCounterparty(state) {
        return state.createCounterparty;
    }
};

export default {state, actions, mutations, getters};
