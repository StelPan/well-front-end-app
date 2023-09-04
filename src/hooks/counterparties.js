import {computed, ref} from "vue";
import {
    email, passport_series, passport_numbers,
    inn, bik, ogrn, numeric, checking_account,
    oktmo, minLength, required
} from "@/utils/i18n-validators";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
export function useCounterparties() {
    const store = useStore();

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

    const mainRules = {
        postcode: {required, minLength: passport_numbers},
        bank: {required},
        region: {required},
        city: {required},
        street: {required},
        house: {required},
        postcode_fact: {required, minLength: passport_numbers},
        region_fact: {required},
        city_fact: {required},
        street_fact: {required},
        house_fact: {required},
        email: {required, email},
        phone: {required},
        discount: {required, numeric},
    };

    const ulRules = {
        full_name: {required},
        type: {required},
        short_name: {required},
        legal_form: {required},
        inn: {required, inn},
        kpp: {required, minLength: minLength(9)},
        ogrn: {required, ogrn},
        ogrn_date: {required},
        ogrn_place: {required},
        reg_date: {required},
        oktmo: {required, oktmo},
        ...mainRules
    };

    const ulv$ = useVuelidate(ulRules, form);

    const flRules = {
        last_name: {required},
        first_name: {required},
        birth_country: {required},
        birth_date: {required},
        citizenship: {required},
        inn: {required, minLength: inn},
        passport_issuer: {required},
        passport_issuer_code: {required},
        passport_date: {required},
        passport_series: {required, passport_series},
        passport_number: {required, passport_numbers},
        birth_city: {required},
        snils: {required, minLength: minLength(11)},
        ...mainRules
    };

    const flv$ = useVuelidate(flRules, form)

    const ipRules = {
        last_name: {required},
        first_name: {required},
        birth_country: {required},
        birth_city: {required},
        birth_date: {required},
        citizenship: {required},
        inn: {required, inn},
        oktmo: {required, oktmo},
        ogrnip: {required, ogrn},
        ogrnip_date: {required},
        ogrnip_place: {required},
        passport_issuer: {required},
        passport_issuer_code: {required},
        passport_date: {required},
        passport_series: {required, minLength: minLength(4)},
        passport_number: {required, minLength: minLength(6)},
        snils: {required, minLength: minLength(11)},
        ...mainRules
    };

    const ipv$ = useVuelidate(ipRules, form);

    const rulesFromType = {
        'ul': ulv$,
        'fl': flv$,
        'ip': ipv$,
    };

    const computedRules = computed(() => {
        if (!counterparty.value) {
            return null;
        }

        return rulesFromType[counterparty.value.type];
    })

    const counterparty = computed(() => store.getters.getCurrentCounterparty);
    const counterparties = computed(() => store.getters.getCounterpartiesList);
    const files = ref([]);
    const isCreate = ref(false);
    const isUpdate = ref(false);

    const loadCounterparties = async (params = {}) => {
        await store.dispatch("fetchCounterparties", params);
    };

    const loadCounterparty = async (id) => {
        await store.dispatch('fetchCounterparty', id);
    };

    const uploadPhoto = async (id, body) => {
        await store.dispatch('fetchUploadCounterpartyPhoto', {id, data: body});
    };

    const destroyPhoto = async (id, body = {}) => {
        const {uuid} = body
        await store.dispatch('fetchDestroyCounterpartyPhoto', {id, body: {uuid}});
        store.commit('clearCounterPartyPhoto', uuid);
    };


    const createCounterparty = async () => {
        const result = await rulesFromType[form.value.type].value.$validate();
        if (!result) {
            return;
        }

        const formData = new FormData();
        for (let key in form.value) {
            if (
                key === 'reg_date' ||
                key === 'ogrn_date' ||
                key === 'birth_date' ||
                key === 'ogrnip_date' ||
                key === 'passport_date'
            ) {
                const date = new Date(form.value[key]);

                const formatDate = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.'
                    + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.'
                    + (date.getFullYear());

                formData.set(key, formatDate);
                continue;
            }
            formData.set(key, form.value[key]);
        }

        await store.dispatch('fetchCreateCounterparty', formData);

        const create = computed(() => store.getters.getCreateCounterparty);

        if (files.value) {
            const requests = [];
            for (let file of files.value) {
                const data = new FormData();
                data.set('photo', file);
                requests.push(uploadPhoto(create.value.id, data));
            }

            await Promise.all(requests);
        }

        isCreate.value = true;
    };

    const updateCounterparty = async (id, form) => {
        const result = await rulesFromType[form.value.type].value.$validate();
        if (!result) {
            return;
        }

        const sendFormData = {};
        for (let key in form.value) {
            if (
                key === 'reg_date' ||
                key === 'ogrn_date' ||
                key === 'birth_date' ||
                key === 'ogrnip_date' ||
                key === 'passport_date'
            ) {
                const date = new Date(form.value[key]);
                sendFormData[key] = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.'
                    + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.'
                    + (date.getFullYear());

                continue;
            }

            sendFormData[key] = form.value[key];
        }

        await store.dispatch('fetchUpdateCounterparty', {id, body: sendFormData});

        if (files.value) {
            const requests = [];
            for (let file of files.value) {
                const data = new FormData();
                data.set('photo', file);
                requests.push(uploadPhoto(id, data));
            }

            await Promise.all(requests);
        }

        isUpdate.value = true;
    };

    const addFileMemory = ({files: requests}) => {
        files.value = requests;
    };

    const destroyFileMemory = (file) => {
        files.value = files.value.filter(f => f !== file);
    };

    return {
        ulv$,
        ipv$,
        flv$,
        isCreate,
        isUpdate,
        files,
        form,
        counterparty,
        counterparties,
        computedRules,
        loadCounterparties,
        loadCounterparty,
        createCounterparty,
        addFileMemory,
        destroyFileMemory,
        destroyPhoto,
        updateCounterparty
    };
}