import ObjectService from "../services/objects";

const state = () => ({
    listObjects: [],
    listSegments: [],
    listCategories: [],
    currentObject: {},
});

const actions = {
    async loadSegments({commit}) {
        const {data: segments} = await ObjectService.loadFilterSegments();
        commit('updateListSegments', segments);
    },
    async loadCategoriesByFilter({commit}, filterId) {
        const {data: filters} = await ObjectService.loadCategoriesByFilter(filterId);
        commit('updateListCategories', filters);
    },
    async fetchObjectsByCategory({commit}, params = {}) {
        const {data: objects} = await ObjectService.loadObjectsByCategory(params);
        commit('updateListObjects', objects);
    }
};

const mutations = {
    updateListSegments(state, segments) {
        state.segments = segments;
    },
    updateListObjects(state, objects) {
        state.objects = objects;
    },
    updateListCategories(state, categories) {
        state.categories = categories;
    },
    updateCurrentObject(state, object) {
        state.currentObject = object;
    }
};

const getters = {
    getListSegments(state) {
        return state.listSegments;
    },
    getListObjects(state) {
        return state.listObjects;
    },
    getListCategories(state) {
        return state.listCategories;
    },
    getCurrentObject(state) {
        return state.currentObject;
    }
};

export default {state, actions, mutations, getters};