import SegmentService from "@/services/segments";
const state = () => ({
    listBuildingSegments: [],
    currentBuildingSegment: {},
});

const actions = {
    async fetchBuildingSegments({commit}, params = {}) {
        const segments = await SegmentService.loadSegments(params);
        commit('updateListBuildingSegments', segments);
    },

};

const mutations = {
    updateListBuildingSegments(state, segments) {
        state.listSegments = segments;
    },
    updateCurrentBuildingSegment(state, segment) {
        state.segment = segment;
    }
};

const getters = {
    getListBuildingSegments(state) {
        return state.listSegments;
    },
    getCurrentBuildingSegment(state) {
        return state.getCurrentSegment;
    }
};

export default {state, actions, mutations, getters};