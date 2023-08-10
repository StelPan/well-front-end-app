import {loadUsers, loadUser} from "@/services/users";

const state = () => ({
    usersList: [],
    currentUser: null,
});

const actions = {
    async fetchUsers({commit}, params = {}) {
        const data = await loadUsers();
        commit('updateUsersList', data);
    },
    async fetchUser({commit}, id) {
        const data = await loadUser(id);
        console.log(data);
    }
};

const mutations = {
    updateUsersList(state, users) {
        state.usersList = users;
    },
    updateCurrentUser(state, user) {
        state.usersList = user;
    }
};

const getters = {
    getUsersList(state) {
        return state.usersList;
    },
    getCurrentUser(state) {
        return state.currentUser;
    }
};

export default {state, actions, mutations, getters};
