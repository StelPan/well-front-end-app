import { loadNotifications } from "@/services/notifications";

const state = () => ({
    notificationsList: [],
});

const actions = {
    async fetchNotifications({commit}) {
        const notifications = await loadNotifications();
        commit('updateNotifications', notifications);
    }
};

const mutations = {
    updateNotificationsList(state, notifications) {
        state.notificationsList = notifications;
    }
};

const getters = {
    getNotificationsList(state) {
        return state.notificationsList;
    }
};

export default {state,actions,mutations,getters};