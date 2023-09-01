import {computed, ref} from "vue";
import {useStore} from "vuex";

export function useCountries() {
    const store = useStore();

    const countries = computed(() => store.getters.getCountriesList);
    const selectCountry = computed(() => store.getters.getSelectCountry);

    const loadCountries = async () => {
        await store.dispatch('fetchCountries');
    };

    const toSelectCountryByPhoneCode = () => {
        store.commit(
            'selectCountryByPhoneCode',
            store.getters.getCurrentUser.phone_code
        );
    }

    return {
        countries,
        selectCountry,
        loadCountries,
        toSelectCountryByPhoneCode
    };
}