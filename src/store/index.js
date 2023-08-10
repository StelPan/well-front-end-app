import { createStore } from 'vuex'

import country from "./country";
import auth from "./auth";
import roles from "./roles";
import users from "./users";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    country,
    auth,
    roles,
    users
  }
})
