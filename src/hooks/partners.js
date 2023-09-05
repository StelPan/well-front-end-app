import {useStore} from "vuex";
import {computed, ref} from "vue";
import {required} from  "@/utils/i18n-validators";
import {useVuelidate} from "@vuelidate/core";

export function usePartners(globalConfig) {
    const store = useStore();

    const form = ref({
        name: '',
        promo_type: '',
        partner_category_id: '',
        description_ru: '',
        description_en: '',
        description_ch: ''
    });

    const rules = {
        name: {required},
        promo_type: {required},
        description_ru: {required},
        partner_category_id: {required},
    };

    const v$ = useVuelidate(rules, form);

    const partner = computed(() => store.getters.getCurrentPartner);

    const files = ref([]);
    const isUpdate = ref(false);

    const loadPartner = async (id) => {
        await store.dispatch('fetchPartner', id);
    };

    const uploadFiles = async () => {
        const requests = [];
        for (let file of files.value) {
            const formData = new FormData();
            formData.set('photo', file);
            requests.push(store.dispatch('fetchUploadPartnerPhoto', {
                id: partner.value.id,
                body: formData
            }));
        }

        await Promise.all(requests);
    };

    const updatePartner = async () => {
        const result = await v$.value.$validate();
        if (!result) {
            return;
        }

        await store.dispatch('fetchUpdatePartner', {
            id: partner.value.id,
            body: form.value
        });

        if (files.value.length) {
            await uploadFiles();
        }

        isUpdate.value = true;
    };


    const loadFileMemory = ({files: photos}) => {
        files.value.push(...photos);
    };

    const destroyFileMemory = (file) => {
        files.value = files.value.filter(f => f !== file);
    };

    const destroyFile = async (id, body) => {
        await store.dispatch('fetchDestroyPartnerPhoto', {id, body});
    };

    return {
        partner, form, files, v$, isUpdate,
        uploadFiles, loadFileMemory, loadPartner,
        updatePartner,
        destroyFileMemory, destroyFile
    };
}