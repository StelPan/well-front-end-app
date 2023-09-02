import {computed, ref} from "vue";
import {useStore} from "vuex";

export function useServices () {
    const store = useStore();

    const service = computed(() => store.getters.getCurrentService);
    const services = computed(() => store.getters.getListServices);

    const loadService = async (id) => {
        await store.dispatch('fetchService', id);
    };

    const loadServices = async (params = {}) => {
        await store.dispatch('fetchServices', params);
    };

    const createService = async (body = {}) => {
        await store.dispatch('fetchCreateService', body);
    };

    const destroyService = async (id) => {
        //
    };

    return {services, service, loadService, loadServices, createService, destroyService};
}