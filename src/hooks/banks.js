import {useStore} from "vuex";
import {computed, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@/utils/i18n-validators";

export function useBanks() {
    const store = useStore();

    const selectBank = ref('');
    const banks = computed(() => store.getters.getListBanks);
    const acquiring = computed(() => store.getters.getListAcquiring);

    const loadBanks = async () => {
        await store.dispatch('fetchBanks');
    };

    const loadAcquiring = async () => {
        await store.dispatch('fetchAcquiring', selectBank.value);
    };

    return {banks, loadBanks, loadAcquiring, selectBank, acquiring};
}