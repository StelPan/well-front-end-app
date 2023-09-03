import BankService from "../services/banks";

const state = () => ({
    listBanks: [],
    listAcquiring: [],
    currentBank: {},
});

const actions = {
    async fetchBanks({commit}) {
        const {data: banks} = await BankService.loadBanks();
        commit('updateListBanks', banks);
    },
    async fetchBank({commit}, id) {
        const {data: banks} = await BankService.loadBanks();
        const bank = banks.find(b => b.id === id);
        commit('updateCurrentBank', bank);
    },
    async fetchAcquiring({commit}, bankId) {
        const {data: acquiring} = await BankService.loadAcquiring(bankId);
        commit('updateListAcquiring', acquiring);
    },
    async fetchCreateAcquiring({commit}, {bankId, body}) {
        await BankService.createAcquiring(bankId, body);
    }
};

const mutations = {
    updateListBanks(state, banks) {
        state.listBanks = banks;
    },
    updateListAcquiring(state, acquiring) {
        state.listAcquiring = acquiring;
    },
    updateCurrentBank(state, bank) {
        state.currentBank = bank;
    }
};

const getters = {
    getListBanks(state) {
        return state.listBanks;
    },
    getListAcquiring(state) {
        return state.listAcquiring;
    },
    getCurrentBank(state) {
        return state.currentBank;
    }
};

export default {state, actions, mutations, getters};