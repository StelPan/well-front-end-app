import RoomCategoryService from "@/services/room-category";

const state = () => ({
    currentRoomCategory: [],
    roomCategoryTariffsList: [],
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
    async fetchRoomCategories({commit}, {segmentId, params}) {
        const categories = await RoomCategoryService.loadRoomCategories(segmentId, params);
        commit('updateRoomCategoriesList', categories);
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
    }
};

export default {state, actions, mutations, getters};