import {useStore} from "vuex";
import {computed, reactive, ref, watch} from "vue";

import {useVuelidate} from "@vuelidate/core";
import {required, email, numeric} from "@/utils/i18n-validators";

const DAILY_TYPE = 'daily';
const HOURLY_TYPE = 'hourly';
const MONTHLY_TYPE = 'monthly';

const TARIFF_NAMES = {
    [DAILY_TYPE]: 'Дневной',
    [HOURLY_TYPE]: 'Часовой',
    [MONTHLY_TYPE]: 'Долгосрочные',
};


export function useTariff() {
    const store = useStore();

    const tariff = computed(() => store.getters.getCurrentTariff);

    const form = ref({
        name_ru: '',
        description_ru: '',
        short_description_ru: '',
        period: '',
        cost: '',
    });

    const rules = {
        name_ru: {required},
        description_ru: {required},
        short_description_ru: {required},
        period: {required},
        cost: {required, numeric},
    };

    const v$ = useVuelidate(rules, form);

    const isCreated = ref(false);
    const isUpdated = ref(false);

    watch(form, () => {
        isCreated.value = false;
        isUpdated.value = false;
    });

    const typeTariffs = computed(() => {
        const tariffs = store.getters.getListTypeTariffs;
        return tariffs.map(tariff => {
            return {...tariff, name_ru: TARIFF_NAMES[tariff.name]}
        });
    });

    const loadTariff = async (id) => {
        await store.dispatch('fetchTariff', id);
    };

    const loadTypeTariffs = async () => {
        await store.dispatch('fetchTypeTariffs');
    };

    const toggleCreateTariff = async () => {
        const result = await v$.value.$validate();
        if (!result) {
            return false;
        }

        await store.dispatch('fetchCreateTariff', form.value);
        isCreated.value = true;
    };

    const toggleSetDefault = () => {
        isCreated.value = false;
        for (let key in form.value) {
            form.value[key] = ""
        }
    };

    const updateTariff = async (id, body) => {
        const result = await v$.value.$validate();
        if (!result) {
            return;
        }

        await store.dispatch('fetchUpdateTariff', {id, body});

        isUpdated.value = true;
    };

    const destroyTariff = async (id) => {
        await store.dispatch('fetchDestroyTariff', id);
    };

    return {
        form,
        v$,
        typeTariffs,
        isCreated,
        isUpdated,
        tariff,
        toggleCreateTariff,
        toggleSetDefault,
        loadTypeTariffs,
        loadTariff,
        updateTariff,
        destroyTariff,
    };
}