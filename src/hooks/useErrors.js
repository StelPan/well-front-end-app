import {ref} from "vue";

export function useError(e = {}) {
    const errors = ref([]);

    function clearErrors () {
        errors.value = [];
    }

    function setErrors(e = {}) {
        errors.value = e;
    }

    return {clearErrors, setErrors, errors};
}
