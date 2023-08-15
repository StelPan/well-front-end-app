import {loadPermissions} from "../services/permission-list";

const state = () => ({
   permissionList: []
});

const actions = {
  async fetchPermissions({commit}) {
      const permissions = await loadPermissions();
      commit('updatePermissionList', permissions);
  }
};

const mutations = {
    updatePermissionList(state, permission) {
        state.permissionList = permission;
    }
};

const getters = {
    getPermissionList(state) {
        return state.permissionList?.data;
    }
};

export default {state, actions, mutations, getters};
