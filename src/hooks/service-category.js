import {computed, ref, watch} from "vue";
import {useStore} from "vuex";
import {required} from "@/utils/i18n-validators";
import {useVuelidate} from "@vuelidate/core";

export function useServiceCategory () {
    const store = useStore();

    const category = computed(() => store.getters.getCurrentServiceCategory);

    const schema = {
        name_ru: '',
        name_en: '',
        name_ch: '',
        quick_access: 0,
        acquiring_id: ''
    };

    const form = ref({...schema});

    const rules = {
        name_ru: {required},
        acquiring_id: {required},
        quick_access: {required},
    };

    const v$ = useVuelidate(rules, form);

    const files = ref({
        icon: null,
        banner: null,
    });

    const fileRules = {
        icon: {required},
        banner: {required},
    }

    const vf$ = useVuelidate(fileRules, files);

    const isCreate = ref();
    const isUpdate = ref();

    const createServiceCategory = async () => {
        const r1 = await v$.value.$validate();
        const r2 = await vf$.value.$validate();
        if (!(r1 && r2)) {
            return;
        }

        const formData = new FormData();

        formData.set('quick_access', Number(form.value.quick_access));

        for (let key in form.value) {
            if (key === 'quick_access') continue;
            formData.set(key, form.value[key]);
        }

        await store.dispatch('fetchCreateServiceCategory', formData);

        isCreate.value = true;
    };

    const updateServiceCategory = async () => {
        const result = await v$.value.$validate();
        if (!result) {
            return;
        }

        const formData = new FormData();

        formData.set('quick_access', Number(form.value.quick_access));

        for (let key in form.value) {
            if (key === 'quick_access') continue;
            if (key === 'icon' || key === 'banner') continue;
            formData.set(key, form.value[key]);
        }

        if (files.value.banner) {
            formData.set('banner', files.value.banner);
        }

        if (files.value.icon) {
            formData.set('icon', files.value.icon);
        }

        await store.dispatch('fetchUpdateServiceCategory', {
            id: category.value.id,
            body: formData,
        });

        isUpdate.value = true;
    };

    const loadServiceCategory = async (id) => {
        await store.dispatch('fetchServiceCategory', id);
    };

    const loadServiceCategories = async () => {
        await store.dispatch('fetchServiceCategories');
    };

    const selectBannerFile = ({files: file}) => {
        files.value.banner = file[0];
    };

    const selectIconFile = ({files: file}) => {
        files.value.icon = file[0];
    };

    watch(form, () => isCreate.value = false);

    return {
        form,
        createServiceCategory, v$, selectIconFile,
        selectBannerFile, isCreate, category,
        loadServiceCategory, updateServiceCategory, loadServiceCategories,
        isUpdate, files, vf$,
    };
}