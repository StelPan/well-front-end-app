import {loadStates} from "@/services/state-list";

const state = () => ({
    stateList: [],
});

const actions = {
    async fetchStateList({commit}) {
        const states = await loadStates();
        commit('updateStateList', states);
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