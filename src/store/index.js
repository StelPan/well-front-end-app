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
import modals from "@/store/modals";
import serviceCategory from "@/store/service-category";
import services from "@/store/services";
import statePermission from "@/store/state-permission";
import stateList from "@/store/state-list";
import notices from "@/store/notices";
import objects from "@/store/objects";
import banks from "@/store/banks";
import partners from "@/store/partners";
import segments from "@/store/segments";
import roomCategory from "@/store/room-category";

export default createStore({
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
    modals,
    serviceCategory,
    services,
    stateList,
    statePermission,
    notices,
    objects,
    banks,
    partners,
    segments,
    roomCategory,
  }
});
