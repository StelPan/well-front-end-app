import RoomCategoryService from "@/services/room-category";

const state = () => ({
    currentRoomCategory: [],
    roomCategoryTariffsList: [],
    roomCategoryServicesList: [],
    roomRoomCategoriesList: [],
});

const actions = {
    async fetchRoomCategory({commit}, {segmentId, roomCategoryId}){
        const {data: category} = await RoomCategoryService.loadRoomCategory(segmentId, roomCategoryId);
        commit('updateCurrentRoomCategory', category);
    },
    async fetchRoomCategoryTariffs({commit}, {segmentId, roomCategoryId}) {
        const {data: tariffs} = await RoomCategoryService.loadRoomCategoryTariffs(segmentId, roomCategoryId);
        commit('updateRoomCategoryTariffsList', tariffs);
    },
    async fetchRoomCategoryServices({commit}, {segmentId, roomCategoryId}) {
        const {data: services} = await RoomCategoryService.loadRoomCategoryServices(segmentId, roomCategoryId);
        commit('updateRoomCategoryServicesList', services);
    },
    async fetchRoomCategories({commit}, {segmentId, params}) {
        const categories = await RoomCategoryService.loadRoomCategories(segmentId, params);
        commit('updateRoomCategoriesList', categories);
    },
    async fetchTouchRoomCategoryTariff({commit}, {segmentId, roomCategoryId, body}){
        await RoomCategoryService.touchRoomCategoryTariff(segmentId, roomCategoryId, body);
    }
};

const mutations = {
    updateCurrentRoomCategory(state, category) {
        state.currentRoomCategory = category;
    },
    updateRoomCategoryTariffsList(state, tariffs) {
        state.roomCategoryTariffsList = tariffs;
    },
    updateRoomCategoriesList(state, categories) {
        state.roomRoomCategoriesList = categories;
    },
    updateRoomCategoryServicesList(state, services) {
        state.roomCategoryServicesList = services;
    }
};

const getters = {
    getCurrentRoomCategory(state) {
        return state.currentRoomCategory;
    },
    getRoomCategoryTariffsList(state) {
        return state.roomCategoryTariffsList;
    },
    getRoomCategoriesList(state) {
        return state.roomRoomCategoriesList;
    },
    getRoomCategoryServicesList(state) {
        return state.roomCategoryServicesList;
    }
};

export default {state, actions, mutations, getters};