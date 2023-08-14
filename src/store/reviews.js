import {loadReviews, loadReview, confirmReview, declineReview} from "@/services/reviews";

const state = () => ({
    listReviews: [],
    currentReview: {},
});

const actions = {
    async fetchReviews({commit}, params = {}) {
        const reviews = await loadReviews(params);
        commit('updateListReviews', reviews);
    },
    async fetchReview({commit}, id) {
        const {data: review} = await loadReview(id);
        commit('updateCurrentReview', review);
    },
    async fetchConfirmReview(_, {id, body}) {
        await confirmReview(id, body);
    },
    async fetchDeclineReview(_, {id, body}) {
        await declineReview(id, body);
    }
};

const mutations = {
    updateListReviews(state, reviews) {
        state.listReviews = reviews;
    },
    updateCurrentReview(state, review) {
        state.currentReview = review;
    }
};

const getters = {
    getListReviews(state) {
        return state.listReviews;
    },
    getCurrentReview(state) {
        return state.currentReview;
    }
};

export default {state, actions, mutations, getters};
