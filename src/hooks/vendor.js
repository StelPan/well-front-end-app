import {ref, computed} from 'vue';
import {useStore} from "vuex";

import {useVuelidate} from '@vuelidate/core';
import {
    required, numeric, bik, checking_account, oktmo, innfl,
    email, minLength, inn,
    ogrn, passport_series, passport_numbers
} from "@/utils/i18n-validators";

export function useVendor() {
    const store = useStore();

    const vendor = computed(() => store.getters.getCurrentVendor);


    const file = ref(false);
    const selectFileMemory = ({files}) => {
        file.value = files[0];
    };

    const deleteFileMemory = ({files}) => {
        file.value = false;
    };

    const form = ref({
        email: '',
        phone: '',
        type: '',
        discount: '',
        account: '',
        corr_account: '',
        bic: '',
        bank: '',
        short_name: '',
        full_name: '',
        legal_form: '',
        inn: '',
        kpp: '',
        ogrn: '',
        ogrn_date: '',
        ogrn_place: '',
        reg_date: '',
        oktmo: '',
        postcode: '',
        region: '',
        city: '',
        street: '',
        house: '',
        building: '',
        corps: '',
        floor: '',
        room: '',
        postcode_fact: '',
        region_fact: '',
        city_fact: '',
        street_fact: '',
        house_fact: '',
        building_fact: '',
        corps_fact: '',
        floor_fact: '',
        room_fact: '',
        passport_issuer_code: '',
        passport_issuer: '',
        passport_date: '',
        passport_series: '',
        passport_number: '',
        snils: '',
        org_name: '',
        ogrnip_place: '',
        ogrnip_date: '',
        ogrnip: '',
        citizenship: '',
        birth_date: '',
        fisrt_name: '',
        last_name: '',
        patronymic: '',
    });

    const mainRulesUl = {
        type: {required},
        full_name: {required},
        short_name: {required},
        legal_form: {required},
        inn: {required, inn},
        kpp: {required, minLength: minLength(9)},
        ogrn: {required, ogrn},
        ogrn_date: {required},
        ogrn_place: {required},
        reg_date: {required},
        oktmo: {required},
        postcode: {required, passport_numbers},
        region: {required},
        city: {required},
        street: {required},
        house: {required},
        postcode_fact: {required, passport_numbers},
        region_fact: {required},
        city_fact: {required},
        street_fact: {required},
        house_fact: {required},
        email: {required, email},
        phone: {required},
        discount: {required},
    };

    const mainRulesIP = {
        last_name: {required},
        first_name: {required},
        inn: {required, innfl},
        oktmo: {required},
        ogrnip: {required, ogrn},
        ogrnip_date: {required},
        ogrnip_place: {required},
        passport_issuer: {required},
        passport_issuer_code: {required},
        passport_date: {required},
        passport_series: {required, passport_series},
        passport_number: {required, passport_numbers},
        snils: {required, minLength: minLength(11)},
        postcode: {required, passport_numbers},
        region: {required},
        city: {required},
        street: {required},
        house: {required},
        postcode_fact: {required, passport_numbers},
        region_fact: {required},
        city_fact: {required},
        street_fact: {required},
        house_fact: {required},
        email: {required, email},
        phone: {required},
        discount: {required},
    }

    const vip$ = useVuelidate(mainRulesIP, form);
    const v$ = useVuelidate(mainRulesUl, form);

    const isCreate = ref(false);

    const loadVendor = async (id) => {
        await store.dispatch('fetchVendor', id);
    };

    const createVendor = async (type) => {
        let result = null;

        if (type === 'ul') result = await v$.value.$validate();
        if (type === 'ip') result = await vip$.value.$validate();

        if (!result) {
            return;
        }

        await store.dispatch('fetchCreateVendor', form.value);

        isCreate.value = true;
    };

    return {
        selectFileMemory,
        deleteFileMemory,
        createVendor,
        loadVendor,
        isCreate,
        vendor,
        file,
        form,
        vip$,
        v$,
    }
}