import {computed, ref} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {required, numeric} from "@/utils/i18n-validators";

export function useServices () {
    const store = useStore();

    const service = computed(() => store.getters.getCurrentService);
    const services = computed(() => store.getters.getListServices);

    const form = ref({
        name_ru: '',
        service_category_id: '',
        description_ru: '',
        type: '',
        cost_type: '',
        has_days: false,
        has_intervals: false,
        variants: [],
        subservices: [],
    });

    const rules = {
        name_ru: {required},
        service_category_id: {required},
        description_ru: {required},
        type: {required},
        cost_type: required,
        has_days: {required},
        has_intervals: {required},
    };

    const v$ = useVuelidate(rules, form);

    const loadService = async (id) => {
        await store.dispatch('fetchService', id);
    };

    const loadServices = async (params = {}) => {
        await store.dispatch('fetchServices', params);
    };

    const createService = async (body = {}) => {
        await store.dispatch('fetchCreateService', body);
    };

    const addSubService = ({name, cost}) => {
        form.value.subservices.push({name, cost});
    };

    const destroyService = async (id) => {
        //
    };

    return {services, service, loadService, loadServices, createService, destroyService, v$};
}