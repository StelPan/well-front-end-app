import { loadCountries } from "@/services/country";

const state = () => ({
    countriesList: [],
});

const actions = {
    async fetchCountries({ commit }) {
        const countries = await loadCountries();
        commit('updateCountriesList', countries);
    }
};

const mutations = {
    updateCountriesList(state, countries) {
        state.countriesList = countries;
    }
};

const getters = {
    getCountriesList(state) {
        return state.countriesList;
    }
};

export default { state, actions, mutations, getters };
