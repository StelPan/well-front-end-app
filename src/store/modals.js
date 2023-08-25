const state = () => ({
    confirmationStateModal: false,
    userFilterModal: false,
});

const actions = {
  changeStateModal({commit}, { type, bool }) {
      commit('updateStateModal', { type, bool });
  }
};

const mutations = {
    updateStateModal(state, { type, bool }) {
        state[type] = bool;
    }
};

const getters = {
    getConfirmationStateModal(state) {
        return state.confirmationStateModal;
    },
    getUserFilterModal(state) {
        return state.userFilterModal;
    }
};

export default {state, actions, mutations, getters};