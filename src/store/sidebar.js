const state = () => ({
    toggle: true
});

const actions = {
    changeToggle({commit}) {
        commit('updateToggle');
    }
};

const mutations = {
    updateToggle(state) {
        state.toggle = !state.toggle;
    }
};

const getters = {
    getToggle(state) {
        return state.toggle;
    }
};

export default {state, actions, mutations, getters};