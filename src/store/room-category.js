import RoomCategoryService from "@/services/room-category";

const state = () => ({
    currentRoomCategory: [],
});

const actions = {
    async fetchRoomCategory({commit}, {segmentId, roomCategoryId}){
        const {data: category} = await RoomCategoryService.loadRoomCategory(segmentId, roomCategoryId);
        commit('updateCurrentRoomCategory', category);
    }
};

const mutations = {
    updateCurrentRoomCategory(state, category) {
        state.currentRoomCategory = category;
    }
};

const getters = {
    getCurrentRoomCategory(state) {
        return state.currentRoomCategory;
    }
};

export default {state, actions, mutations, getters};