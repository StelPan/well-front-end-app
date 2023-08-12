import TypeTariffsService from "@/services/type-tariffs";

const state = () => ({
    listTypeTariffs: [],
});

const actions = {
    async fetchTypeTariffs({commit}) {
        const tariffs = await TypeTariffsService.loadTypeTariffs();
    }
};

const mutations = {
    updateTypeTariffs(state, tariffs) {
        state.listTypeTariffs = tariffs;
    }
};

const getters = {
    getListTypeTariffs(state) {
        return state.listTypeTariffs;
    }
};

export default {state, actions, mutations, getters};