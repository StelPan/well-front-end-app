import {loadNotice, loadNotices} from "@/services/notices";

const store = () => ({
    listNotices: [],
    currentNotice: {}
});

const actions = {
    async fetchNotices({commit}, params = {}) {
        const notices = await loadNotices();
        commit('updateListNotices', notices);
    },
    async fetchNotice({commit}, id) {
        const notice = await loadNotice(id);
        commit('updateCurrentNotice', notice);
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