const state = () => ({
    confirmationStateModal: false,
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
    }
};

export default {state, actions, mutations, getters};