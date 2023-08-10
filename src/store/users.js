import {loadUsers} from "@/services/users";

const state = () => ({
    usersList: [],
});

const actions = {
    async fetchUsers({commit}, params = {}) {
        const { data: users } = await loadUsers();
        commit('updateUsersList', users);
    }
};

const mutations = {
    updateUsersList(state, users) {
        state.usersList = users;
    },
};

const getters = {
    getUsersList(state) {
        return state.usersList;
    }
};

export default {state, actions, mutations, getters};
