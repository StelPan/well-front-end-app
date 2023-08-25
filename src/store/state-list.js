import {loadStates, updateState} from "@/services/state-list";

const state = () => ({
    stateList: [],
});

const actions = {
    async fetchStateList({commit}) {
        const states = await loadStates();
        commit('updateStateList', states);
    },
    async fetchUpdateState({commit}, {id, body}) {
        await updateState(id, body);
    }
};

const mutations = {
    updateStateList(state, states) {
        state.stateList = states;
    }
};

const getters = {
    getStateList(state) {
        return state.stateList?.data;
    }
};

export default {state,actions,mutations,getters};