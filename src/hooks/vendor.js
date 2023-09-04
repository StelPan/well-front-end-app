import {ref, computed} from 'vue';
import {useStore} from "vuex";

import {useVuelidate} from '@vuelidate/core';
import {required, email, numeric, helpers} from '@vuelidate/validators';
import {minLength} from "@/utils/i18n-validators";

const inn = (val) => val.length === 10;

export function useVendor() {
    const store = useStore();

    const vendor = computed(() => store.getters.getCurrentVendor);
    const formData = ref(vendor.value);

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
        full_name: {required},
        type: {required},
        short_name: {required},
        legal_form: {required},
        inn: {required, minLength: minLength(10)},
        kpp: {required, minLength: minLength(9)},
        ogrn: {required, minLength: minLength(13)},
        ogrn_date: {required},
        ogrn_place: {required},
        reg_date: {required},
        oktmo: {required},
        postcode: {required, minLength: minLength(6)},
        region: {required},
        city: {required},
        street: {required},
        house: {required},
        postcode_fact: {required, minLength: minLength(6)},
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
        birth_country: {required},
        birth_city: {required},
        birth_date: {required},
        citizenship: {required},
        inn: {required, minLength: minLength(12)},
        oktmo: {required},
        ogrnip: {required, minLength: minLength(13)},
        ogrnip_date: {required},
        ogrnip_place: {required},
        passport_issuer: {required},
        passport_issuer_code: {required},
        passport_date: {required},
        passport_series: {required, minLength: minLength(4)},
        passport_number: {required, minLength: minLength(6)},
        snils: {required, minLength: minLength(11)},
        postcode: {required, minLength: minLength(6)},
        region: {required},
        city: {required},
        street: {required},
        house: {required},
        postcode_fact: {required, minLength: minLength(6)},
        region_fact: {required},
        city_fact: {required},
        street_fact: {required},
        house_fact: {required},
        email: {required, email},
        phone: {required},
        discount: {required},
    }

    const v$ = useVuelidate(mainRulesUl, form);
    const vip$ = useVuelidate(mainRulesIP, form);

    const loadVendor = async (id) => {
        await store.dispatch('fetchVendor', id);
    };

    return {
        loadVendor,
        formData,
        vendor,
        v$,
        vip$,
    }
}