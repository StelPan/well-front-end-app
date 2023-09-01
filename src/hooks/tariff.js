import {useStore} from "vuex";
import {computed, reactive, ref, watch} from "vue";

import {useVuelidate} from "@vuelidate/core";
import {required, numeric, helpers} from "@vuelidate/validators";

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

    const form = ref({
        name_ru: '',
        description_ru: '',
        short_description_ru: '',
        period: '',
        cost: '',
    });

    const rules = {
        name_ru: {required: helpers.withMessage('Поле обязательно для заполнения', required)},
        description_ru: {required: helpers.withMessage('Поле обязательно для заполнения', required)},
        short_description_ru: {required: helpers.withMessage('Поле обязательно для заполнения', required)},
        period: {required: helpers.withMessage('Поле обязательно для заполнения', required)},
        cost: {
            required: helpers.withMessage('Поле обязательно для заполнения', required),
            numeric: helpers.withMessage('Только числовой формат', numeric),
        },
    };

    const v$ = useVuelidate(rules, form);

    const isCreated = ref(false);
    watch(form, () => isCreated.value = false);

    const typeTariffs = computed(() => {
        const tariffs = store.getters.getListTypeTariffs;
        return tariffs.map(tariff => {
            return {...tariff, name_ru: TARIFF_NAMES[tariff.name]}
        });
    });

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

    return {
        form,
        v$,
        typeTariffs,
        isCreated,
        toggleCreateTariff,
        toggleSetDefault,
        loadTypeTariffs
    };
}