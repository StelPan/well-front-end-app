import { createStore } from 'vuex'

import country from "./country";
import auth from "./auth";
import roles from "./roles";
import users from "./users";
import counterparties from "./counterparties";
import notifications from "./notifications";
import typeNotices from "./type-notices";
import tariffs from "./tariffs";
import typeTariffs from "./type-tariffs";
import vendors from "./vendors";
import sidebar from "@/store/sidebar";
import reviews from "@/store/reviews";
import buildings from "@/store/buildings";
import typeLocations from "@/store/type-locations";

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
    users,
    counterparties,
    notifications,
    typeNotices,
    tariffs,
    typeTariffs,
    typeLocations,
    vendors,
    sidebar,
    reviews,
    buildings,
  }
});
