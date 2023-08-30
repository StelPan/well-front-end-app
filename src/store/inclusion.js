import InclusionService from "@/services/inclusion";

const store = () => ({
    listInclusions: [],
});

const actions = {
  async fetchInclusions({commit}) {
      const inclusions = await InclusionService.loadInclusions();
      commit('updateListInclusions', inclusions);
  }
};

const mutations = {
    updateListInclusions(state, inclusions) {
        state.listInclusions = inclusions;
    }
};

const getters = {
    getListInclusions(state) {
        return state.listInclusions;
    }
};

export default {store, actions, mutations, getters};