import {loadTypeNotices} from "@/services/type-notices";

const state = () => ({
   listTypeNotices: [],
});

const actions = {
    async fetchTypeNotices({commit}) {
        const {data} = await loadTypeNotices();
        commit('updateListTypeNotices', data);
    }
};

const mutations = {
  updateListTypeNotices(state, typeNotices) {
      state.listTypeNotices = typeNotices;
  }
};

const getters = {
    getListTypeNotices(state) {
        return state.listTypeNotices;
    }
};

export default {state, actions, mutations, getters};