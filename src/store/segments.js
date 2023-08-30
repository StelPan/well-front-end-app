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
    async fetchBuildingSegment({commit}, id) {
        const {data: segment} = await SegmentService.loadSegment(id);
        commit('updateCurrentBuildingSegment', segment);
    },
    async fetchUpdateSegment({commit}, {id, body}) {
        await SegmentService.updateSegment(id, body);
    },
    async fetchCreateSegment({commit}, body = {}) {
        await SegmentService.createSegment(body);
    }
};

const mutations = {
    updateListBuildingSegments(state, segments) {
        state.listSegments = segments;
    },
    updateCurrentBuildingSegment(state, segment) {
        state.currentBuildingSegment = segment;
    }
};

const getters = {
    getListBuildingSegments(state) {
        return state.listSegments;
    },
    getCurrentBuildingSegment(state) {
        return state.currentBuildingSegment;
    }
};

export default {state, actions, mutations, getters};