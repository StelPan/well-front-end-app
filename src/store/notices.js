import {createNotice, loadNotice, loadNotices, updateNotice} from "@/services/notices";

const store = () => ({
    listNotices: [],
    currentNotice: {}
});

const actions = {
    async fetchNotices({commit}, params = {}) {
        const notices = await loadNotices(params);
        commit('updateListNotices', notices);
    },
    async fetchNotice({commit}, id) {
        const {data: notice} = await loadNotice(id);
        commit('updateCurrentNotice', notice);
    },
    async fetchCreateNotice({commit}, body) {
        await createNotice(body);
    },
    async fetchUpdateNotice({commit}, {id, body}) {
        await updateNotice(id, body);
    }
};

const mutations = {
    updateListNotices(state, notices) {
        state.listNotices = notices;
    },
    updateCurrentNotice(state, notice) {
        state.currentNotice = notice;
    }
};

const getters = {
    getListNotices(state) {
        return state.listNotices;
    },
    getCurrentNotice(state) {
        return state.currentNotice;
    }
};

export default {store, actions, mutations, getters};