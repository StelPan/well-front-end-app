import {ref, computed, watch} from "vue";
import {useStore} from "vuex";

import {useVuelidate} from '@vuelidate/core';
import {email, helpers, required} from "@vuelidate/validators";

export function useProfile() {
    const store = useStore();

    const profile = computed(() => store.getters.getProfile);

    const loadProfile = async () => {
        await store.dispatch('fetchProfile');
    };

    const deleteAvatar = async () => {
        await store.dispatch('fetchDeleteAvatar', profile.value.id);
        await loadProfile();
    };

    const form = ref(profile.value);

    const filesChoose = ref(false);
    const choose = (files) => {
        filesChoose.value = files;
    };


    const message = 'Поле обязательно для заполнения';
    const emailErrorMessage = 'Некорректный email';
    const rules = {
        first_name: {required: helpers.withMessage(message, required)},
        last_name: {required: helpers.withMessage(message, required)},
        email: {
            required: helpers.withMessage(emailErrorMessage, required),
            email: helpers.withMessage(emailErrorMessage, email),
        },
        phone: {required: helpers.withMessage(message, required)},
        language: {required: helpers.withMessage(message, required)},
    };

    const v$ = useVuelidate(rules, form);

    const isUpdated = ref(false);
    const updateProfile = async () => {
        const result = await v$.value.$validate();
        if (!result) {
            return false;
        }

        const formData = new FormData();

        for (let key in form.value) {
            if (!form.value[key]) continue;
            if (key === 'avatar') continue;

            formData.set(key, form.value[key]);
        }

        if (filesChoose.value?.files) {
            formData.set('avatar', filesChoose.value.files[0]);
        }

        await store.dispatch("fetchUpdateProfile", {
            id: profile.value.id,
            body: formData,
        });

        isUpdated.value = true;
    };

    watch(filesChoose, () => isUpdated.value = false);
    watch(form, () => isUpdated.value = false);

    const clearAvatarFile = () => {
        filesChoose.value = false;
    };

    return {
        clearAvatarFile,
        deleteAvatar,
        updateProfile,
        loadProfile,
        choose,
        filesChoose,
        isUpdated,
        profile,
        form,
        v$,
    };
}