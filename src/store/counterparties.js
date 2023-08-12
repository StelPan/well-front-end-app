import CounterpartyService from "../services/counterparties";

const state = () => ({
    counterpartiesList: [],
    currentCounterparty: {},
});

const actions = {
    async fetchCounterparties({commit}) {
        const counterparties = await CounterpartyService.loadCounterparties();
        commit('updateCounterpartiesList', counterparties);
    }
};

const mutations = {
    updateCounterpartiesList(state, counterparties) {
        state.counterpartiesList = counterparties;
    },
    updateCurrentCounterparty(state, counterparty) {
        state.currentCounterparty = counterparty;
    },
};

const getters = {
    getCounterpartiesList(state) {
        return state.counterpartiesList;
    },
    getCurrentCounterparty(state) {
        return state.currentCounterparty;
    }
};

export default {state, actions, mutations, getters};
