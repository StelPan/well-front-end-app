import {computed, ref} from "vue";
import {useStore} from "vuex";

export function usePartner() {
    const store = useStore();

    const partners = computed(() => store.getters.getListPartners);
    const partnerCategories = computed(() => store.getters.getListPartnerCategories);

    const loadPartners = async (params = {}) => {
        await store.dispatch('fetchPartners', params);
    };

    const loadPartnerCategories = async (params = {}) => {
        await store.dispatch('fetchPartnerCategories', params);
    };

    return {partners, partnerCategories, loadPartners, loadPartnerCategories}
}