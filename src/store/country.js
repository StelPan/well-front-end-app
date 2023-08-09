import {loadCountries} from "@/services/country";

const state = () => ({
    countriesList: [],
    countriesListCp: [],
    selectCountry: null,
});

const actions = {
    async fetchCountries({commit}) {
        const countries = await loadCountries();
        commit('updateCountriesList', countries);
    }
};

const mutations = {
    updateCountriesList(state, countries) {
        state.countriesList = state.countriesListCp = countries;
    },
    filterCountriesList(state, searchCountry) {
        state.countriesList = state.countriesListCp.filter(country => {
            const regex = new RegExp(`.*${searchCountry}.*`, "mgi");
            return country.name.match(regex);
        });
    },
    selectCountry(state, id) {
        state.selectCountry = state.countriesListCp.find(country => country.id === id);
    }
};

const getters = {
    getCountriesList(state) {
        return state.countriesList;
    }
};

export default {state, actions, mutations, getters};
