import {loadRoles} from "@/services/roles";

const state = () => ({
    rolesList: [],
});

const actions = {
    async fetchRoles({commit}) {
        const {data: roles} = await loadRoles();
        commit('updateRolesList', roles);
    }
};

const mutations = {
    updateRolesList(state, roles) {
        state.rolesList = roles;
    },
};

const getters = {
    getRolesList(state) {
        return state.rolesList;
    }
};

export default {state, actions, mutations, getters};
