const state = () => ({
    confirmationStateModal: false,
    confirmationDestroyTariffModal: false,
    confirmationDestroyServiceCategoryModal: false,
    createTypeNoticeModal: false,
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
    },
    getConfirmationDestroyTariffModal(state) {
        return state.confirmationDestroyTariffModal;
    },
    getConfirmationDestroyServiceCategoryModal(state) {
        return state.confirmationDestroyServiceCategoryModal;
    },
    getCreateTypeNoticeModal(state) {
        return state.createTypeNoticeModal;
    }
};

export default {state, actions, mutations, getters};