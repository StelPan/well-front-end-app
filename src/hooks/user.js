import {ref, computed, reactive} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {required, email} from "@/utils/i18n-validators";

export function useUsers() {
    const store = useStore();

    const user = computed(() => store.getters.getCurrentUser);

    const isUpdated = ref(false);

    const form = ref({
        first_name: '',
        last_name: '',
        patronymic: '',
        roles: [],
        email: '',
        phone: '',
        language: ''
    });

    const rules = {
        first_name: {required},
        last_name: {required},
        roles: {required},
        email: {required, email},
        phone: {required},
        language: {required},
    };

    const v$ = useVuelidate(rules, form);

    const updateUser = async ({id, data}) => {
        const result = await v$.value.$validate();
        if (!result) {
            return;
        }

        await store.dispatch('fetchSaveUserData', {id, data});

        isUpdated.value = true;
    };

    const loadUser = async (id) => {
        await store.dispatch('fetchUser', id);
    };

    return {user, loadUser, updateUser, form, v$, isUpdated};
}

