import {ref, computed} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {required, helpers} from "@vuelidate/validators";

export function usePartnerCategory() {
    const store = useStore();

    const category = computed(() => store.getters.getCurrentPartnerCategory);

    const form = ref({
        name_ru: ''
    });

    const rules = {
        name_ru: {required: helpers.withMessage('Поле обязательно для заполнения', required)},
    };

    const v$ = useVuelidate(rules, form);

    const loadPartnerCategory = async (id) => {
        await store.dispatch('fetchPartnerCategory', id);
    };

    const updatePartnerCategory = async (id, body) => {
        const result = await v$.value.$validate();
        if (!result) {
            return;
        }

        await store.dispatch('fetchUpdatePartnerCategory', {
            id,
            body
        });
    };

    return {category, form, loadPartnerCategory, updatePartnerCategory, v$};
}