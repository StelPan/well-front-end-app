import {useStore} from "vuex";
import {computed} from "vue";

export function useBanks() {
    const store = useStore();

    const banks = computed(() => store.getters.getListBanks);
    const bank = computed(() => store.getters.getCurrentBank);

    const loadBanks = async () => {
        await store.dispatch('fetchBanks');
    };

    const loadAcquiring = async () => {
        await store.dispatch('fetchAcquiring', )
    }

    return {loadBanks}
}