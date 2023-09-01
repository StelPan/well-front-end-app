import {ref, computed} from 'vue';
import {useStore} from "vuex";

import {useVuelidate} from '@vuelidate/core';
import {required, email, numeric, helpers} from '@vuelidate/validators';

const inn = (val) => val.length === 10;

export function useVendor() {
    const store = useStore();

    const vendor = computed(() => store.getters.getCurrentVendor);
    const formData = ref(vendor.value);

    const requiredMessage = 'Поле обязательно для заполнения';

    const rules = {
        inn: {
            required: helpers.withMessage(requiredMessage, required),
            numeric: helpers.withMessage('Некорректное значение', numeric),
            inn: helpers.withMessage('Длина ИНН должна составлять 10 символов', inn)
        },
        data: {
            full_name: {required: helpers.withMessage(requiredMessage, required)},
            short_name: {required: helpers.withMessage(requiredMessage, required)}, // ?
            oktmo: {required: helpers.withMessage(requiredMessage, required)},
            kpp: {required: helpers.withMessage(requiredMessage, required)},
            ogrn_place: {required: helpers.withMessage(requiredMessage, required)},
            ogrn: {required: helpers.withMessage(requiredMessage, required)},
            ogrn_date: {required: helpers.withMessage(requiredMessage, required)},
            legal_form: {required: helpers.withMessage(requiredMessage, required)}, // ?
        },
        postcode: {required: helpers.withMessage(requiredMessage, required)},
        region: {required: helpers.withMessage(requiredMessage, required)},
        region_fact: {required: helpers.withMessage(requiredMessage, required)},
        city: {required: helpers.withMessage(requiredMessage, required)},
        city_fact: {required: helpers.withMessage(requiredMessage, required)},
        street: {required: helpers.withMessage(requiredMessage, required)},
        street_fact: {required: helpers.withMessage(requiredMessage, required)},
        house: {required: helpers.withMessage(requiredMessage, required)},
        house_fact: {required: helpers.withMessage(requiredMessage, required)},
        discount: {required: helpers.withMessage(requiredMessage, required)},
    };

    const loadVendor = async (id) => {
        await store.dispatch('fetchVendor', id);
    };

    const v$ = useVuelidate(rules, formData);

    return {
        loadVendor,
        formData,
        vendor,
        rules,
        v$
    }
}